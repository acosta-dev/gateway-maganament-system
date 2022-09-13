import Axios from "axios";
const baseURL = "http://localhost:5000";

export async function getAllPeripherals() {
    try {
      const response = await Axios.get(`${baseURL}/peripherals`);
      return response;
    } catch (error) {
      return error;
    }
  }

export async function createPeripheral(uid, vendor, status, gateway) {
    try {
      const response = await Axios.post(`${baseURL}/peripherals/`, {
        uid,
        vendor,
        status,
        gateway
      });
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }
export async function updatePeripheral(id,uid, vendor, status, gateway) {
    try {
      const response = await Axios.patch(`${baseURL}/peripherals/${id}`, {
        uid,
        vendor,
        status,
        gateway
      });
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }

  export async function deleteGateway(id) {
    try {
      const response = await Axios.delete(`${baseURL}/peripherals/${id}`);
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }