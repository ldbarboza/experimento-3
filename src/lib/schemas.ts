import { z } from 'zod';

export const ProductTypeSchema = z.enum(['SAVINGS', 'CHECKING', 'INVESTMENT', 'LOAN', 'CREDIT_CARD']);

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  description: z.string().max(500, 'Descrição não pode exceder 500 caracteres'),
  type: ProductTypeSchema,
  interestRate: z.number().min(0, 'Taxa de juros não pode ser negativa').max(100, 'Taxa de juros não pode exceder 100%'),
  minimumBalance: z.number().min(0, 'Saldo mínimo não pode ser negativo'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome não pode exceder 100 caracteres'),
  description: z.string().max(500, 'Descrição não pode exceder 500 caracteres').default(''),
  type: ProductTypeSchema,
  interestRate: z.number().min(0, 'Taxa de juros não pode ser negativa').max(100, 'Taxa de juros não pode exceder 100%').default(0),
  minimumBalance: z.number().min(0, 'Saldo mínimo não pode ser negativo').default(0),
});

export const UpdateProductSchema = CreateProductSchema.partial();

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
export type Product = z.infer<typeof ProductSchema>;
