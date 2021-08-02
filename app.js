let count;
let countriesUpdate;
let flagsUpdate;
var html = "";

function loadCountries() {
  var select = document.getElementById("regions");
  var region = select.options[select.selectedIndex].value;

  var url = "https://restcountries.eu/rest/v2/all";
  fetch(url)
    .then((data) => data.json())
    .then((data) => {
      var countries = data;
      var regional_countries = [];
      var flags_countries = [];
      countries.forEach((item) => {
        if (item.region == region) {
          regional_countries.push(item.name);
          flags_countries.push(item.flag);
        }
      });

      if (regional_countries.length > 0) {
        setTheCountries(regional_countries, region, flags_countries);
      }
    });
}

function setTheCountries(countries, region, flags) {
  var result_title = "Hay " + countries.length + ' países en "' + region + '"';
  count = 0;
  html = "";
  countriesUpdate = countries;
  flagsUpdate = flags;
  for (let i = count; i < countries.length; i++) {
    html += `<li><img src = "${flags[i]}"/> <h1>${countries[i]}</h1> </li>`;
    count++;
    if (i > 1 && i % 5 == 0) {
      break;
    }
  }

  document.getElementById("selected-region").innerHTML = result_title;
  document.getElementById("founded-countries").innerHTML = html;
}

function updateCountries() {
  for (let i = count; i < countriesUpdate.length; i++) {
    html += `<li><img src = "${flagsUpdate[i]}"/> <h1>${countriesUpdate[i]}</h1> </li>`;
    count++;
    if (i > 1 && i % 5 == 0) {
      break;
    } 
  }
  document.getElementById("founded-countries").innerHTML = html;
}

////////////////////////////////////////////////////////////////
// add event listeners
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    updateCountries();
  }
});
document.querySelector("#regions").addEventListener("change", loadCountries);
