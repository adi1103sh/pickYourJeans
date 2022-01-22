import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    
    categories: [],
    category: "",
    error: "",
    getaRedirect: false,
    photo: "",
    loading: false,
    createdProduct: "",
    formData:""
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    photo,
    getaRedirect,
    createdProduct,
    formData
  } = values;

  const {user, token} = isAuthenticated();
  const preload = () => {
    
    return getAllCategories().then(data => {
        
        if(data && data.error)
           setValues({...values, error:data.error})
        else{
            console.log(data)
          setValues({...values, categories: data, formData: new FormData()})
          console.log(categories)
        }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
     preload();
  }, [])
  const handleChange = name => event =>{
        const value = name==="photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values,  [name]: value })

  };

  const successMessage = () => (
    <div className="col-md-6 mb-3 offset-md-3">
    <div
      className="alert alert-success  fade show"
      role="alert"
      style={{ display: createdProduct ? "" : "none" }}
    >
      Successfully added a Product
    </div>
    </div>
  );

  const errorsMessage = () => (
    <div className="col-md-6 mb-3 offset-md-3">
    <div
      className="alert alert-danger  fade show"
      role="alert"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
    </div>
  );

  const onSubmit = (event) => {
     event.preventDefault()
     setValues({...values, error: "", loading: true})
     createProduct(user._id, token, formData)
     .then(data => {
         if (data && data.error) {
             setValues({...values, error: data.error, loading: false})
         }
         else{
             setValues({...values, error:false, photo: "",  name: "",
             description: "",
             price: "",
             stock: "", createdProduct: data.name})
         }
     }).catch(error => console.log("Cannot create the product"))
  };

  const goBack = () => (
    <div>
      <Link className="btn btn-success" to="/admin/dashboard">
        Go Back
      </Link>
    </div>
  );

  const createProductForm = () => (
    <form>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="btn btn-block btn-dark">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
         {categories && categories.map((category, index) => 
              (
                 <option key = {index} value = {category._id}>{category.name}</option>
             )
         )}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info"
      >
        Create Product
      </button>
    </form>
  );
  return (
    <Base
      title="Create Products "
      description="Easily create products over here"
      className="container bg-secondary p-4"
    >
      {goBack()}
      <div className="row">
        <div className="col-md-8 offset-md-2">
        
        {successMessage()}
        {errorsMessage()}
        {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default AddProduct;
