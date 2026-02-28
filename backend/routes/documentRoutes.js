const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const authMiddleware = require("../middleware/authMiddleware");

// Create new document
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const doc = await Document.create({
      title: "Untitled Document",
      owner: req.user.id,
    });

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all documents of logged in user
router.get("/my-docs", authMiddleware, async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single document
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const doc = await Document.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update document
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const doc = await Document.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { title, content },
      { new: true }
    );

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;