document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("donationForm");
    const successMessageBox = document.getElementById("successMessageBox");
    const overlay = document.getElementById("overlay");
    const okButton = document.getElementById("okButton");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        document.querySelectorAll(".error-message").forEach(el => el.remove());

        function showError(input, message) {
            input.style.border = "2px solid red";
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.textContent = message;
            input.parentNode.appendChild(errorDiv);
        }

        if (!/^[A-Za-z\s]{3,}$/.test(fullName.value.trim())) showError(fullName, "Enter a valid name");

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim())) showError(email, "Enter a valid email");

        if (!/^\d{10}$/.test(phone.value.trim())) showError(phone, "Enter a valid 10-digit phone number");

        if (bloodGroup.value === "") showError(bloodGroup, "Please select your blood group");
        if (location.value === "") showError(location, "Please select your location");
        

        if (isValid) {
            overlay.style.display = "block";
            successMessageBox.style.display = "block";
        }
    });

    okButton.addEventListener("click", () => window.location.href = "location.html");
});