// Function to fetch all appointments and users
function getAllAppointmentsAndUsers() {
    fetch('/getAllUserAndAppointments')
        .then(response => response.json())
        .then(data => {
            displayAppointments(data);
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

// Function to display appointments in the table
function displayAppointments(data) {
    const tableBody = document.getElementById('appointmentsTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Iterate over the data and create table rows
    data.forEach(appointment => {
        const row = document.createElement('tr');

        // Populate table cells with appointment data
        const driverCell = document.createElement('td');
        driverCell.textContent = appointment.userData.firstName + ' ' + appointment.userData.lastName;
        row.appendChild(driverCell);

        const testTypeCell = document.createElement('td');
        testTypeCell.textContent = appointment.userData.appointmentDetails.testType;
        row.appendChild(testTypeCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = getCurrentDate(appointment.appointments.date);
        row.appendChild(dateCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = appointment.appointments.time;
        row.appendChild(timeCell);

        // Add click event listener to each row
        row.addEventListener('click', () => {
            $('#myModal').modal('show'); // Show the modal when row is clicked
            openModal(appointment); // Open modal with appointment data
        });

        tableBody.appendChild(row);
    });
}

// Function to get current date in YYYY-MM-DD format
function getCurrentDate(date) {
    const currentDate = date ? new Date(date) : new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to open modal with appointment details
// Function to open modal with appointment details
function openModal(appointment) {
    // Get the modal element
    const modal = document.getElementById('myModal');
    
    // Get the modal body element
    const modalBody = document.getElementById('modalBody');

    // Clear existing content in the modal body
    modalBody.innerHTML = '';

    // Create a section element for appointment details
    const appointmentDetailsSection = document.createElement('section');
    appointmentDetailsSection.classList.add('info-section');

    // Create and populate info items for driver, test type, date, and time
    const appointmentData = appointment.userData;
    const infoItems = [
        { label: 'Driver', value: appointmentData.firstName + ' ' + appointmentData.lastName },
        { label: 'Car Make', value: appointmentData.car_details.make },
        { label: 'Car Plate', value: appointmentData.car_details.platNumber },
        { label: 'Test Status', value: appointmentData.appointmentDetails.status },
        { label: 'Test Comments', value: appointmentData.appointmentDetails.comments }
    ];

    infoItems.forEach(item => {
        const infoItem = document.createElement('div');
        infoItem.classList.add('info-item');

        const label = document.createElement('label');
        label.textContent = item.label + ':';

        const value = document.createElement('span');
        value.classList.add('info-value');
        value.textContent = item.value;

        infoItem.appendChild(label);
        infoItem.appendChild(value);

        appointmentDetailsSection.appendChild(infoItem);
    });

    // Add the appointment details section to the modal body
    modalBody.appendChild(appointmentDetailsSection);

    // Create footer buttons for edit mode
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.classList.add('btn', 'btn-primary');
    editButton.textContent = 'Edit Test Data';
    editButton.addEventListener('click', () => openEditModal(appointment));
    
    // Add the edit button to the modal footer
    const modalFooter = document.getElementById('modalFooter');
    modalFooter.innerHTML = '';
    modalFooter.appendChild(editButton);

    // Show the modal
    $('#myModal').modal('show');
}

// Function to open modal in edit mode
function openEditModal(appointment) {
    // Get the modal body element
    const modalBody = document.getElementById('modalBody');

    // Clear existing content in the modal body
    modalBody.innerHTML = '';

    // Create a form element for editing appointment details
    const editForm = document.createElement('form');
    editForm.id = 'editForm';

    // Create and populate input fields for comments and status
    const appointmentData = appointment.userData.appointmentDetails;
    const fields = [
        { label: 'Status', name: 'status', value: appointmentData.status },
        { label: 'Comments', name: 'comments', value: appointmentData.comments }
    ];

    fields.forEach(field => {
        const formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        const label = document.createElement('label');
        label.textContent = field.label + ':';
        formGroup.appendChild(label);

        if (field.name === 'status') {
            const select = document.createElement('select');
            select.classList.add('form-control');
            select.name = field.name;

            const options = ['Pending', 'Failed', 'Passed'];
            options.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = option.textContent = optionValue;
                if (optionValue === field.value) {
                    option.selected = true; // Select the default value
                }
                select.appendChild(option);
            });

            formGroup.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('form-control');
            input.name = field.name;
            input.value = field.value;
            formGroup.appendChild(input);
        }

        editForm.appendChild(formGroup);
    });

    // Add the edit form to the modal body
    modalBody.appendChild(editForm);

    // Create footer buttons for save and cancel
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.classList.add('btn', 'btn-primary');
    saveButton.textContent = 'Save Changes';
    saveButton.addEventListener('click', () => saveChanges(appointment));
    
    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.classList.add('btn', 'btn-secondary');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => openModal(appointment));
    
    // Add the save and cancel buttons to the modal footer
    const modalFooter = document.getElementById('modalFooter');
    modalFooter.innerHTML = '';
    modalFooter.appendChild(saveButton);
    modalFooter.appendChild(cancelButton);
}

// Function to handle saving changes
function saveChanges(appointment) {
    const editForm = document.getElementById('editForm');
    const formData = new FormData(editForm);
    const comments = formData.get('comments');
    const status = formData.get('status');

    const updateUserData = {
        ...appointment.userData,
        appointmentDetails: {
            ...appointment.userData.appointmentDetails,
            comments,
            status,
        },
    };

    fetch('/updateTestDetails', { // fetch request to book appointment
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUserData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(userDetails => {
            getAllAppointmentsAndUsers();
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
        });
    $('#myModal').modal('hide');
}

// Call the function to fetch appointments when the page loads
getAllAppointmentsAndUsers();
