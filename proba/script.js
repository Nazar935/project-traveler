document.addEventListener('DOMContentLoaded', () => {
    // Ініціалізація випадаючих списків
    const countrySelect = document.getElementById('countrySelect');
    const resortSelect = document.getElementById('resortSelect');
    const departureCitySelect = document.getElementById('departureCitySelect');

    // Заповнення випадаючих списків даними (замість цих даних будуть реальні дані)
    const countries = ['Україна', 'Туреччина', 'Єгипет'];
    const resorts = {
        'Україна': ['Карпати', 'Одеса', 'Київ'],
        'Туреччина': ['Анталія', 'Стамбул', 'Аланія'],
        'Єгипет': ['Шарм-ель-Шейх', 'Хургада', 'Каїр']
    };
    const cities = ['Київ', 'Львів', 'Одеса'];

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        departureCitySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', () => {
        const selectedCountry = countrySelect.value;
        resortSelect.innerHTML = '';

        if (resorts[selectedCountry]) {
            resorts[selectedCountry].forEach(resort => {
                const option = document.createElement('option');
                option.value = resort;
                option.textContent = resort;
                resortSelect.appendChild(option);
            });
        }
    });

    // Ініціалізація лічильників
    const adultsValue = document.getElementById('adults-value');
    const childrenValue = document.getElementById('children-value');

    document.getElementById('adults-increment').addEventListener('click', () => {
        adultsValue.textContent = parseInt(adultsValue.textContent) + 1;
    });

    document.getElementById('adults-decrement').addEventListener('click', () => {
        const currentValue = parseInt(adultsValue.textContent);
        if (currentValue > 1) {
            adultsValue.textContent = currentValue - 1;
        }
    });

    document.getElementById('children-increment').addEventListener('click', () => {
        childrenValue.textContent = parseInt(childrenValue.textContent) + 1;
    });

    document.getElementById('children-decrement').addEventListener('click', () => {
        const currentValue = parseInt(childrenValue.textContent);
        if (currentValue > 0) {
            childrenValue.textContent = currentValue - 1;
        }
    });

    // Логіка для кнопки пошуку
    document.getElementById('searchButton').addEventListener('click', () => {
        alert('Пошук туру здійснено!');
    });
});
