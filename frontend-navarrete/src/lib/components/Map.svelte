<script>
	export let mapSrc =
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4920.116739685949!2d-106.44068772330128!3d31.85429803056625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e751a468e9c1eb%3A0x2bac5960ace859e!2sCarne%20Seca%20Navarrete%20El%20Paso!5e1!3m2!1ses-419!2sus!4v1738859962718!5m2!1ses-419!2sus';
</script>

<iframe
	class="map-container"
	style="border:0;"
	allowfullscreen=""
	loading="lazy"
	referrerpolicy="no-referrer-when-downgrade"
	src={mapSrc}
>
</iframe>

<style>
	/* 🔹 Base Styles */
	.map-container {
		position: relative;
		width: 1020px;
		height: 450px;
		margin: auto;
		border-radius: 12px;
		/* overflow: hidden; */
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	}

	/* 🔹 Responsive for iPhone 14 Pro Max (Portrait) */
	@media (max-width: 430px) {
		.map-container {
			width: 350px; /* Reduce height for smaller screens */
		}
	}

	/* 🔹 Responsive for iPhone 14 Pro Max (Landscape) */
	@media (max-width: 932px) and (orientation: landscape) {
		.map-container {
			height: 250px; /* Reduce height for landscape mode */
			width: 700px;
		}
	}

	/* 🔹 Extra Small Devices (Generic Phones) */
	@media (max-width: 375px) {
		.map-container {
			width: 280px;
		}
	}
</style>
