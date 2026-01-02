import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import "./LoginPage.css";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Store data in localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginTime", new Date().toISOString());

      setLoading(false);

      // Navigate to home page
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Left Side - Illustration */}
      <div className="login-illustration">
        <div className="illustration-content">
          <div className="floating-icon icon-user">
            <User size={32} />
          </div>
          <div className="floating-icon icon-shield">✓</div>
          <div className="street-lamp">
            <div className="lamp-light"></div>
          </div>
          <div className="person-sitting">
            <div className="person-head">
              <div className="person-hair"></div>
            </div>
            <div className="person-body">
              <div className="person-laptop">
                <div className="laptop-screen"></div>
              </div>
            </div>
            <div className="person-legs"></div>
          </div>
          <div className="bench">
            <div className="bench-leg left"></div>
            <div className="bench-leg right"></div>
          </div>
          <div className="plant-pot">
            <div className="plant-leaves">
              <div className="leaf left"></div>
              <div className="leaf right"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h1 className="login-title">Welcome Back!</h1>

          <div className="login-form">
            {/* Email Input */}
            <div className="input-group">
              <div className="input-icon">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Password Input */}
            <div className="input-group">
              <div className="input-icon">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            {/* Forget Password */}
            <div className="forgot-password">
              <a href="#forgot">Forget Password?</a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="login-button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
