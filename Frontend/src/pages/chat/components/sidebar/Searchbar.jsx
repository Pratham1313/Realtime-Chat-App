import React from "react";
import { FaSearch } from "react-icons/fa";

function Searchbar({ search, setsearch }) {
  return (
    <div>
      <div className="px-2 py-3 flex items-center justify-center gap-4 mob:gap-2 mb-3 ">
        <input
          className=" outline-none rounded-md w-[80%] h-[42.5px] px-2 border-2 border-[#4a4a4a]  bg-gray-700 text-white"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <button className=" btn btn-circle outline-none border-2 border-[#4a4a4a] ">
          <FaSearch className="w-5 h-5 rounded-md outline-none" />
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
