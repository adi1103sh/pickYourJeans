const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "	cj9szqdmwhb76sb3",
  publicKey: "qd4wv5pszrkdj2tz",
  privateKey: "ab45599b7dadf7ffd9369c2004d06f6e"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
            if(err){
                res.status(500).send(err)
            } else{
                res.send(response)
            }
      });
}
exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce
    const amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient ,
        paymentMethodNonce: nonceFromTheClient,
       
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).send(err)
        } else{
            res.send(result)
        }
      });
}