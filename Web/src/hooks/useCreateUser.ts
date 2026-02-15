import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserRequest } from '../types/requests/createUserRequest';
import { api } from '../api/client';
import { endpoints } from '../api/endpoints';
import { queryKeys } from '../api/queryKeys';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateUserRequest): Promise<{ id: number }> => {
      const { data } = await api.post<{ id: number }>(endpoints.users.create, request);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.userSearch] });
    },
  });
}
