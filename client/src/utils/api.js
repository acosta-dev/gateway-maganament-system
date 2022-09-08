import Axios from "axios";

const API_URL = "http://localhost:5000/";

const GATEWAY_URL = API_URL + "gateways/";
const PERIPHERAL_URL = API_URL + "peripherals/";

// Gateways
export const CreateGateway = async (uid, name, ipv4) => {
  const response = await Axios.post(GATEWAY_URL, { uid, name, ipv4 });
  return response.data;
};
export const AllGateways = async () => {
  const response = await Axios.get(GATEWAY_URL);
  return response.data;
};

export const GatewayByID = async (id) => {
  const response = await Axios.get(GATEWAY_URL + id);
  return response.data;
};
export const DeleteGatewayByID = async (id) => {
  const response = await Axios.delete(GATEWAY_URL + id);
  return response.data;
};

// Peripherals
export const CreatePeripheral = async (uid, vendor, status, gateway) => {
  const response = await Axios.post(PERIPHERAL_URL, {
    uid,
    vendor,
    status,
    gateway,
  });
  return response.data;
};
export const UpdatePeripheral = async (id, uid, vendor, status, gateway) => {
  const response = await Axios.patch(PERIPHERAL_URL + id, {
    uid,
    vendor,
    status,
    gateway,
  });
  return response.data;
};

export const PeripheralByID = async (id) => {
  const response = await Axios.get(PERIPHERAL_URL + id);
  return response.data;
};

export const DeletePeripheralByID = async (id) => {
  const response = await Axios.delete(PERIPHERAL_URL + id);
  return response.data;
};
