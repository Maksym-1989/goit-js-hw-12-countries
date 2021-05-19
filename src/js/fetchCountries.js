const JSON_BASE_URL = 'https://restcountries.eu/rest/v2/name/';

export const fetchCountries = (searchQuery = '/') =>
  fetch(JSON_BASE_URL + searchQuery).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('error');
    }
  });
