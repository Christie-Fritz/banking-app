import React, {useState, useContext} from 'react';
import { UserContext } from './context';
import Card from './context';

function Withdraw() {
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const ctx = useContext(UserContext);
  const abel = ctx.users.find(x => x.name === 'abel');

  function validate(field, label) {
    if (!field || isNaN(field) || abel.balance < field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handlewithdraw() {
    console.log(withdraw);
    if (!validate(withdraw, "withdraw")) return;
    ctx.users = [{...abel, balance: abel.balance - withdraw*1}];
    ctx.submissions.push({type: 'New Withdraw', data: {amount: withdraw*1}});
    setShow(false);
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
            Balance: ${abel.balance}
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
