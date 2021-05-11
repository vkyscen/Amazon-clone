import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Common Components/Header";
import Home from "./Pages/Home";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
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
