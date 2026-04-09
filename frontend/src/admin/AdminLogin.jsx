
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";
import API from "../config/api";

export default function AdminLogin() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    setLoading(true);

    try {
      const url = `${API}/api/admin/login`;
      console.log("LOGIN URL 👉", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      // 🔥 RESPONSE SAFE CHECK
      const contentType = res.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("❌ HTML Response:", text);
        alert("Server error: JSON nahi aa raha");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminLoggedIn", "true");

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        navigate("/admin/dashboard");
      } else {
        alert(data.msg || "Invalid login");
        setLoading(false);
      }

    } catch (err) {
      console.error("Login Error:", err);
      alert("Server down ya network issue");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-zinc-900 p-8 rounded-2xl w-96 shadow-xl border border-yellow-500/20">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Scissors className="w-12 h-12 text-yellow-400 animate-scissor" />
          <h2 className="text-2xl font-bold mt-2 text-yellow-400">
            V/S Salon Admin
          </h2>
          <p className="text-sm text-gray-400">
            Luxury Barber Dashboard
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} autoComplete="on">

          <input
            type="text"
            name="username"
            autoComplete="username"
            className="w-full mb-4 p-3 rounded bg-black border border-zinc-700 focus:border-yellow-500 outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full mb-6 p-3 rounded bg-black border border-zinc-700 focus:border-yellow-500 outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded font-bold transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="loader"></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

      </div>
    </div>
  );
}