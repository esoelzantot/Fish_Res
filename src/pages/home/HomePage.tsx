import { useState } from "react";
import {
  Search,
  Home,
  Grid,
  FileText,
  User,
  Settings,
  LogOut,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Star,
  Package,
} from "lucide-react";
import "./HomePage.css";

import { products } from "../../data/products";
import { offers } from "../../data/offers";

import type { Product } from "../../types/product";
import type { Offer } from "../../types/offer";
import type { CartItem } from "../../types/cart";

interface HomePageProps {
  onLogout: () => void;
  onNavigateToOrder: () => void;
}

const RestaurantHomePage = ({ onLogout, onNavigateToOrder }: HomePageProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<
    "home" | "menu" | "orders" | "cart" | "profile"
  >("home");

  const addToCart = (product: Product): void => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number): void => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number): void => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // ✅ دالة موحدة لحفظ الـ cart والانتقال
  const handleNavigateToOrder = (): void => {
    localStorage.setItem("cart", JSON.stringify(cart));
    onNavigateToOrder();
  };

  const subtotal: number = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax: number = subtotal * 0.1;
  const charges: number = 10;
  const total: number = subtotal + tax + charges;

  return (
    <div className="restaurant-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">🐟</div>

        <div className="sidebar-nav">
          <button
            onClick={() => setActiveSection("home")}
            className={`sidebar-btn ${
              activeSection === "home" ? "active" : ""
            }`}
          >
            <Home size={50} />
          </button>
          <button
            onClick={() => setActiveSection("menu")}
            className={`sidebar-btn ${
              activeSection === "menu" ? "active" : ""
            }`}
          >
            <Grid size={50} />
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`sidebar-btn ${
              activeSection === "orders" ? "active" : ""
            }`}
          >
            <FileText size={50} />
          </button>
          <button
            onClick={() => setActiveSection("cart")}
            className={`sidebar-btn ${
              activeSection === "cart" ? "active" : ""
            }`}
          >
            <Package size={50} />
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className={`sidebar-btn ${
              activeSection === "profile" ? "active" : ""
            }`}
          >
            <User size={50} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-btn" aria-label="Settings">
            <Settings size={50} />
          </button>
          <button
            onClick={onLogout}
            className="sidebar-btn logout-btn"
            aria-label="LogOut"
          >
            <LogOut size={50} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar">
          <div className="navbar-brand">
            <h1>
              <span className="brand-primary">Point</span>sell
            </h1>
          </div>

          <div className="navbar-search">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search Anything Here"
              className="search-input"
            />
          </div>

          <div className="navbar-actions">
            {/* ✅ استخدام الدالة الجديدة */}
            <div
              className="cart-icon-btn"
              onClick={handleNavigateToOrder}
              style={{ cursor: "pointer" }}
            >
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Offers Section */}
          <div className="offers-section">
            <h2 className="section-title">Special Offers</h2>
            <div className="offers-grid">
              {offers.map((offer: Offer) => (
                <div
                  key={offer.id}
                  className="offer-card"
                  style={{ background: offer.bg }}
                >
                  <h3>{offer.title}</h3>
                  <p>{offer.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="products-section">
            <h2 className="section-title">Special Menu For You</h2>
            <div className="products-grid">
              {products.map((product: Product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>

                  <div className="product-info">
                    <div className="product-header">
                      <h3>{product.name}</h3>
                      <span className="product-price">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="product-description">{product.description}</p>

                    <div className="product-footer">
                      <div className="product-rating">
                        <Star size={16} fill="#FF6B35" color="#FF6B35" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="add-product-btn"
                      >
                        + Add Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Order Panel */}
      <div className="order-panel">
        <div className="order-header">
          <h2>Order #235482</h2>
          <button className="close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="order-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">{item.image}</div>

                <div className="cart-item-details">
                  <div className="cart-item-header">
                    <h4>{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-item-btn"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="cart-item-footer">
                    <span className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="quantity-btn minus-btn"
                        aria-label="Minus"
                      >
                        <Minus size={16} strokeWidth={4} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="quantity-btn plus-btn"
                        aria-label="Plus"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="order-summary">
          <div className="summary-items">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Charges</span>
              <span>${charges.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* ✅ استخدام نفس الدالة */}
          <button className="place-order-btn" onClick={handleNavigateToOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHomePage;
