import logo from "./logo.svg";
import { Route, HashRouter, Routes } from "react-router-dom";
import "./App.css";
import CreateAccount from "./components/createaccount";
import Withdraw from "./components/withdraw";
import Home from "./components/home";
import Deposit from "./components/deposit";
import AllData from "./components/alldata";
import NavBar from "./components/navbar";
import { UserContext } from "./components/context";
import "bootstrap/dist/css/bootstrap.min.css";

function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "abel",
              email: "abel@mit.edu",
              password: "secret",
              balance: 100,
            },
          ],
          submissions: [
            {
              type: "New User",
              data: {
                name: "abel",
                email: "abel@mit.edu",
                password: "secret",
                balance: 100,
              },
            },
          ],
        }}
      >
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/alldata/" element={<AllData />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}
export default Spa;
