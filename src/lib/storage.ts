export type OnboardingAnswers = {
  objetivo?: string;
  nivel?: string;
  tiempo?: string;
  area?: "Desarrollo" | "Diseño" | "Comunidad" | "Finanzas DeFi" | "NFTs" | string;
  preferencia?: string;
};

const KEYS = {
  onboarding: "tita_onboarding",
  progress: "tita_progress",
  xp: "tita_xp",
  streak: "tita_streak",
  lastActivity: "tita_last_activity",
} as const;

export const Storage = {
  saveOnboarding(data: OnboardingAnswers) {
    localStorage.setItem(KEYS.onboarding, JSON.stringify(data));
  },
  loadOnboarding(): OnboardingAnswers | null {
    const raw = localStorage.getItem(KEYS.onboarding);
    return raw ? (JSON.parse(raw) as OnboardingAnswers) : null;
  },
  saveProgress(checks: boolean[]) {
    localStorage.setItem(KEYS.progress, JSON.stringify(checks));
  },
  loadProgress(): boolean[] {
    const raw = localStorage.getItem(KEYS.progress);
    return raw ? (JSON.parse(raw) as boolean[]) : [false, false, false];
  },
  saveXP(xp: number) {
    localStorage.setItem(KEYS.xp, String(xp));
  },
  loadXP(): number {
    const raw = localStorage.getItem(KEYS.xp);
    return raw ? Number(raw) : 0;
  },
  saveStreak(days: number) {
    localStorage.setItem(KEYS.streak, String(days));
  },
  loadStreak(): number {
    const raw = localStorage.getItem(KEYS.streak);
    return raw ? Number(raw) : 0;
  },
  saveLastActivity(dateStr: string) {
    localStorage.setItem(KEYS.lastActivity, dateStr);
  },
  loadLastActivity(): string {
    return localStorage.getItem(KEYS.lastActivity) || "";
  },
};
