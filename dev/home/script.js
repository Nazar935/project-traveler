const apiBaseURL = "http://127.0.0.1:8080";
const apiToursURL = `${apiBaseURL}/tours`;
const apiToursCountryNamesURL = `${apiToursURL}/countryNames`;
const apiToursResortNamesURL = `${apiToursURL}/resortNames`;
const apiDepartureCitiesURL = `${apiToursURL}/departureCities`;

document.addEventListener('DOMContentLoaded', () => {
    initializeCountrySelect();
    initializeResortSelect();
    initializeDepartureCitySelect();

    loadCountryOptions();
});

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

async function fetchCountries() {
    try {
        const response = await fetch(apiToursCountryNamesURL);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }

        const countries = await response.json();
        return countries;
    } catch (error) {
        console.error('Error fetching countries:', error);
        alert('Error fetching countries: ' + error.message);
        return [];
    }
}

async function fetchResorts() {
    const countrySelect = document.getElementById('countrySelect');
    const selectedCountry = countrySelect.value;

    try {
        const response = await fetch(`${apiToursResortNamesURL}?countryName=${selectedCountry}`);
        if (!response.ok) {
            throw new Error('Failed to fetch resorts');
        }

        const resorts = await response.json();
        return resorts;
    } catch (error) {
        console.error('Error fetching resorts:', error);
        alert('Error fetching resorts: ' + error.message);
        return [];
    }
}

async function fetchDepartureCities() {
    const countrySelect = document.getElementById('countrySelect');
    const resortSelect = document.getElementById('resortSelect');
    const selectedCountry = countrySelect.value;
    const selectedResort = resortSelect.value;

    try {
        const response = await fetch(`${apiDepartureCitiesURL}?countryName=${selectedCountry}&resortName=${selectedResort}`);
        if (!response.ok) {
            throw new Error('Failed to fetch departure cities');
        }

        const departureCities = await response.json();
        return departureCities;
    } catch (error) {
        console.error('Error fetching departure cities:', error);
        alert('Error fetching departure cities: ' + error.message);
        return [];
    }
}

function onCountryChange() {
    initializeResortSelect();
    initializeDepartureCitySelect();
    loadResortOptions();
}

function onResortChange() {
    initializeDepartureCitySelect();
    loadDepartureCities();
}
