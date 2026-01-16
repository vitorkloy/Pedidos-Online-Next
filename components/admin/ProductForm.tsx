"use client";

import { useState, useEffect } from 'react';
import { X, ImagePlus } from 'lucide-react';
import { Product } from '@/types';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Omit<Product, '_id'>) => void;
  onCancel: () => void;
}

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || !price || !image.trim()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image.trim(),
    });

    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-display text-xl font-bold text-foreground">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Nome do Produto
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-styled"
              placeholder="Ex: Hambúrguer Artesanal"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-styled min-h-[100px] resize-none"
              placeholder="Descreva os ingredientes e diferenciais..."
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-foreground mb-2">
              Preço (R$)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input-styled"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-foreground mb-2">
              URL da Imagem
            </label>
            <div className="relative">
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-styled pr-12"
                placeholder="https://exemplo.com/imagem.jpg"
                required
              />
              <ImagePlus className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            {image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-border">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary-gradient"
            >
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
