import DropIn from "braintree-web-drop-in-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createAnOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentBHelper";

const PaymentB = ({ product, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    error: "",
    success: false,
    loading: false,
    clientToken: null,
    instance: {},
  });

  const userid = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userid, token) => {
    getmeToken(userid, token).then((data) => {
      if (data && data.error) setInfo({ ...info, error: data.error });
      else {
        setInfo({ clientToken: data.clientToken });
        console.log(info.clientToken);
      }
    });
  };

  const totalAmount = () => {
    let amount = 0;
    product &&
      product.map((p) => {
        amount += p.price;
      });
    return amount;
  };

  useEffect(() => {
    getToken(userid, token);
  }, []);

  const btDropIn = () => {
    if (!info.clientToken) {
      return (
        <div>
          <h1>Authenticate yourselves first</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{ authorization: info.clientToken }}
            onInstance={(instance) => (info.instance = instance)}
          />
          <button className="btn btn-block btn-success " onClick={onPayment}>
            Buy
          </button>
        </div>
      );
    }
  };
  const onPayment = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      console.log(data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: totalAmount(),
      };
      processPayment(userid, token, paymentData)
        .then((response) => {
          setInfo({ ...info, loading: false, success: response.success });
          console.log("Payment success");
          console.log(response)
          console.log(product)
          const orderData = {
              products: product,
              transaction_id: response.transaction.id,
              amount: parseInt(response.transaction.amount),
              status: "Received"

          }
          console.log(orderData)
          createAnOrder(userid, token, orderData).then(data => {
              if(data && data.error)
                  setInfo({error: data.error})
              else{
                 setReload(!reload)

              }
          })
        })
        .catch((err) => {
          setInfo({ loading: false, success: false });
          console.log("Payment failed");
        });
    });
  };
  return (
    <div>
      <h3>Your total bill is ${totalAmount()}</h3>
      {btDropIn()}
    </div>
  );
};

export default PaymentB;
