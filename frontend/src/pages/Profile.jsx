import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch user profile & documents
  const fetchData = async () => {
    try {
      // 1️⃣ Get user info
      const profileRes = await API.get("/auth/profile"); // returns { name, email, ... }
      setUserName(profileRes.data.name);

      // 2️⃣ Get user's documents
      const docsRes = await API.get("/documents");
      setDocs(docsRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch profile or documents");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create new document
  const handleNewDoc = async () => {
    try {
      const { data } = await API.post("/documents", {
        title: "Untitled Document",
        content: "",
      });
      navigate(`/editor/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create document");
    }
  };

  // Edit existing document
  const handleEdit = (docId) => navigate(`/editor/${docId}`);

  // Delete document
  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;
    try {
      await API.delete(`/documents/${docId}`);
      // Remove from state to update UI immediately
      setDocs(docs.filter((d) => d._id !== docId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete document");
    }
  };

  // Filter documents by search
  const filteredDocs = docs.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userName || "User"}!
        </h1>
        <button
          onClick={handleNewDoc}
          className="mt-4 md:mt-0 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          + New Document
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search your documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 p-2 border rounded-lg mb-6"
      />

      {/* Documents List */}
      {loading ? (
        <p>Loading your documents...</p>
      ) : filteredDocs.length === 0 ? (
        <p className="text-gray-500">No documents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-1">
                {doc.title || "Untitled Document"}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Last updated: {new Date(doc.updatedAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleEdit(doc._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(doc._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}