import { useQuery } from '@tanstack/react-query';
import type { UserDto } from '../types/dtos/userDto';
import { api } from '../api/client';
import { endpoints } from '../api/endpoints';
import { queryKeys } from '../api/queryKeys';

export function useGetUser(userId: number | null) {
  return useQuery({
    queryKey: [queryKeys.user, userId],
    queryFn: async (): Promise<UserDto> => {
      const { data } = await api.get<UserDto>(endpoints.users.get(userId!));
      return data;
    },
    enabled: userId != null,
  });
}
