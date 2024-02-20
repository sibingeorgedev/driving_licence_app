document.getElementById("signupLink").addEventListener("click", function (event) {
    event.preventDefault();
    $('#signupModal').modal('show');
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
        return; // Prevent further execution of the form submission
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
                // If response is successful, redirect to another page
                window.location.href = '/'; // Replace '/redirect-url' with your desired URL
            } else {
                // If response is not successful, handle the error
                throw new Error('Failed to sign up');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});