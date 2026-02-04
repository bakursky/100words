import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type PaywallState = {
    paywallValue: 0 | 1;
    paywallToggle: () => void;
}

export const usePaywallStore = create<PaywallState>()(
    persist(
        (set) => ({
            paywallValue: 0,
            paywallToggle: () =>
                set((state) => ({
                    paywallValue: state.paywallValue === 0 ? 1 : 0,
                })),
        }),
        {
            name: 'paywall-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)