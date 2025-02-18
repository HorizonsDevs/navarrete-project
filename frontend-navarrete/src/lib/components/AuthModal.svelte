<script>
    import { auth, login } from "$lib/stores/auth";

    export let showAuthModal; // Controls modal visibility

    let isSignUp = false; // Toggles between Login & Signup
    let name = "";
    let email = "";
    let password = "";
    let error = "";

    // Use environment variable for API base URL
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

    async function handleAuth() {
        try {
            let endpoint = isSignUp ? "register" : "login";
            let url = `${API_BASE_URL}/users/${endpoint}?${new URLSearchParams({ 
                name, email, password 
            })}`;

            const response = await fetch(url, { method: "POST" });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Authentication failed");

            // Store user info & token
            login(data.user, data.token);

            // Close modal
            showAuthModal = false;
        } catch (err) {
            error = err.message;
        }
    }
</script>

{#if showAuthModal}
    <div class="modal-overlay" on:click={() => showAuthModal = false}>
        <div class="modal" on:click|stopPropagation>
            <h2 class="modal-title">{isSignUp ? "Create an Account" : "Login"}</h2>

            {#if error}
                <p class="error">{error}</p>
            {/if}

            {#if isSignUp}
                <input type="text" bind:value={name} placeholder="Full Name">
            {/if}

            <input type="email" bind:value={email} placeholder="Email">
            <input type="password" bind:value={password} placeholder="Password">

            <button class="auth-btn" on:click={handleAuth}>
                {isSignUp ? "Sign Up" : "Login"}
            </button>

            <p class="toggle-auth" on:click={() => isSignUp = !isSignUp}>
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </p>

            <button class="close-btn" on:click={() => showAuthModal = false}>Close</button>
        </div>
    </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Rye&family=Montserrat:wght@400;700&display=swap');

    /* Global Font */
    * {
        font-family: 'Montserrat', sans-serif;
    }

    /* Overlay background */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px); /* Slight blur for depth */
    }

    /* Modal */
    .modal {
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        gap: 14px;
        width: 350px;
        max-width: 90%;
        animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            transform: translateY(-15px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Modal Title */
    .modal-title {
        font-family: 'Rye', cursive;
        font-size: 1.7rem;
        text-align: center;
        margin-bottom: 0.75rem;
        color: #333;
    }

    /* Input fields */
    input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.2s ease;
        outline: none;
    }

    input:focus {
        border-color: #A72608;
        box-shadow: 0 0 5px rgba(167, 38, 8, 0.4);
    }

    /* Auth button */
    .auth-btn {
        background: #A72608;
        color: white;
        border: none;
        padding: 12px;
        cursor: pointer;
        font-size: 1rem;
        border-radius: 8px;
        transition: all 0.2s ease;
        font-weight: bold;
    }

    .auth-btn:hover {
        background: #d03a17;
        transform: scale(1.02);
    }

    /* Toggle link */
    .toggle-auth {
        text-align: center;
        color: #A72608;
        font-size: 0.9rem;
        cursor: pointer;
        margin-top: 5px;
        font-weight: 500;
    }

    .toggle-auth:hover {
        text-decoration: underline;
    }

    /* Error message */
    .error {
        color: #d9534f;
        text-align: center;
        font-size: 0.9rem;
        background: rgba(217, 83, 79, 0.1);
        padding: 6px;
        border-radius: 5px;
    }

    /* Close button */
    .close-btn {
        margin-top: 10px;
        background: #666;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-size: 0.9rem;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .close-btn:hover {
        background: #444;
        transform: scale(1.05);
    }
</style>
