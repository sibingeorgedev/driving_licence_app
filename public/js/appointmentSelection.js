document.addEventListener('DOMContentLoaded', function () {

    updateAppointmentTimes();
});

// Function to get current date in YYYY-MM-DD format
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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

        const appointmentTimes = appointments.map(appointment => appointment.time);

        const timeSelect = document.getElementById('appointmentTime');
        timeSelect.innerHTML = '';

        if (appointmentTimes.length === 0) {
            const option = document.createElement('option');
            option.text = 'No available times for selected date';
            timeSelect.appendChild(option);
            timeSelect.disabled = true;
        } else {
            appointmentTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.text = time;
                timeSelect.appendChild(option);
            });
            timeSelect.disabled = false;
        }
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
}

document.getElementById('appointmentDate').addEventListener('change', updateAppointmentTimes);
