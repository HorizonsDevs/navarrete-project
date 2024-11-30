<script>
    import { language, translations } from '../stores/languageStore';
    import { onMount } from 'svelte';

    const loadTranslations = async (lang) => {
        try {
            console.log(`Loading translations for ${lang}...`);
            const module = await import(`../locales/${lang}.json`);
            translations.set(module.default);
            console.log("Loaded translations:", module.default);
        } catch (error) {
            console.error(`Error loading translations for ${lang}:`, error);
        }
    };

    const changeLanguage = async (lang) => {
        console.log(`Changing language to ${lang}...`);
        language.set(lang);
        await loadTranslations(lang);
        localStorage.setItem('language', lang);
    };

    onMount(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        console.log(`Saved language: ${savedLanguage}`);
        language.set(savedLanguage);
        loadTranslations(savedLanguage);
    });
</script>

<div class="language-switcher">
    <button on:click={() => changeLanguage('en')}>EN</button>
    <button on:click={() => changeLanguage('es')}>ES</button>
</div>


<style>
    .language-switcher {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        gap: 10px;
    }

    .language-switcher button {
        padding: 10px 20px;
        background-color: #f5a623;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: transform 0.2s, background-color 0.2s;
    }

    .language-switcher button:hover {
        transform: scale(1.1);
        background-color: #d98300;
    }
</style>
