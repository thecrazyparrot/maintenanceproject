import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}