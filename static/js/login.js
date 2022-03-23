
const licenseID = document.getElementById("licenseID");
const password = document.getElementById("password");
const form = document.forms["login-form"];

function validPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(String(password));
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (licenseID.value == "") {
        swal("Error !", "Please enter a valid License-ID", "error");
    }
    else if (!validPassword(password.value)) {
        swal("Error !", "Password should contain : Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:", "error");
    }
    else {
        form.submit();
    }
    
})
