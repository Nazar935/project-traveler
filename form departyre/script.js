const apiBaseURL = "http://192.168.101:8080";
const apiToursURL = `${apiBaseURL}/tours`;
const apiToursCountryNamesURL = `${apiToursURL}/countryNames`;
const apiToursResortNamesURL = `${apiToursURL}/resortNames`;
const apiDepartureCitiesURL = `${apiToursURL}/departureCities`;

async function fetchCountries() {
    const selectElement = document.getElementById('countrySelect');

    try {
        const response = await fetch(apiToursCountryNamesURL);
        if (!response.ok) {
            throw new Error('Failed to fetch countries');
        }
        
        const countries = await response.json();
        
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function fetchResorts() {
    const countrySelect = document.getElementById('countrySelect');
    const resortSelect = document.getElementById('resortSelect');
    const selectedCountry = countrySelect.value;

    try {
        const response = await fetch(`${apiToursResortNamesURL}?countryName=${selectedCountry}`);
        if (!response.ok) {
            throw new Error('Failed to fetch resorts');
        }
        
        const resorts = await response.json();
        
        resorts.forEach(resort => {
            const option = document.createElement('option');
            option.value = resort;
            option.textContent = resort;
            resortSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching resorts:', error);
    }
}

async function fetchDepartureCities() {
    const selectElement = document.getElementById('departureCitySelect');

    try {
        const response = await fetch(apiDepartureCitiesURL);
        if (!response.ok) {
            throw new Error('Failed to fetch departure cities');
        }
        
        const departureCities = await response.json();
        
        departureCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching departure cities:', error);
    }
}

window.onload = function() {
    fetchCountries();
    fetchDepartureCities();
};
