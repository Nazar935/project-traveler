document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardHolder = document.getElementById('cardHolder').value;
    const email = document.getElementById('email').value;

    const cardNumberError = document.getElementById('cardNumberError');
    const expiryDateError = document.getElementById('expiryDateError');
    const cvvError = document.getElementById('cvvError');
    const cardHolderError = document.getElementById('cardHolderError');
    const emailError = document.getElementById('emailError');

    const cardNumberPattern = /^\d{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const cardHolderPattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;

    let isValid = true;

    if (!cardNumberPattern.test(cardNumber)) {
        cardNumberError.textContent = 'Номер карти повинен містити 16 цифр';
        isValid = false;
    } else {
        cardNumberError.textContent = '';
    }

    if (!expiryDatePattern.test(expiryDate)) {
        expiryDateError.textContent = 'Термін дії карти повинен бути у форматі MM/YY';
        isValid = false;
    } else {
        expiryDateError.textContent = '';
    }

    if (!cvvPattern.test(cvv)) {
        cvvError.textContent = 'CVV2 код повинен містити 3 цифри';
        isValid = false;
    } else {
        cvvError.textContent = '';
    }

    if (!cardHolderPattern.test(cardHolder)) {
        cardHolderError.textContent = 'Прізвище та Ім\'я повинні починатися з великої літери та бути латинськими літерами';
        isValid = false;
    } else {
        cardHolderError.textContent = '';
    }

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Введіть коректний Email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    if (isValid) {
        alert('Форма успішно відправлена');
        // Тут ви можете додати код для відправки даних на бекенд
    }
});

document.getElementById('showCvvButton').addEventListener('mousedown', function() {
    document.getElementById('cvv').type = 'text';
});

document.getElementById('showCvvButton').addEventListener('mouseup', function() {
    document.getElementById('cvv').type = 'password';
});

document.getElementById('showCvvButton').addEventListener('mouseout', function() {
    document.getElementById('cvv').type = 'password';
});

document.getElementById('expiryDate').addEventListener('input', function(event) {
    let value = event.target.value;
    if (value.length === 2 && !value.includes('/')) {
        event.target.value = value + '/';
    }
});

document.getElementById('expiryDate').addEventListener('keypress', function(event) {
    const allowedKeys = '0123456789';
    if (!allowedKeys.includes(event.key) || event.target.value.length >= 5 && !window.getSelection().toString()) {
        event.preventDefault();
    }
});

document.getElementById('expiryDate').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace') {
        const value = event.target.value;
        if (value.length === 3) {
            event.preventDefault();
            event.target.value = value.slice(0, 2);
        }
    }
});

document.getElementById('cardNumber').addEventListener('keypress', function(event) {
    const allowedKeys = '0123456789';
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
});

document.getElementById('cvv').addEventListener('keypress', function(event) {
    const allowedKeys = '0123456789';
    if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
    }
});

document.getElementById('cardHolder').addEventListener('input', function(event) {
    const value = event.target.value;
    const pattern = /^[A-Z][a-z]*\s[A-Z][a-z]*$/;
    if (!pattern.test(value)) {
        document.getElementById('cardHolderError').textContent = 'Прізвище та Ім\'я повинні починатися з великої літери та бути латинськими літерами';
    } else {
        document.getElementById('cardHolderError').textContent = '';
    }
});
