import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = evt => {
  const name = searchBox.value.trim();
  if (name === '') return clearAll();

  fetchCountries(name)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });

    
    evt.preventDefault();
};

function clearAll() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

function countriesData(data) {
    if (data.length > 10) {
      clearAll()
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    };
    if (data.length > 1 && data.length <= 10) {
         clearAll()
        return (countryList.innerHTML = data.map(item =>
            `   
            <li class = 'country_item'>
                    <img src = '${item.flags.svg}' width = 80 height = 40/>
                    <p class = 'country_text'>${item.name.official}</p>
               
                    </li>
            `
        ).join(''));
    };
    if (data.length === 1){
        clearAll()
        
        return (countryInfo.innerHTML = data
            .map(
                item => 
                `  
                <div class = 'country'>
                    
                        <img src = '${item.flags.svg}' width = 300 height = 150/>
    
                        <div class = 'country-body'>
                        
                            <h3>${item.name.official}</h3>
                            <p><b>Capital: </b> ${item.capital}</p>
                            <p><b>Population: </b> ${item.population}</p>
                            <p><b>Languages: </b> ${Object.values(
            item.languages).join(', ')}</p>
                        </div> 
                 </div> 
                 `
            )
            .join(''));
    }
   
};

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));



