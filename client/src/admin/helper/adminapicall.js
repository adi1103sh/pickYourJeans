import { API } from "../../backend";

//category calls

export const createCategory = (userid, token, category) => {
  return fetch(`${API}/category/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
    
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// product calls

// create a Product
export const createProduct = (userid, token, product) => {
  return fetch(`${API}/product/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get All products
export const getAllProducts = () => {
    return fetch(`${API}/products`, {
      method: "GET"
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  // get a Product
  export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET",
      headers: {
        Accept: "application/json"      }
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  // update a product
  export const updateProduct = (productid, userid, token, product) => {
    return fetch(`${API}/product/${productid}/${userid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };


  // delete a product
  export const deleteProduct = (productid, userid, token) => {
    return fetch(`${API}/product/${productid}/${userid}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };