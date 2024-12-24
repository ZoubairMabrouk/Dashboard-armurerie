import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShoppingCart } from "use-shopping-cart";
import { getProfile } from "../services/auth";
import { addcommandes } from "../services/commandeservice";
import { parse } from "filepond";
import { format } from "date-fns";
import Navbar from "../components/NavBar";


const stripe_key = loadStripe(
  "pk_test_51QGHbXAr6uUDgl43kfsSNH6vNilg84TkMnJrsCJuHAf0C0qcK8siHBMQ9XZ0LKCxdOFZMBX5rwK0QryjjxgiikPa00AktwsgzP"
);
const Pannier = () => {
  const [cliend_id, setClinetid] = useState(1);
  const [date, setDate] = useState();
  const {
    cartDetails,
    removeItem,
    clearCart,
    totalPrice,
    cartCount,
    incrementItem,
    decrementItem,
  } = useShoppingCart();
  const stripe = useStripe();
  const handleCheckout = async (event) => {
    const profile = await getProfile();
    setClinetid(profile.id);
    CurrentDate();
    event.preventDefault();
    if (!stripe) {
      console.error("Stripe has not loaded yet");
      return;
    }

    try {
      const items = Object.values(cartDetails).map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price),
        },
        quantity: item.quantity,
      }));
      const commande = Object.values(cartDetails).map((item) => ({
        commande: {
          client_id: cliend_id,
          date: date,
          total_prix: Math.round(item.price),
        },
      }));
      const commandes = commande.map((item) => item.commande);

      console.log(commandes);
      addcommandes(commandes);
      console.log("Sending to checkout:", items);
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/payment/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            line_items: items,
            success_url: `${window.location.origin}/commande`,
            cancel_url: `${window.location.origin}/pannier`,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }
      const data = await response.json();
      console.log("Response from server:", data);
      if (data.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.id,
        });
        if (result.error) {
          console.error("Stripe redirect error:", result.error);
          throw new Error(result.error.message);
        }
      } else {
        throw new Error("No session ID received from server");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Payment failed: " + error.message);
    }
  };
  const computedTotalPrice = Object.values(cartDetails)
    .reduce(
      (acc, cartItem) => acc + parseFloat(cartItem.price) * cartItem.quantity,
      0
    )
    .toFixed(2);

  const CurrentDate = () => {
    const today = new Date();
    const formattedDate = format(today, "yyyy-MM-dd");

    setDate(formattedDate);
    console.log(formattedDate);
  };

  return (
    <>
      <div className="cart-container">
        <Navbar/>
        <h2>Shopping Cart</h2>
        {cartCount === 0 ? (
          <div className="cart-empty">
            <p>Panier Vide</p>
            <div className="start-shopping">
              <Link to="/productscard">
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cartDetails &&
                Object.values(cartDetails).map((cartItem) => (
                  <div className="cart-item" key={cartItem.id}>
                    <div className="cart-product">
                      <img src={`${cartItem.image}`} alt={cartItem.title} />
                      <div>
                        <h3>{cartItem.title}</h3>
                        <button onClick={() => removeItem(cartItem.id)}>
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ fontSize: "14px", color: "red" }}
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price">
                      {" "}
                      {cartItem.price}
                      TND
                    </div>
                    <div className="cart-product-quantity">
                      <button
                        className="button-actions"
                        onClick={() => decrementItem(cartItem.id)}
                      >
                        -
                      </button>
                      <div className="count">{cartItem.quantity}</div>
                      <button
                        className="button-actions"
                        onClick={() => incrementItem(cartItem.id)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-product-total-price">
                      {cartItem.quantity * cartItem.price} TND
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn" onClick={() => clearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">{computedTotalPrice} TND</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button onClick={handleCheckout}> Ckeck Out</button>
                <div className="continue-shopping">
                  <Link to="/cards">
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const Wrapper = (props) => (
  <Elements stripe={stripe_key}>
    <Pannier {...props} />
  </Elements>
);
export default Wrapper;
