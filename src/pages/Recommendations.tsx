import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RESOURCES } from "@/data/resources";
import { MOTIVATIONS } from "@/data/motivations";
import { Storage } from "@/lib/storage";
import { toast } from "sonner";
import TitaMascot from "@/components/TitaMascot";

const pickRecommendations = (area?: string) => {
  if (!area) return RESOURCES.slice(0, 3);
  const filtered = RESOURCES.filter(r => r.tags.includes(area as any));
  if (filtered.length >= 3) return filtered.slice(0, 3);
  return [...filtered, ...RESOURCES.filter(r => !filtered.includes(r))].slice(0,3);
};

const Recommendations = () => {
  const answers = Storage.loadOnboarding();
  const recs = useMemo(() => pickRecommendations(answers?.area), [answers]);
  const [checks, setChecks] = useState<boolean[]>(() => Storage.loadProgress());
  const progress = Math.round((checks.filter(Boolean).length / 3) * 100);

  useEffect(() => {
    document.title = "TITA 🥑 — Recomendaciones";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Tus recursos recomendados y tu panel de progreso inicial.");
  }, []);

  useEffect(() => {
    Storage.saveProgress(checks);
  }, [checks]);

  const onLost = () => {
    const msg = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
    toast(msg);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-6 py-10 space-y-8 animate-fade-in">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TitaMascot size={48} />
            <h1 className="text-2xl font-semibold">Recomendaciones</h1>
          </div>
          <Button variant="secondary" onClick={onLost}>Me siento perdido</Button>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          {recs.map((r) => (
            <Card key={r.title} className="hover-scale">
              <CardHeader>
                <CardTitle className="text-lg">{r.title}</CardTitle>
                <CardDescription>{r.tags.join(" · ")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{r.description}</p>
                <a href={r.link} target="_blank" rel="noreferrer" className="story-link text-sm">
                  Abrir recurso ↗
                </a>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-4">
          <h2 className="text-xl font-semibold mb-3">Panel de progreso</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tareas iniciales</CardTitle>
                <CardDescription>Marca lo que vayas completando</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recs.map((r, i) => (
                  <label key={r.title} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checks[i]}
                      onChange={(e) => setChecks((c) => {
                        const next = [...c];
                        next[i] = e.target.checked;
                        return next;
                      })}
                    />
                    <span>Revisar: {r.title}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tu progreso</CardTitle>
                <CardDescription>{progress}% completado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} />
                {progress === 100 ? (
                  <div className="space-y-3 animate-fade-in">
                    <p className="font-medium">¡Felicitaciones! Has completado tu camino inicial con TITA 🥑</p>
                    <img src={new URL("../assets/tita-badge.png", import.meta.url).toString()} alt="TITA Builder Badge" className="mx-auto w-40 h-40" loading="lazy" />
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Sigue marcando tus tareas para desbloquear tu badge.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Recommendations;
