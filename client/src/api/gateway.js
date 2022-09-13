import Axios from "axios";
const baseURL = "http://localhost:5000";

export async function getAllGateways() {
  try {
    const response = await Axios.get(`${baseURL}/gateways`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function getGatewayById(id) {
  try {
    const response = await Axios.get(`${baseURL}/gateways/${id}`);
    return response;
  } catch (error) {
    return error;
  }
}

export async function createGateway(uid, name, ipv4) {
  try {
    const response = await Axios.post(`${baseURL}/gateways/`, {
      uid,
      name,
      ipv4,
    });
    return response;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function deleteGateway(id) {
  try {
    const response = await Axios.delete(`${baseURL}/gateways/${id}`);
    return response;
  } catch (error) {
    return error.response.data.message;
  }
}

export async function updateGateway(id, uid, name , ipv4) {
    try {
      const response = await Axios.patch(`${baseURL}/gateways/${id}`,{uid, name , ipv4});
      return response;
    } catch (error) {
      return error.response.data.message;
    }
  }
