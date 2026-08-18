import { v4 as uuidv4 } from 'uuid';
import { Product, CreateProductInput, UpdateProductInput } from './types';

class ProductRepository {
  private products: Map<string, Product> = new Map();

  getAll(): Product[] {
    return Array.from(this.products.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  getById(id: string): Product | null {
    return this.products.get(id) || null;
  }

  create(data: CreateProductInput): Product {
    const id = uuidv4();
    const now = new Date();
    const product: Product = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.products.set(id, product);
    return product;
  }

  update(id: string, data: UpdateProductInput): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    const updated: Product = {
      ...product,
      ...data,
      updatedAt: new Date(),
    };
    this.products.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.products.delete(id);
  }

  clear(): void {
    this.products.clear();
  }
}

export const db = new ProductRepository();
