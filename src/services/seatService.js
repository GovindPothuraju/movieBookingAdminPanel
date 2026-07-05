import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

export const createSeatLayout = async (screenId, { rows, columns, layout }) => {
  const response = await axios.post(
    `${BASE_URL}/screens/${screenId}/layout`,
    { rows, columns, layout },
    { withCredentials: true }
  );

  return response.data;
};

export const getSeatLayout = async (screenId) => {
  const response = await axios.get(`${BASE_URL}/screens/${screenId}/seats`, {
    withCredentials: true,
  });

  return response.data;
};

export const updateSeatLayout = async (screenId, { rows, columns, layout }) => {
  const response = await axios.put(
    `${BASE_URL}/screens/${screenId}/layout`,
    { rows, columns, layout },
    { withCredentials: true }
  );

  return response.data;
};

export const deleteSeatLayout = async (screenId) => {
  const response = await axios.delete(`${BASE_URL}/screens/${screenId}/layout`, {
    withCredentials: true,
  });

  return response.data;
};

export const getScreenById = async (screenId) => {
  const response = await axios.get(`${BASE_URL}/screens/${screenId}`, {
    withCredentials: true,
  });

  return response.data;
};