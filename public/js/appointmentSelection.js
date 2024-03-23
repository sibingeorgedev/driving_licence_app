appt = {
    appointmentDate: '',
    appointmentTime: ''
};

document.addEventListener('DOMContentLoaded', function () {
    updateAppointmentTimes();
});

// Function to get current date in YYYY-MM-DD format
function getCurrentDate(date) {
    const currentDate = date ? new Date(date) : new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

async function bookAppointment(appointment, time) {

    appt = {
        appointmentDate: getCurrentDate(appointment.date),
        appointmentTime: time
    };

    const user = {
        ...data,
        appointmentId: appointment._id
    }

    // fetch('/bookAppointment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         // window.location.reload();
    //         // return response.json();
    //     })
    //     .then(userDetails => {
    //         console.log('User details:', userDetails);
    //         // window.location.reload();
    //     })
    //     .catch(error => {
    //         console.error('Error booking appointment:', error);
    //     });

    try {
        const response = await fetch('/bookAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to book appointments');
        }
        const appts = await response.json();
        console.log('Appointments:', appts);
    } catch (error) {
        console.error('Error booking appointments:', error);
        throw error; // Rethrow the error to propagate it to the caller
    }
}

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

// Function to populate time options based on selected date
async function updateAppointmentTimes() {
    const selectedDate = document.getElementById('appointmentDate').value;
    try {
        const appointments = await fetchAppointmentsByDate(selectedDate);
        const test = await fetchAppointmentsByDate(selectedDate);

        const appointmentTimes = appointments
            .filter(appointment => appointment.isTimeSlotAvailable)
            .map(appointment => appointment.time); // only show the slot if the variable isTimeSlotAvailable is true and map the time

        const timeButtonContainer = document.getElementById('appointmentTimeButtons');
        timeButtonContainer.innerHTML = '';

        if (appointmentTimes.length === 0) {
            const noTimesMessage = document.createElement('p');
            noTimesMessage.textContent = 'No available times for selected date';
            timeButtonContainer.appendChild(noTimesMessage);
        } else {
            appointmentTimes.forEach(time => {
                const timeButton = document.createElement('button');
                timeButton.classList.add('btn', 'btn-success', 'mx-1', 'my-1');
                timeButton.textContent = time;
                const appointment = appointments.find(x => x.time === time);
                timeButton.addEventListener('click', async () => {
                    await bookAppointment(appointment, time);
                });
                timeButtonContainer.appendChild(timeButton);
            });
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

document.getElementById('appointmentDate').addEventListener('change', updateAppointmentTimes);
