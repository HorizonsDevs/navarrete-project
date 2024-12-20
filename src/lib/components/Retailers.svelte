<script>
    import { translations } from '../stores/languageStore';
    import { derived } from 'svelte/store'; // To reactively derive the title

    // Import images explicitly
    import img1 from '../images/retailers/img1.png';
    import img2 from '../images/retailers/img2.png';
    import img3 from '../images/retailers/img3.png';
    import img4 from '../images/retailers/img4.png';
    import img5 from '../images/retailers/img5.png';
    import img6 from '../images/retailers/img6.png';
    import img7 from '../images/retailers/img7.png';
    import img8 from '../images/retailers/img8.png';
    import img9 from '../images/retailers/img9.png';

    // List of retailers
    export let retailers = [
        { name: "El Patron Sports Bar", logo: img1 },
        { name: "Time Out Sports Cantina", logo: img2 },
        { name: "Oasis Bar", logo: img3 },
        { name: "Howdy's", logo: img4 },
        { name: "Mercadillo", logo: img5 },
        { name: "Zeke's", logo: img6 },
        { name: "Good Coffee", logo: img7 },
        { name: "El Cuademingo", logo: img8 },
        { name: "Better Time Store", logo: img9 },
    ];

    // Dynamically derive the title from translations
    const title = derived(translations, $translations => $translations.retailers_title || 'Retailers');
</script>

<div class="retailers-container">
    <!-- Reactive title -->
    <h2>{$title}</h2>
    <div class="retailers-grid">
        {#each retailers as retailer}
            <div class="retailer">
                <img src={retailer.logo} alt={retailer.name} class="retailer-logo" />
                <p>{retailer.name}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .retailers-container {
        height: 100vh;
        width: 100vw; /* Full viewport width */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1rem;
    }

    h2 {
        font-family: 'Rye', cursive;
        font-size: 3rem;
        color: #A72608;
        margin-bottom: 2rem;
    }

    .retailers-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* Original 3-column layout for desktop */
        gap: 2rem; /* Original spacing */
        width: 90%;
        max-width: 1200px;
        height: auto;
    }

    .retailer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .retailer-logo {
        width: 100%;
        max-width: 150px; /* Retain the original size for desktop */
        height: auto;
        margin-bottom: 0.5rem;
        aspect-ratio: 1 / 1; /* Maintain square proportions */
        object-fit: contain; /* Ensure logos fit without distortion */
    }

    p {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        color: #333;
        text-align: center;
    }

    /* Responsive layout for medium screens */
    @media (max-width: 768px) {
        h2 {
            font-size: 2.5rem; /* Reduce title size */
        }

        .retailers-grid {
            grid-template-columns: repeat(2, 1fr); /* Adjust to 2 columns for medium screens */
            gap: .5rem; /* Slightly reduce spacing */
        }

        .retailer-logo {
            max-width: 3.5rem; /* Scale down logo size for medium screens */
        }
    }

    /* Responsive layout for smaller screens */
    @media (max-width: 480px) {
        h2 {
            font-size: 2rem; /* Further reduce title size */
        }

        .retailers-grid {
            grid-template-columns: repeat(3, 1fr); /* Single column layout for smaller screens */
            gap: 0.25rem; /* Reduce spacing further */
            height: 100%; /* Fit the grid within 80% of the viewport height */
        }

        .retailer-logo {
            max-width: 75%; /* Adjust logo size to occupy 80% of the viewport */
        }

        p {
            font-size: 0.9rem; /* Adjust text size */
        }
    }
</style>
