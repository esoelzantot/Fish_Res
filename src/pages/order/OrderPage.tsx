import { useState, useEffect } from "react";
import {
  Home,
  Grid,
  FileText,
  User,
  Settings,
  LogOut,
  Package,
  Bell,
  X,
} from "lucide-react";
import "./OrderPage.css";

import type { CartItem } from "../../types/cart";

interface OrderPageProps {
  onNavigateToHome: () => void;
}

interface OrderData {
  orderNumber: string;
  recipient: string;
  gender: string;
  city: string;
  phoneNumber: string;
  emailAddress: string;
  customerId: string;
  address: string;
}

const OrderPage = ({ onNavigateToHome }: OrderPageProps) => {
  const [activeSection, setActiveSection] = useState<string>("orders");
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  // ✅ Lazy initialization (FIXED)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Order data
  const [orderData, setOrderData] = useState<OrderData>({
    orderNumber: "256482",
    recipient: "",
    gender: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
    customerId: "",
    address: "",
  });

  // Receipt data
  const receiptData = {
    receiptNumber: "1234",
    recipient: "Sarah Moonrees",
    customerId: "6675894235",
    date: new Date().toLocaleDateString("en-GB"),
  };

  // ✅ Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const subtotal: number = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax: number = 6.0;
  const charges: number = 24.0;
  const total: number = subtotal + tax + charges;

  const handleInputChange = (field: keyof OrderData, value: string): void => {
    setOrderData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrint = (): void => {
    setShowReceipt(true);
  };

  const handlePrintInvoice = (): void => {
    document.body.classList.add("printing-receipt");
    window.print();

    setTimeout(() => {
      document.body.classList.remove("printing-receipt");
    }, 100);
  };

  const handlePlaceOrder = (): void => {
    alert("Order placed successfully!");
    console.log("Order data:", orderData);
    localStorage.removeItem("cart");
    onNavigateToHome();
  };

  const removeItem = (id: number): void => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="order-page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-logo">🐟</div>

        <div className="sidebar-nav">
          <button
            onClick={onNavigateToHome}
            className={`sidebar-btn ${
              activeSection === "home" ? "active" : ""
            }`}
          >
            <Home size={24} />
          </button>
          <button
            onClick={() => setActiveSection("menu")}
            className={`sidebar-btn ${
              activeSection === "menu" ? "active" : ""
            }`}
          >
            <Grid size={24} />
          </button>
          <button
            onClick={() => setActiveSection("orders")}
            className={`sidebar-btn ${
              activeSection === "orders" ? "active" : ""
            }`}
          >
            <FileText size={24} />
          </button>
          <button
            onClick={() => setActiveSection("cart")}
            className={`sidebar-btn ${
              activeSection === "cart" ? "active" : ""
            }`}
          >
            <Package size={24} />
          </button>
          <button
            onClick={() => setActiveSection("notifications")}
            className={`sidebar-btn ${
              activeSection === "notifications" ? "active" : ""
            }`}
          >
            <Bell size={24} />
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className={`sidebar-btn ${
              activeSection === "profile" ? "active" : ""
            }`}
          >
            <User size={24} />
          </button>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-btn">
            <Settings size={24} />
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="sidebar-btn logout-btn"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>

      {/* Main Order Content */}
      <div className="order-main-content">
        <div className="order-header-title">
          <h1>Order #{orderData.orderNumber}</h1>
        </div>

        <div className="order-form-section">
          {/* First Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Recipient :</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={orderData.recipient}
                onChange={(e) => handleInputChange("recipient", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                placeholder="Enter Gender"
                value={orderData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>City :</label>
              <input
                type="text"
                placeholder="Enter City"
                value={orderData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="form-row">
            <div className="form-group">
              <label>Phone Number :</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={orderData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Email Address :</label>
              <input
                type="email"
                placeholder="Enter Email Address"
                value={orderData.emailAddress}
                onChange={(e) =>
                  handleInputChange("emailAddress", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Customer ID :</label>
              <input
                type="text"
                placeholder="Enter Customer ID"
                value={orderData.customerId}
                onChange={(e) =>
                  handleInputChange("customerId", e.target.value)
                }
              />
            </div>
          </div>

          {/* Address Row */}
          <div className="form-row full-width">
            <div className="form-group full">
              <label>Address</label>
              <textarea
                placeholder="Enter Address"
                rows={3}
                value={orderData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="order-items-list">
          {cartItems.length === 0 ? (
            <div className="empty-order">
              <p>No items in order</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="order-item-row">
                <div className="order-item-image">{item.image}</div>
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-price">${item.price.toFixed(2)}</div>
                <div className="order-item-quantity">
                  Quantity : {item.quantity}
                </div>
                <button
                  className="order-item-remove"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary and Actions */}
        <div className="order-footer">
          <div className="order-summary-inline">
            <div className="summary-item">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Charges</span>
              <span>${charges.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="order-actions">
            <button className="btn-print" onClick={handlePrint}>
              Print
            </button>
            <button className="btn-place-order" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="receipt-overlay" onClick={() => setShowReceipt(false)}>
          <div
            className="receipt-modal print-area"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="receipt-close no-print"
              onClick={() => setShowReceipt(false)}
            >
              <X size={24} />
            </button>

            <div className="receipt-content">
              <div className="receipt-header">
                <div className="receipt-logo">🐟</div>
                <h2>Receipt #{receiptData.receiptNumber}</h2>
                <p className="receipt-restaurant-name">Fish Restaurant</p>
              </div>

              <div className="receipt-info">
                <div className="receipt-info-row">
                  <span className="receipt-label">Recipient</span>
                  <span className="receipt-value">{receiptData.recipient}</span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">Customer ID</span>
                  <span className="receipt-value">
                    {receiptData.customerId}
                  </span>
                </div>
                <div className="receipt-info-row">
                  <span className="receipt-label">Date</span>
                  <span className="receipt-value">{receiptData.date}</span>
                </div>
              </div>

              <div className="receipt-items">
                <div className="receipt-items-header">
                  <span>#</span>
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Price</span>
                </div>
                {cartItems.map((item, index) => (
                  <div key={item.id} className="receipt-item">
                    <span className="receipt-item-number">{index + 1}.</span>
                    <span className="receipt-item-name">{item.name}</span>
                    <span className="receipt-item-qty">{item.quantity}</span>
                    <span className="receipt-item-price">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="receipt-summary">
                <div className="receipt-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="receipt-summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="receipt-summary-row">
                  <span>Charges</span>
                  <span>${charges.toFixed(2)}</span>
                </div>
                <div className="receipt-summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="receipt-footer">
                <p>Thank you for your order!</p>
                <p className="receipt-contact">
                  Tel: +1 234 567 8900 | www.fishrestaurant.com
                </p>
              </div>

              <button
                className="btn-print-invoice no-print"
                onClick={handlePrintInvoice}
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
