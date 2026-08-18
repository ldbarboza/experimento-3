'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ProductForm } from '@/components/ProductForm';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/lib/types';

export default function EditProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const { updateProduct } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/produtos/${productId}`);
        if (!res.ok) throw new Error('Produto não encontrado');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Erro ao carregar produto');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (data: any) => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateProduct(productId, data);
      setTimeout(() => {
        router.push('/produtos');
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao atualizar produto'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="space-y-6">
        <Link href="/produtos">
          <Button variant="secondary">← Voltar</Button>
        </Link>
        <Alert
          type="error"
          message="Produto não encontrado"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/produtos">
          <Button variant="secondary">← Voltar</Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Editar Produto
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          {error && (
            <div className="mb-6">
              <Alert
                type="error"
                message={error}
                onClose={() => setError(null)}
              />
            </div>
          )}
          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Produto
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>ID:</strong>
                <p className="font-mono text-xs text-gray-600 break-all">{product.id}</p>
              </div>
              <div>
                <strong>Criado em:</strong>
                <p>{new Date(product.createdAt).toLocaleString('pt-BR')}</p>
              </div>
              <div>
                <strong>Última atualização:</strong>
                <p>{new Date(product.updatedAt).toLocaleString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              ⚠️ Atenção
            </h3>
            <p className="text-sm text-gray-700">
              As alterações serão salvas imediatamente após você clicar em "Atualizar Produto".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
