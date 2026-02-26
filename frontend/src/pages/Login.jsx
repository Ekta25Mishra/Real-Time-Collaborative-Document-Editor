import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  if (!email || !password) return alert("Enter email & password");
  try {
    // 1️⃣ Login
    const { data } = await API.post("/auth/login", { email, password });

    // 2️⃣ Save token in localStorage
    localStorage.setItem("token", data.token);

    // 3️⃣ Redirect to Profile page instead of opening editor
    navigate("/profile");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleLogin}
          className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-500">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}