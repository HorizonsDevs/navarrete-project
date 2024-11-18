<script>
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

    export let retailers = [
        { name: "Merca Dillo", logo: img1 },
        { name: "Time Out Sports Cantina", logo: img2 },
        { name: "Oasis Bar", logo: img3 },
        { name: "Rowdy's", logo: img4 },
        { name: "Zeke's", logo: img5 },
        { name: "Good Coffee", logo: img6 },
        { name: "El Cuademingo", logo: img7 },
        { name: "Better Time Store", logo: img8 },
        { name: "Other Retailer", logo: img9 }
    ];
</script>

<div class="retailers-container">
    <h2>Retailers</h2>
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
        width:100dvh;
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
        grid-template-columns: repeat(3, 1fr); /* Create 3 columns for 9 items */
        grid-auto-rows: 1fr; /* Evenly space the rows */
        gap: 2rem; /* Add space between items */
        width: 90%; /* Ensure grid spans a good portion of the container */
        max-width: 1200px;
    }

    .retailer {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .retailer-logo {
        width: 100%;
        max-width: 150px; /* Limit maximum size */
        height: auto;
        margin-bottom: 0.5rem;
    }

    p {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        color: #333;
        text-align: center;
    }

    @media (max-width: 768px) {
        .retailers-grid {
            grid-template-columns: repeat(2, 1fr); /* Adjust to 2 columns on smaller screens */
        }
    }

    @media (max-width: 480px) {
        .retailers-grid {
            grid-template-columns: repeat(1, 1fr); /* Adjust to 1 column on extra small screens */
        }
    }
</style>
