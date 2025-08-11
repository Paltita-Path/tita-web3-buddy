// Futuro con Stellar — funciones stub para MVP
export type IssuedBadge = { id: string; userId: string; issuedAt: string };

export const StellarHook = {
  async connectWallet() {
    // En el futuro: integrar con Freighter / Albedo
    console.log("[StellarHook] connectWallet — stub");
    return { connected: true } as const;
  },
  async issueBadge(userId: string) {
    // En el futuro: emitir en Stellar (soroban/nativo)
    console.log("[StellarHook] issueBadge to", userId);
    const badge: IssuedBadge = {
      id: crypto.randomUUID(),
      userId,
      issuedAt: new Date().toISOString(),
    };
    return badge;
  },
};
