import axios from "axios";
const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";


export const getDashboardStats = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/stats`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};


export const getBookingTrend = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/bookings`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getRevenueTrend = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/revenue`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getBookingStatus = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/booking-status`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getTopMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/dashboard/top-movies`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};