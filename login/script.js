document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.success) {
            messageElement.textContent = 'Login successful!';
            // Redirect to another page or perform further actions
        } else {
            messageElement.textContent = 'Login failed: ' + data.message;
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = 'An error occurred: ' + error.message;
    });
});
