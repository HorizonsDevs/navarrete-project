<script>
    import logo from '../assets/logo.svg';
    import { onMount } from 'svelte';
    import { translations } from '../stores/languageStore';
    import { get } from 'svelte/store';

    let previousScrollY = 0; // Track previous scroll position
    let isVisible = true;    // Control navbar visibility
    let isMenuOpen = false;  // Control hamburger menu visibility

    // Smooth scrolling to sections
    function scrollToSection(id) {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        isMenuOpen = false; // Close the menu after selecting a section
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
</script>

<nav class:is-hidden={!isVisible}>
    <!-- Logo -->
    <button class="logo-button" on:click={() => scrollToSection('hero')} aria-label="Go to Hero section">
        <img src={logo} alt="Navarrete Logo" class="logo-image" />
    </button>

    <!-- Hamburger menu -->
    <button class="hamburger" on:click={() => (isMenuOpen = !isMenuOpen)} aria-label="Toggle navigation menu">
        <span class="bar top-bar" class:bar-open={isMenuOpen}></span>
        <span class="bar middle-bar" class:bar-open={isMenuOpen}></span>
        <span class="bar bottom-bar" class:bar-open={isMenuOpen}></span>
    </button>

    <!-- Navbar links -->
    <div class:menu-open={isMenuOpen} class="menu">
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
    </div>
</nav>
<div class="contact-banner">
    <p>
        {$translations.contact_banner_top} <br /> <br /> {$translations.contact_banner_bottom}
    </p>
</div>

<style>
    /* Navbar container */
    nav {
        position: sticky;
        top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em 2em;
        background-color: #ffffff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: transform 0.3s ease-in-out, background-color 0.3s ease;
    }

    nav.is-hidden {
        transform: translateY(-100%);
    }

    /* Logo styling */
    .logo-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .logo-image {
        height: 60px;
        transition: transform 0.3s ease, filter 0.3s ease;
    }

    .logo-image:hover {
        transform: scale(1.1);
        filter: brightness(1.2);
    }
    .contact-banner {
		background-color: #1b1b1b;
		color: white;
		text-align: center;
		padding: 1em;
		font-family: 'Montserrat', sans-serif;
	}

    /* Hamburger menu */
    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: center;
        width: 30px;
        height: 25px;
        background: none;
        border: none;
        cursor: pointer;
        position: relative;
    }

    .hamburger .bar {
        width: 100%;
        height: 3px;
        background-color: #A72608;
        border-radius: 2px;
        position: absolute;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    /* Top bar */
    .hamburger .top-bar {
        top: 0; /* Start at the top */
        transform-origin: center;
    }

    /* Middle bar */
    .hamburger .middle-bar {
        top: 50%; /* Centered vertically */
        transform: translateY(-50%);
        opacity: 1;
    }

    /* Bottom bar */
    .hamburger .bottom-bar {
        bottom: 0; /* Start at the bottom */
        transform-origin: center;
    }

    /* When menu is open */
    .hamburger .bar-open.top-bar {
        transform: translateY(11px) rotate(45deg); /* Move and rotate to form the top part of the X */
    }

    .hamburger .bar-open.middle-bar {
        opacity: 0; /* Hide middle bar */
    }

    .hamburger .bar-open.bottom-bar {
        transform: translateY(-11px) rotate(-45deg); /* Move and rotate to form the bottom part of the X */
    }

    /* Navbar menu */
    .menu {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .menu a {
        font-family: 'Rye', cursive;
        color: #A72608;
        text-decoration: none;
        font-size: 1.2em;
        margin: 0 1em;
        transition: color 0.3s ease, transform 0.2s ease;
    }

    .menu a:hover {
        color: #d03a17;
        transform: scale(1.05);
    }

    /* Mobile styles */
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }

        .menu {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #ffffff;
            width: 100%;
            padding: 1em 2em;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }

        .menu-open {
            display: flex;
        }

        .menu a {
            margin: 0.5em 0;
        }
    }
</style>
