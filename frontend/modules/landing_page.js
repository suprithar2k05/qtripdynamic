import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (Array.isArray(cities)) {
    cities.forEach(({id, city, description, image}) => {
      addCityToDOM(id, city, description, image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/cities`);
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityContainer = document.querySelector('#data'); 
  const divEle = document.createElement('div');
  divEle.className = "tile col col-12 col-sm-6 col-lg-3 p-4";
  divEle.innerHTML = `
    <a id=${id} target="_blank" href="pages/adventures/?city=${id}">
      <img src=${image}/>
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    </a>
  `
  cityContainer.appendChild(divEle);
}

export { init, fetchCities, addCityToDOM };
