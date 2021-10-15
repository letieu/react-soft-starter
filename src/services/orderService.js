import axios from "axios";
import cleanObject from "helper/cleanObject";

const orderService = {
  async list(filter = {}) {
    const searchParams = new URLSearchParams(cleanObject(filter));
    return axios.get(`/orders?${searchParams.toString()}`);
  },
  async create(payload) {
    return axios.post("/orders", cleanObject(payload));
  },
  async remove(id) {
    return axios.delete(`/orders/${id}`);
  },
  async view(id) {
    return axios.get(`/orders/${id}`);
  },
  async update(id, payload) {
    return axios.patch(`/orders/${id}`, cleanObject(payload));
  },
};

export default orderService;
