import { writable } from 'svelte/store';

let userLang = 'en'; // Default language fallback

// Check if we are in the browser before accessing navigator
if (typeof window !== "undefined") {
    userLang = navigator.language?.split('-')[0] || 'en';
}

export const language = writable(userLang);
export const translations = writable({});
