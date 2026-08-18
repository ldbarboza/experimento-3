import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cadastro de Produtos Bancários',
  description: 'Aplicação para gerenciar produtos bancários',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="bg-blue-600 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">
              Cadastro de Produtos Bancários
            </h1>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
