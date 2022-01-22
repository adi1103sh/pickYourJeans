import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = event => {
      setError("")
      setName(event.target.value)
  }

  const onSubmit = event => {
      event.preventDefault();
      setError(false)
      setSuccess(false)
      createCategory(user._id, token, {name})
      .then(data => {
        if (data && data.error) {
            setError(data.error)
            setSuccess(false)
        }
        else{
            setError(false)
            setName("")
            setSuccess(true)
        }
    })
    .catch(() => console.log("Problem in creating category"))
    
  }
 

  const successMessage = () => {
      if(success)
        return <div class="alert alert-success" role="alert">
        Created the category successfully!
      </div>
  }

  const errorMessage = () => {
    if(error)
    return <div class="alert alert-danger" role="alert">
    Failed to create category!
  </div>
  }
  const goBack = () => (
      <div>
      <Link className = "btn btn-success"  to = "/admin/dashboard">
          Go Back
      </Link>
      </div>
  );



  const myCategoryForm = () => {
      return (
           
    <div className = "row p-2" style = {{marginBottom : "20px", display: "flex", justifyContent:"center",}} >
         {goBack()}
    <div className = "col-md-8 bg-white rounded p-4" style = {{margin : "50px",  }}>
   
    <form>
<div className="mb-3">
<label className="form-label">Category Name</label>
<input onChange = {handleChange} value = {name} type="text" className="form-control"  required onFocus placeholder = "For ex. Summer"/>
</div>

<button onClick = {onSubmit}  type="submit" className="btn btn-outline-primary">Submit</button>
</form>
        </div>
</div>
      )
  }

  return (
    <Base
      title="Create Category page"
      description="Create a category for tshirts"
      className="container bg-secondary"
    >
        {successMessage()}
        {errorMessage()}
        {myCategoryForm()}
    </Base>
  );
};

export default AddCategory;
