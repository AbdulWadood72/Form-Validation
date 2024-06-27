const form = document.getElementById("myForm");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");
const thankyouMessage = document.getElementById("thank-you-content");

const showError = (field, errorText) => {
    const errorElement = field.closest(".form-group").querySelector(".error-text");
    if (errorElement) {
        errorElement.textContent = errorText;
    } else {
        const newErrorElement = document.createElement("small");
        newErrorElement.classList.add("error-text");
        newErrorElement.textContent = errorText;
        field.closest(".form-group").appendChild(newErrorElement);
    }
};

const checkPasswordStrength = (password) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

const validatePassword = (password) => {
    if (password === "") {
        showError(passwordInput, "Enter Your Password");
    } else if (password.length < 8) {
        showError(passwordInput, "Password must be at least 8 characters long");
    } else if (!/[A-Z]/.test(password)) {
        showError(passwordInput, "Password must contain at least one uppercase letter");
    } else if (!checkPasswordStrength(password)) {
        showError(passwordInput, "Password must contain at least one special character");
    }
};

const handleFormData = (e) => {
    e.preventDefault();
    const [fullnameinput, emailinput, dateinput, genderinput] = [
        "fullname",
        "email",
        "date",
        "gender"
    ].map((id) => document.getElementById(id));

    const [fullname, email, password, date, gender] = [
        fullnameinput,
        emailinput,
        passwordInput,
        dateinput,
        genderinput,
    ].map((input) => input.value.trim());

    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,4}$/;

    document.querySelectorAll(".error-text").forEach((errorText) => errorText.remove());

    let isValid = true;

    if (fullname === "") {
        showError(fullnameinput, "Enter Full Name");
        isValid = false;
    }
    if (!emailPattern.test(email)) {
        showError(emailinput, "Enter Valid Email Address");
        isValid = false;
    }
    validatePassword(password);
    if (date === "") {
        showError(dateinput, "Select Your Date Of Birth");
        isValid = false;
    }
    if (gender === "") {
        showError(genderinput, "Select Your Gender");
        isValid = false;
    }

    if (isValid) {
        form.style.display = "none";
        thankyouMessage.style.display = "block";
    }
};

passToggleBtn.addEventListener("click", () => {
    passToggleBtn.className =
        passwordInput.type === "password"
            ? "fa-solid fa-eye-slash"
            : "fa-solid fa-eye";
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
});

form.addEventListener("submit", handleFormData);