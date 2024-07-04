document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');

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
});
