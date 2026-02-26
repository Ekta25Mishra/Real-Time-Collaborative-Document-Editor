import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Editor() {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState(""); // ✅ Only here

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await API.get(`/documents/${id}`);
        setContent(res.data.content || "");
        setTitle(res.data.title || ""); // ✅ set title properly
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoc();

    socket.emit("join-document", id);

    socket.on("receive-changes", (newContent) =>
      setContent(newContent)
    );

    return () => {
      socket.off("receive-changes");
    };
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit("send-changes", { docId: id, content: value });
  };

  // Autosave
  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("save-document", {
        docId: id,
        content,
        title,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [content, title, id]);

  return (
    <div className="flex items-center justify-center p-10 bg-gray-100 min-h-screen">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Collaborative Document Editor
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
          className="w-full p-2 text-xl font-semibold mb-4 border rounded"
        />

        <textarea
          value={content}
          onChange={handleChange}
          rows={20}
          className="w-full p-4 border border-gray-300 rounded-lg resize-y bg-gray-50 text-gray-800 text-base"
        />

        <p className="text-right text-gray-500 text-sm">
          Autosave every 3 seconds
        </p>
      </div>
    </div>
  );
}