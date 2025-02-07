// src/stores/languageStore.js
import { writable } from 'svelte/store';

// Get user's language from browser, fallback to English
const userLang = navigator.language?.split('-')[0] || 'en';

export const language = writable(userLang);
export const translations = writable({});
