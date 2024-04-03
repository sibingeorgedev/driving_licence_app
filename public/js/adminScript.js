// Function to fetch all appointments and users
function getAllAppointmentsAndUsers() {
    fetch('/getAllUserAndAppointments')
        .then(response => response.json())
        .then(data => {
            displayAppointments(data);
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

function displayAppointments(data) {
    const tableBody = document.getElementById('appointmentsTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    const bookedAppointments = data.filter(appointment => appointment.appointments);

    // Iterate over the data and create table rows
    bookedAppointments.forEach(appointment => {
        const row = document.createElement('tr');

        // Populate table cells with appointment data
        const driverCell = document.createElement('td');
        driverCell.textContent = appointment.userData.firstName + ' ' + appointment.userData.lastName;
        row.appendChild(driverCell);

        const testTypeCell = document.createElement('td');
        testTypeCell.textContent = appointment.userData.appointmentDetails.testType;
        row.appendChild(testTypeCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = appointment.userData.appointmentDetails.status;
        row.appendChild(statusCell);

        const buttonCell = document.createElement('td');
        buttonCell.classList.add('button-cell'); // Add class for button alignment
        const status = appointment.userData.appointmentDetails.status;
        const button = document.createElement('button');

        if (status === 'Failed') {
            if (appointment.userData.appointmentDetails.adminApproved) {
                button.textContent = 'Action Taken';
                grayedOutButton(button); // Gray out the button if admin has approved
            } else {
                button.textContent = 'Retake Test';
                button.addEventListener('click', () => handleRetakeTest(appointment));
            }
        } else if (status === 'Passed') {
            if (appointment.userData.appointmentDetails.adminApproved) { 
                button.textContent = 'Action Taken';
                grayedOutButton(button); // Gray out the button if admin has approved
            } else {
                button.textContent = 'Issue License';
                button.addEventListener('click', () => handleIssueLicense(appointment));
            }
        } else {
            button.textContent = 'Pending';
            button.disabled = true; // Disable the button for pending status
            button.classList.add('grayed-out-button'); // Add the grayed-out-button class
        }

        buttonCell.appendChild(button);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    });
}

function handleRetakeTest(appointment) {

    const updateUserData = {
        ...appointment.userData,
        appointmentDetails: {
            ...appointment.userData.appointmentDetails,
            adminApproved: true
        }
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
}

function handleIssueLicense(appointment) {

    const updateUserData = {
        ...appointment.userData,
        appointmentDetails: {
            ...appointment.userData.appointmentDetails,
            adminApproved: true
        }
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
}

function grayedOutButton(button) {
    button.disabled = true; // Disable the button for pending status
    button.classList.add('grayed-out-button'); // Add the grayed-out-button class
}

getAllAppointmentsAndUsers();