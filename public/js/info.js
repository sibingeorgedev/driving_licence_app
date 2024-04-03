let originalValues = {};
const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
cancelButton.style.display = 'none'; // initially hide the cancel button

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href != 'http://localhost:3000/g') {
    window.location.href = '/g'; 
  }
});

function enableEditMode() {
  originalValues = data.car_details; // store the original values of the fields in case the user cancels the edit mode

  // enable editing for the fields
  enableFieldEditMode('make');
  enableFieldEditMode('model');
  enableFieldEditMode('year');
  enableFieldEditMode('platNumber');

  const editAndSaveButton = document.querySelector('button[onclick="enableEditMode()"]');
  editAndSaveButton.innerText = 'Save'; // change the text of the 'Edit' button to 'Save'
  editAndSaveButton.onclick = function () { // on clicking the 'Save' button, save the changes
    saveChanges();
  };

  const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
  cancelButton.style.display = 'inline-block'; // show the cancel button when the edit mode is enabled
}

// enable editing for a field
function enableFieldEditMode(field) {
  const valueSpan = document.getElementById(`${field}Value`); // get the span that contains the value of the field
  const inputField = document.createElement('input'); // create an input field
  inputField.type = 'text'; // set the type of the input field to text
  inputField.value = valueSpan.innerText; // set the value of the input field to the value of the span
  inputField.className = 'info-value'; // set the class of the span
  inputField.id = `${field}Input`; // set the id of the input field
  valueSpan.replaceWith(inputField); // replace the span with the input field
}

// save the changes made to the fields in the edit mode
function saveChanges() {
  const updatedData = {
    ...data,
    car_details: {
      make: document.getElementById('makeInput').value,
      model: document.getElementById('modelInput').value,
      year: document.getElementById('yearInput').value,
      platNumber: document.getElementById('platNumberInput').value
    }
  }; // create an object with the updated data to send to the server

  fetch('/g/updateData', { // send a POST request to the server with the updated data
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      cancelEditMode(true, data); // cancel the edit mode and pass the updated data
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
}

// cancel the edit mode
function cancelEditMode(updateData = false, data) {
  // updateData is false by default and data is undefined by default
  restoreOriginalValue('make', updateData, data);
  restoreOriginalValue('model', updateData, data);
  restoreOriginalValue('year', updateData, data);
  restoreOriginalValue('platNumber', updateData, data);

  const editAndSaveButton = document.querySelector('button[onclick="enableEditMode()"]');
  editAndSaveButton.innerText = 'Edit'; // change the text of the 'Save' button to 'Edit'
  editAndSaveButton.onclick = function () {
    enableEditMode();
  };

  const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
  cancelButton.style.display = 'none'; // hide the cancel button when the edit mode is cancelled
}

// restore the original value of a field
function restoreOriginalValue(field, updateData, data) {
  const inputField = document.getElementById(`${field}Input`); // get the input field
  const valueSpan = document.createElement('span');  // create a span
  valueSpan.className = 'info-value'; // set the class of the span
  valueSpan.id = `${field}Value`; // set the id of the span
  valueSpan.innerText = updateData ? data.car_details[field] : originalValues[field]; // if updateData is true, use the updated data; otherwise, use the original value
  inputField.replaceWith(valueSpan); // replace the input field with the span
}