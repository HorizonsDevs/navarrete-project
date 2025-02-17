<script>
	import { translations } from '../stores/languageStore';
	import mapImage from '../images/map.png';
	import Map from './Map.svelte';
	// Reactive subscription to the translations store
	$: currentTranslations = $translations;
</script>

<div class="location-container">
	<h2 class="location_title">{$translations.location_title || 'Location'}</h2>
	<p>
		{$translations.location_description || 'Come visit us at'}
		{$translations.location_address || '8152 Dyer St Suite 8202, El Paso, TX 79904'}
	</p>
	<!-- <img src={mapImage} alt="Map showing location" class="map-image" /> -->
	<Map />
</div>

<style>
	.location-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 1rem;
	}

	/* h2 {
		font-family: 'Rye', cursive;
		font-size: 3rem;
		color: #a72608;
	} */

	.address {
		font-family: 'Montserrat', sans-serif;
		font-size: 1.2rem;
		color: #333;
		margin: 0.5rem 0;
	}

	/* .map-image {
		max-width: 80%;
		border-radius: 10px;
	} */

	@media (max-width: 768px) {
		h2 {
			font-size: 2.5rem;
		}
		p {
			font-size: 1rem;
		}
	}
	.location_title {
		font-family: 'Rye', cursive;
		font-size: 3rem;
		color: #a72608;
		/* font-size: 2rem; Adjust font size for readability */
		font-weight: bold;
		margin-bottom: 1rem;
	}

	@media (max-width: 1290px) {
		.location_title {
			font-size: 2.5rem; /* Adjust font size for smaller screens */
		}
	}
</style>
