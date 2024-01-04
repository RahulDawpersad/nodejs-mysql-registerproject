// var fnameInput = document.getElementById("fname");
var emailInput = document.getElementById("email");
var passInput = document.getElementById("password");
var confirmPassInput = document.getElementById("confirm_password");

emailInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
passInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
confirmPassInput.addEventListener("input", function () {
  this.value = this.value.replace(/\s/g, "");
});
