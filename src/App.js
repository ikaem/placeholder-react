import React from 'react';

import { Switch, Route } from "react-router-dom";

import Layout from "./components/layout.component";
import Home from "./pages/index.page";
import Cart from './pages/cart.page';
import Payment from './pages/payment.page';


function App() {
  return (
  <Layout>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/cart">
        <Cart />
      </Route>

      <Route path="/payment">
        <Payment />
      </Route>

      <Route>
        <h3>No such page, unfortunately...</h3>
      </Route>
    </Switch>

  </Layout>
  );
}

export default App;
