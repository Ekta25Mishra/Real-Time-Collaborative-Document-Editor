console.log("documentRoutes file loaded");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument
} = require("../controllers/documentController");

// Create a new document
router.post("/", authMiddleware, createDocument);

// Get all documents of the logged-in user
router.get("/", authMiddleware, getDocuments);

// Get a single document
router.get("/:id", authMiddleware, getDocument);

// Get document versions
router.get("/:id/versions", authMiddleware, async (req, res) => {
  console.log("Versions route hit");
  try {
    const Document = require("../models/Document");
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc.versions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update document
router.put("/:id", authMiddleware, updateDocument);

// Delete document
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;