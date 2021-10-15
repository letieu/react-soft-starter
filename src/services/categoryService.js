import axios from "axios";
import { cleanObject } from "helper/cleanObject";

const categoryService = {
  async list(filter = {}) {
    const searchParams = new URLSearchParams(cleanObject(filter));
    return axios.get(`/categories?${searchParams.toString()}`);
  },
  async create(payload) {
    return axios.post("/categories", payload);
  },
  async remove(id) {
    return axios.delete(`/categories/${id}`);
  },
  async view(id) {
    return axios.get(`/categories/${id}`);
  },
  async update(id, payload) {
    return axios.patch(`/categories/${id}`, payload);
  },
};
export default categoryService;
