
import { axiosInstance } from '../../shared/lib/axiosInstance'

export class UserApi {

  static async getAll() {
    const { data } = await axiosInstance.get(`/users`)
    return data
  }

  // * Авторизация начинает тут
  static async register(inputs) {
    const { data } = await axiosInstance.post(`/auth/signUp`, 
      inputs // * Чтобы куки принимались клиентом
    )
    return data
  }

  static async login(inputs) {
    const { data } = await axiosInstance.post(`/auth/signIn`,
      inputs
    )
    return data
  }

  static async logout() {
    const { data } = await axiosInstance.get(`/auth/logout`,)
    return data
  }

  static async refresh() {
    const { data } = await axiosInstance.get(`/auth/refreshTokens`,)
    return data
  }

  // * Авторизация заканчивается тут

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/users/${id}`)
    return data
  }

  static async getOne(id) {
    const { data } = await axiosInstance.get(`/users/${id}`)
    return data
  }

  static async update(id, inputs) {
    const { data } = await axiosInstance.put(`/users/${id}`, inputs)
    return data
  }
}
