"use client";

import { useState, useEffect, useRef } from 'react';
import { X, Upload } from 'lucide-react';
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
      setImagePreview(product.image);
      setImageFile(null);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImagePreview('');
      setImageFile(null);
    }
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        alert("Tipo de arquivo não permitido. Use JPEG, PNG ou WebP");
        return;
      }

      // Validar tamanho (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("Arquivo muito grande. Tamanho máximo: 5MB");
        return;
      }

      setImageFile(file);
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !description.trim() || !price) {
      return;
    }

    // Se estiver editando e não houver novo arquivo, usar a imagem existente
    if (!imageFile && !imagePreview) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    setIsUploading(true);
    let imageUrl = imagePreview; // Se estiver editando e não houver novo arquivo

    // Se houver novo arquivo, fazer upload
    if (imageFile) {
      try {
        const formData = new FormData();
        formData.append("file", imageFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Erro ao fazer upload da imagem");
        }

        const data = await response.json();
        imageUrl = data.url;
      } catch (error: any) {
        console.error("Erro ao fazer upload:", error);
        alert(error.message || "Erro ao fazer upload da imagem");
        setIsUploading(false);
        return;
      }
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: imageUrl,
    });

    setName('');
    setDescription('');
    setPrice('');
    setImageFile(null);
    setImagePreview('');
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
              Imagem do Produto
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer bg-secondary/50"
                >
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {imageFile ? imageFile.name : imagePreview ? 'Trocar imagem' : 'Selecionar imagem'}
                  </span>
                </label>
              </div>
              {imagePreview && (
                <div className="mt-3 rounded-xl overflow-hidden border border-border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Formatos aceitos: JPEG, PNG, WebP. Tamanho máximo: 5MB
              </p>
            </div>
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
              className="flex-1 btn-primary-gradient disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? 'Enviando...' : (product ? 'Salvar Alterações' : 'Adicionar Produto')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
