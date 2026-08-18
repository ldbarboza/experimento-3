import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { CreateProductSchema } from '@/lib/schemas';
import { ZodError } from 'zod';

export async function GET() {
  try {
    const products = db.getAll();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateProductSchema.parse(body);
    const product = db.create(validated);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validação falhou', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}
