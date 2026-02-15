import type { UserDto } from '../../types/dtos/userDto';

interface SelectedUserDetailProps {
  user: UserDto;
}

export function SelectedUserDetail({ user }: SelectedUserDetailProps) {
  return (
    <dl>
        <dt>First Name</dt>
        <dd>{user.firstName}</dd>
        <dt>Last Name</dt>
        <dd>{user.lastName}</dd>
        <dt>Job Title</dt>
        <dd>{user.jobTitle}</dd>
        <dt>Phone</dt>
        <dd>{user.phone}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
      </dl>
  );
}
