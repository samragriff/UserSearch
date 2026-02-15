import { useQuery } from '@tanstack/react-query';
import type { UserDto } from '../types/dtos/userDto';
import { api } from '../api/client';
import { endpoints } from '../api/endpoints';
import { queryKeys } from '../api/queryKeys';

export function useSearchUsers(searchText: string) {
  return useQuery({
    queryKey: [queryKeys.userSearch, searchText],
    queryFn: async (): Promise<UserDto[]> => {
      const { data } = await api.get<UserDto[]>(endpoints.users.search(searchText));
      return data;
    },
    enabled: searchText.trim().length >= 2,
  });
}
