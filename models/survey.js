const { Schema, model } = require("mongoose");
const RecipientSchema = require("./recipient");

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "users" },
  dateSent: Date,
  lastResponded: Date,
});

module.exports = model("surveys", surveySchema);
