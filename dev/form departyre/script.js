const apiBaseURL = "http://127.0.0.1:8080";
const apiToursURL = `${apiBaseURL}/tours`;
const apiToursCountryNamesURL = `${apiToursURL}/countryNames`;
const apiToursResortNamesURL = `${apiToursURL}/resortNames`;
const apiDepartureCitiesURL = `${apiToursURL}/departureCities`;

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

async function fetchResorts(selectedCountry) {
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

function defaultSelectCountryOptionString() {
    return '<option disabled selected>Select Country</option>';
}

function defaultReportOptoinSelect() {
    return '<option disabled selected>Select Resort</option>'
}

function countryOptionsString(countries) {
    return countries.map(country => `<option value="${country}">${country}</option>`).join('');
}

function updateCountrySelect(countries) {
    const selectElement = document.getElementById('countrySelect');
    selectElement.innerHTML = defaultSelectCountryOptionString() + countryOptionsString(countries);
}

function updateResortSelect(resorts) {
    const resortSelect = document.getElementById('resortSelect');
    resortSelect.innerHTML = defaultReportOptoinSelect() + resorts.map(resort => `<option value="${resort}">${resort}</option>`).join('');
}

async function contrySelectOnChange() {
    const resorts = await fetchResorts();
    updateCountrySelect(resorts);
}

async function resortSelectOnChange() {
    await fetchDepartureCities();
}

async function departureCitySelectOnChange() {

}

window.onload = async function() {
    const countries = await fetchCountries();
    updateCountrySelect(countries);
};
