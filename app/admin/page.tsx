"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductTable } from '@/components/admin/ProductTable';
import { ProductForm } from '@/components/admin/ProductForm';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (productData: Omit<Product, '_id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct._id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Produtos
            </h2>
            <p className="text-muted-foreground mt-1">
              {products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <button
            onClick={handleAddClick}
            className="btn-primary-gradient flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </button>
        </div>
        
        {isLoading ? (
          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-secondary rounded-xl" />
              ))}
            </div>
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
