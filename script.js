document.addEventListener('DOMContentLoaded', function () {
    // Приклад даних новин
    const newsData = [
        { title: 'Нові туристичні напрямки', content: 'Досліджуйте нові туристичні напрямки цього літа.' },
        { title: 'Поради безпеки в подорожах', content: 'Залишайтеся в безпеці під час подорожей з цими порадами.' },
        { title: 'Знижки на відпочинок', content: 'Отримайте чудові знижки на відпочинкові пакети.' }
    ];

    // Додавання даних новин у розділ новин
    const newsContainer = document.querySelector('.news-container');
    newsData.forEach(newsItem => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('news-item');
        newsDiv.innerHTML = `<h3>${newsItem.title}</h3><p>${newsItem.content}</p>`;
        newsContainer.appendChild(newsDiv);
    });

    // Приклад даних галереї
    const galleryData = [
        'gallery1.jpg', 'gallery2.jpg', 'gallery3.jpg'
    ];

    // Додавання фотографій у розділ галереї
    const galleryContainer = document.querySelector('.gallery-container');
    galleryData.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `images/${image}`;
        imgElement.alt = 'Фото галереї';
        galleryContainer.appendChild(imgElement);
    });

    // Обробка відправки форми контакту
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Форму відправлено! Ми зв’яжемося з вами найближчим часом.');
        contactForm.reset();
    });

    // Дані курортів залежно від країни
    const resortsByCountry = {
        Туреччина: ['Анталія', 'Бодрум', 'Мармарис'],
        Єгипет: ['Шарм-ель-Шейх', 'Хургада', 'Дахаб'],
        Греція: ['Афіни', 'Салоніки', 'Крит'],
        Іспанія: ['Барселона', 'Мадрид', 'Валенсія']
    };

    // Обробка зміни країни відпочинку
    const destinationCountrySelect = document.getElementById('destinationCountry');
    const resortSelect = document.getElementById('resort');

    destinationCountrySelect.addEventListener('change', function () {
        const selectedCountry = destinationCountrySelect.value;
        const resorts = resortsByCountry[selectedCountry] || [];

        // Очищення попередніх опцій курортів
        resortSelect.innerHTML = '<option value="">Виберіть курорт</option>';
        resorts.forEach(resort => {
            const option = document.createElement('option');
            option.value = resort;
            option.textContent = resort;
            resortSelect.appendChild(option);
        });
    });

    // Обробка відправки форми пошуку туру
    const tourSearchForm = document.getElementById('tourSearchForm');
    tourSearchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(tourSearchForm);
        const searchParams = {
            destinationCountry: formData.get('destinationCountry'),
            resort: formData.get('resort'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            duration: formData.get('duration'),
            adults: formData.get('adults'),
            children: formData.get('children'),
            departureCountry: formData.get('departureCountry')
        };
        console.log('Пошук туру з параметрами:', searchParams);
        alert('Пошук туру буде реалізовано у наступній версії.');
    });
});
