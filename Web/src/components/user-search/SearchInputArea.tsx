import type { UserDto } from '../../types/dtos/userDto';
import { UserSearchResult } from './UserSearchResult';

interface SearchInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  results: UserDto[] | undefined;
  isLoading: boolean;
  showSuggestions: boolean;
  onSelectUser: (id: number) => void;
  onGoClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function SearchInputArea({
  value,
  onChange,
  results,
  isLoading,
  showSuggestions,
  onSelectUser,
  onGoClick,
  onKeyDown,
}: SearchInputAreaProps) {
  const hasResults = results && results.length > 0;

  return (
    <section className="user-search-input-section">
      <div className="user-search-bar">
        <input
          id="search"
          type="text"
          className="user-search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search for a user..."
        />
        <button type="button" className="user-search-go-btn" onClick={onGoClick}>
          Go!
        </button>
      </div>
      {showSuggestions && !isLoading && hasResults && (
        <ul className="user-search-results">
          {isLoading && <li className="user-search-loading">Loading...</li>}
          {!isLoading &&
            hasResults &&
            results!.map((user) => (
              <UserSearchResult
                key={user.id}
                user={user}
                searchText={value.trim()}
                onSelect={onSelectUser}
              />
            ))}
        </ul>
      )}
    </section>
  );
}
