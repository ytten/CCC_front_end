import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Profile</Link>
        </li>
        <li>
          <Link to="/Keyword">Keyword Analysis</Link>
        </li>
        <li>
          <Link to="/">Keyword Analysis</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;