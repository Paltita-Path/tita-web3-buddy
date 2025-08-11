import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RESOURCES } from "@/data/resources";
import { MOTIVATIONS } from "@/data/motivations";
import { Storage, type OnboardingAnswers } from "@/lib/storage";
import { toast } from "sonner";
import TitaMascot from "@/components/TitaMascot";

type ResourceItem = (typeof RESOURCES)[number];

type Scored = { r: ResourceItem; score: number };

const objectiveHints = (objetivo?: string): string[] => {
  switch (objetivo) {
    case "Aprender a programar":
      return ["Desarrollo"];
    case "Encontrar comunidad":
      return ["Comunidad"];
    case "Ganar experiencia en hackathons":
      return ["Desarrollo", "Comunidad"];
    case "Crear un proyecto":
      return ["Desarrollo", "NFTs", "Finanzas DeFi"];
    default:
      return [];
  }
};

const scoreResource = (r: ResourceItem, a?: OnboardingAnswers) => {
  let s = 0;
  if (!a) return s;
  if (a.area && r.tags.includes(a.area as any)) s += 3;
  for (const tag of objectiveHints(a.objetivo)) {
    if (r.tags.includes(tag as any)) s += 2;
  }
  if (a.preferencia === "Proyectos prácticos" && /(Bootcamp|Hackathon|Quest)/i.test(r.title)) s += 1;
  if (a.nivel === "Avanzado" && /(DAO|DeFi|Stellar)/i.test(r.title)) s += 1;
  if (a.tiempo === "Menos de 3h" && /(Guía|Intro|Básico|Quest)/i.test(r.title)) s += 1;
  return s;
};

const pickRecommendations = (answers?: OnboardingAnswers) => {
  const scored: Scored[] = RESOURCES.map((r) => ({ r, score: scoreResource(r, answers || undefined) }))
    .sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).map((s) => s.r);
  return top.every((_, i, arr) => scored[i]?.score === 0) ? RESOURCES.slice(0, 3) : top;
};

const Recommendations = () => {
  const answers = Storage.loadOnboarding();
  const recs = useMemo(() => pickRecommendations(answers || undefined), [answers]);
  const [checks, setChecks] = useState<boolean[]>(() => Storage.loadProgress());
  const [xp, setXp] = useState<number>(() => Storage.loadXP());
  const [streak, setStreak] = useState<number>(() => Storage.loadStreak());
  const [lastActivity, setLastActivity] = useState<string>(() => Storage.loadLastActivity());
  const level = Math.floor(xp / 30) + 1;
  const progress = Math.round((checks.filter(Boolean).length / 3) * 100);

  const todayStr = new Date().toDateString();
  const isYesterday = (d: string) => {
    if (!d) return false;
    const prev = new Date(d);
    const tmp = new Date(prev);
    tmp.setDate(prev.getDate() + 1);
    return tmp.toDateString() === todayStr;
  };

  const bumpStreakIfNeeded = () => {
    if (lastActivity === todayStr) return; // ya contamos hoy
    if (!lastActivity) {
      setStreak(1);
    } else if (isYesterday(lastActivity)) {
      setStreak((s) => s + 1);
    } else {
      setStreak(1);
    }
    setLastActivity(todayStr);
  };

  const awardXP = (amount: number) => setXp((x) => x + amount);

  useEffect(() => {
    document.title = "TITA 🥑 — Recomendaciones";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Tus recursos recomendados y tu panel de progreso inicial.");
  }, []);

  useEffect(() => {
    Storage.saveProgress(checks);
  }, [checks]);

  useEffect(() => {
    Storage.saveXP(xp);
    Storage.saveStreak(streak);
    if (lastActivity) Storage.saveLastActivity(lastActivity);
  }, [xp, streak, lastActivity]);

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
                <img src="/placeholder.svg" alt={`Recurso ${r.title} — ${r.tags.join(", ")}`} className="w-full h-32 object-cover rounded-md" loading="lazy" />
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
                      onChange={(e) =>
                        setChecks((c) => {
                          const next = [...c];
                          const was = next[i];
                          next[i] = e.target.checked;
                          if (!was && next[i]) {
                            awardXP(10);
                            bumpStreakIfNeeded();
                          }
                          return next;
                        })
                      }
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
                <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                  <span>Nivel {level}</span>
                  <span>XP {xp}</span>
                  <span>Racha {streak} {streak === 1 ? "día" : "días"}</span>
                </div>
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
