// Include supabaseClient.js first!
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous errors
    document.getElementById('serverError').textContent = '';

    // Supabase sign-in
    const {
        data,
        error
    } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        document.getElementById('serverError').textContent = error.message;
    } else {
        alert("Login successful!");
        window.location.href = '/index.html'; // <--- Redirect here
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const closeBtn = document.getElementById('close-sidebar-btn');

    // Open sidebar
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.add('is-open');
        });
    }

    // Close sidebar
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('is-open');
        });
    }
});