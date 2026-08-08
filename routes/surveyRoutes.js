const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Survey = require("../models/survey");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const { Resend } = require("resend");
const keys = require("../config/keys");
const _ = require("lodash");
// const Path = require("path-parser").default;
const { URL } = require("url");

const resend = new Resend(keys.resendApiKey || process.env.RESEND_API_KEY);

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    // List of surveys for the logged-in user, excluding recipients.
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.redirect(`${keys.redirectDomain}/api/surveys/thanks`);
  });

  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const webhookSecret =
      keys.resendWebhookSecret || process.env.RESEND_WEBHOOK_SECRET;

    const rawPayload =
      req.rawBody ||
      (req.body && typeof req.body === "object"
        ? Buffer.from(JSON.stringify(req.body))
        : req.body);

    let payload;
    if (webhookSecret) {
      try {
        payload = resend.webhooks.verify({
          webhookSecret,
          payload: rawPayload,
          headers: {
            id: req.headers["webhook-id"] || req.headers["svix-id"],
            timestamp:
              req.headers["webhook-timestamp"] || req.headers["svix-timestamp"],
            signature:
              req.headers["webhook-signature"] || req.headers["svix-signature"],
          },
        });
      } catch (err) {
        console.error(
          "Resend webhook verification failed:",
          err.message || err,
        );
        console.error("Request headers:", req.headers);
        try {
          const rawBodyString =
            rawPayload instanceof Buffer
              ? rawPayload.toString()
              : JSON.stringify(rawPayload);
          console.error("Raw body (first 2KB):", rawBodyString.slice(0, 2048));
        } catch (e) {
          console.error("Failed to stringify raw body for logging:", e);
        }
        return res.status(400).send({ error: "Webhook verification failed" });
      }
    } else {
      console.warn(
        "Resend webhook secret is not configured. Skipping signature verification.",
      );
      try {
        payload = JSON.parse(req.body.toString());
      } catch (err) {
        console.error("Failed to parse webhook body:", err);
        return res.status(400).send({ error: "Invalid webhook payload" });
      }
    }

    console.log("Webhook payload:", JSON.stringify(payload, null, 2));

    // Step 1: Normalize payload to an array so we can process one or many events
    const incomingEvents = Array.isArray(payload) ? payload : [payload];
    console.log("incomingEvents:", incomingEvents);

    // Step 2: Extract only the useful fields from each event
    // For Resend click events, keep the email and the clicked link URL.
    const extractedEvents = incomingEvents.flatMap((event) => {
      if (event.type === "email.clicked" && event.data?.click?.link) {
        const email = Array.isArray(event.data.to)
          ? event.data.to[0]
          : event.data.to;
        return [{ email, url: event.data.click.link }];
      }
      if (event.email && event.url) {
        return [{ email: event.email, url: event.url }];
      }
      return [];
    });
    console.log("after flatMap extraction:", extractedEvents);

    // Step 3: Convert each URL into surveyId and choice values.
    const mappedEvents = extractedEvents.map(({ email, url }) => {
      try {
        const pathname = new URL(url).pathname;
        // we are using a regex to extract surveyId and choice from the URL path instead of Path from path-parser library.
        const match = pathname.match(
          /\/api\/surveys\/(?<surveyId>[^\/]+)\/(?<choice>[^\/]+)/,
        );
        if (match?.groups) {
          return {
            email,
            surveyId: match.groups.surveyId,
            choice: match.groups.choice,
          };
        }
      } catch (err) {
        return null;
      }
      return null;
    });
    console.log("after URL path mapping:", mappedEvents);

    // Step 4: Remove invalid entries where the URL did not match the expected path.
    const compactEvents = _.compact(mappedEvents);
    console.log("after compact:", compactEvents);

    // Step 5: Deduplicate repeated clicks for the same email and survey.
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
    console.log("after uniqBy:", uniqueEvents);

    // Step 6: Apply each valid event to the database.
    uniqueEvents.forEach(({ surveyId, email, choice }) => {
      console.log("Final event to apply:", { surveyId, email, choice });
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        },
      ).exec();
    });

    res.send({});
  });

  app.post("/api/surveys", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Send email logic here
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
