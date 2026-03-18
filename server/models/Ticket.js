const mongoose = require("mongoose");

ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Resolved", "In Progress", "Open"],
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "Critical"],
    },
    level: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    assignee: {
      // Not required because there are some unassigned tickets in the base data
      id: {
        type: String,
      },
      name: {
        type: String,
        trim: true,
      },
      avatarUrl: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Ticket", ticketSchema);
