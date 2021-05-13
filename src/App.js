import "./App.css";
import react, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Common Components/Header";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import Payment from "./Pages/Payment";
import Orders from "./Pages/Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51IqGAaSBQm2gWYnjCFgOgqu5J88fgr9rCAvDJ4RBp2eKpHIfUaHTqWuElUpfjolCNgyiRY3Jbu46xRKv265P9Cd600WfICJcXN"
);
function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("the user is ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          {/* Checkout Screen */}
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          {/* Checkout/Payment Screen */}
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          {/* Home Screen */}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
