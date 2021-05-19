import './sass/main.scss';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries.js';
import markupCard from './hbs/country-card';
import markupList from './hbs/country-list';

const inputRef = document.querySelector('.js-input');
const clearBtnRef = document.querySelector('.js-btn');
const listContainerRef = document.querySelector('.js-countries-list');
const cardContainerRef = document.querySelector('.js-country-container');

// console.log(listContainerRef);

inputRef.addEventListener('input', debounce(inputSearch, 500));

function inputSearch(event) {
  const value = event.target.value.trim();

  if (!value) return;
  fetchCountries(value)
    .then(data => {
      console.log(data);
      const dataLength = data.length;
      if (dataLength === 1) {
        addMarkup(markupCard(data[0]), '')
      }
      if (dataLength >= 2 && dataLength <= 10) {
        addMarkup('', markupList(data))   
      }
      if (dataLength > 10) {
        error({ text: 'Too many matches found. Please enter a more specific query!' });
      }
    })
    .catch(err => {
      console.log(err);
      error({ text: 'No such country found. Please enter the country name again' });
    });
}

function addMarkup(cardHtml, listHtml) {
  cardContainerRef.innerHTML = cardHtml;
  listContainerRef.innerHTML = listHtml;
}

clearBtnRef.addEventListener('click', () => {
  cardContainerRef.innerHTML = '';
  listContainerRef.innerHTML = '';
  inputRef.value = '';
});
