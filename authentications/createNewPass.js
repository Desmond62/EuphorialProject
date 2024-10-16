"use strict";
const newPassForm = document.getElementById("newPasswordForm");
const newPassword = newPassForm["password"];
const comfirmPassword = newPassForm["comfirmPass"];
const emptyNewPassInput = document.querySelector(".emptyInputs");
const existedPass = document.querySelector(".errorMess__password");
const showNewPassword = document.querySelector(".newPass__passwordShow");
const hideNewPassword = document.querySelector(".newPass__passwordHide");

const getOldPassword = JSON.parse(localStorage.getItem("users")) || [];

newPassForm.onsubmit = function (e) {
  e.preventDefault();

  updateNewPassword();
};

// /////////////  Passing Text and Number Password/////////////
// function validateNewPassword(password) {
//   const hasNumber = /[0-9]/.test(password);
//   const hasText = /[a-zA-Z]/.test(password);
//   return hasNumber && hasText;
// }

function updateNewPassword() {
  const newPass = newPassword.value.trim();
  const comfirmPass = +comfirmPassword.value.trim();

  const oldPassword = getOldPassword.find((user) => user);

  //////// When the password already Exists
  if (newPass === oldPassword.password) {
    emptyNewPassInput.textContent =
      "This password already exists. Please choose a different one.";
    existedPass.textContent = "";
    newPassword.style.border = comfirmPassword.style.border = "";
    emptyNewPassInput.classList.remove("successChangePass");

    errMessage();
    return;
  }

  /////// When the input is Empty ///////
  // prettier-ignore
  if (!newPass || !comfirmPass || newPass.length <= 7 ) {
    // emptyNewPassInput.textContent =
    //   "Both Password and Confirm Password fields are required!!";
    // errMessage();
    newPassword.style.border = comfirmPassword.style.border = "1px solid red";
    existedPass.textContent = "";
     emptyNewPassInput.textContent =""
    return;
  }

  //// Making sure the password and comfirmPassword matches
  const passwordRecheck = +newPass !== comfirmPass;

  if (passwordRecheck) {
    existedPass.textContent = "Sorry, the password does not match";
    emptyNewPassInput.textContent = "";
    newPassword.style.border = comfirmPassword.style.border = "";

    return;
  }

  if (!passwordRecheck) {
    emptyNewPassInput.textContent = "";
    existedPass.textContent = "";
    newPassword.style.border = comfirmPassword.style.border = "";
    emptyNewPassInput.textContent = "Your new password has been set!!!.";
    emptyNewPassInput.classList.add("successChangePass");

    oldPassword.password = newPassword.value;
    localStorage.setItem("users", JSON.stringify(getOldPassword));
    console.log(oldPassword.password);
    return;
  }
}

////////////// For Handling Error Messages
function errMessage() {
  emptyNewPassInput.classList.add("errorMess__password");
}
function errMessageRemove() {
  emptyNewPassInput.classList.remove("errorMess__password");
}

////////////// For Handling Show and Hide Password /////////////
newPassword.oninput = function () {
  if (this.value) {
    showNewPassword.style.display = "inline";
  } else {
    showNewPassword.style.display = "none";
    hideNewPassword.style.display = "none";
    this.type = "password";
  }
};
showNewPassword.onclick = () => {
  password.type = "text";
  showNewPassword.style.display = "none";
  hideNewPassword.style.display = "inline";
};
hideNewPassword.onclick = () => {
  password.type = "password";
  showNewPassword.style.display = "inline";
  hideNewPassword.style.display = "none";
};
