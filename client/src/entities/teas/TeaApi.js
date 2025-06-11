import { axiosInstance } from "../../shared/lib/axiosInstance";

export class TeaApi {
  static async getAll() {
    const { data } = await axiosInstance.get(`/teas`);
    return data;
  }

  static async addTea() {
    const { data } = await axiosInstance.post(`/teas`);
    return data;
  }

  static async getOne(id) {
    const { data } = await axiosInstance.get(`/teas/${id}`);
    return data;
  }

  static async update(id, inputs) {
    const { data } = await axiosInstance.put(`/teas/${id}`, inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/teas/${id}`);
    return data;
  }
}
