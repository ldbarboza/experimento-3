export type ProductType = 'SAVINGS' | 'CHECKING' | 'INVESTMENT' | 'LOAN' | 'CREDIT_CARD';

export interface Product {
  id: string;
  name: string;
  description: string;
  type: ProductType;
  interestRate: number;
  minimumBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;
