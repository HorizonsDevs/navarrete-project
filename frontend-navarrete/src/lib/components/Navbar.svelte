<script>
    import logo from '../assets/logo.svg';
    import { onMount } from 'svelte';
    import { translations } from '../stores/languageStore';
    import { get } from 'svelte/store';
    import { auth, logout } from '../stores/auth'; // Auth Store
    import AuthModal from './AuthModal.svelte';

    let previousScrollY = 0; // Track previous scroll position
    let isVisible = true;    // Control navbar visibility
    let isMenuOpen = false;  // Control hamburger menu visibility
    let showAuthModal = false; // Controls Login/Signup modal
    let showDropdown = false; // Controls Profile Dropdown visibility
    let user = null;

    // Subscribe to auth store
    $: auth.subscribe(value => {
        user = value.user;
    });

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
        <a href="#products" on:click|preventDefault={() => scrollToSection('products')} role="link">
            {$translations.navbar_products || 'PRODUCTS'}
        </a>
        <a href="#location" on:click|preventDefault={() => scrollToSection('location')} role="link">
            {$translations.navbar_location || 'LOCATION'}
        </a>
        <a href="#retailers" on:click|preventDefault={() => scrollToSection('retailers')} role="link">
            {$translations.navbar_retailers || 'RETAILERS'}
        </a>
        <a href="#order-now" on:click|preventDefault={() => scrollToSection('order-now')} role="link">
            {$translations.navbar_order_now || 'ORDER NOW'}
        </a>

        <!-- Profile/Login Section -->
        {#if user}
            <!-- Profile Dropdown -->
            <div class="profile-dropdown">
                <button class="profile-btn" on:click={() => showDropdown = !showDropdown}>
                    {user.name.charAt(0).toUpperCase()}
                </button>
                {#if showDropdown}
                    <ul class="dropdown-menu">
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/orders">My Orders</a></li>
                        <li on:click={logout}>Logout</li>
                    </ul>
                {/if}
            </div>
        {:else}
            <button class="auth-btn" on:click={() => showAuthModal = true}>Login</button>
        {/if}
    </div>
</nav>

{#if showAuthModal}
    <AuthModal bind:showAuthModal />
{/if}

<div class="contact-banner">
    <p>
        {$translations.contact_banner_top} <br /> <br /> {$translations.contact_banner_bottom}
    </p>
</div>

<style>
   /* General Styling */
* {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

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

/* Logo */
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

/* Contact Banner */
.contact-banner {
    background-color: #1b1b1b;
    color: white;
    text-align: center;
    padding: 1em;
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

/* Navbar Links */
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

/* Profile Dropdown */
.profile-dropdown {
    position: relative;
    display: inline-block;
}

.profile-btn {
    background: #A72608;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s ease;
}

.profile-btn:hover {
    background: #d03a17;
}

.dropdown-menu {
    position: absolute;
    top: 45px;
    right: 0;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    overflow: hidden;
    width: 150px;
    z-index: 999;
}

.dropdown-menu li {
    padding: 10px;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;
}

.dropdown-menu li:hover {
    background: #f1f1f1;
}

/* Auth Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 320px;
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 0.5rem;
}

/* Input Fields */
input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

/* Auth Button */
.auth-btn {
    background: #A72608;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 1rem;
    transition: background 0.2s ease;
}

.auth-btn:hover {
    background: #d03a17;
}

/* Toggle Auth Link */
.toggle-auth {
    text-align: center;
    color: #A72608;
    font-size: 0.9rem;
    cursor: pointer;
    margin-top: 5px;
}

.toggle-auth:hover {
    text-decoration: underline;
}

/* Error Message */
.error {
    color: red;
    text-align: center;
    font-size: 0.9rem;
}

/* Close Button */
.close-btn {
    margin-top: 10px;
    background: gray;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    border-radius: 5px;
    transition: background 0.2s ease;
}

.close-btn:hover {
    background: darkgray;
}

/* Mobile Styles */
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
