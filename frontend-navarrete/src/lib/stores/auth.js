import { writable } from 'svelte/store';

// Check if window is defined (prevents SSR errors)
const isBrowser = typeof window !== "undefined";

// Get stored user & token (only in browser)
const storedUser = isBrowser ? JSON.parse(localStorage.getItem("user")) || null : null;
const storedToken = isBrowser ? localStorage.getItem("token") || null : null;

export const auth = writable({
    user: storedUser,
    token: storedToken
});

// Function to log in and update state
export function login(userData, token) {
    auth.set({ user: userData, token });

    if (isBrowser) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    }
}

// Function to log out
export function logout() {
    auth.set({ user: null, token: null });

    if (isBrowser) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}
