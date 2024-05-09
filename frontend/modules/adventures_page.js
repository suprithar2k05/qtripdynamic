
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search = '') {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split('=')[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  document.querySelector('#data').innerHTML = adventures.map(({id, name, costPerHead, currency, image, duration, category}) => `
    <div class="col col-6 col-sm-6 col-lg-3 mb-3">
    <div class="border border-1 rounded activity-card">
      <a id=${id} href=detail/?adventure=${id} target="_blank">
        <h5 class="category-banner">${category}</h5>
        <img src=${image} alt=${name}>
        <div class="adventure-card-caption">
          <div class="d-flex justify-content-between p-2 pb-0">
            <h5>${name}</h5>
            <p>${currency} ${costPerHead}</p>
          </div>
          <div class="d-flex justify-content-between p-2 pb-0 pt-0">
            <h5>Duration</h5>
            <p>${duration}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
  `).join('');
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(function({duration}){
    return duration >= low && duration <= high;
  })
}

// [{}], [bic, hill]
// party
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(function({category}, index, arr) {
    return categoryList.includes(category);
  });
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
// [{}, {}] -> kolkota, category = ['cycle', 'hill'], duratoion =''
function filterFunction(list, {category, duration}) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  if(category.length > 0) {
    list = filterByCategory(list, category);
  }
  const [low, high] = duration.split('-');
  if(duration) list = filterByDuration(list, +low, +high);
  // Place holder for functionality to work in the Stubs
  return list;
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = localStorage.getItem('filters');
  if(filters) {
    return JSON.parse(filters);
  } 
  return null;
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM({category}) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // <span class="category-filter">Hill</span> <span class="category-filter">Hill</span> <span class="category-filter">Hill</span>
  document.querySelector('#category-list').innerHTML = category.map(item => `<span class="category-filter">${item}</span>`).join('');
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
