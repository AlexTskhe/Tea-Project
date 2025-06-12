import { axiosInstance } from "../../shared/lib/axiosInstance";

export class TeaApi {
  static async getAll() {
    
    const { data } = await axiosInstance.get(`/teas`);
    // console.log("Проверка0----------------->")
    return data;
  }

  static async addTea(tea) {
    console.log(tea)
    const { data } = await axiosInstance.post(`/teas`, tea);
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
    // console.log("Проверка0----------------->")
    const { data } = await axiosInstance.delete(`/teas/${id}`);
    
    return data;
  }
}
