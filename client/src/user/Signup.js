import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data && data.error)
          setValues({ ...values, error: data.error, success: false });
        else
          setValues({
            ...values,
            error: "",
            name: "",
            email: "",
            password: "",
            success: true,
          });
      })
      .catch(error => console.log("Error in signup"));
  };

  const successMessage = () => (
    <div className="col-md-6 mb-3 offset-md-3">
    <div
      className="alert alert-success  fade show"
      role="alert"
      style={{ display: success ? "" : "none" }}
    >
      SignUp Successfull. Please <Link to="/signin">LogIn</Link> here
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

  const SignupForm = () => {
    return (
      <form>
        <div className="col-md-6 mb-3 offset-md-3">
          <label className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="Name"
            
            onChange={handleChange("name")}
            value={name}
          />
        </div>

        <div className="col-md-6 mb-3 offset-md-3">
          <label  className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={handleChange("email")}
            value={email}
          />
        </div>
        <div className="col-md-6 mb-3 offset-md-3">
          <label  className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handleChange("password")}
            value={password}
          />
        </div>

        <button
          onClick={onSubmit}
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "320px" }}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <Base title="Sign Up Page" description="This is a SignUp Page">
      <p class="text-white">{JSON.stringify(values)}</p>
      {successMessage()}
      {errorsMessage()}
      {SignupForm()}
    </Base>
  );
};

export default Signup;
