"use strict";
const newPassForm = document.getElementById("newPasswordForm");
const newPassword = newPassForm["password"];
const comfirmPassword = newPassForm["comfirmPass"];
const emptyNewPassInput = document.querySelector(".emptyInputs");
const existedPass = document.querySelector(".newPass__password");

const getOldPassword = JSON.parse(localStorage.getItem("users")) || [];

newPassForm.onsubmit = function (e) {
  e.preventDefault();

  updateNewPassword();
};

function updateNewPassword() {
  const newPass = newPassword.value;
  const comfirmPass = +comfirmPassword.value;

  const oldPassword = getOldPassword.find((user) => user);

  //////// When the password already Exists
  if (newPass === oldPassword.password)
    return (
      (emptyNewPassInput.textContent =
        "This password already exists. Please choose a different one.") &&
      errMessage()
    );

  /////// When the input is Empty

  if (!newPass || !comfirmPass)
    return (
      (emptyNewPassInput.textContent =
        "Both Password and Confirm Password fields are required!!") &&
      errMessage()
    );

  const passwordRecheck = +newPass !== comfirmPass;

  if (passwordRecheck) {
    emptyNewPassInput.textContent = "Sorry, the password don't not match";
  } else {
    console.log(passwordRecheck);
    alert("ou are doing well ");
  }

  // if()

  //   localStorage.setItem("users", JSON.stringify(getOldPassword));

  //   if (oldPassword.password) return alert("the password has been used already");
}

////////////// For Handling Error Messages
function errMessage() {
  emptyNewPassInput.classList.add("errorMess__password");
}
function errMessageRemove() {
  emptyNewPassInput.classList.remove("errorMess__password");
}
