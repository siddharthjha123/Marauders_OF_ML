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
    const { data, error } = await supabase.auth.signInWithPassword({
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
