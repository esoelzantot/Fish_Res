import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";

function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "home">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setCurrentPage("home");
    }
  }, []);

  // Handle navigation
  const navigateTo = (page: "login" | "home") => {
    setCurrentPage(page);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  // Render current page based on route
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage onLoginSuccess={() => navigateTo("home")} />;
      case "home":
        return <HomePage onLogout={handleLogout} />;
      default:
        return <LoginPage onLoginSuccess={() => navigateTo("home")} />;
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
