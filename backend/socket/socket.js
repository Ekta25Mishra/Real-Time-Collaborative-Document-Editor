const Document = require("../models/Document");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-document", (docId) => {
      socket.join(docId);
      console.log("Joined document:", docId);
    });

    socket.on("send-changes", (data) => {
      socket.to(data.docId).emit("receive-changes", data.content);
    });

    socket.on("save-document", async (data) => {
      try {
        const doc = await Document.findById(data.docId);

        if (!doc) {
          console.log("❌ Document not found:", data.docId);
          return; // Stop here, don't crash
        }

        doc.content = data.content;
        await doc.save();

        console.log("✅ Document saved:", data.docId);

      } catch (error) {
        console.error("Save error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};