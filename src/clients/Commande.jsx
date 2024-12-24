import React from "react";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";

const Commande = () => {
  return (
    <div className="container">
        <Navbar/>
      <Toast>
        <h1>Commande réussie !</h1>
        <p>
          Merci pour votre achat, votre commande a bien été prise en compte.
        </p>
        <Link to="/pannier">Retour à la page d'accueil</Link>
      </Toast>
    </div>
  );
};
export default Commande;