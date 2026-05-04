import { UsersService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (userId: number) => {
  
  const fetchUserById = async () => {
    const { data } = await UsersService.getUserById(userId);
    return data;
  };

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["transacoes", userId],
    queryFn: fetchUserById,
  });

  return {
    user,
    isUserLoading,
    isUserError,
  };
};
