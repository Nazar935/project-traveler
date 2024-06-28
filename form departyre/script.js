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
        
        selectElement.innerHTML = '<option disabled selected>Select Country</option>' + countries.map(country => `<option value="${country}">${country}</option>`).join('');
    } catch (error) {
        console.error('Error fetching countries:', error);
        alert('Error fetching countries: ' + error.message);
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
        
        resortSelect.innerHTML = '<option disabled selected>Select Resort</option>' + resorts.map(resort => `<option value="${resort}">${resort}</option>`).join('');
    } catch (error) {
        console.error('Error fetching resorts:', error);
        alert('Error fetching resorts: ' + error.message);
    }
}

async function fetchDepartureCities() {    
    const countrySelect = document.getElementById('countrySelect');
    const resortSelect = document.getElementById('resortSelect');
    const selectElement = document.getElementById('departureCitySelect');
    const selectedCountry = countrySelect.value;
    const selectedResort = resortSelect.value;

    try {
        const response = await fetch(`${apiDepartureCitiesURL}?countryName=${selectedCountry}&resortName=${selectedResort}`);
        if (!response.ok) {
            throw new Error('Failed to fetch departure cities');
        }
        
        const departureCities = await response.json();
        
        selectElement.innerHTML = '<option disabled selected>Select Departure City</option>' + departureCities.map(city => {
            let travelModes = '';
            if (city.travelMode) {
                Object.keys(city.travelMode).forEach(mode => {
                    travelModes += ` (${mode})`;
                });
            }
            return `<option value="${city.name}">${city.name}${travelModes}</option>`;
        }).join('');
    } catch (error) {
        console.error('Error fetching departure cities:', error);
        alert('Error fetching departure cities: ' + error.message);
    }
}

window.onload = function() {
    fetchCountries();
};
