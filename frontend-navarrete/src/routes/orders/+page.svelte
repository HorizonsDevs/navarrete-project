<script>
    import { onMount } from "svelte";
    import { auth } from "$lib/stores/auth";

    let orders = [];
    let loading = true;
    let error = "";
    
    // API Base URL
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

    // Fetch User Orders
    async function fetchOrders() {
        loading = true;
        error = "";

        try {
            const userToken = $auth.token;

            if (!userToken) {
                error = "You must be logged in to view orders.";
                return;
            }

            const response = await fetch(`${API_BASE_URL}/users/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch orders.");

            const data = await response.json();
            orders = data.orders || [];
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    onMount(fetchOrders);
</script>

<div class="orders-container">
    <h1 class="orders-title">Your Orders</h1>

    {#if loading}
        <p class="loading">Loading your orders...</p>
    {:else if error}
        <p class="error">{error}</p>
    {:else if orders.length === 0}
        <p class="no-orders">You have no orders yet.</p>
    {:else}
        <div class="orders-grid">
            {#each orders as order}
                <div class="order-card">
                    <h2 class="order-id">Order # {order.id}</h2>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Placed on:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                    <button class="view-btn">View Details</button>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rye&family=Montserrat:wght@400;700&display=swap');

    /* Page container */
    .orders-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        font-family: 'Montserrat', sans-serif;
    }

    /* Title */
    .orders-title {
        font-family: 'Rye', cursive;
        font-size: 2.2rem;
        margin-bottom: 1.5rem;
        color: #333;
    }

    /* Loading, error, and empty state messages */
    .loading, .error, .no-orders {
        font-size: 1.2rem;
        color: #666;
    }

    .error {
        color: #d9534f;
        background: rgba(217, 83, 79, 0.1);
        padding: 10px;
        border-radius: 5px;
    }

    /* Orders grid */
    .orders-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    /* Individual order card */
    .order-card {
        background: #fff;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        text-align: left;
        transition: transform 0.2s ease;
    }

    .order-card:hover {
        transform: translateY(-5px);
    }

    .order-id {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    /* View Details button */
    .view-btn {
        background: #A72608;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        font-size: 1rem;
        border-radius: 8px;
        transition: all 0.2s ease;
        font-weight: bold;
        display: block;
        width: 100%;
        margin-top: 1rem;
    }

    .view-btn:hover {
        background: #d03a17;
        transform: scale(1.02);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .orders-container {
            padding: 1rem;
        }

        .orders-title {
            font-size: 1.8rem;
        }

        .order-card {
            padding: 1rem;
        }
    }
</style>
