import axios from "axios";

const BASE_URL = "https://moviebookingbackend-icoh.onrender.com";

export const getMovies = async ({
  page = 1,
  limit = 5,
  search = "",
  status = "",
  language = "",
  genre = "",
} = {}) => {

  const response = await axios.get(`${BASE_URL}/movies`, {
    withCredentials: true,
    params: {
      page,
      limit,
      search,
      status,
      language,
      genre,
    },
  });

  return response.data;
};