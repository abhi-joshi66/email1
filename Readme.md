# EmailProject

A full-stack email survey application built with MongoDB, Express, React, and Node.js (MERN).

## Deployed Location

- Hosted on Render: https://email1-h6of.onrender.com/

## Features

- Send survey emails using a mailer service
- Collect recipient responses via a React frontend
- Authenticate users and require login for survey creation
- Use MongoDB for data persistence

## Tech Stack

- Frontend: React
- Backend: Express / Node.js
- Database: MongoDB
- Email: Resend mailer integration
- Deployment: Render

## Notes

- The client-side React app is located in the `client/` directory.
- Server routes are defined in the `routes/` directory.
- Database models are in the `models/` directory.
- Email templates are in `services/emailTemplates/`.
- Middleware ensures authentication and credit requirements.

## Usage

1. Install dependencies:
   - `npm install`
   - `cd client && npm install`
2. Start the backend server:
   - `npm start`
3. Start the development client:
   - `cd client && npm start`

> Note: This project is deployed on Render and uses MongoDB for storage, Express for the API, React for the UI, and Resend for sending mail.
