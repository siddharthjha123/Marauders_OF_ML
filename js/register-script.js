// Include supabaseClient.js first!
const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const age = parseInt(document.getElementById('age').value);

    // Clear previous errors
    document.getElementById('serverError').textContent = '';

    // Supabase sign-up
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                age: age
            }
        }
    });

    if (error) {
        document.getElementById('serverError').textContent = error.message;
    } else {
        alert("Registration successful! Please check your email to confirm.");
        registerForm.reset();
        window.location.href = '/login.html';
    }
});
