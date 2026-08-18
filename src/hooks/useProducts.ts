'use client';

import { useState, useCallback, useEffect } from 'react';
import { Product, CreateProductInput, UpdateProductInput } from '@/lib/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/produtos');
      if (!res.ok) throw new Error('Erro ao carregar produtos');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar produtos'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(
    async (data: CreateProductInput) => {
      setError(null);
      try {
        const res = await fetch('/api/produtos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Erro ao criar produto');
        }
        const product = await res.json();
        setProducts((prev) => [product, ...prev]);
        return product;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao criar produto';
        setError(message);
        throw err;
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductInput) => {
      setError(null);
      try {
        const res = await fetch(`/api/produtos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Erro ao atualizar produto');
        }
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updated : p))
        );
        return updated;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Erro ao atualizar produto';
        setError(message);
        throw err;
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao deletar produto');
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao deletar produto';
      setError(message);
      throw err;
    }
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
