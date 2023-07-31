import { useState } from "react";
import Card from "./context";
import { UserContext } from "./context";
import { useContext } from "react";

function Deposit() {
  const [show, setShow] = useState(true);
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const abel = ctx.users.find(x => x.name === 'abel');

  function validate(field, label) {
    if (!field || isNaN(field) || field < 0) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    console.log(deposit);
    if (!validate(deposit, "deposit")) return;
    ctx.users = [{...abel, balance: abel.balance + deposit*1}];
    ctx.submissions.push({type: 'New Deposit', data: {amount: deposit*1}});
    setShow(false);
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
            Balance: ${abel.balance}
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
