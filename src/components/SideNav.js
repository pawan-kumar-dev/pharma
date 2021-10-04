import React from "react";
import { NavLink } from "react-router-dom";
import { MANAGER } from "../utils/roles";
import { getLocalStorageData } from "../utils/setInitialData";

const SideNav = () => {
  const loggedInRole = getLocalStorageData("loggedInRole");
  return (
    <aside className="z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-500 dark:text-gray-400">
        <ul className="mt-6">
          {loggedInRole === MANAGER && (
            <>
              <li className="relative px-6 py-3">
                <NavLink
                  activeClassName=" w-full text-sm font-medium leading-5 text-white transition-colors bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  className="inline-flex  px-4 py-2  items-center w-full text-sm font-semibold transition-colors"
                  to="/medicines"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-4">Medicines</span>
                </NavLink>
              </li>
              <li className="relative px-6 py-3">
                <NavLink
                  activeClassName=" w-full text-sm font-medium leading-5 text-white transition-colors bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                  className="inline-flex  px-4 py-2 items-center w-full text-sm font-semibold transition-colors"
                  to="/teams"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  <span className="ml-4">Team</span>
                </NavLink>
              </li>
            </>
          )}
          <li className="relative px-6 py-3">
            <NavLink
              activeClassName=" w-full text-sm font-medium leading-5 text-white transition-colors bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              className="inline-flex  px-4 py-2  items-center w-full text-sm font-semibold transition-colors"
              to="/orders"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              <span className="ml-4">Orders</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
