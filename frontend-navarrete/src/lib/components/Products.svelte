<script>
    import { onMount } from 'svelte';
    import { translations } from '../stores/languageStore';
    import EmblaCarousel from 'embla-carousel';

    // Import SVG assets
    import spicy from "../assets/hotnspicy.svg";
    import spicylemon from "../assets/spicylemon.svg";
    import natural from "../assets/natural.svg";
    import lemonpepper from "../assets/lemonpepper.svg";

    // Associate images with product translations
    const productImages = [natural, lemonpepper, spicylemon, spicy];

    let embla;
    let emblaNode;

    let translatedProducts = []; // Store the translated products

    // Reactive statement to update products when translations change
    $: translatedProducts = $translations.products || [];

    onMount(() => {
        embla = EmblaCarousel(emblaNode, { loop: true, speed: 8 });

        scrollNext = () => embla && embla.scrollNext();
        scrollPrev = () => embla && embla.scrollPrev();
    });

    let scrollNext = () => {};
    let scrollPrev = () => {};
</script>

<div class="products-carousel" bind:this={emblaNode}>
    <div class="products-embla__container">
        {#each translatedProducts as product, index}
            <div class="products-embla__slide">
                <div class="product">
                    <img src={productImages[index]} alt={product.flavor} class="product-image" />
                    <div class="product-info">
                        <h1 class="flavor">{product.flavor}</h1>
                        <p class="description">{product.description}</p>
                        <a href="#order-now" class="order-link">ORDER NOW</a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Navigation Buttons -->
<button on:click={scrollPrev} class="products-nav-button products-prev-button" aria-label="Previous Slide">‹</button>
<button on:click={scrollNext} class="products-nav-button products-next-button" aria-label="Next Slide">›</button>


<style>
    /* Carousel styling */
    .products-carousel {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1b1b1b;
        color: white;
    }

    .products-embla__container {
        display: flex;
        width: 100%;
    }

    .products-embla__slide {
        min-width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Styling for each product */
    .product {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 1000px;
        width: 100%;
        padding: 1em;
    }

    /* Image styling */
    .product-image {
        max-width: 40%;
        height: auto;
        margin-right: 2em;
    }

    /* Product text styling */
    .product-info {
        max-width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    /* Font styling */
    .flavor {
        font-family: 'Rye', cursive;
        font-size: 2em;
        color: white;
        margin: 0.5em 0;
    }

    .description {
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1em;
        margin: 1em 0;
        color: white;
    }

    .order-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: #A72608;
    text-decoration: none;
    font-size: 1.1em;
    align-self: end;
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease;
}

.order-link::after {
    content: '';
    position: absolute;
    bottom: -2px; /* Position the line just below the text */
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #A72608;
    transform: translateX(-100%); /* Start hidden */
    transition: transform 0.3s ease; /* Smooth transition */
}

.order-link:hover {
    color: #d83f00; /* Slightly darker shade on hover */
    
}

.order-link:hover::after {
    transform: translateX(0); /* Slide in the underline */
}

    /* Seamless Navigation button styling specific to ProductsCarousel */
    .products-nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: white;
        font-size: 2.5em;
        cursor: pointer;
        padding: 0.2em 0.5em;
        opacity: 0.5;
        transition: opacity 0.3s ease;
        z-index: 10; /* Ensure they appear above other elements */
    }

    .products-nav-button:hover {
        opacity: 0.9; /* Subtle hover effect */
    }

    .products-prev-button {
        left: 1em;
    }

    .products-next-button {
        right: 1em;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .flavor {
            font-size: 1.5em;
        }
        .description {
            font-size: 1em;
        }
        .product-image {
            max-width: 35%;
        }
        .order-link {
            font-size: 1em;
        }
    }
</style>
