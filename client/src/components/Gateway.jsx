import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";

//Utils
import { ToastContainer } from "react-toastify";
import { notify, notifyError } from "../utils/messages";

//Icons
import { FaTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";


const Gateway = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [gatewayName, setGatewayName] = useState("");
  const [peripherals, setPeripherals] = useState([{}]);

  const deleteGateway = async (id) => {
    try {
      //Delete Gateway by ID
      await Axios.delete(`http://localhost:5000/gateways/${id}`);
      //Go home after delete
      navigate("/");
    } catch (error) {
      notifyError(error);
    }
  };

  const deletePeripheral = async (id) => {
    try {
      //Delete peripheral
      await Axios.delete(`http://localhost:5000/peripherals/${id}`);
      setPeripherals(
        peripherals.filter((peripherals) => peripherals._id !== id)
      );
      notify("Peripheral deleted!!!");
    } catch (error) {
      notifyError(error);
    }
  };
  useEffect(() => {
    //Get all peripherals for the gateway
    const fetchData = async () => {
      const { data } = await Axios.get(`http://localhost:5000/gateways/${id}`);
      // Set states
      setGatewayName(data.gateway.name);
      console.log(data);
      setPeripherals(data.peripheral);
    };
    fetchData();
  }, [id]);

  return (
    <div className="text-white flex justify-center">
      <ToastContainer />

      <div className="text-center px-4 py-2 m-2">
        <div className="mb-4">
          <h1 className="text-4xl font-bold">{gatewayName}</h1>
        </div>

        <div className="flex justify-between w-[400px]">
          <div className="flex justify-end">
            <div className="mb-4 ">
              <span
                onClick={() => {
                  deleteGateway(id);
                }}
                className="flex bg-red-600 w-[180px] justify-center rounded font-bold cursor-pointer ml-2"
              >
                <FaTrashAlt className="mr-2 mt-1" /> DELETE GATEWAY
              </span>
            </div>
          </div>

          <div className="flex justify-end">
        <div className="mb-4">
            <button
              onClick={() => {
                navigate(`/new_peripheral/${id}`);
              }}
              className="flex bg-green-700 w-[180px] justify-center rounded font-bold cursor-pointer"
            >
              <IoMdAdd className="mr-2 mt-1" /> ADD PERIPHERAL
            </button>
          </div>
        </div>
        </div>

       

       
         {/* Render all peripherals */}
        {peripherals.map((peripheral, index) => {
          return (
            <div
              key={index}
              className=" pl-2 pt-2 rounded-lg bg-gray-800 w-[400px] mb-4"
            >
              <div className="whitespace-nowrap w-full pl-2 pt-2">
                <ul className="text-left">
                  <li>
                    <p>
                      <b>UID:</b> {peripheral.uid}
                    </p>
                  </li>
                  <li>
                    <p className="">
                      <b>Vendor:</b> {peripheral.vendor}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Status:</b> {peripheral.status ? "ACTIVE" : "INACTIVE"}
                    </p>
                  </li>
                  <li>
                    <p>
                      <b>Created Date:</b> {peripheral.created_date}
                    </p>
                  </li>
                </ul>
                {/* Buttons Edit and Delete */}
                <div className="flex justify-end my-2 pr-4 pb-2 pt-2">
                  <button
                    className="bg-blue-500 font-bold p-2 rounded mr-2 hover:bg-blue-700 cursor-pointer"
                    onClick={() => {
                      navigate(`/edit_peripheral/${peripheral._id}`);
                    }}
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => {
                      deletePeripheral(peripheral._id);
                    }}
                    className="bg-red-500 font-bold p-2 rounded hover:bg-red-700 cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
   
  );
};

export default Gateway;
