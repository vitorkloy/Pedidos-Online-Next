"use client";

import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({ products, onAddToCart, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-product animate-pulse">
            <div className="aspect-[4/3] bg-secondary" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-full" />
              <div className="h-4 bg-secondary rounded w-2/3" />
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-secondary rounded w-24" />
                <div className="h-10 bg-secondary rounded w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          Nenhum produto disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <div key={product._id} style={{ animationDelay: `${index * 100}ms` }}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
