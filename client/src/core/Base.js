import React from "react";
import Menu from "./Menu";




const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  children,
}) => (
  <div>
    <Menu/>
    <div className="container-fluid">
      <div className="jumbotron  text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
      <footer className="mt-auto py-3">
        <div className="container-fluid text-center" style={{backgroundColor: "#E6425E"}}>
          <h4>If you've got any questions, feel free to reach out!</h4>
          <button className="btn btn-lg" style={{backgroundColor: "#FFFFFF"}}>Contact us</button>
        </div>
        <div className="container text-center">
          <span className="text-muted">An Amazing place to buy jeans</span>
        </div>
      </footer>
    </div>
  </div>
);

export default Base;
