import { useState, useEffect } from 'react';
import { useSearchUsers } from '../hooks/useSearchUsers';
import { useGetUser } from '../hooks/useGetUser';
import { SearchInputArea } from './user-search/SearchInputArea';
import { SelectedUserDetail } from './user-search/SelectedUserDetail';
import { CreateUserSection } from './user-search/CreateUserSection';
import '../styles/user-search.css';

export function UserSearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [committedSearch, setCommittedSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [createSectionExpanded, setCreateSectionExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: searchResults, isLoading: searchLoading } = useSearchUsers(debouncedSearch);
  const { data: selectedUser, isLoading: userLoading } = useGetUser(selectedUserId);

  const handleGo = () => {
    const q = searchInput.trim();
    if (q.length >= 2) {
      setDebouncedSearch(q);
      setCommittedSearch(q);
    }
  };

  const showSuggestions = debouncedSearch.length >= 2 && !committedSearch;

  const showCardsFromSearch = committedSearch && !selectedUserId;
  const showCardsFromSelection = selectedUserId != null;

  return (
    <div className="user-search-page">
      <main className="user-search-main">
        <SearchInputArea
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v);
            setCommittedSearch('');
            setSelectedUserId(null);
          }}
          results={searchResults}
          isLoading={searchLoading}
          showSuggestions={showSuggestions}
          onSelectUser={(id) => {
            setSelectedUserId(id);
            setSearchInput('');
            setCommittedSearch('');
          }}
          onGoClick={handleGo}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleGo();
            }
          }}
        />

        {showCardsFromSelection && (
          <section className="user-cards-section">
            {userLoading && <p className="user-search-loading">Loading...</p>}
            {!userLoading && selectedUser && (
              <div className="user-cards-grid">
                <SelectedUserDetail user={selectedUser} />
              </div>
            )}
          </section>
        )}

        {showCardsFromSearch && (
          <section className="user-cards-section">
            {searchLoading && <p className="user-search-loading">Loading...</p>}
            {!searchLoading && searchResults && searchResults.length === 0 && (
              <p className="user-search-no-results">No matches</p>
            )}
            {!searchLoading && searchResults && searchResults.length > 0 && (
              <div className="user-cards-grid">
                {searchResults.map((user) => (
                  <SelectedUserDetail key={user.id} user={user} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <CreateUserSection
        expanded={createSectionExpanded}
        onToggle={() => setCreateSectionExpanded((v) => !v)}
      />

      <button
        type="button"
        className="user-search-new-btn"
        data-create-trigger
        onClick={() => setCreateSectionExpanded((v) => !v)}
      >
        New User +
      </button>
    </div>
  );
}
