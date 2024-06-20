document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (username === 'user' && password === 'password') {
            messageElement.textContent = 'Login successful!';
            messageElement.style.color = 'green';
        } else {
            messageElement.textContent = 'Invalid username or password.';
        }
    });
});
