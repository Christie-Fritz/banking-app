import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context";
import Logout from "./logout";

function NavBar() {
  const location = useLocation();
  const userContext = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          BadBank
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex flex-row justify-content-between" id="navbarNav">
          <div className="navbar-nav d-flex flex-row justify-content-between">
            {
              !userContext.loggedInUser && <div className="nav-item">
                <Link className={`nav-link ${location.pathname === "/CreateAccount/" ? "active" : ""}`}
                      to="/CreateAccount/"
                >
                  Create Account
                </Link>
              </div>
            }
            {
              userContext.loggedInUser && <>
                <div className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/deposit/" ? "active" : ""}`}
                        to="/deposit/"
                  >
                    Deposit
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/withdraw" ? "active" : ""}`}
                        to="/withdraw/"
                  >
                    Withdraw
                  </Link>
                </div>
              </>
            }
          </div>
          <div className="nav-item d-flex flex-row align-items-center">
            {
              !userContext?.loggedInUser && <div> 
                <Link className={`nav-link ${location.pathname === "/login/" ? "active" : ""}`}
                      to="/login/"
                >
                  Login
                </Link>
              </div>
            }
            {
              // userContext is global, every component using useContext with UserContext has access to the same
              // UserContext at the same time
              userContext?.loggedInUser && <div className="p-2">{userContext.loggedInUser.user.username}</div>
            }
            {
              userContext?.loggedInUser && <Logout />
            }
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
