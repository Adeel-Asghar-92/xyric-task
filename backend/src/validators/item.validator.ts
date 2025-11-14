import { z } from 'zod';

export const createItemSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters')
    .trim(),
  description: z.string()
    .max(5000, 'Description must be less than 5000 characters')
    .optional()
    .default('')
    .transform(val => val || null),
  category: z.string()
    .max(100, 'Category must be less than 100 characters')
    .optional()
    .default('General'),
  price: z.number()
    .min(0, 'Price must be non-negative')
    .max(99999999.99, 'Price is too large')
    .optional()
    .default(0),
  quantity: z.number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity must be non-negative')
    .optional()
    .default(0),
  tags: z.array(z.string())
    .optional()
    .default([]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DISCONTINUED'])
    .optional()
    .default('ACTIVE'),
});

export const updateItemSchema = z.object({
  title: z.string()
    .min(1, 'Title must not be empty')
    .max(255, 'Title must be less than 255 characters')
    .trim()
    .optional(),
  description: z.string()
    .max(5000, 'Description must be less than 5000 characters')
    .optional()
    .nullable(),
  category: z.string()
    .max(100, 'Category must be less than 100 characters')
    .optional(),
  price: z.number()
    .min(0, 'Price must be non-negative')
    .max(99999999.99, 'Price is too large')
    .optional(),
  quantity: z.number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity must be non-negative')
    .optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DISCONTINUED']).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update',
});

export const paginationSchema = z.object({
  page: z.number()
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1),
  limit: z.number()
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .optional()
    .default(10),
  search: z.string()
    .max(255, 'Search term too long')
    .optional(),
  category: z.string()
    .max(100, 'Category filter too long')
    .optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DISCONTINUED']).optional(),
});

export const itemIdSchema = z.object({
  id: z.string().uuid('Invalid item ID format'),
});

export const searchSchema = z.object({
  q: z.string().min(1, 'Search query is required'),
  limit: z.number().int().min(1).max(50).optional().default(10),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type ItemIdParams = z.infer<typeof itemIdSchema>;
export type SearchInput = z.infer<typeof searchSchema>;