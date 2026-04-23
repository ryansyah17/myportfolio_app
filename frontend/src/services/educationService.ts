import api from "./api";
import type { Education, ApiResponse } from "../types";

export const educationService = {
  getAll: async (): Promise<Education[]> => {
    const res = await api.get<ApiResponse<Education[]>>("/education");
    return res.data.data;
  },
};
