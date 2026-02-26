const Document = require("../models/Document");

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const { title, content } = req.body; // <-- accept title
    const owner = req.user.id;

    const document = await Document.create({
      title: title || "Untitled Document", // default title if empty
      content: content || "",
      owner,
      collaborators: [],
      versions: []
    });

    res.status(201).json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all documents of a user
exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user.id }).sort({ updatedAt: -1 });
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single document
exports.getDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update fields if provided
    if (title !== undefined) document.title = title;
    if (content !== undefined) document.content = content;

    document.updatedAt = Date.now();

    await document.save();

    res.json(document);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Document deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};