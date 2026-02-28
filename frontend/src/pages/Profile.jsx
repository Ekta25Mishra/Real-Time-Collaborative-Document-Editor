import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Profile() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  // ✅ FETCH USER DOCUMENTS
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await API.get("/documents/my-docs");
        setDocuments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDocuments();
  }, []);

  // ✅ CREATE NEW DOCUMENT
  const createNewDocument = async () => {
    try {
      const res = await API.post("/documents/create");
      navigate(`/editor/${res.data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Documents</h1>
        <button className="new-doc-btn" onClick={createNewDocument}>
          + New Document
        </button>
      </div>

      <div className="document-grid">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="document-card"
            onClick={() => navigate(`/editor/${doc._id}`)}
          >
            <h3>{doc.title || "Untitled Document"}</h3>
            <p>
              {new Date(doc.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}