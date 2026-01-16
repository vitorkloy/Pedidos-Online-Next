"use client";

import { useState, useCallback, useMemo } from 'react';
import { CartItem, Product } from '@/types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item._id === product._id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item._id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const generateWhatsAppMessage = useCallback(() => {
    if (items.length === 0) return '';
    
    let message = '🍔 *NOVO PEDIDO*\n\n';
    message += '━━━━━━━━━━━━━━━━━━━\n\n';
    
    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`;
      message += `   Qtd: ${item.quantity}x\n`;
      message += `   Preço unit.: R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━━━━\n';
    message += `\n💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += '📍 Por favor, informe seu endereço de entrega.';
    
    return encodeURIComponent(message);
  }, [items, total]);

  const sendToWhatsApp = useCallback((phoneNumber: string = '5511999999999') => {
    const message = generateWhatsAppMessage();
    if (message) {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  }, [generateWhatsAppMessage]);

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    sendToWhatsApp
  };
}
