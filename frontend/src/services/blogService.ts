import api from "./api";
import type { Blog, ApiResponse } from "../types";

export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const res = await api.get<ApiResponse<Blog[]>>("/blogs");
    return res.data.data;
  },

  getBySlug: async (slug: string): Promise<Blog> => {
    const res = await api.get<ApiResponse<Blog>>(`/blogs/slug/${slug}`);
    return res.data.data;
  },
};
