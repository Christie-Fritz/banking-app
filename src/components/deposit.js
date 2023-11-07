import { useEffect, useState } from "react";
import Card from "./context";
import { UserContext } from "./context";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Deposit() {
  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx && !ctx.loggedInUser?.jwt) {
      navigate('/');
    }
  }, [ctx, navigate]);

  function validate(field, label) {
    if (!field || isNaN(field) || field < 0) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleDeposit() {
    if (!validate(deposit, "deposit")) return;

    try {
      const request = await axios.put(`http://localhost:1337/api/users/${ctx.loggedInUser.user.id}`, {
        balance: ctx.loggedInUser.user.balance*1 + deposit*1
      }, {
        headers: {
          Authorization: `Bearer ${ctx.loggedInUser.jwt}`
        }
      });

      ctx.loggedInUser.user.balance = request.data.balance;
      
      setShow(false);
    } catch (e) {
      setStatus(e.message);
      setTimeout(() => setStatus(''), 3000);
    }

  }

  function clearForm() {
    setDeposit("");
    setShow(true);
  }

  function isDisabled() {
    if (!deposit) return true;
    return false;
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Deposit"
      status={status}
      body={
        show ? (
          <>
            Balance: ${ctx?.loggedInUser?.user?.balance}
            <br />
            Deposit
            <br />
            <input
              type="input"
              className="form-control"
              id="deposit"
              placeholder="Enter deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleDeposit}
              disabled={isDisabled()}
            >
              Create Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another deposit
            </button>
          </>
        )
      }
    />
  );
}

export default Deposit;
