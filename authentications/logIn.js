"use strict";

////////////////// For Validation //////////////

const loginForm = document.getElementById("logIn__form");
const email = loginForm["email"];
const password = loginForm["password"];
const showPasswordLogin = document.querySelector(".logIn__passwordShow");
const hidePasswordLogin = document.querySelector(".logIn__passwordHide");
const isFieldVoid = document.querySelector(".emptyError__inptMessage");
const isAuthInvalid = document.querySelector(".hidden__erroMess");

const loginUsers = JSON.parse(localStorage.getItem("users")) || null;

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  loginValidation();
});

let currentUser;
function loginValidation() {
  const loginEmail = email.value.trim();
  const loginPassword = password.value.trim();

  if (!loginEmail || !loginPassword) {
    return (isFieldVoid.style.display = "inline");
  } else {
    isFieldVoid.style.display = "none";
  }

  currentUser = loginUsers?.find(
    (user) =>
      user.email === loginEmail &&
      loginUsers?.find((user) => user.password === loginPassword)
  );

  if (!currentUser) {
    return isAuthInvalid.classList.remove("hidden__erroMess");
  } else {
    isAuthInvalid.classList.add("hidden__erroMess");
  }
}

////////////// For Handling Show and Hide Password /////////////
password.oninput = function () {
  if (this.value) {
    showPasswordLogin.style.display = "inline";
  } else {
    showPasswordLogin.style.display = "none";
    hidePasswordLogin.style.display = "none";
    this.type = "password";
  }
};
showPasswordLogin.onclick = () => {
  password.type = "text";
  showPasswordLogin.style.display = "none";
  hidePasswordLogin.style.display = "inline";
};
hidePasswordLogin.onclick = () => {
  password.type = "password";
  showPasswordLogin.style.display = "inline";
  hidePasswordLogin.style.display = "none";
};
