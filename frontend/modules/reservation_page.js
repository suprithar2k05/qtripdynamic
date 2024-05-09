import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations`);
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length === 0) {
    document.querySelector('#no-reservation-banner').style.display = 'block';
    document.querySelector('#reservation-table-parent').style.display = 'none';
    return;
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  document.querySelector('#no-reservation-banner').style.display = 'none';
  document.querySelector('#reservation-table-parent').style.display = 'block';
  document.querySelector('#reservation-table').innerHTML = reservations.map(({name,
  date,
  person,
  adventure,
  adventureName,
  price,
  id,
  time
  }) => `
    <tr>
      <td><strong>${id}</strong></td>
      <td>${name}</td>
      <td>${adventureName}</td>
      <td>${person}</td>
      <td>${getDate(date)}</td>
      <td>${price}</td>
      <td>${getDateTime(time)}</td>
      <td id=${id}><a target='_blank' href='../detail/?adventure=${adventure}' class='reservation-visit-button'>visit adventure</a></td>
    </tr>
  `).join('')
}
function getDate(date) {
  const dateArr = new Date(date).toLocaleDateString("en-GB").split('/');
  return dateArr.map(item => +item).join('/');
}

function getDateTime(date) {
  const dateStr = new Date(date);
  return `${dateStr.toLocaleDateString("en-US", { day: 'numeric' })} ${dateStr.toLocaleDateString("en-US", { month: 'long' })} ${dateStr.toLocaleDateString("en-US", { year: 'numeric' })}, ${dateStr.toLocaleTimeString().toLocaleLowerCase()}`
}

export { fetchReservations, addReservationToTable };
