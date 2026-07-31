const { Resend } = require("resend");
const keys = require("../config/keys");

class Mailer {
  constructor({ subject, recipients }, content) {
    this.resend = new Resend(keys.resendApiKey || process.env.RESEND_API_KEY);

    this.data = {
      from:
        keys.resendFromEmail ||
        process.env.RESEND_FROM_EMAIL ||
        "onboarding@resend.dev",
      to: this.formatAddresses(recipients),
      subject,
      html: content,
      text: content.replace(/<[^>]+>/g, " "),
    };
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => email).join(",");
  }

  async send() {
    try {
      const response = await this.resend.emails.send(this.data);
      return response;
    } catch (error) {
      console.error("Resend send error:", error);
      throw error;
    }
  }
}

module.exports = Mailer;
