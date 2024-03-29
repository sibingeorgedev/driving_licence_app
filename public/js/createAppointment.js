let appointmenteds = [];

// Add event listener to date input to update dropdown options based on selected date
document.getElementById('date').addEventListener('change', updateDropdownOptions);

// fetch appointments when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAppointments();
    updateDropdownOptions();
});

// add event listener to create appointment form to handle form submission
document.getElementById("createAppointment").addEventListener("submit", function (event) {
    event.preventDefault();

    // get the form data
    const formData = {
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

    // Send signup data to backend for processing
    fetch('/appointments/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(appointments => {
            console.log('Appointment created successfully');

            // Show a success toast message when the appointment is created successfully
            showToast('success', 'Appointment created successfully');

            document.getElementById('date').value = '';
            document.getElementById('time').value = '';

            fetchAppointments(); // update the appointments list after creating a new appointment

            displayAppointments(appointments); // display the updated appointments list
        })
        .catch((error) => {
            showToast('error', 'Appointment not created successfully');
            console.error('Error:', error);
        });
});

// function to fetch appointments from the backend
function fetchAppointments() {
    fetch('/getAllAppointment')
        .then(response => response.json())
        .then(data => {
            displayAppointments(data);
            appointmenteds = data;
            updateDropdownOptions();
        })
        .catch(error => console.error('Error fetching appointments:', error));
}

// function to update dropdown options based on selected date
function updateDropdownOptions() {
    const selectedDate = document.getElementById('date').value;
    const allAppointments = appointmenteds;
    const appointmentsForSelectedDate = allAppointments.filter(appointment => {
        const appointmentDate = appointment.date.split('T')[0];
        return appointmentDate === selectedDate;
    });
    const timeDropdown = document.getElementById('time');
    const options = timeDropdown.querySelectorAll('option');

    options.forEach(option => {
        const time = option.value;
        const isTimeAvailable = appointmentsForSelectedDate.every(appointment => appointment.time !== time);
        option.disabled = !isTimeAvailable;
    });
}

// function to display appointments in the UI
function displayAppointments(appointments) {
    // Clear any existing appointments in the UI
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';

    // Create a map to store appointments grouped by date
    const appointmentsByDate = new Map();

    // Group appointments by date
    appointments.forEach(appointment => {
        const date = new Date(appointment.date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        if (!appointmentsByDate.has(date)) {
            appointmentsByDate.set(date, []);
        }
        appointmentsByDate.get(date).push(appointment.time);
    });

    // Iterate over appointments grouped by date and create HTML elements to display them
    appointmentsByDate.forEach((times, date) => {
        // Create card element for each date
        const card = document.createElement('div');
        card.classList.add('card', 'my-3');

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create date and time row container
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        // Create date element
        const dateElement = document.createElement('h5');
        dateElement.classList.add('card-title', 'mb-0');
        dateElement.textContent = date;

        // Create container for time buttons
        const timeContainer = document.createElement('div');
        timeContainer.classList.add('d-flex');

        // Create time buttons for each appointment
        times.forEach(time => {
            const timeButton = document.createElement('button');
            timeButton.classList.add('btn', 'btn-success', 'mx-1', 'my-1', 'disabled');
            timeButton.textContent = time;
            timeContainer.appendChild(timeButton);
        });

        // Append date element and time container to row container
        rowContainer.appendChild(dateElement);
        rowContainer.appendChild(timeContainer);

        // Append row container to card body
        cardBody.appendChild(rowContainer);

        // Append card body to card
        card.appendChild(cardBody);

        // Append card to appointments list
        appointmentsList.appendChild(card);

        // Disable options in the create appointment dropdown based on existing appointments
        const timeDropdown = document.getElementById('time');
        const options = timeDropdown.querySelectorAll('option');
        options.forEach(option => {
            if (option.dataset.date === date) {
                option.disabled = true;
            }
        });
    });
}

function showToast(type, message) {
    // Create a new toast element
    const toast = document.createElement('div');
    toast.classList.add('toast', 'align-items-center', 'text-white', `bg-${type}`);
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.position = 'fixed'; // Fixed position to keep it at the top right corner
    toast.style.top = '20px'; // Adjust top position as needed
    toast.style.right = '20px'; // Adjust right position as needed
    toast.style.width = '300px'; // Increase the width
    toast.style.maxWidth = '90%'; // Set a maximum width

    const toastBody = document.createElement('div');
    toastBody.classList.add('d-flex');

    const toastIcon = document.createElement('i');
    toastIcon.classList.add('bi', type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill', 'me-2');
    toastIcon.style.fontSize = '24px'; // Increase the icon size

    const toastMessage = document.createElement('div');
    toastMessage.textContent = message;
    toastMessage.style.fontSize = '18px'; // Increase the message font size

    toastBody.appendChild(toastIcon);
    toastBody.appendChild(toastMessage);
    toast.appendChild(toastBody);

    // Append the toast to the body
    document.body.appendChild(toast);

    // Show the toast
    $(toast).toast('show');

    setTimeout(() => {
        $(toast).toast('dispose');
        document.body.removeChild(toast);
    }, 4000);
}
