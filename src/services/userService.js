import axios from "axios";
import cleanObject from "helper/cleanObject";

const userService = {
  async list(filter) {
    const searchParams = new URLSearchParams(cleanObject(filter));
    return axios.get(`/users?${searchParams.toString()}`);
  },
  async create(payload) {
    return axios.post("/auth/register", cleanObject(payload));
  },
  async remove(id) {
    return axios.delete(`/users/${id}`);
  },
  async view(id) {
    return axios.get(`/users/${id}`);
  },
  async update(id, payload) {
    return axios.patch(`/users/${id}`, cleanObject(payload));
  },
};

export default userService;
