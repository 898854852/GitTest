// public/js/script.js

// Ensure form fields are filled before submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const togglePassword = document.createElement('span');
    
    // Create a toggle password button
    togglePassword.innerText = 'Show';
    togglePassword.style.cursor = 'pointer';
    togglePassword.style.marginLeft = '8px';
    passwordInput.parentNode.insertBefore(togglePassword, passwordInput.nextSibling);

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.innerText = 'Hide';
        } else {
            passwordInput.type = 'password';
            togglePassword.innerText = 'Show';
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
