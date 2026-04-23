import api from "./api";
import type { WorkHistory, ApiResponse } from "../types";

export const workService = {
  getAll: async (): Promise<WorkHistory[]> => {
    const res = await api.get<ApiResponse<WorkHistory[]>>("/work");
    return res.data.data;
  },
};
