document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const messageElement = document.getElementById('message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = registerForm.username.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        if (password !== confirmPassword) {
            messageElement.textContent = 'Passwords do not match.';
            return;
        }

        // Add your registration logic here (e.g., send data to the server)
        messageElement.textContent = 'Registration successful!';
        messageElement.style.color = 'green';
    });
});
