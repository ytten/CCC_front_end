import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

const LayoutPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default LayoutPage;