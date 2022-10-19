const mongoose = require("mongoose");

const VacationSchema = mongoose.Schema({
  Description: {
    type: String,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
    default: "",
  },
  Start: {
    type: String,
    required: true,
  },
  End: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("vacations", VacationSchema);
