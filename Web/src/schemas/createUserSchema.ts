import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  jobTitle: z.string(),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .refine(
      (val) => /^07\d{9}$/.test(val.replace(/\D/g, '')),
      'Phone must be a valid UK mobile number (e.g. 07789 543768)'
    ),
  email: z.string().min(1, 'Email is required').email('Email must be valid'),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
