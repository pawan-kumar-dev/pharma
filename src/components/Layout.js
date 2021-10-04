import React from "react";
import { Link, useHistory } from "react-router-dom";
import { setLogout } from "../utils/setInitialData";
import SideNav from "./SideNav";

const Layout = ({ children: Child }) => {
  const history = useHistory();
  const onLogoutClick = () => {
    setLogout();
    history.push("/login");
  };
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <SideNav />
      <div className="flex flex-col flex-1">
        <header className="z-10 flex justify-between py-4 px-4 bg-white shadow-md dark:bg-gray-800">
          <Link to="/">Pharmacy App</Link>
          <button
            className="rounded-md focus:outline-none focus:shadow-outline-purple"
            aria-label="Toggle color mode"
            onClick={() => onLogoutClick()}
          >
            Logout
          </button>
        </header>
        <main className="h-full py-4 overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <Child />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
