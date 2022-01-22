import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "nav@yahoo.com",
    password: "9571856541",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(error => console.log("sign in failed"));
  };

  const performRedirect = () => {
    
    if (didRedirect) {
      if (user && user.role === 2)
        return <Navigate to = "/admin/dashboard"/>;
      else return <Navigate to = "/user/dashboard"/>;
    }
    if (isAuthenticated())
      return <Navigate to = "/"/>;
  };

  const loadingMessage = () =>
    loading && (
      <div className="col-md-6 mb-3 offset-md-3">
        <div className="alert alert-success fade show" role="alert">
          Loading
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

  const SigninForm = () => {
    return (
      <form>
        <div className="col-md-6 mb-3 offset-md-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="col-md-6 mb-3 offset-md-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>

        <button
          type="submit"
          onClick = {onSubmit}
          className="btn btn-primary text-center"
          style={{ marginLeft: "320px" }}
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <Base title="Sign In Page" description="This is a SignIn Page">
     <p className = "text-white">{JSON.stringify(values)}</p>
     {loadingMessage()}
      {errorsMessage()}
      {SigninForm()}
     
      {performRedirect()}
    </Base>
  );
};

export default Signin;
