import { useState, useEffect } from 'react';
import { useSearchUsers } from '../hooks/useSearchUsers';
import { useGetUser } from '../hooks/useGetUser';
import { SearchInputArea } from './user-search/SearchInputArea';
import { SelectedUserDetail } from './user-search/SelectedUserDetail';
import { CreateUserModal } from './user-search/CreateUserModal';

export function UserSearchPage() {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data: searchResults, isLoading: searchLoading } = useSearchUsers(debouncedSearch);
  const { data: selectedUser, isLoading: userLoading } = useGetUser(selectedUserId);

  const showSuggestions = debouncedSearch.length >= 2;

  return (
    <div>
      <h1>User Search</h1>

      <SearchInputArea
        value={searchInput}
        onChange={setSearchInput}
        results={searchResults}
        isLoading={searchLoading}
        showSuggestions={showSuggestions}
        onSelectUser={setSelectedUserId}
      />

      {selectedUserId != null && (
        <section>
          <h2>Selected User</h2>
          {userLoading && <p>Loading...</p>}
          {!userLoading && selectedUser && (
            <SelectedUserDetail user={selectedUser} />
          )}
        </section>
      )}

      <section>
        <button type="button" onClick={() => setCreateModalOpen(true)}>
          Add User
        </button>
      </section>

      <CreateUserModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
