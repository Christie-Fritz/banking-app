import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from './context';
import Card from './context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!ctx?.loggedInUser?.jwt) {
      navigate('/');
    }
  }, [ctx, navigate]);

  function validate(field, label) {
    if (!field || isNaN(field) || ctx.loggedInUser.user.balance < field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handlewithdraw() {
    if (!validate(withdraw, "withdraw")) return;

    try {
      const request = await axios.put(`http://localhost:1337/api/users/${ctx.loggedInUser.user.id}`, {
        balance: ctx.loggedInUser.user.balance*1 - withdraw*1
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
    setWithdraw("");
    setShow(true);
  }

  function isDisabled() {
    if (!withdraw) return true;
    return false;
  }

  return (
    <Card
      bgcolor="primary"
      header="Create withdraw"
      status={status}
      body={
        show ? (
          <>
            Balance: ${ctx?.loggedInUser?.user?.balance}
            <br />
            Withdraw
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Enter withdraw"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handlewithdraw}
              disabled={isDisabled()}
            >
              Create withdraw
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another withdraw
            </button>
          </>
        )
      }
    />
  );
}

export default Withdraw;
