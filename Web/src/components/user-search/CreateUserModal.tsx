import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '../../hooks/useCreateUser';
import { Form } from '../hook-form/form-provider';
import { Modal } from '../Modal';
import { createUserSchema } from '../../schemas/createUserSchema';
import { setApiResponseErrors } from '../../utils/setApiResponseErrors';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();

  const methods = useForm<z.infer<typeof createUserSchema>>({
    mode: 'onTouched',
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      phone: '',
      email: '',
    },
  });

  const { reset, handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await createUser(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
      onError: (error: unknown) => {
        const axiosError = error as { response?: { data?: { validationErrors?: { identifier?: string; errorMessage: string }[] } } };
        const validationErrors = axiosError.response?.data?.validationErrors;
        if (validationErrors?.length) {
          setApiResponseErrors(setError, validationErrors);
        } else {
          setError('root', { message: 'Failed to create user. Please try again.' });
        }
      },
    });
  });

  return (
    <Modal open={open} onClose={onClose} title="Add User">
      <Form onSubmit={onSubmit} methods={methods}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" {...methods.register('firstName')} />
          {methods.formState.errors.firstName && (
            <span>{methods.formState.errors.firstName.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" {...methods.register('lastName')} />
          {methods.formState.errors.lastName && (
            <span>{methods.formState.errors.lastName.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input id="jobTitle" {...methods.register('jobTitle')} />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" {...methods.register('phone')} />
          {methods.formState.errors.phone && (
            <span>{methods.formState.errors.phone.message}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...methods.register('email')} />
          {methods.formState.errors.email && (
            <span>{methods.formState.errors.email.message}</span>
          )}
        </div>
        {methods.formState.errors.root && (
          <p>{methods.formState.errors.root.message}</p>
        )}
        <footer>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Adding...' : 'Add User'}
          </button>
        </footer>
      </Form>
    </Modal>
  );
}
