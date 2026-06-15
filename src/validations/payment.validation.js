import { z } from 'zod';

export const createPreferenceSchema = z.object({
  title: z.string().min(1),
  quantity: z.number().int().positive().default(1),
  unit_price: z.number().positive(),
  payer_email: z.string().email().optional(),
});
