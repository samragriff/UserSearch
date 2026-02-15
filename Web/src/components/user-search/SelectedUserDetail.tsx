import type { UserDto } from '../../types/dtos/userDto';

interface SelectedUserDetailProps {
  user: UserDto;
}

export function SelectedUserDetail({ user }: SelectedUserDetailProps) {
  return (
    <div className="user-card">
      <p className="user-card-name">
        {user.firstName} {user.lastName}
      </p>
      <p className="user-card-detail">{user.jobTitle}</p>
      <p className="user-card-detail">{user.phone}</p>
      <p className="user-card-detail">{user.email}</p>
    </div>
  );
}
