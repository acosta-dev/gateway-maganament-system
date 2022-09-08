import React from "react";
import { useNavigate } from "react-router-dom";

// Icons
import { IoMdAdd } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="text-white flex bg-gray-800">
      <div className="text-2xl font-bold ml-2 mr-10">
        <h1 className=" mb-2 mt-2">Gateway Maganament System</h1>
      </div>
      <div className="flex text-white-600 pt-2 font-bold ml-4 mb-2 mt-2 justify-center rounded-lg cursor-pointer hover:text-blue-400 hover:scale-110">
        <div className="flex">
          <div className="mt-1">
            <AiOutlineHome />
          </div>
          <span
            onClick={() => {
              navigate("/");
            }}
            className="ml-2"
          >
            Home
          </span>
        </div>
      </div>

      <div className="flex pt-2 font-bold ml-6 mb-2 mt-2 justify-center rounded-lg cursor-pointer hover:text-blue-400 hover:scale-110">
        <div className="flex">
          <div className="mt-1">
            <IoMdAdd />
          </div>
          <span
            onClick={() => {
              navigate("/new_gateway");
            }}
            className="ml-2"
          >
            Add Gateway
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
