// public/js/script.js

// Ensure form fields are filled before submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const togglePassword = document.createElement('span');
    
   // JavaScript to toggle password visibility
   document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';  // Show password
    } else {
        passwordField.type = 'password';  // Hide password
    }
});

    // Basic form validation
    loginForm.addEventListener('submit', (event) => {
        if (!usernameInput.value || !passwordInput.value) {
            event.preventDefault();
            alert('Please fill in both fields.');
        }
    });
});
