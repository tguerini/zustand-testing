import { create } from 'zustand';

export const userStore = create((set) => ({
    user: {
        id: '',
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