// import FormData from "form-data"; // form-data v4.0.1
// import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// async function sendSimpleMessage() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: "api",
//     key:
//       process.env.API_KEY ||
//       """,
//     // When you have an EU-domain, you must specify the endpoint:
//     // url: "https://api.eu.mailgun.net"
//   });
//   try {
//     const data = await mg.messages.create(
//       "sandboxc2e4a267cc0e496cb8dc7231c6fb7baf.mailgun.org",
//       {
//         from: "Mailgun Sandbox <postmaster@sandboxc2e4a267cc0e496cb8dc7231c6fb7baf.mailgun.org>",
//         to: ["Abhijit Joshi <abhijitjoshi27601@gmail.com>"],
//         subject: "Hello Abhijit Joshi",
//         text: "Congratulations Abhijit Joshi, you just sent an email with Mailgun! You are truly awesome!",
//       },
//     );

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }
