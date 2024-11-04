<script>
    import HeroCarousel from '../lib/components/Hero.svelte';
    import ProductsCarousel from '../lib/components/Products.svelte';
</script>

<!-- Main content wrapper to structure the page layout -->
<div class="content">
    <!-- Hero section wrapper to isolate styles and functionality -->
    <section class="hero-section" id="hero">
        <HeroCarousel />
    </section>

    <!-- Products section wrapper to isolate styles and functionality -->
    <section class="products-section" id="products">
        <ProductsCarousel />
    </section>

    <!-- Location section placeholder -->
    <section class="location-section" id="location">
        <div class="section-content">
            <h2>Our Location</h2>
            <p>Find us at the heart of Texas. Visit our store for the best jerky around.</p>
        </div>
    </section>

    <!-- Retailers section placeholder -->
    <section class="retailers-section" id="retailers">
        <div class="section-content">
            <h2>Our Retailers</h2>
            <p>Our jerky is available in select stores nationwide. Find a retailer near you.</p>
        </div>
    </section>

    <!-- Order Now section placeholder -->
    <section class="order-now-section" id="order-now">
        <div class="section-content">
            <h2>Order Now</h2>
            <p>Get your favorite Navarrete Beef Jerky delivered straight to your door.</p>
            <button class="order-button">Shop Now</button>
        </div>
    </section>
</div>

<style>
    /* Main content styling to separate the sections and give them space */
    .content {
        display: flex;
        flex-direction: column;
        overflow-x: hidden; /* Prevent horizontal scroll on the content wrapper */
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Specific styling for each section wrapper */
    .hero-section,
    .products-section,
    .location-section,
    .retailers-section,
    .order-now-section {
        position: relative;
        width: 100%; /* Use 100% width to prevent overflow */
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    /* Section-specific content styling */
    .section-content {
        max-width: 600px;
        color: white;
    }

    /* Styling for section headings */
    h2 {
        font-family: 'Rye', cursive;
        color: #f5a623;
        font-size: 2.5em;
        margin-bottom: 0.5em;
    }

    /* Styling for section paragraphs */
    p {
        font-family: 'Montserrat', sans-serif;
        color: white;
        font-size: 1.2em;
        margin: 0.5em 0;
    }

    /* Order button styling */
    .order-button {
        background-color: #A72608;
        color: white;
        padding: 1em 2em;
        border: none;
        font-size: 1.1em;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .order-button:hover {
        background-color: #922005;
    }

    /* Prevent horizontal scrolling on the body */
    body {
        overflow-x: hidden;
    }
</style>
