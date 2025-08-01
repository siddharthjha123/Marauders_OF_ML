document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.switch-panel');
    const forms = document.querySelectorAll('.auth-form');
    const graphics = document.querySelectorAll('.graphic-panel');

    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            const target = e.target.dataset.panel;
            
            // Switch active states
            panels.forEach(p => p.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            graphics.forEach(graphic => graphic.classList.remove('active'));

            e.target.classList.add('active');
            document.getElementById(`${target}Form`).classList.add('active');
            document.querySelector(`[data-panel="${target}"]`).classList.add('active');

            // Animate form container
            document.querySelector('.forms-container').style.transform = 
                target === 'signup' ? 'translateX(-10%)' : 'translateX(0)';
        });
    });

    // Form validation
    document.querySelectorAll('.auth-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    isValid = false;
                    input.parentElement.classList.add('invalid');
                }
            });

            if (isValid) {
                form.classList.add('submitting');
                // Simulate API call
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('submitting');
                    alert('Authentication successful! Redirecting...');
                }, 1500);
            }
        });
    });

    // Input validation
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('invalid');
        });
    });
});