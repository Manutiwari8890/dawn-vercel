import React, { useState, useEffect, useRef } from "react";
import { useLoader } from "../context/LoaderContext";
import { NavLink } from "react-router-dom";


const OfferPopUp = () => {
  const { loading } = useLoader();
  const [showPopup, setShowPopup] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    if (!loading && hasLoadedOnce.current) {
      const hasSeenPopup = localStorage.getItem("seenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem("seenPopup", "true");
      }
    }
    if (loading) {
      hasLoadedOnce.current = true; // mark that loader was active
    }
  }, [loading]);

  useEffect(() => {
    document.documentElement.style.overflow = showPopup ? "hidden" : "auto";
  }, [showPopup]);

  const closePopup = () => setShowPopup(false);

  if (!showPopup) return null;

  return (
    <div className="offer-modal modal active" id="offer-modal" onClick={closePopup}>
      <button
        type="button"
        className="modal__close"
        onClick={closePopup}
        aria-label="Modal Close"
      >
        &times;
      </button>
      <div className="modal__content offer">
        <h2>Up to 10%</h2>
        <p>Dawn Scientific offers DISCOUNT up to 10 % on many products to account holders.
Please create your account today to avails the offer.</p>
        <NavLink to="/register" className="btn btn-primary">Register</NavLink>
      </div>
    </div>
  );
};

export default OfferPopUp;
