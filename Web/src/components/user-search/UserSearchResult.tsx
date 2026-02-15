import type { UserDto } from '../../types/dtos/userDto';

interface UserSearchResultProps {
  user: UserDto;
  onSelect: (id: number) => void;
}

export function UserSearchResult({ user, onSelect }: UserSearchResultProps) {
  return (
    <li>
      <button type="button" onClick={() => onSelect(user.id)}>
        {user.firstName} {user.lastName}
      </button>
    </li>
  );
}
