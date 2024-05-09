import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL


  // Place holder for functionality to work in the Stubs
  return search.split('=')[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM({name, subtitle, content, images}) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const heading = document.querySelector('#adventure-name');
  const subHeading = document.querySelector('#adventure-subtitle');
  const contentEle = document.querySelector('#adventure-content');
  heading.textContent = name;
  subHeading.textContent = subtitle;
  contentEle.textContent = content;
  const photoGallery = document.querySelector('#photo-gallery');

  photoGallery.innerHTML = images.map(image => `
    <div>
      <img class="activity-card-image" src=${image} alt="photo">
    </div>
  `).join('');
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.querySelector('#photo-gallery');

  photoGallery.innerHTML = `
  <div id="carouselCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    ${images.map((image, index) => `
    <div class='carousel-item ${index === 1 ? 'active': ''}'>
      <img class="activity-card-image" src=${image} alt="photo">
    </div>
  `).join('')}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  
  


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel({available, costPerHead}) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOutPanel = document.querySelector('#reservation-panel-sold-out');
  const availablePanel = document.querySelector('#reservation-panel-available');
  if(available) {
    const costEle = document.querySelector('#reservation-person-cost');
    costEle.textContent = costPerHead;
    soldOutPanel.style.display = 'none';
    availablePanel.style.display = 'block';
  } else {
    soldOutPanel.style.display = 'block';
    availablePanel.style.display = 'none';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM({costPerHead}, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.querySelector('#reservation-cost').textContent = +persons * costPerHead;
}
//Implementation of reservation form submission
async function captureFormSubmit({id}) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  try {
    const form = document.querySelector('#myForm');
    const formData = new FormData(form);
    const res = await fetch(`${config.backendEndpoint}/reservations/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.get('name'),
        date: formData.get('date'),
        person: formData.get('person'),
        adventure: id,
      })
    });
    const json = await res.json();
  } catch (error) {
    alert('Failed!');
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved({reserved}) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(reserved) {
    document.querySelector('#reserved-banner').style.display = 'block';
  } else {
    document.querySelector('#reserved-banner').style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
