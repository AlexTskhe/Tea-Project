import { axiosInstance } from '../../shared/lib/axiosInstance';

export class CommentApi {
  static async getAll() {
    const { data } = await axiosInstance.get(`/comments`);
    return data;
  }

  static async create(inputs) {
    const { data } = await axiosInstance.post(`/comments`, inputs);
    return data;
  }

  static async getAllCommentsTea(id) {
    const { data } = await axiosInstance.get(`/comments/${id}`);
    return data;
  }

  static async update(id, inputs) {
    const { data } = await axiosInstance.put(`/comments/${id}`, inputs);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  }
}
