import type { UserDto } from '../../types/dtos/userDto';
import { UserSearchResult } from './UserSearchResult';

interface SearchInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  results: UserDto[] | undefined;
  isLoading: boolean;
  showSuggestions: boolean;
  onSelectUser: (id: number) => void;
}

export function SearchInputArea({
  value,
  onChange,
  results,
  isLoading,
  showSuggestions,
  onSelectUser,
}: SearchInputAreaProps) {

  const hasResults = results && results.length > 0;

  return (
    <section>
      <label htmlFor="search">Search (min 2 chars)</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to search..."
      />
      {showSuggestions && (
        <ul>
          {isLoading && <li>Loading...</li>}
          {!isLoading && !hasResults && <li>No matches</li>}
          {!isLoading &&
            hasResults &&
            results!.map((user) => (
              <UserSearchResult key={user.id} user={user} onSelect={onSelectUser} />
            ))}
        </ul>
      )}
    </section>
  );
}
