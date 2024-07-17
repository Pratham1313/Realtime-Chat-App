import React, { useState } from "react";
import Conversations from "./Conversations";
import Searchbar from "./Searchbar";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LoaderIcon } from "react-hot-toast";
import LogoutButton from "./logout";

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [search, setsearch] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Open Sidebar Button - Visible only on mobile view */}
      <GoSidebarCollapse
        className={`w-10 h-10 fixed top-[calc(5vh-20px)] left-6 z-20 ${
          isSidebarOpen ? "mob:hidden" : ""
        } mob:block hidden`}
        style={{ color: "white", background: "none" }}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`w-[25%] select-none rounded-r-2xl h-screen border-2 border-[#4a4a4a] bg-[#202123] mob:w-[70vw] mob:fixed mob:top-0 mob:left-0 mob:z-10 py-4  transition-transform duration-300 ${
          isSidebarOpen ? "mob:translate-x-0" : "mob:-translate-x-full"
        }`}
      >
        {/* Close Button - Visible only on mobile view */}
        <GoSidebarExpand
          className="w-9 h-9 bg-none mob:block hidden cursor-pointer bg-slate-600 ml-3 black"
          style={{ color: "white", background: "none" }}
          onClick={toggleSidebar}
        />
        <Searchbar search={search} setsearch={setsearch} />
        <div className="x-full h-[75%] mob:h-[70%] ">
          <Conversations search={search} />
        </div>
        <LogoutButton />
      </div>
    </>
  );
}

export default Sidebar;
