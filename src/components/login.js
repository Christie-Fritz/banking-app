import { useState, useContext } from "react";
import Card, { UserContext } from "./context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleLogin() {
    if (!validate(email, "email")) {
        return;
    }
    if (!validate(password, "password")) {
        return;
    }

    try {
      const request = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password: password,
      });
    
      const userToLogin = request.data;
      console.log(userToLogin);

      if (!validate(userToLogin, "incorrect email and password")) {
          return;
      }

      userContext.loggedInUser = userToLogin;

      setShow(false);

      navigate('/');
    } catch (e) {
      setStatus(e.message);
      setTimeout(() => setStatus(''), 3000);
    }
  }
 
  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
  }

  function isDisabled() {
    if (!email && !password) return true;
    return false;
  }

  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleLogin}
              disabled={isDisabled()}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            {/* TODO style things later or something */}
          </>
        )
      }
    />
  );
}

export default Login;
