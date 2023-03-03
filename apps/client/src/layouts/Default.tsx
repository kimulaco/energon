import React from "react";
import { Outlet, Link } from "react-router-dom";
import AppHeader from "../components/AppHeader/";

const LayoutDefault = () => {
  return (
    <div className="LayoutDefault">
      <AppHeader />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDefault;
