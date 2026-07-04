import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

export const getTheaters = async ({ page = 1, limit = 10, city = "" }) => {
  const params = { page, limit };
  if (city) params.city = city;

  const response = await axios.get(`${BASE_URL}/theaters`, {
    params,
    withCredentials: true,
  });

  return response.data;
};

export const getDeletedTheaters = async ({ page = 1, limit = 10, city = "" }) => {
  const params = { page, limit };
  if (city) params.city = city;

  const response = await axios.get(`${BASE_URL}/theaters/deleted`, {
    params,
    withCredentials: true,
  });

  return response.data;
};

export const getTheaterById = async (id) => {
  const response = await axios.get(`${BASE_URL}/theaters/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const reactivateTheater = async (id) => {
  const response = await axios.patch(
    `${BASE_URL}/theaters/${id}`,
    { isActive: true },
    {
      withCredentials: true,
    }
  );

  return response.data;
};