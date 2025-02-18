<script>
    import Navbar from '../lib/components/Navbar.svelte';
    import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { auth } from '$lib/stores/auth';

    // Ensure all pages using this layout are prerendered
    export const prerender = true;

    let user = null;
    
    $: auth.subscribe(value => {
        user = value?.user;
    });

    // Redirect sellers/admins to the seller portal, but allow access to regular users
    onMount(() => {
        if (user && user.role === 'admin' && window.location.pathname.startsWith('/seller-portal')) {
            goto('/seller-portal/dashboard');
        }
    });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rye&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    @import '../global.css';
</style>

<Navbar />
<LanguageSwitcher />
<slot />
