export type OnboardingAnswers = {
  objetivo?: string;
  nivel?: string;
  tiempo?: string;
  area?: "Desarrollo" | "Diseño" | "Comunidad" | "Finanzas DeFi" | "NFTs" | string;
};

const KEYS = {
  onboarding: "tita_onboarding",
  progress: "tita_progress",
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
};
