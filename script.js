document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const fullName = document.querySelector("input[placeholder='Full Name']");
    const username = document.querySelector("input[placeholder='Username']");
    const email = document.querySelector("input[placeholder='Email Address']");
    const password = document.querySelector("input[placeholder='Password']");
    const contentContainer = document.querySelector(".signup-container"); // Select form container

    function showError(input, message) {
        let errorBox = input.nextElementSibling;
        if (!errorBox || !errorBox.classList.contains("error-message")) {
            errorBox = document.createElement("div");
            errorBox.classList.add("error-message");
            input.parentNode.appendChild(errorBox);
        }
        errorBox.textContent = message;
        errorBox.style.color = "white";
        errorBox.style.background = "rgba(255, 0, 0, 0.8)";
        errorBox.style.padding = "5px";
        errorBox.style.marginTop = "5px";
        errorBox.style.borderRadius = "5px";
        errorBox.style.fontSize = "12px";
        errorBox.style.textAlign = "left";
    }

    function clearError(input) {
        let errorBox = input.nextElementSibling;
        if (errorBox && errorBox.classList.contains("error-message")) {
            errorBox.remove();
        }
    }

    function validateFullName() {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!fullName.value.match(nameRegex)) {
            showError(fullName, "Full Name can only contain letters and spaces.");
            return false;
        }
        clearError(fullName);
        return true;
    }

    function validateUsername() {
        const userRegex = /^[a-zA-Z0-9]{5,}$/;
        if (!username.value.match(userRegex)) {
            showError(username, "Username must be at least 5 characters and alphanumeric.");
            return false;
        }
        clearError(username);
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.match(emailRegex)) {
            showError(email, "Please enter a valid email address.");
            return false;
        }
        clearError(email);
        return true;
    }

    function validatePassword() {
        const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!password.value.match(passRegex)) {
            showError(password, "Password must be at least 6 characters long and include letters & numbers.");
            return false;
        }
        clearError(password);
        return true;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const validFullName = validateFullName();
        const validUsername = validateUsername();
        const validEmail = validateEmail();
        const validPassword = validatePassword();

        if (validFullName && validUsername && validEmail && validPassword) {
            showSuccessMessage();
        }
    });

    function showSuccessMessage() {
        // Blur the form content but keep success message clear
        contentContainer.classList.add("blur-background");

        // Create success message box
        const successBox = document.createElement("div");
        successBox.classList.add("success-box");
        successBox.innerHTML = `
            <h2>Sign Up Successful!</h2>
            <p>Welcome to <b>Bloodsphere</b>.</p>
            <button id="doneBtn">Done</button>
        `;
        document.body.appendChild(successBox);

        // Apply animation effect
        setTimeout(() => {
            successBox.classList.add("show-popup");
        }, 50);

        // Add event listener to the done button
        document.querySelector("#doneBtn").addEventListener("click", function () {
            contentContainer.classList.remove("blur-background"); // Remove blur effect
            successBox.remove();
            window.location.href = "index.html"; // Redirect to form action destination
        });

        // Styling for success box
        const style = document.createElement("style");
        style.innerHTML = `
            /* Blur only the background while keeping success message clear */
            .blur-background {
                filter: blur(10px);
                pointer-events: none;
                user-select: none;
            }

            /* Success box styling */
            .success-box {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                background: rgba(0, 128, 0, 0.9); /* Dark Green for success */
                padding: 30px;
                text-align: center;
                color: white;
                border-radius: 12px;
                box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.5);
                width: 350px;
                font-family: Arial, sans-serif;
                opacity: 0;
                transition: transform 0.3s ease-out, opacity 0.3s ease-out;
                z-index: 1000;
            }

            /* Show pop-up effect */
            .success-box.show-popup {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }

            .success-box h2 {
                font-size: 22px;
                margin-bottom: 10px;
                color: yellow;
                text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.3);
            }

            .success-box p {
                font-size: 16px;
                margin-bottom: 20px;
                color: #fff;
            }

            .success-box button {
                background: gold;
                color: black;
                padding: 12px 20px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                cursor: pointer;
                transition: 0.3s;
                font-weight: bold;
                box-shadow: 0px 5px 15px rgba(255, 215, 0, 0.5);
            }

            .success-box button:hover {
                background: orange;
            }
        `;
        document.head.appendChild(style);
    }
});
