import React, {useState, useEffect} from "react";
import { Navigate } from "react-router";
import { addItemToCart, removeProductFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  showAddToCart = true,
  showRemoveFromCart = false,
  title = "A photo from pexels",
  description = "this photo looks great",
  price = "5",
  reload = false,
  setReload = f => f
}) => {

   const [redirect, setRedirect] = useState(false)

   const getARedirect  = (redirect) => {
       if(redirect){
           return <Navigate to = "/cart"/>
       }
   }

   const addToCart = () => {
       addItemToCart(product, () => setRedirect(true))
   }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{title}</div>
      <div className="card-body">
          {getARedirect(redirect)}
        <ImageHelper product={product._id} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">${price}</p>

        <div className="row">
          <div className="col-12">
            {showAddToCart && (
              <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="col-12">
            {showRemoveFromCart && (
              <button
                onClick={() => {
                  removeProductFromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
