import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useUserStore = create(
    persist(
        (set) => ({
            id: null,
            role: null,
            exchangePointId: null,
            access_token: null,
            auth: (id: number, role: number, exchangePointId: number | null, access_token: string) => set({
                id: id,
                role: role,
                exchangePointId: exchangePointId,
                access_token: access_token
            }),
            logout: () => set({
                id: null,
                role: null,
                exchangePointId: null,
                access_token: null,
            }),
        }),
        {
            name: 'auth-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)