import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bem-vindo ao Sistema de Cadastro de Produtos
        </h2>
        <p className="text-gray-700 mb-6 text-lg">
          Gerencie seus produtos bancários de forma rápida e eficiente. Crie,
          edite, visualize e delete produtos com apenas alguns cliques.
        </p>
        <div className="flex gap-4">
          <Link href="/produtos">
            <Button>Ver Produtos</Button>
          </Link>
          <Link href="/produtos/novo">
            <Button variant="secondary">Novo Produto</Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Criar Produtos
          </h3>
          <p className="text-gray-600">
            Registre novos produtos bancários com informações completas e validadas.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-green-600 mb-2">👁️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Visualizar Produtos
          </h3>
          <p className="text-gray-600">
            Veja todos os seus produtos em uma tabela organizada e fácil de consultar.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-3xl font-bold text-yellow-600 mb-2">⚙️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Gerenciar Produtos
          </h3>
          <p className="text-gray-600">
            Edite e delete produtos conforme necessário. Operações em tempo real.
          </p>
        </div>
      </section>

      <section className="bg-blue-50 rounded-lg shadow p-8 border-l-4 border-blue-600">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ℹ️ Informações do Sistema
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Banco de dados em memória (dados redefinem ao reiniciar)</li>
          <li>✓ API RESTful completa para operações CRUD</li>
          <li>✓ Validação de dados em tempo real</li>
          <li>✓ Interface responsiva e amigável</li>
        </ul>
      </section>
    </div>
  );
}
