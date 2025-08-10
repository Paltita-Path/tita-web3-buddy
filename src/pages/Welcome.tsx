import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TitaMascot from "@/components/TitaMascot";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "TITA 🥑 — Bienvenida";
  }, []);
  return (
    <main className="min-h-screen grid place-items-center bg-background">
      <section className="container mx-auto px-6 py-16 text-center animate-fade-in">
        <div className="mx-auto max-w-2xl flex flex-col items-center gap-6">
          <TitaMascot size={140} />
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Hola, soy TITA 🥑, tu compañera para aprender y construir en Web3.</h1>
          <p className="text-lg text-muted-foreground">Te acompañaré con un onboarding amable, recomendaciones personalizadas y un panel de progreso.</p>
          <Button variant="hero" size="xl" className="hover-scale" onClick={() => navigate('/onboarding')}>Comenzar</Button>
        </div>
      </section>
    </main>
  );
};

export default Welcome;
