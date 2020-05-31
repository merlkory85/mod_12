import debounce from 'lodash.debounce';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import fetchData from '../js/fetch.js';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';


import countryList from '../template/countryList.hbs';
import dropdownItem from '../template/dropdown.hbs';

const dropdown = document.querySelector('#drop-list');
const inputSearch = document.querySelector('#js-input');
const infoContainer = document.querySelector('#js-container');

dropdown.classList.add('hidden');
function renderCountries(event) {
  event.preventDefault();
  const userInfo = event.target.value;
  if (userInfo.length >= 1) {
    fetchData(userInfo).then(data => {
      if (data.length >= 2 && data.length <= 10) {
        dropdown.classList.remove('hidden');
        const markup = data.reduce(
          (acc, country) => acc + dropdownItem(country),
          '',
        );
        return dropdown.insertAdjacentHTML('beforeend', markup);
      }

      if (data.length === 1) {
        dropdown.classList.add('hidden');
        dropdown.textContent = '';
        inputSearch.innerHTML = '';
        PNotify.success({
          title: 'Found!',
          text: 'Super!',
        });
        return (infoContainer.innerHTML = countryList(...data));
      }

      PNotify.error({
        title: 'Oh No!',
        text: 'Too many matches found. Please enter a more specific query',
      });
    });
  }
}
inputSearch.addEventListener('input', debounce(renderCountries, 500));
