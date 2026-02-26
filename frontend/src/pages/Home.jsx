import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col gap-6 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Collaborative Editor</h1>
        <p className="text-gray-600">Create, edit, and collaborate on documents in real-time.</p>
        <div className="flex flex-col gap-3">
          <button
            className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}