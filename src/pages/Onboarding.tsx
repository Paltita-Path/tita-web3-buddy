import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import TitaMascot from "@/components/TitaMascot";
import { Storage, type OnboardingAnswers } from "@/lib/storage";

const baseSteps = [
  {
    key: "objetivo",
    question: "¿Cuál es tu objetivo principal en Web3?",
    options: [
      "Aprender a programar",
      "Crear un proyecto",
      "Encontrar comunidad",
      "Ganar experiencia en hackathons",
    ],
  },
  {
    key: "nivel",
    question: "Nivel de experiencia",
    options: ["Principiante", "Intermedio", "Avanzado"],
  },
  {
    key: "tiempo",
    question: "Tiempo disponible por semana",
    options: ["Menos de 3h", "3–6h", "Más de 6h"],
  },
  {
    key: "area",
    question: "Área de interés",
    options: ["Desarrollo", "Diseño", "Comunidad", "Finanzas DeFi", "NFTs"],
  },
] as const;

type Step = (typeof baseSteps)[number] | { key: keyof OnboardingAnswers; question: string; options: string[] };

const getSteps = (answers: OnboardingAnswers) => {
  const steps = [...baseSteps] as Step[];
  if (answers.objetivo === "Aprender a programar") {
    steps.splice(2, 0, {
      key: "preferencia",
      question: "¿Cómo prefieres aprender?",
      options: ["Cursos guiados", "Proyectos prácticos", "Mentoría/comunidad"],
    });
  }
  return steps as Step[];
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>(() => Storage.loadOnboarding() ?? {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "TITA 🥑 — Onboarding";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Cuéntame sobre ti y te recomendaré un camino Web3.");
  }, []);

const steps = useMemo(() => getSteps(answers), [answers]);
const step = useMemo<Step>(() => steps[current], [steps, current]);
const value = (answers as any)[step.key] as string | undefined;
const progress = Math.round(((current) / steps.length) * 100);

  const onSelect = (v: string) => {
    setAnswers((a) => ({ ...a, [step.key]: v }));
  };

  const next = () => {
    if (current < steps.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      // finish
      Storage.saveOnboarding(answers);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/recomendaciones");
      }, 1400);
    }
  };

  const back = () => setCurrent((c) => Math.max(0, c - 1));

  return (
    <main className="min-h-screen bg-background">
      <section className="container max-w-2xl mx-auto px-6 py-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <TitaMascot size={48} />
          <h1 className="text-2xl font-semibold">Onboarding</h1>
        </div>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-xl">{step.question}</CardTitle>
            <CardDescription>Progreso: {progress}%</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={value} onValueChange={onSelect} className="grid gap-3">
              {step.options.map((opt) => (
                <Label
                  key={opt}
                  className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-secondary ${value === opt ? "border-ring" : "border-border"}`}
                  htmlFor={opt}
                >
                  <RadioGroupItem id={opt} value={opt} />
                  <span>{opt}</span>
                </Label>
              ))}
            </RadioGroup>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="secondary" onClick={back} disabled={current === 0}>Atrás</Button>
              <Button variant="hero" onClick={next} disabled={!value}>
                {current < steps.length - 1 ? "Continuar" : "Finalizar"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading && (
          <div className="mt-6 flex items-center gap-3 text-muted-foreground animate-fade-in">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" aria-hidden />
            Preparando tus recomendaciones...
          </div>
        )}
      </section>
    </main>
  );
};

export default Onboarding;
