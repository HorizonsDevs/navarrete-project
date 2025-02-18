<script>
    import { onMount } from 'svelte';

    let orders = [];

    onMount(async () => {
        const res = await fetch('/api/seller/orders'); // Fetch orders
        orders = await res.json();
    });
</script>

<h1>Manage Orders</h1>
<ul>
    {#each orders as order}
        <li>
            Order #{order.id} - Status: {order.status}
            <button>Update Status</button>
        </li>
    {/each}
</ul>
