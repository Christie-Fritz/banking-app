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
import Login from "./components/login";

function Spa() {
  return (
    <HashRouter>
      <UserContext.Provider
        value={{
          loggedInUser: undefined,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/login/" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </HashRouter>
  );
}
export default Spa;
