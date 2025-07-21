import { create } from 'zustand';

export const userStore = create((set) => ({
    user: {
        email: '',
        password: '',
    },
    updateUser: (newUser) => set((state) => ({
        user: {
            ...state.user,
            ...newUser,
        },
    }))
}))