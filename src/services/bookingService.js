import axios from "axios";
const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

export const getBookings = async (page = 1) => {
    const response = await axios.get(
        `${BASE_URL}/bookings?page=${page}&limit=10`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};

export const getBookingById = async (bookingId) => {
    const response = await axios.get(
        `${BASE_URL}/bookings/${bookingId}`,
        {
            withCredentials: true,
        }
    );

    return response.data;
};