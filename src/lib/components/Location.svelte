<script>
  import mapImage from "../images/map.png";
  export let address = "8152 Dyer St Suite 8202, El Paso, TX 79904"
</script>

<div class="location-container">
  <h2>Location</h2>
  <p>Come visit us at {address}</p>
  <img src={mapImage} alt="Map showing location" class="map-image" />
</div>

<style>
  .location-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
  }

  h2 {
      font-family: 'Rye', cursive;
      font-size: 3rem;
      color: #A72608;
  }

  p {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.2rem;
      color: #333;
      margin: 1rem 0;
  }

  .map-image {
      max-width: 80%;
      border-radius: 10px;
  }
</style>
