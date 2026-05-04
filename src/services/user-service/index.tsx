import type { User } from "@/types/user";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";

export const UsersService = {
  getUserById: async (userId: number) => {
    const { data } = await axios.get<User>(
      `${endpoints.BASE_URL}/api/usuarios/${userId}`,
    );
    return { data };
  },
};
