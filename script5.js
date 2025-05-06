document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login_form");
    const signupForm = document.querySelector(".signup_form");
    const loginBtn = loginForm.querySelector(".btn");
    const signupBtn = signupForm.querySelector(".btn");

    const loginRadio = document.getElementById("login");
    const signupRadio = document.getElementById("signup");

    // Set Signup tab as default on page load
    signupRadio.checked = true;

    function showError(input, message) {
        let errorBox = input.parentElement.querySelector(".error-message");
        if (!errorBox) {
            errorBox = document.createElement("div");
            errorBox.classList.add("error-message");
            input.parentElement.appendChild(errorBox);
        }
        errorBox.textContent = message;
        input.style.border = "2px solid crimson";
    }

    function clearError(input) {
        let errorBox = input.parentElement.querySelector(".error-message");
        if (errorBox) {
            errorBox.remove();
        }
        input.style.border = "2px solid green";
    }

    function validateSignupForm() {
        let isValid = true;
        const username = signupForm.querySelector("input[placeholder='Username']");
        const email = signupForm.querySelector("input[placeholder='Email']");
        const password = signupForm.querySelector("input[placeholder='Password']");

        if (username.value.trim().length < 3) {
            showError(username, "Username must be at least 3 characters long!");
            isValid = false;
        } else {
            clearError(username);
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email address!");
            isValid = false;
        } else {
            clearError(email);
        }

        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters long!");
            isValid = false;
        } else {
            clearError(password);
        }

        return isValid;
    }

    function validateLoginForm() {
        let isValid = true;
        const email = loginForm.querySelector("input[placeholder='Email Address']");
        const password = loginForm.querySelector("input[placeholder='Password']");

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Enter a valid email address!");
            isValid = false;
        } else {
            clearError(email);
        }

        if (password.value.trim().length < 6) {
            showError(password, "Password must be at least 6 characters long!");
            isValid = false;
        } else {
            clearError(password);
        }

        return isValid;
    }

    signupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateSignupForm()) {
            showSuccessMessage("Sign Up Successful", "Welcome to Bloodsphere!", () => {
                loginRadio.checked = true; // Switch to login tab
            });
        }
    });

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateLoginForm()) {
            showSuccessMessage("Login Successful", "Welcome back to Bloodsphere!", () => {
                window.location.href = "index.html";
            });
        }
    });

    function showSuccessMessage(title, message, callback) {
        const successBox = document.createElement("div");
        successBox.classList.add("success-box");
        successBox.innerHTML = `
            <div class="success-content">
                <h2>✅ ${title}</h2>
                <p>${message}</p>
                <button class="done-btn">Done</button>
            </div>
        `;

        document.body.classList.add("blur-background");
        document.body.appendChild(successBox);

        setTimeout(() => {
            successBox.classList.add("show");
        }, 100);

        successBox.querySelector(".done-btn").addEventListener("click", function () {
            document.body.classList.remove("blur-background");
            successBox.remove();
            if (callback) callback();
        });
    }
});
