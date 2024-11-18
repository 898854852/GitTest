document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const togglePassword = document.getElementById('show-password');
    
    togglePassword.addEventListener('change', function() {
        if (this.checked) {
            passwordInput.type = 'text';  
        } else {
            passwordInput.type = 'password'; 
        }
    });

    loginForm.addEventListener('submit', (event) => {
        if (!usernameInput.value || !passwordInput.value) {
            event.preventDefault();
            alert('Please fill in both fields.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    const signupForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');

    signupForm.addEventListener('submit', (event) => {
        if (!usernameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
            event.preventDefault();
            alert('Please fill in all fields.');
        }

        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            event.preventDefault();
            alert('Passwords do not match!');
        }
    });
});
