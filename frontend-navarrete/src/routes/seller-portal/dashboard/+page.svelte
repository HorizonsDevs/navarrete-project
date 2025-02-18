<script>
    import { onMount } from 'svelte';

    let salesData = {};
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get API base URL

    async function fetchData() {
        try {
            console.log("API Base URL:", API_BASE_URL); // Debugging check
            const res = await fetch(`${API_BASE_URL}/seller/dashboard`);
            if (!res.ok) throw new Error(`Failed to fetch dashboard data: ${res.status} ${res.statusText}`);
            salesData = await res.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    onMount(fetchData);
</script>

<h1>Seller Dashboard</h1>
<p>Total Sales: {salesData.totalSales || 0}</p>
<p>Revenue: {salesData.revenue || 0}</p>
<p>Pending Orders: {salesData.pendingOrders || 0}</p>
