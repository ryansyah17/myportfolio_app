import api from "./api";
import type { ApiResponse } from "../types";

interface SendContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  send: async (data: SendContactData): Promise<void> => {
    await api.post<ApiResponse<null>>("/contacts", data);
  },
};
