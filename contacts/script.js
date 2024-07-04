document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    const form = document.getElementById('callbackForm');
    const message = document.getElementById('message');

    phoneInput.addEventListener('input', function() {
        const maxLength = 9;
        let value = phoneInput.value;

        if (value.length > maxLength) {
            phoneInput.value = value.slice(0, maxLength);
        }

        if (!/^\d*$/.test(value)) {
            phoneInput.value = value.replace(/\D/g, '');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const phone = phoneInput.value;

        if (phone.length === 9) {
            message.textContent = "Дякую за ваше звернення, наш консультант зв'яжеться з вами найближчим часом.";
            message.style.color = '#0044cc'; // Блакитний колір
        } else {
            message.textContent = "Ваш номер телефону був введений некоректно, будь ласка, повторіть спробу.";
            message.style.color = '#ff0000'; // Червоний колір для помилки
            phoneInput.value = '';
        }
    });
});
