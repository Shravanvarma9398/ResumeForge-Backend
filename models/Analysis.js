const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resumeText: String,
    analysis: String,
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Analysis", analysisSchema);