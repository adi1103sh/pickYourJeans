import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { getAllProducts } from "./helper/coreapicalls";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)

  const setCart = () => {
    let local_products = loadCart();

    setProducts(local_products);
   
  };

  useEffect(() => {
    setCart();
  }, [reload]);

  return (
    <Base
      title="Cart Page"
      description="This is a Cart page"
      className="container"
    >
      <div className="row text-center">
        <div className="col-6">
          <h2 className= "text-white">Your Cart</h2>

          {products &&
            products.map((product, index) => (
              <Card
                key={index}
                product={product}
                showAddToCart={false}
                showRemoveFromCart={true}
                title={product.name}
                description={product.description}
                price={product.price}
                reload = {reload}
                setReload = {setReload}
              />
            ))}
        </div>
        <div className="col-6">
          <h2 className = "text-white"><PaymentB product = {products} setReload = {setReload}/></h2>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
