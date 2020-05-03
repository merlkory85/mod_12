export default fetchData;
function fetchData(userInfo) {
  return fetch(
    `https://restcountries.eu/rest/v2/name/${userInfo}?fields=name;population;flag;languages;capital`,
  )
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(error => console.log(error));
}
