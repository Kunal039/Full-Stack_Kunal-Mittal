import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const initialLoginForm = {
  email: "",
  password: ""
};

const initialRegisterForm = {
  name: "",
  email: "",
  password: ""
};

function LoginPage() {
  const { isAuthenticated, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const title = mode === "login" ? "Welcome Back" : "Create Your Account";

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleLoginChange(event) {
    const { name, value } = event.target;
    setLoginForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target;
    setRegisterForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function submitLogin(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await login(loginForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function submitRegister(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await register(registerForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-left">
          <h1>
            Job<span>Hub</span>
          </h1>
          <p>
            Your career starts here. Find jobs, manage openings, and access your
            account with secure email login.
          </p>
        </div>

        <div className="login-right">
          <div className="login-card">
            <div className="auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "auth-tab active" : "auth-tab"}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                type="button"
                className={mode === "register" ? "auth-tab active" : "auth-tab"}
                onClick={() => setMode("register")}
              >
                Create Account
              </button>
            </div>

            <h2>{title}</h2>
            <p>
              {mode === "login"
                ? "Login with your email and password"
                : "Register a new recruiter or candidate account"}
            </p>

            {mode === "login" ? (
              <form onSubmit={submitLogin}>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="Email address"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            ) : (
              <form onSubmit={submitRegister}>
                <input
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  placeholder="Full name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="Email address"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="Create password"
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>
            )}

            {status.message ? (
              <p className={`status-message ${status.type}`}>{status.message}</p>
            ) : null}

            <div className="login-links">
              <button
                type="button"
                className="text-link"
                onClick={() =>
                  setMode((current) =>
                    current === "login" ? "register" : "login"
                  )
                }
              >
                {mode === "login"
                  ? "Need an account? Create one"
                  : "Already registered? Login"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
