export function Hero() {
  return (
    <section className="hero-gradient py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 animate-slide-up">
          Sabores que <span className="text-6xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-300 text-transparent bg-clip-text inline-block">Encantam</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
          Descubra pratos preparados com ingredientes frescos e muito carinho. 
          Faça seu pedido e receba onde você estiver!
        </p>
      </div>
    </section>
  );
}
