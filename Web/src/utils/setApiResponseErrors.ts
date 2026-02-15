import type { FieldValues, UseFormSetError } from 'react-hook-form';

export interface ValidationError {
  identifier?: string;
  errorMessage: string;
}

const toCamelCase = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1);

export function setApiResponseErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errorsList: ValidationError[] | undefined
) {
  if (errorsList?.length) {
    errorsList.forEach((err) => {
      const field = err.identifier ? toCamelCase(err.identifier) : 'root';
      setError(field as any, { message: err.errorMessage });
    });
  } else {
    setError('root' as any, { message: 'Something went wrong, please try again.' });
  }
}
