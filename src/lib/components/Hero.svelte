<script>
    import { onMount } from 'svelte';
    import EmblaCarousel from 'embla-carousel';

    // Import images
    import hero1 from '../images/hero1.webp';
    import hero2 from '../images/hero2.webp';
    import hero3 from '../images/hero3.webp';

    // Original and duplicated slides for a seamless loop
    const slides = [
        { image: hero1, title: 'The Flavor of Texas', subtitle: 'Found in our Jerky' },
        { image: hero2, title: 'Spicy and Bold', subtitle: 'A Kick of Flavor in Every Bite' },
        { image: hero3, title: 'Premium Quality', subtitle: 'Only the Best Cuts for the Best Jerky' }
    ];

    const duplicatedSlides = [...slides, ...slides]; // Duplicate the slides array

    let embla;
    let emblaNode;

    onMount(() => {
        embla = EmblaCarousel(emblaNode, { loop: false, speed: 8 });

        // Start at the first slide of the duplicated set to allow immediate backward transition
        embla.scrollTo(slides.length, true);

        embla.on('select', () => {
            const selectedIndex = embla.selectedScrollSnap();
            const totalSlides = duplicatedSlides.length;

            // If we're at the duplicated first slide, jump to the original first slide
            if (selectedIndex === slides.length) {
                embla.scrollTo(0, true);
            }
            // If we're at the very first slide in the duplicated array, jump to the end of the original slides
            else if (selectedIndex === 0) {
                embla.scrollTo(totalSlides - slides.length, true);
            }
            // If we're at the duplicated last slide, jump to the original last slide
            else if (selectedIndex === totalSlides - 1) {
                embla.scrollTo(slides.length - 1, true);
            }
        });

        scrollNext = () => embla && embla.scrollNext();
        scrollPrev = () => embla && embla.scrollPrev();
    });

    let scrollNext = () => {};
    let scrollPrev = () => {};
</script>

<div class="hero-carousel" bind:this={emblaNode}>
    <div class="embla__container">
        {#each duplicatedSlides as slide, index}
            <div class="embla__slide">
                <img src={slide.image} alt={slide.title} class="slide-image" />
                <div class="text-overlay">
                    <h1 class="slide-title">{slide.title}</h1>
                    <p class="slide-subtitle">{slide.subtitle}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Updated button classes for consistency -->
<button on:click={scrollPrev} class="nav-button prev-button" aria-label="Previous Slide">‹</button>
<button on:click={scrollNext} class="nav-button next-button" aria-label="Next Slide">›</button>

<style>
    /* Carousel styles */
    .hero-carousel {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
    }

    .embla__container {
        display: flex;
        transition: transform 0.3s ease;
    }

    .embla__slide {
        min-width: 100vw;
        height: 100vh;
        flex-shrink: 0;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Image styling */
    .slide-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Text overlay styling */
    .text-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        padding: 1em 2em;
        border-radius: 8px;
        color: white;
        text-align: center;
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.651));
    }

    /* Title styling */
    .slide-title {
        font-family: 'Rye', cursive;
        font-size: 2.5em;
        color: #f5a623;
        stroke: 2px black;
        margin: 0;
    }

    /* Subtitle styling */
    .slide-subtitle {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5em;
        color: #f5f5f5;
        margin-top: 0.5em;
    }

    /* Updated Navigation Button styling */
    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(145, 48, 48, 0);
        border: none;
        color: white;
        font-size: 2.5em;
        cursor: pointer;
        padding: 0.5em;
        z-index: 2;
    }

    .prev-button {
        left: 1em; /* Position arrow on the left side */
    }

    .next-button {
        right: 1em; /* Position arrow on the right side */
    }

    .nav-button:hover {
        background-color: rgba(0, 0, 0, 0);
        opacity: .9;
        transition:cubic-bezier(0.215, 0.610, 0.355, 1)
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .slide-title {
            font-size: 1.8em;
        }
        .slide-subtitle {
            font-size: 1.2em;
        }
        .nav-button {
            font-size: 2em;
            padding: 0.3em;
        }
    }
</style>
