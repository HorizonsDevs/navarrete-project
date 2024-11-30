<script>
    import logo from '../assets/logo.svg';
    import { onMount } from 'svelte';
    import { translations } from '../stores/languageStore';
    import { get } from 'svelte/store';

    let previousScrollY = 0; // Track previous scroll position
    let isVisible = true;    // Control navbar visibility

    // Smooth scrolling to sections
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Detect scroll direction to show/hide navbar
    onMount(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isVisible = currentScrollY < previousScrollY || currentScrollY <= 0;
            previousScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    });

    // Debugging translations
    $: console.log("Navbar translations updated:", $translations);
</script>

<nav class:is-hidden={!isVisible}>
    <!-- Logo scrolls to Hero section with hover effect -->
    <button class="logo-button" on:click={() => scrollToSection('hero')} aria-label="Go to Hero section">
        <img src={logo} alt="Navarrete Logo" class="logo-image" />
    </button>
    
    <!-- Navbar links use reactive translations -->
    <a href="#products" on:click|preventDefault={() => scrollToSection('products')} role="link" tabindex="0">
        {$translations.navbar_products || 'PRODUCTS'}
    </a>
    <a href="#location" on:click|preventDefault={() => scrollToSection('location')} role="link" tabindex="0">
        {$translations.navbar_location || 'LOCATION'}
    </a>
    <a href="#retailers" on:click|preventDefault={() => scrollToSection('retailers')} role="link" tabindex="0">
        {$translations.navbar_retailers || 'RETAILERS'}
    </a>
    <a href="#order-now" on:click|preventDefault={() => scrollToSection('order-now')} role="link" tabindex="0">
        {$translations.navbar_order_now || 'ORDER NOW'}
    </a>
</nav>

<style>
    /* Make the navbar sticky at the top */
    nav {
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1em;
        background-color: #f9f9f9;
        transition: transform 0.3s ease-in-out;
        z-index: 1000;
    }

    /* Hide navbar when scrolling down */
    .is-hidden {
        transform: translateY(-100%);
    }

    /* Logo button styling with hover effect */
    .logo-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    /* Logo image hover effect */
    .logo-image {
        height: 128px;
        transition: transform 0.3s ease, filter 0.3s ease;
    }

    .logo-image:hover {
        transform: scale(1.1); /* Slight zoom on hover */
        filter: brightness(1.2); /* Brighten image on hover */
    }

    /* Navbar links styling */
    a {
        font-family: 'Rye', cursive;
        color: #A72608;
        cursor: pointer;
        text-decoration: none;
        font-size: 1.2em;
        margin: 0 1em;
        position: relative;
        transition: color 0.3s ease;
    }

    /* Navbar links hover effect */
    a:focus, a:hover {
        color: #d03a17; /* Slightly darker shade on hover */
    }

    /* Underline effect on hover */
    a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        background: #d03a17; /* Matches hover color */
        bottom: -2px;
        left: 0;
        transition: width 0.3s ease;
    }

    a:hover::after {
        width: 100%; /* Full underline on hover */
    }
</style>
