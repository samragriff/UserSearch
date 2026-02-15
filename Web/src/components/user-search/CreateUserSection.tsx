import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '../../hooks/useCreateUser';
import { Form } from '../hook-form/form-provider';
import { createUserSchema } from '../../schemas/createUserSchema';
import { setApiResponseErrors } from '../../utils/setApiResponseErrors';

interface CreateUserSectionProps {
  expanded: boolean;
  onToggle: () => void;
}

export function CreateUserSection({ expanded, onToggle }: CreateUserSectionProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();

  useEffect(() => {
    if (!expanded) return;

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideForm = wrapperRef.current?.contains(target);
      const isNewUserButton = (e.target as HTMLElement).closest('[data-create-trigger]');

      if (!isInsideForm && !isNewUserButton) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [expanded, onToggle]);

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
        toast.success('New user added!');
        onToggle();
        reset();
      },
      onError: (error: unknown) => {
        const axiosError = error as {
          response?: {
            data?: { validationErrors?: { identifier?: string; errorMessage: string }[] };
          };
        };
        const validationErrors = axiosError.response?.data?.validationErrors;
        if (validationErrors?.length) {
          setApiResponseErrors(setError, validationErrors);
        } else {
          setError('root', { message: 'Failed to create user. Please try again.' });
        }
      },
    });
  });

  if (!expanded) return null;

  return (
    <section ref={wrapperRef} className="user-search-create-wrapper">
      <Form onSubmit={onSubmit} methods={methods}>
        <div className="user-search-create-form-area">
          <button
            type="button"
            className="user-search-create-close"
            onClick={onToggle}
          >
            ×
          </button>
          <div className="user-search-create-form-grid">
            <div className="user-search-create-form-row-1">
              <div className="user-search-create-field">
                <input
                  id="firstName"
                  placeholder="First name"
                  className="user-search-create-input"
                  {...methods.register('firstName')}
                />
                {methods.formState.errors.firstName && (
                  <span className="error-message">{methods.formState.errors.firstName.message}</span>
                )}
              </div>
              <div className="user-search-create-field">
                <input
                  id="lastName"
                  placeholder="Last name"
                  className="user-search-create-input"
                  {...methods.register('lastName')}
                />
                {methods.formState.errors.lastName && (
                  <span className="error-message">{methods.formState.errors.lastName.message}</span>
                )}
              </div>
            </div>
            <div className="user-search-create-form-row-2">
              <div className="user-search-create-field">
                <input
                  id="jobTitle"
                  placeholder="Job title"
                  className="user-search-create-input"
                  {...methods.register('jobTitle')}
                />
              </div>
              <div className="user-search-create-field">
                <input
                  id="phone"
                  placeholder="e.g. 07789 543768"
                  className="user-search-create-input"
                  {...methods.register('phone')}
                />
                {methods.formState.errors.phone && (
                  <span className="error-message">{methods.formState.errors.phone.message}</span>
                )}
              </div>
              <div className="user-search-create-field">
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="user-search-create-input"
                  {...methods.register('email')}
                />
                {methods.formState.errors.email && (
                  <span className="error-message">{methods.formState.errors.email.message}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {methods.formState.errors.root && (
          <p className="error-message user-search-create-error">{methods.formState.errors.root.message}</p>
        )}
        <div className="user-search-create-actions">
          <button type="submit" className="user-search-create-btn" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </Form>
    </section>
  );
}
