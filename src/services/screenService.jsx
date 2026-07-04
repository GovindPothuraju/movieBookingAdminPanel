import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";


export const getScreens = async ({ theaterId, page = 1, limit = 10, screenType = "" }) => {
  const response = await axios.get(`${BASE_URL}/theaters/${theaterId}/screens`, {
    params: { page, limit, screenType: screenType || undefined },
    withCredentials: true,
  });

  return response.data;
};

/**
 * GET /screens/deleted?theaterId=...&page=&limit=
 */
export const getDeletedScreens = async ({ theaterId, page = 1, limit = 10 }) => {
  const response = await axios.get(`${BASE_URL}/screens/deleted`, {
    params: { theaterId, page, limit },
    withCredentials: true,
  });

  return response.data;
};

/**
 * GET /theaters/:theaterId
 * Used for the ManageScreens page header (theater name + city).
 */
export const getTheaterById = async (theaterId) => {
  const response = await axios.get(`${BASE_URL}/theaters/${theaterId}`, {
    withCredentials: true,
  });

  return response.data;
};

/**
 * GET /screens/:id
 */
export const getScreenById = async (screenId) => {
  const response = await axios.get(`${BASE_URL}/screens/${screenId}`, {
    withCredentials: true,
  });

  return response.data;
};

/**
 * POST /theaters/:theaterId/screens
 */
export const createScreen = async (theaterId, payload) => {
  const response = await axios.post(`${BASE_URL}/theaters/${theaterId}/screens`, payload, {
    withCredentials: true,
  });

  return response.data;
};

/**
 * PATCH /screens/:screenId
 */
export const updateScreen = async (screenId, payload) => {
  const response = await axios.patch(`${BASE_URL}/screens/${screenId}`, payload, {
    withCredentials: true,
  });

  return response.data;
};

/**
 * DELETE /screens/:screenId
 */
export const deleteScreen = async (screenId) => {
  const response = await axios.delete(`${BASE_URL}/screens/${screenId}`, {
    withCredentials: true,
  });

  return response.data;
};

/**
 * PATCH /screens/:screenId { isActive: true }
 */
export const reactivateScreen = async (screenId) => {
  const response = await axios.patch(
    `${BASE_URL}/screens/${screenId}`,
    { isActive: true },
    { withCredentials: true }
  );

  return response.data;
};

/**
 * GET /screens?search=&page=&limit=
 * All active screens across every theater (global overview page).
 */
export const getAllScreens = async ({ page = 1, limit = 10, search = "" }) => {
  const response = await axios.get(`${BASE_URL}/screens`, {
    params: { page, limit, search: search || undefined },
    withCredentials: true,
  });

  return response.data;
};