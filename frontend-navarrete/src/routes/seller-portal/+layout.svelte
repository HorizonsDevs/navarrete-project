<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';

    let user = null;
    let activeTab = 'dashboard';
    
    $: auth.subscribe(value => {
        user = value?.user;
    });

    // Redirect if user is not an admin
    onMount(() => {
        if (!user || user.role !== 'admin') {
            goto('/');
        }
    });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

    * {
        font-family: 'Montserrat', sans-serif;
    }

    .seller-portal {
        display: flex;
        min-height: 100vh;
        background-color: #ffffff;
    }

    .sidebar {
        width: 250px;
        background: #8B0000;
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .sidebar h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }

    .sidebar a {
        text-decoration: none;
        color: white;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        transition: background 0.3s ease;
        font-weight: bold;
    }

    .sidebar a:hover {
        background: #a02020;
    }

    .content {
        flex: 1;
        padding: 30px;
        background: #f8f8f8;
    }

    h1 {
        color: #333;
        font-size: 2rem;
        margin-bottom: 15px;
    }

    p {
        font-size: 1.1rem;
        color: #555;
    }
</style>

<div class="seller-portal">
    <!-- Sidebar Navigation -->
    <div class="sidebar">
        <h2>Seller Portal</h2>
        <a href="#" on:click={() => activeTab = 'dashboard'} class:active={activeTab === 'dashboard'}>Dashboard</a>
        <a href="#" on:click={() => activeTab = 'products'} class:active={activeTab === 'products'}>Manage Products</a>
        <a href="#" on:click={() => activeTab = 'orders'} class:active={activeTab === 'orders'}>Manage Orders</a>
        <a href="#" on:click={() => activeTab = 'settings'} class:active={activeTab === 'settings'}>Settings</a>
    </div>

    <!-- Dynamic Content -->
    <div class="content">
        {#if activeTab === 'dashboard'}
            <h1>Dashboard</h1>
            <p>Overview of sales and performance.</p>
        {/if}
        {#if activeTab === 'products'}
            <h1>Manage Products</h1>
            <p>Add, edit, and remove products.</p>
        {/if}
        {#if activeTab === 'orders'}
            <h1>Manage Orders</h1>
            <p>View and update orders.</p>
        {/if}
        {#if activeTab === 'settings'}
            <h1>Settings</h1>
            <p>Manage your seller settings.</p>
        {/if}
    </div>
</div>
