document.getElementById("signupLink").addEventListener("click", function (event) {
    event.preventDefault();
    $('#signupModal').modal('show');
});

$(document).ready(function () {
    if (showModal) {
        $('#signupModal').modal('show');
    }
});

$(document).ready(function () {
    if (showErrorModal) {
        document.getElementById("errorMessage").innerText = "Invalid username or password. Please try again.";
        $('#errorModal').modal('show');
    }
});

document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // validate form fields
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const userType = document.getElementById("userType").value;

    if (password !== repeatPassword) {
        // display error message in modal
        document.getElementById("errorMessage").innerText = "Passwords do not match. Please try again.";
        $('#errorModal').modal('show');
        return; // prevent further execution of the form submission
    }

    // Send signup data to backend for processing
    fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userName: username,
            password: password,
            userType: userType
        }),
    })
        .then(response => {
            if (response.ok) {
                console.log('User signed up successfully');
                // if response is successful, redirect to home page
                window.location.href = '/login';
            } else {
                // if response is not successful, handle the error
                throw new Error('Failed to sign up');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});