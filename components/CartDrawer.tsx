"use client";

import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onSendToWhatsApp: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onSendToWhatsApp
}: CartDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-card z-50 shadow-elevated transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">Seu Carrinho</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Adicione itens deliciosos!
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 p-3 bg-secondary/50 rounded-xl animate-fade-in"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm text-primary font-medium mt-1">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item._id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-medium">Total</span>
                <span className="text-2xl font-bold text-gradient">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button
                onClick={onSendToWhatsApp}
                className="w-full btn-primary-gradient flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                Finalizar pelo WhatsApp
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
