<script>
    import Navbar from '../lib/components/Navbar.svelte';
    import LanguageSwitcher from '../lib/components/LanguageSwitcher.svelte';
  </script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Rye&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    @import '../global.css';
  </style>
  
  <Navbar />
  <LanguageSwitcher />
  <slot />
  