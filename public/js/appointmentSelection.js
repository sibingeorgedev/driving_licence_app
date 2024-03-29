document.addEventListener('DOMContentLoaded', function () {
    updateAppointmentTimes(); // populate time options based on current date
});

// add event listener to update time options when date is changed
document.getElementById('appointmentDate').addEventListener('change', updateAppointmentTimes);

// function to get current date in YYYY-MM-DD format
function getCurrentDate(date) {
    const currentDate = date ? new Date(date) : new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// function to book an appointment slot
function bookAppointment(appointment) {

    const user = {
        ...data,
        appointmentId: appointment._id
    }

    fetch('/bookAppointment', { // fetch request to book appointment
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(userDetails => {
            window.location.reload(); // reload the page after booking appointment
        })
        .catch(error => {
            console.error('Error booking appointment:', error);
        });
}

// function to fetch appointments based on selected date
async function fetchAppointmentsByDate(selectedDate) {
    try {
        const response = await fetch(`/getAppointmentsByDate?date=${selectedDate}`);
        if (!response.ok) {
            throw new Error('Failed to fetch appointments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
}

// function to populate time options based on selected date
async function updateAppointmentTimes() {
    const selectedDate = document.getElementById('appointmentDate').value;
    try {
        const appointments = await fetchAppointmentsByDate(selectedDate);

        const appointmentTimes = appointments
            .filter(appointment => appointment.isTimeSlotAvailable)
            .map(appointment => appointment.time); // only show the slot if the variable isTimeSlotAvailable is true and map the time

        const timeButtonContainer = document.getElementById('appointmentTimeButtons');
        timeButtonContainer.innerHTML = '';

        // if there are no available times for the selected date, display a message
        if (appointmentTimes.length === 0) {
            const noTimesMessage = document.createElement('p');
            noTimesMessage.textContent = 'No available times for selected date';
            timeButtonContainer.appendChild(noTimesMessage);
        } else {
            // create a button for each available time slot and add an event listener to book the appointment
            appointmentTimes.forEach(time => {
                const timeButton = document.createElement('button');
                timeButton.classList.add('btn', 'btn-success', 'mx-1', 'my-1');
                timeButton.textContent = time;
                const appointment = appointments.find(x => x.time === time);
                timeButton.addEventListener('click', event => {
                    event.preventDefault();
                    bookAppointment(appointment);
                });
                timeButtonContainer.appendChild(timeButton);
            });
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}
