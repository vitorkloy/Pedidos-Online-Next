"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { Product } from '@/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-card rounded-2xl shadow-card p-8 text-center">
        <p className="text-muted-foreground">
          Nenhum produto cadastrado. Adicione seu primeiro produto!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Imagem</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Descrição</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Preço</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-foreground">{product.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                    {product.description}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-primary">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Editar produto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 rounded-lg bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      aria-label="Excluir produto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {products.map((product) => (
          <div key={product._id} className="p-4 flex gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-foreground line-clamp-1">{product.name}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold text-primary">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(product._id)}
                    className="p-2 rounded-lg bg-secondary hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
