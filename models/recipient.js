const { Schema, model } = require("mongoose");

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false },
});

module.exports = recipientSchema;
