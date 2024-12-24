import React from "react";
import { Button } from "react-bootstrap";
import { useShoppingCart } from "use-shopping-cart";
import './pannier.css'

const AffCard = ({products})=>{
    console.log(products);
    const {addItem}= useShoppingCart();
    const addToCart = (prod) =>{
        const target = {
            id: prod.id,
            title: prod.designation,
            image: prod.image,
            price: prod.prix,
            qtestock: prod.qtestock,
            quantity: 1,
          };
          addItem(target);
    };
    return (
        
        <div  className="card" style={{width: "18rem"}}>
            {products.image && (
                <img
                    className="card-img-top"
                    src={products.image}
                    alt={products.reference}
                />
            )}
            <div>
                <h1>{products.reference}</h1>
                <p>{products.designation}</p>
                <p className="text-success">Stock : {products.qtestock}</p>
                <p>Prix : {products.prix} TND</p>
                <Button variant="success" disabled={products.qtestock < 1} onClick={()=> addToCart(products)}>Ajouter au panier</Button>
            </div>


        </div>
        
        );
};
export default AffCard;