<script>
	import { translations, language } from '../stores/languageStore';

	// Reactive language variable for the map, default to 'en'
	let mapLang = 'en';

	// Listen for translation updates
	$: mapLang = $translations?.mapLang || 'en';

	// Base map source (Non-satellite view) - dynamically updates
	$: mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4920.116739685949!2d-106.44068772330128!3d31.85429803056625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e751a468e9c1eb%3A0x2bac5960ace859e!2sCarne%20Seca%20Navarrete%20El%20Paso!5e0&hl=${mapLang}`;
</script>

<iframe
	class="map-container"
	style="border:0;"
	allowfullscreen=""
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
	src={mapSrc}
	key={mapSrc}
>
</iframe>

<style>
	.map-container {
		position: relative;
		width: clamp(280px, 80vw, 1020px);
		height: clamp(250px, 60vh, 450px);
		margin: auto;
		border-radius: 12px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}
</style>
