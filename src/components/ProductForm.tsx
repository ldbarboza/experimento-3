'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateProductSchema } from '@/lib/schemas';
import { Product, CreateProductInput } from '@/lib/types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Alert } from './ui/Alert';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: CreateProductInput) => Promise<void>;
  isLoading?: boolean;
}

const productTypeOptions = [
  { value: 'SAVINGS', label: 'Conta Poupança' },
  { value: 'CHECKING', label: 'Conta Corrente' },
  { value: 'INVESTMENT', label: 'Investimento' },
  { value: 'LOAN', label: 'Empréstimo' },
  { value: 'CREDIT_CARD', label: 'Cartão de Crédito' },
];

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description,
          type: initialData.type,
          interestRate: initialData.interestRate,
          minimumBalance: initialData.minimumBalance,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: CreateProductInput) => {
    try {
      await onSubmit(data);
      setSuccessMessage(
        initialData
          ? 'Produto atualizado com sucesso!'
          : 'Produto criado com sucesso!'
      );
      if (!initialData) {
        reset();
      }
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      // Error is handled by parent component
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <Input
        label="Nome do Produto"
        placeholder="Ex: Conta Poupança Premium"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Descrição"
        placeholder="Descrição do produto"
        {...register('description')}
        error={errors.description?.message}
      />

      <Select
        label="Tipo de Produto"
        options={productTypeOptions}
        {...register('type')}
        error={errors.type?.message}
      />

      <Input
        label="Taxa de Juros (%)"
        type="number"
        step="0.01"
        placeholder="Ex: 2.5"
        {...register('interestRate', { valueAsNumber: true })}
        error={errors.interestRate?.message}
      />

      <Input
        label="Saldo Mínimo"
        type="number"
        step="0.01"
        placeholder="Ex: 1000.00"
        {...register('minimumBalance', { valueAsNumber: true })}
        error={errors.minimumBalance?.message}
      />

      <Button type="submit" isLoading={isLoading}>
        {initialData ? 'Atualizar Produto' : 'Criar Produto'}
      </Button>
    </form>
  );
}
