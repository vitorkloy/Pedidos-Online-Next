"use client";

import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <article className="card-product group animate-slide-up">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-gradient">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 btn-primary-gradient py-2 px-4 text-sm ${
              isAdding ? 'scale-95' : ''
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </article>
  );
}
