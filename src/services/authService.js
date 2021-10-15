import axios from "axios";

const register = (username, email, password) =>
  axios.post("auth/register", {
    username,
    email,
    password,
  });

const login = async (username, password) => {
  const response = await axios.post("auth/login", {
    username,
    password,
  });

  return response;
};

const me = async () => axios.post("auth/me");

const updateProfile = async (payload) => {
  const profile = { ...payload };
  if (payload?.new_password) profile.password = payload.new_password;
  return axios.post("/auth/profile", profile);
};

const forgot = async (email) => axios.post("/auth/reset_request", { email });

export default {
  forgot,
  register,
  login,
  me,
  updateProfile,
};
