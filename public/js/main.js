var fnameInput = document.getElementById("fname");
var fnameError = document.getElementById("fname-error");
var emailInput = document.getElementById("email");
var emailError = document.getElementById("email-error");
var passInput = document.getElementById("password");
var passError = document.getElementById("password-error");
var confirmPassInput = document.getElementById("confirm_password");
var confirmPassError = document.getElementById("confirm_password-error");
var btnSubmit = document.getElementById("btnSubmit");


emailInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
passInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
confirmPassInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});

// Input Functionality
fnameInput.addEventListener("input", validateFullName); 
emailInput.addEventListener("input", validateEmail);
passInput.addEventListener("input", validatePassword);
confirmPassInput.addEventListener("input", validateConfirmPassword);

// function for validating all input
function validateFullName(){
  let fname = fnameInput.value;
  let fnameRegex = /^[A-Za-z\s]+$/;

  if(!fname.match(fnameRegex)){
    fnameError.innerHTML = `
    <div class="alert alert-danger" role="alert">
       Yasis, thats not your name🤦‍♂️
    </div>
    `;
    fnameError.classList.remove('valid');
    fnameError.classList.add('error');
    btnSubmit.disabled = true;
  }else{
    fnameError.innerHTML = `
    <div class="alert alert-success" role="alert">
        Hot Name 🙌
    </div>
    `;
    fnameError.classList.add('valid');
    fnameError.classList.remove('error');
    btnSubmit.disabled = !emailError.classList.contains('valid');
  }

}

function validateEmail() {
  let email = emailInput.value;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email.match(emailPattern)) {
    showError(emailError, "Invalid Email Address!");
  } else {
    showSuccess(emailError, "Valid Email Address");
  }
  updateSignUpButtonState();
}

function validatePassword() {
  let password = passInput.value;
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!password.match(passwordPattern)) {
    showError(passError, "Invalid Password!");
  } else {
    showSuccess(passError, "Valid Password");
  }
  validateConfirmPassword();
}

function validateConfirmPassword() {
  let password = passInput.value;
  let confirmPassword = confirmPassInput.value;

  if (password !== confirmPassword) {
    showError(confirmPassError, "Passwords do not match!");
  } else {
    showSuccess(confirmPassError, "Passwords match");
  }
  updateSignUpButtonState();
}


function showError(element, message) {
  element.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;
  element.classList.remove("valid");
  element.classList.add("error");
}

function showSuccess(element, message) {
  element.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;
  element.classList.remove("error");
  element.classList.add("valid");
}

function updateSignUpButtonState() {
  btnSubmit.disabled = !(
    fnameError.classList.contains("valid") &&
    emailError.classList.contains("valid") &&
    passError.classList.contains("valid") &&
    confirmPassError.classList.contains("valid")
    // Add this line
  );
}

// Password hide/show functionality
function togglePasswordVisibility() {
  var passwordToggle = document.querySelector('.password-toggle');
  if (passInput.type === 'password') {
    passInput.type = 'text';
    passwordToggle.style.backgroundImage = "url('../img/hide.png')";
  } else {
    passInput.type = 'password';
    passwordToggle.style.backgroundImage = "url('../img/eye.png')";
  }
}

// Confirm Password hide/show functionality
function toggleConfirmPasswordVisibility() {
  var passwordConfirmtoggle = document.querySelector('.passwordConfirmtoggle');
  if (confirmPassInput.type === 'password') {
    confirmPassInput.type = 'text';
    passwordConfirmtoggle.style.backgroundImage = "url('../img/hide.png')";
  } else {
    confirmPassInput.type = 'password';
    passwordConfirmtoggle.style.backgroundImage = "url('../img/eye.png')";
  }
}

