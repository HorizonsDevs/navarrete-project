<script>
	import HeroCarousel from '../lib/components/Hero.svelte';
	import ProductsCarousel from '../lib/components/Products.svelte';
	import Location from '../lib/components/Location.svelte';
	import Retailers from '../lib/components/Retailers.svelte';
	import Footer from '$lib/components/Footer.svelte';
	export const prerender = true; // This ensures the page is prerendered
</script>

<div class="content">
	

	<!-- Hero section -->
	<section class="hero-section" id="hero">
		<HeroCarousel />
	</section>

	<!-- Products section -->
	<section class="products-section" id="products">
		<ProductsCarousel />
	</section>

	<!-- Location section -->
	<section class="location-section" id="location">
		<Location />
	</section>

	<!-- Retailers section -->
	<section class="retailers-section" id="retailers">
		<Retailers />
	</section>
	<section>
		<Footer />
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
	.retailers-section {
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
		background-color: #a72608;
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
