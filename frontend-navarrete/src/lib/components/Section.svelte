<script>
    export let id;
    export let background = '#ffffff'; // default background color
</script>

<section id={id} style="background-color: {background};">
    <slot></slot>
</section>

<style>
    /* Basic styling for each section to occupy full viewport height */
    section {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2em;
    }
</style>
