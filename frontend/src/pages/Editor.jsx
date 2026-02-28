import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Editor() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join-document", id);
  }, [id]);

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await API.get(`/documents/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchDocument();
  }, [id]);

  useEffect(() => {
    socket.on("receive-changes", ({ title, content }) => {
      setTitle(title);
      setContent(content);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  const saveDocument = async () => {
    await API.put(`/documents/${id}`, { title, content });
    socket.emit("send-changes", { docId: id, title, content });
  };

  return (
    <div className="editor-container">
      <div className="editor-header">
        <input
          className="editor-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Document"
        />
        <button className="save-btn" onClick={saveDocument}>
          Save
        </button>
      </div>

      <textarea
        className="editor-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your document here..."
      />
    </div>
  );
}