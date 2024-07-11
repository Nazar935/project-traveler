const apiBaseURL = "https://evident-pug-abnormally.ngrok-free.app";
const apiBaseLocalhostURL = "http://127.0.0.1:8080";

const apiToursURL = `${apiBaseURL}/tours`;
const apiToursLocalhostURL = `${apiBaseLocalhostURL}/tours`;

const apiToursCountryNamesURL = `${apiToursURL}/countryNames`;
const apiToursCountryNamesLocalhostURL = `${apiToursLocalhostURL}/countryNames`;

const apiToursResortNamesURL = `${apiToursURL}/resortNames`;
const apiToursResortNamesLocalhostURL = `${apiToursLocalhostURL}/resortNames`;

const apiDepartureCitiesURL = `${apiToursURL}/departureCities`;
const apiDepartureCitiesLocalhostURL = `${apiToursLocalhostURL}/departureCities`;

document.addEventListener('DOMContentLoaded', () => {
    initializeCountrySelect();
    initializeResortSelect();
    initializeDepartureCitySelect();

    loadCountryOptions();

    const adultsValue = document.getElementById('adults-value');
    const childrenValue = document.getElementById('children-value');

    document.getElementById('adults-decrement').addEventListener('click', () => {
        let value = parseInt(adultsValue.textContent);
        if (value > 1) {
            adultsValue.textContent = value - 1;
        }
    });

    document.getElementById('adults-increment').addEventListener('click', () => {
        let value = parseInt(adultsValue.textContent);
        if (value < 9) {
            adultsValue.textContent = value + 1;
        }
    });

    document.getElementById('children-decrement').addEventListener('click', () => {
        let value = parseInt(childrenValue.textContent);
        if (value > 0) {
            childrenValue.textContent = value - 1;
        }
    });

    document.getElementById('children-increment').addEventListener('click', () => {
        let value = parseInt(childrenValue.textContent);
        if (value < 4) {
            childrenValue.textContent = value + 1;
        }
    });
});

function onCountryChange() {
    initializeResortSelect();
    initializeDepartureCitySelect();
    loadResortOptions();
}

function onResortChange() {
    initializeDepartureCitySelect();
    loadDepartureCities();
}


function initializeCountrySelect() {
    const countrySelect = document.getElementById('countrySelect');
    countrySelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Select Country';
    countrySelect.appendChild(defaultOption);
}

function initializeResortSelect() {
    const countrySelect = document.getElementById('resortSelect');
    countrySelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'Resort Country';
    countrySelect.appendChild(defaultOption);
}

function initializeDepartureCitySelect() {
    const countrySelect = document.getElementById('departureCitySelect');
    countrySelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = 'City Select';
    countrySelect.appendChild(defaultOption);
}

async function loadCountryOptions() {
    const countries = await fetchCountries();
    const countrySelect = document.getElementById('countrySelect');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country; 
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

async function loadResortOptions() {
    const resorts = await fetchResorts();
    const resortSelect = document.getElementById('resortSelect');

    resorts.forEach(resort => {
        const option = document.createElement('option');
        option.value = resort; 
        option.textContent = resort;
        resortSelect.appendChild(option);
    });
}

async function loadDepartureCities() {
    const drepartureCities = await fetchDepartureCities();
    const departureCitySelect = document.getElementById('departureCitySelect');

    drepartureCities.forEach(departureCity => {
        const option = document.createElement('option');
        option.value = departureCity.name; 
        option.textContent = departureCity.name;
        departureCitySelect.appendChild(option);
    });
}

async function fetchCountries(url = apiToursCountryNamesURL) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }

        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error(`Error fetching countries from ${url}:`, error);
        if (url === apiToursCountryNamesURL) {
            console.log('Retrying with fallback URL...');
            return fetchCountries(apiToursCountryNamesLocalhostURL);
        } else {
            alert('Error fetching countries: ' + error.message);
            return [];
        }
    }
}

async function fetchResorts(url = apiToursResortNamesURL) {
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.value;

    try {
        const response = await fetch(`${url}?countryName=${selectedCountry}`);
        if (!response.ok) {
            throw new Error('Failed to fetch resorts');
        }

        const resorts = await response.json();
        return resorts;
    } catch (error) {
        console.error(`Error fetching resorts from ${url}:`, error);
        if (url === apiToursResortNamesURL) {
            console.log('Retrying with fallback URL...');
            return fetchResorts(apiToursResortNamesLocalhostURL);
        } else {
            alert('Error fetching resorts: ' + error.message);
            return [];
        }
    }
}

async function fetchDepartureCities(url = apiDepartureCitiesURL) {
    const countrySelect = document.getElementById('countrySelect');
    const resortSelect = document.getElementById('resortSelect');
    const selectedCountry = countrySelect.value;
    const selectedResort = resortSelect.value;

    try {
        const response = await fetch(`${url}?countryName=${selectedCountry}&resortName=${selectedResort}`);
        if (!response.ok) {
            throw new Error('Failed to fetch departure cities');
        }

        const departureCities = await response.json();
        return departureCities;
    } catch (error) {
        console.error(`Error fetching departure cities from ${url}:`, error);
        if (url === apiDepartureCitiesURL) {
            console.log('Retrying with fallback URL...');
            return fetchDepartureCities(apiDepartureCitiesLocalhostURL);
        } else {
            alert('Error fetching departure cities: ' + error.message);
            return [];
        }
    }
}
