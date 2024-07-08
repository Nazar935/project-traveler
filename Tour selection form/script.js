// Додаємо обробник подій для форми
document.getElementById('tourForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Зупиняємо стандартне відправлення форми

    // Отримуємо дані форми
    const formData = new FormData(this);

    // Перетворюємо дані у формат JSON
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Відправляємо дані на бекенд через fetch API
    fetch('URL_ВАШОГО_БЕКЕНДУ', { // Замість 'URL_ВАШОГО_БЕКЕНДУ' вкажіть справжню URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        // Обробка відповіді від сервера
        console.log('Success:', result);
        alert('Форма успішно відправлена!');
        // Очищуємо форму
        this.reset();
    })
    .catch(error => {
        // Обробка помилок
        console.error('Error:', error);
        alert('Сталася помилка при відправленні форми: ' + error.message);
    });
});
