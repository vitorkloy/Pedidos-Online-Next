"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, isLoading } = useProducts();
  const { 
    items, 
    total, 
    itemCount, 
    addItem, 
    updateQuantity, 
    removeItem,
    sendToWhatsApp 
  } = useCart();

  const currentYear = new Date().getFullYear();
  const companyName = "Nosso Cardápio"; /* subistituir pelo nome do restaurante */
  const copyrightText = `© ${currentYear} ${companyName}. Todos os direitos reservados.`;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={itemCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <Hero />
      
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Nosso Cardápio
          </h2>
        </div>
        
        <ProductGrid 
          products={products} 
          onAddToCart={addItem}
          isLoading={isLoading}
        />
      </main>
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        total={total}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onSendToWhatsApp={sendToWhatsApp}
      />

      {/* Admin Link - Fixed */}
      <Link
        href="/admin"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-elevated hover:scale-110 transition-transform z-40"
        aria-label="Painel Administrativo"
      >
        <Settings className="w-6 h-6" />
      </Link>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
             {copyrightText}
          </p>
        </div>
      </footer>
    </div>
  );
}
