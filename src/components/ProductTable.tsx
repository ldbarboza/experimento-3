'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Button } from './ui/Button';

interface ProductTableProps {
  products: Product[];
  onDeleteClick: (id: string) => void;
  isLoading?: boolean;
}

const productTypeLabels: Record<string, string> = {
  SAVINGS: 'Conta Poupança',
  CHECKING: 'Conta Corrente',
  INVESTMENT: 'Investimento',
  LOAN: 'Empréstimo',
  CREDIT_CARD: 'Cartão de Crédito',
};

export function ProductTable({
  products,
  onDeleteClick,
  isLoading = false,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">
          Nenhum produto cadastrado
        </p>
        <Link href="/produtos/novo">
          <Button>Cadastrar Primeiro Produto</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-300">
            <th className="text-left px-4 py-3 font-semibold">Nome</th>
            <th className="text-left px-4 py-3 font-semibold">Tipo</th>
            <th className="text-right px-4 py-3 font-semibold">Taxa (%)</th>
            <th className="text-right px-4 py-3 font-semibold">
              Saldo Mínimo
            </th>
            <th className="text-center px-4 py-3 font-semibold">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  {product.description && (
                    <p className="text-gray-600 text-xs">{product.description}</p>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-gray-700">
                {productTypeLabels[product.type] || product.type}
              </td>
              <td className="px-4 py-3 text-right text-gray-700">
                {product.interestRate.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-right text-gray-700">
                R$ {product.minimumBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-center">
                  <Link href={`/produtos/${product.id}`}>
                    <Button variant="secondary" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteClick(product.id)}
                    disabled={isLoading}
                  >
                    Deletar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
