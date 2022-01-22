import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";

const currentTab = (path) => {
  if (window.location.pathname === path) return { color: "#FD297A" };
  else return { color: "#0D0D0D" };
};
const Menu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                style={currentTab("/")}
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab("/cart")}
                className="nav-link active"
                aria-current="page"
                to="/cart"
              >
                Cart
              </Link>
            </li>
            {isAuthenticated() && (
              <li className="nav-item">
                <Link
                  style={currentTab("/user/dashboard")}
                  className="nav-link active"
                  aria-current="page"
                  to="/user/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 2 && (
              <li className="nav-item">
                <Link
                  style={currentTab("/admin/dashboard")}
                  className="nav-link active"
                  aria-current="page"
                  to="/admin/dashboard"
                >
                  A. Dashboard
                </Link>
              </li>
            )}
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    style={currentTab("/signup")}
                    className="nav-link active"
                    aria-current="page"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    style={currentTab("/signin")}
                    className="nav-link active"
                    aria-current="page"
                    to="/signin"
                  >
                    SignIn
                  </Link>
                </li>
              </Fragment>
            )}
            <li className="nav-item">
              {isAuthenticated() && (
                <span
                  className="nav-link"
                  text-danger
                  onClick={() => {
                    signout(() => {
                      return navigate("/");
                    });
                  }}
                >
                  Signout
                </span>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();

    return <Component history={history} {...props} />;
  };

  return Wrapper;
};
export default withRouter(Menu);
