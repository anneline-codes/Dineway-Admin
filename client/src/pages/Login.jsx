import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import api from "../services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "admin@dineway.com",
    password: "admin123",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("dineway-admin-token", data.accessToken);
      localStorage.setItem("dineway-admin-user", JSON.stringify(data.user));
      navigate("/app/overview");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-photo">
        <Logo />
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
          alt="Restaurant table"
        />
      </section>
      <section className="login-panel">
        <form className="login-card" onSubmit={submit}>
          <h1>WELCOME BACK</h1>
          <h2>
            Login to <span>DINEWAY</span>
          </h2>
          <p>Enter your email and password</p>
          <label>
            EMAIL
            <input
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              type="email"
              autoComplete="email"
            />
          </label>
          <label>
            PASSWORD
            <span className="password-field">
              <input
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
              </button>
            </span>
          </label>
          {error && <strong className="form-error">{error}</strong>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <a href="/">Forgot password?</a>
        </form>
      </section>
    </main>
  );
}
