<script>
    import { onMount } from 'svelte';
    import { translations } from '../stores/languageStore';
    import { get } from 'svelte/store';
    import logo from '../assets/logo.svg';

    // Import social media and phone icons (SVGs)
    import facebookIcon from '../assets/icons/facebook.svg';
    import instagramIcon from '../assets/icons/instagram.svg';
    import tiktokIcon from '../assets/icons/tiktok.svg';
    import phoneIcon from '../assets/icons/phone.svg'; // Import phone icon

    let currentYear;
    let phoneNumber = "(915)234-3257"; 

    // Set the current year
    onMount(() => {
        const date = new Date();
        currentYear = date.getFullYear();
    });

    // Function to handle the bulk order button click
    function handleBulkOrder() {
        alert("Thank you for considering a bulk order! Please reach out to us directly.");
    }
</script>

<!-- Footer Container -->
<div class="footer-container container">
    <div class="footer-content row justify-content-center align-items-center">
        <!-- Logo Section (Centered) -->
        <div class="footer-logo col-12 col-md-3 text-center">
            <img src={logo} alt="Navarrete El Paso Logo" class="logo-image" />
        </div>

        <!-- Social Media and Phone Icons Section (Aligned in one block) -->
        <div class="footer-icons col-12 col-md-6 d-flex justify-content-center gap-3">
            <!-- Phone Icon -->
            <a href={`tel:${phoneNumber}`} class="phone-link">
                <img src={phoneIcon} alt="Phone" class="social-icon" />
            </a>
            <!-- Social Media Icons -->
            <a href="https://www.instagram.com/carnesecanavarreteelpaso/" target="_blank" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" class="social-icon" />
            </a>
            <a href="https://www.facebook.com/p/Carne-Seca-Navarrete-100080206413905/" target="_blank" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" class="social-icon" />
            </a>
            <a href="https://www.tiktok.com/@carnesecanavarret" target="_blank" aria-label="TikTok">
                <img src={tiktokIcon} alt="TikTok" class="social-icon" />
            </a>
        </div>
    </div>

    <!-- Bulk Order Button -->
    <div class="bulk-order-container text-center">
        <button class="bulk-order-button" on:click={handleBulkOrder}>
            {$translations.footer_bulk_order_button || 'Order in Bulk'}
        </button>
    </div>

    <!-- Footer Copyright -->
    <div class="footer-copyright text-center">
        <p>&copy; {currentYear} {$translations.footer_company_name || 'Navarrete El Paso'}. {$translations.footer_rights_reserved || 'All rights reserved.'}</p>
    </div>
</div>

<style>
    .footer-container {
        background-color: #1b1b1b;
        color: white;
        padding: 2rem 1rem;
        text-align: center;
    }

    .footer-logo img {
        height: 64px;
        max-width: 150px;
    }

    .footer-icons {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .phone-link {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .social-icon {
        width: 40px;
        height: auto;
        transition: transform 0.3s, filter 0.3s;
        filter: brightness(0) saturate(100%) invert(37%) sepia(76%) saturate(3152%) hue-rotate(8deg) brightness(99%) contrast(97%);
    }

    .footer-icons a:hover .social-icon {
        transform: scale(1.2);
    }

    .bulk-order-container {
        margin-top: 1rem;
    }

    .bulk-order-button {
        background-color: #f5a623;
        color: white;
        font-size: 1.2rem;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .bulk-order-button:hover {
        background-color: rgb(228, 142, 45);
    }

    .footer-copyright {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        color: #777;
        margin-top: 1rem;
    }
</style>
