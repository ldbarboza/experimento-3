'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProductForm } from '@/components/ProductForm';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';

export default function NovoProdutoPage() {
  const router = useRouter();
  const { createProduct } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await createProduct(data);
      setTimeout(() => {
        router.push('/produtos');
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao criar produto'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/produtos">
          <Button variant="secondary">← Voltar</Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Criar Novo Produto
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
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Guia de Preenchimento
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <strong>Nome:</strong> Identificação única do produto
              </li>
              <li>
                <strong>Descrição:</strong> Breve explicação sobre o produto
              </li>
              <li>
                <strong>Tipo:</strong> Categoria do produto bancário
              </li>
              <li>
                <strong>Taxa de Juros:</strong> Percentual de retorno (0-100%)
              </li>
              <li>
                <strong>Saldo Mínimo:</strong> Valor mínimo para abrir a conta
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-600">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tipos de Produtos
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Conta Poupança</li>
              <li>• Conta Corrente</li>
              <li>• Investimento</li>
              <li>• Empréstimo</li>
              <li>• Cartão de Crédito</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
