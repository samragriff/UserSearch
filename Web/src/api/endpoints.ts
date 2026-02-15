const usersBase = '/users';

export const endpoints = {
  users: {
    search: (searchText: string) => `${usersBase}/search?searchText=${encodeURIComponent(searchText)}`,
    get: (id: number) => `${usersBase}/${id}`,
    create: usersBase,
  },
};
