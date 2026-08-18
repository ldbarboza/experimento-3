'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductTable } from '@/components/ProductTable';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/lib/types';

export default function ProdutosPage() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    deleteProduct,
  } = useProducts();

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    productId?: string;
    productName?: string;
  }>({
    isOpen: false,
  });

  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteClick = (product: Product) => {
    setDeleteDialog({
      isOpen: true,
      productId: product.id,
      productName: product.name,
    });
  };

  const handleConfirmDelete = async () => {
    if (!deleteDialog.productId) return;

    setIsDeleting(true);
    try {
      await deleteProduct(deleteDialog.productId);
      setSuccessMessage('Produto deletado com sucesso!');
      setDeleteDialog({ isOpen: false });
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      // Error is handled by hook
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <Link href="/produtos/novo">
          <Button>Novo Produto</Button>
        </Link>
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => window.location.reload()}
        />
      )}

      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : (
          <ProductTable
            products={products}
            onDeleteClick={handleDeleteClick}
            isLoading={isDeleting}
          />
        )}
      </div>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        message={`Tem certeza que deseja deletar o produto "${deleteDialog.productName}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false })}
        isLoading={isDeleting}
      />
    </div>
  );
}
