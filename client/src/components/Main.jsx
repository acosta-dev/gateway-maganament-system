import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AllGateways, DeleteGatewayByID } from "../utils/api.js";

// Icons
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const Main = () => {
  const [gateways, setGateways] = useState([]);
  const navigate = useNavigate();

  const deleteGateway = async (id) => {
    //Delete gateway by id
    const response = await DeleteGatewayByID(id);

    //Remove the gateway from the state
    setGateways(
      gateways.filter((gateway) => gateway._id !== response.data._id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      //Get all gateways
      setGateways(await AllGateways());
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-center  text-white my-18">
        <div className="text-center py-4 bg-black w-[400px]">
          <div>
            <h1 className=" text-2xl font-semibold text-gray-900 dark:text-white">
              Gateways
            </h1>
          </div>
          <div className=" mb-0 flex font-bold rounded-xl text-xl justify-between">
            <div
              onClick={() => {
                navigate("/new_gateway");
              }}
              className="mb-2 cursor-pointer"
            ></div>
          </div>
          <div className="py-0 justify-center text-left">
            <div className=" ">
              <div className="flex z-0justify-center"></div>

              <ul className="my-1 space-y-3">
                {/* Render all gateways */}
                {gateways.map((gateway) => {
                  return (
                    <li key={gateway.uid}>
                      <div className="flex justify-between p-3 text-base  text-gray-900 bg-gray-50 rounded-lg   group hover:shadow dark:bg-gray-800  dark:text-white">
                        <a href="/">
                          <span className="flex-1 ml-3 whitespace-nowrap ">
                            <b>{gateway.name}</b>
                          </span>
                          <p className="flex-1 ml-3">
                            <b>UID:</b> {gateway.uid}
                          </p>

                          <p className="flex-2 ml-3 justify-end">
                            <b>Ipv4:</b> {gateway.ipv4}
                          </p>
                        </a>
                        {/* Buttons for details and delete gateway */}
                        <div>
                          <AiOutlineEye
                            onClick={() => {
                              navigate(`/gateway/${gateway._id}`);
                            }}
                            size={32}
                            className="cursor-pointer hover:text-blue-700"
                          />
                          <FaTrashAlt
                            onClick={() => {
                              deleteGateway(gateway._id);
                            }}
                            className="text-white mt-4 hover:text-red-700 cursor-pointer "
                            size={32}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
