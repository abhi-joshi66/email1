// import FormData from "form-data"; // form-data v4.0.1
// import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// async function sendSimpleMessage() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: "api",
//     key: process.env.MAILGUN_API_KEY || "<your-mailgun-api-key>",
//     // When you have an EU-domain, you must specify the endpoint:
//     // url: "https://api.eu.mailgun.net"
//   });
//   try {
//     const data = await mg.messages.create(
//       "your-mailgun-domain.example",
//       {
//         from: "Mailgun Sandbox <postmaster@your-mailgun-domain.example>",
//         to: ["Example User <example@example.com>"],
//         subject: "Hello",
//         text: "This is a sample message.",
//       },
//     );

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }
