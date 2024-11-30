// src/stores/languageStore.js
import { writable } from 'svelte/store';

export const language = writable('en');
export const translations = writable({});
