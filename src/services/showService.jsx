import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

export const getShows = async ({ page = 1, limit = 10, theaterId = "", movieId = "", status = "", date = "" }) => {
  const params = { page, limit };
  if (theaterId) params.theaterId = theaterId;
  if (movieId) params.movieId = movieId;
  if (status) params.status = status;
  if (date) params.date = date;

  const response = await axios.get(`${BASE_URL}/shows`, {
    params,
    withCredentials: true,
  });

  return response.data;
};

export const getShowById = async (id) => {
  const response = await axios.get(`${BASE_URL}/shows/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const createShow = async (data) => {
  const response = await axios.post(`${BASE_URL}/shows`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const updateShow = async (id, data) => {
  const response = await axios.patch(`${BASE_URL}/shows/${id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

export const cancelShow = async (id) => {
  const response = await axios.patch(
    `${BASE_URL}/shows/${id}/status`,
    { status: "CANCELLED" },
    { withCredentials: true }
  );

  return response.data;
};