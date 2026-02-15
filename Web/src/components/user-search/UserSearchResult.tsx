import type { UserDto } from '../../types/dtos/userDto';
import { highlightMatch } from '../../utils/highlightMatch';

interface UserSearchResultProps {
  user: UserDto;
  searchText: string;
  onSelect: (id: number) => void;
}

export function UserSearchResult({ user, searchText, onSelect }: UserSearchResultProps) {
  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <li>
      <button
        type="button"
        className="user-search-result-btn"
        onClick={() => onSelect(user.id)}
      >
        {highlightMatch(displayName, searchText)}
      </button>
    </li>
  );
}
