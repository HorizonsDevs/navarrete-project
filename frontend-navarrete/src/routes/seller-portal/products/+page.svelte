<script>
    import { onMount } from 'svelte';

    let products = [];
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'; // Access API base URL

    onMount(async () => {
        const res = await fetch(`${API_BASE_URL}/seller/products`);
        products = await res.json();
    });

    async function deleteProduct(id) {
        await fetch(`${API_BASE_URL}/seller/products/${id}`, { method: 'DELETE' });
        products = products.filter(p => p.id !== id);
    }
</script>

<h1>Manage Products</h1>
<ul>
    {#each products as product}
        <li>
            {product.name} - ${product.price}
            <button on:click={() => deleteProduct(product.id)}>Delete</button>
        </li>
    {/each}
</ul>
