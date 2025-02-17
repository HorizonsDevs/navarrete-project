<script>
    import { onMount } from 'svelte';
    import { translations, language } from '../stores/languageStore';
    import { get } from 'svelte/store';
    import EmblaCarousel from 'embla-carousel';
    import hero1 from '../images/hero1.webp';
    import hero2 from '../images/hero2.webp';
    import hero3 from '../images/hero3.webp';

    // Carousel slides with translation keys
    const slides = [
        { image: hero1, titleKey: 'hero_slide1_title', subtitleKey: 'hero_slide1_subtitle' },
        { image: hero2, titleKey: 'hero_slide2_title', subtitleKey: 'hero_slide2_subtitle' },
        { image: hero3, titleKey: 'hero_slide3_title', subtitleKey: 'hero_slide3_subtitle' }
    ];

    let embla;
    let emblaNode;

    // Initialize Embla Carousel
    onMount(() => {
        console.log("Initializing Embla carousel...");
        embla = EmblaCarousel(emblaNode, { loop: true, speed: 8 });
        console.log("Embla instance:", embla);

        scrollNext = () => embla && embla.scrollNext();
        scrollPrev = () => embla && embla.scrollPrev();
    });

    let scrollNext = () => {};
    let scrollPrev = () => {};

    // Debugging translation and language changes
    $: console.log("Updated translations:", $translations);
    $: console.log("Current language:", $language);
</script>

<!-- Hero Carousel -->
<div class="hero-carousel" bind:this={emblaNode}>
    <div class="hero-embla__container">
        {#each slides as slide}
            <div class="hero-embla__slide">
                <div class="hero-slide-content">
                    <img src={slide.image} alt={$translations[slide.titleKey] || 'Missing title'} class="hero-slide-image" />
                    <div class="hero-slide-text">
                        <h1 class="hero-title">{$translations[slide.titleKey] || 'Missing title'}</h1>
                        <p class="hero-subtitle">{$translations[slide.subtitleKey] || 'Missing subtitle'}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Navigation Buttons -->
<button on:click={scrollPrev} class="hero-nav-button hero-prev-button" aria-label="Previous Slide">‹</button>
<button on:click={scrollNext} class="hero-nav-button hero-next-button" aria-label="Next Slide">›</button>

<style>
    /* Ensure the carousel dynamically fits the viewport */
    .hero-carousel {
        position: relative;
        width: 100vw;
        height: 100vh; /* Occupy the full viewport height */
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hero-embla__container {
        display: flex;
        width: 100%;
    }

    .hero-embla__slide {
        min-width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    /* Ensure the image fits the full viewport dynamically */
    .hero-slide-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* Maintain aspect ratio, crop if needed */
        z-index: -1; /* Place the image behind the text */
    }

    /* Text overlay styling */
    .hero-slide-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.856);
        padding: 1rem;
    }

    /* Title styling */
    .hero-title {
        font-family: 'Rye', cursive;
        font-size: 3vw; /* Dynamically scale based on viewport width */
        margin-bottom: 0.5em;
        color: #f5a623;
    }

    /* Subtitle styling */
    .hero-subtitle {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5vw; /* Dynamically scale based on viewport width */
        color: white;
    }

    /* Navigation Buttons */
    .hero-nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: white;
        font-size: 2.5vw;
        cursor: pointer;
        opacity: 0.7;
        z-index: 10;
    }

    .hero-prev-button {
        left: 1em;
    }

    .hero-next-button {
        right: 1em;
    }

    /* Adjustments for smaller screens */
    @media (max-width: 768px) {
        .hero-title {
            font-size: 6vw; /* Larger titles for small screens */
        }
        .hero-subtitle {
            font-size: 4vw; /* Larger subtitles for small screens */
        }
        .hero-nav-button {
            font-size: 5vw;
        }
    }
</style>
