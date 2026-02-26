const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Untitled Document",
    trim: true
  },
  content: {
    type: String,
    default: ""
  },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  collaborators: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["editor", "viewer"], default: "viewer" }
    }
  ],
  versions: [
    {
      content: String,
      updatedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);