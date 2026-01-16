"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import { api } from "@/services/api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
    } catch {
      setError("Erro ao carregar produtos");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function addProduct(product: Omit<Product, "_id">) {
    try {
      const response = await api.post<Product>("/products", product);
      setProducts(prev => [...prev, response.data]);
    } catch (error: any) {
      console.error("Erro ao adicionar produto:", error);
      const errorMessage = error?.response?.data?.error || "Erro ao adicionar produto";
      setError(errorMessage);
      alert(errorMessage); // Feedback visual para o usuário
      throw error;
    }
  }

  async function updateProduct(
    id: string,
    updatedProduct: Omit<Product, "_id">
  ) {
    try {
      const response = await api.put<Product>(`/products/${id}`, updatedProduct);

      setProducts(prev =>
        prev.map(product =>
          product._id === id ? response.data : product
        )
      );
    } catch {
      setError("Erro ao atualizar produto");
    }
  }

  async function deleteProduct(id: string) {
    try {
      console.log("🔍 [useProducts.deleteProduct] Tentando deletar produto com ID:", id);
      const response = await api.delete(`/products/${id}`);
      console.log("✅ [useProducts.deleteProduct] Produto deletado com sucesso:", response.data);
      setProducts(prev => prev.filter(product => product._id !== id));
    } catch (error: any) {
      console.error("❌ [useProducts.deleteProduct] Erro ao deletar produto:", error);
      console.error("❌ [useProducts.deleteProduct] Status:", error?.response?.status);
      console.error("❌ [useProducts.deleteProduct] Data:", error?.response?.data);
      const errorMessage = error?.response?.data?.error || "Erro ao remover produto";
      setError(errorMessage);
      alert(errorMessage); // Feedback visual para o usuário
      throw error;
    }
  }

  return {
    products,
    isLoading,
    error,
    reload: loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
  };
}
