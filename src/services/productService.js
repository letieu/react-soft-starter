import axios from "axios";
import cleanObject from "helper/cleanObject";

const productService = {
  async list(filter = {}) {
    const searchParams = new URLSearchParams(cleanObject(filter));
    return axios.get(`/products?${searchParams.toString()}`);
  },
  async create(payload) {
    return axios.post("/products", payload);
  },
  async remove(id) {
    return axios.delete(`/products/${id}`);
  },
  async view(id) {
    return axios.get(`/products/${id}`);
  },
  async update(id, payload) {
    return axios.patch(`/products/${id}`, payload);
  },
};

export default productService;
