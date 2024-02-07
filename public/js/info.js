let originalValues = {};

function enableEditMode() {
  originalValues = {
    make: document.getElementById('makeValue').innerText,
    model: document.getElementById('modelValue').innerText,
    year: document.getElementById('yearValue').innerText,
    platNumber: document.getElementById('platNumberValue').innerText,
  };

  enableFieldEditMode('make');
  enableFieldEditMode('model');
  enableFieldEditMode('year');
  enableFieldEditMode('platNumber');

  const editButton = document.querySelector('button[onclick="enableEditMode()"]');
  editButton.innerText = 'Save';
  editButton.onclick = function () {
    saveChanges();
  };

  const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
  cancelButton.style.display = 'inline-block';
}

function enableFieldEditMode(field) {
  const valueSpan = document.getElementById(`${field}Value`);

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.value = valueSpan.innerText;
  inputField.id = `${field}Input`;

  valueSpan.replaceWith(inputField);
}

function saveChanges() {

  const editButton = document.querySelector('button[onclick="enableEditMode()"]');
  editButton.innerText = 'Edit';
  editButton.onclick = function () {
    enableEditMode();
  };

  const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
  cancelButton.style.display = 'none';
}

function cancelEditMode() {
  restoreOriginalValue('make');
  restoreOriginalValue('model');
  restoreOriginalValue('year');
  restoreOriginalValue('platNumber');

  const editButton = document.querySelector('button[onclick="enableEditMode()"]');
  editButton.innerText = 'Edit';
  editButton.onclick = function () {
    enableEditMode();
  };

  const cancelButton = document.querySelector('button[onclick="cancelEditMode()"]');
  cancelButton.style.display = 'none';
}

function restoreOriginalValue(field) {
  const inputField = document.getElementById(`${field}Input`);
  const valueSpan = document.createElement('span');
  valueSpan.className = 'info-value';
  valueSpan.id = `${field}Value`;
  valueSpan.innerText = originalValues[field];

  inputField.replaceWith(valueSpan);
}