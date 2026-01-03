import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import OrderPage from "./pages/order/OrderPage";

type PageType = "login" | "home" | "order";

function App() {
  // ✅ Lazy initialization from localStorage
  const [, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    return localStorage.getItem("isLoggedIn") === "true" ? "home" : "login";
  });

  // Handle navigation
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentPage("login");
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <LoginPage
            onLoginSuccess={() => {
              localStorage.setItem("isLoggedIn", "true");
              setIsLoggedIn(true);
              navigateTo("home");
            }}
          />
        );

      case "home":
        return (
          <HomePage
            onLogout={handleLogout}
            onNavigateToOrder={() => navigateTo("order")}
          />
        );

      case "order":
        return <OrderPage onNavigateToHome={() => navigateTo("home")} />;

      default:
        return (
          <LoginPage
            onLoginSuccess={() => {
              localStorage.setItem("isLoggedIn", "true");
              setIsLoggedIn(true);
              navigateTo("home");
            }}
          />
        );
    }
  };

  return <div className="app">{renderPage()}</div>;
}

export default App;
