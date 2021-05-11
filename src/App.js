import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Common Components/Header";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";

function App() {
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
