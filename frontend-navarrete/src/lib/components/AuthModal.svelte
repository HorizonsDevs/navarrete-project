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
    /* Overlay background */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    /* Modal */
    .modal {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 320px;
        animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .modal-title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 0.5rem;
    }

    /* Input fields */
    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    /* Auth button */
    .auth-btn {
        background: #A72608;
        color: white;
        border: none;
        padding: 10px;
        cursor: pointer;
        font-size: 1rem;
        border-radius: 5px;
        transition: background 0.2s ease;
    }

    .auth-btn:hover {
        background: #d03a17;
    }

    /* Toggle link */
    .toggle-auth {
        text-align: center;
        color: #A72608;
        font-size: 0.9rem;
        cursor: pointer;
        margin-top: 5px;
    }

    .toggle-auth:hover {
        text-decoration: underline;
    }

    /* Error message */
    .error {
        color: red;
        text-align: center;
        font-size: 0.9rem;
    }

    /* Close button */
    .close-btn {
        margin-top: 10px;
        background: gray;
        color: white;
        border: none;
        padding: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        border-radius: 5px;
        transition: background 0.2s ease;
    }

    .close-btn:hover {
        background: darkgray;
    }
</style>
