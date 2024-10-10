"use strict";
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z"/></svg>';

const countries = [
  { name: "Portuguise" },
  { name: "English (United State)" },
  { name: "Chinese" },
  { name: "French" },
  { name: "Italian" },
];

const dropDown = document.querySelector(".logIn__custom__dropdown");
const headerLogin = dropDown.querySelector(".logIn__drop__header");
const loginList = dropDown.querySelector(".logInDropdown__list");
const item = dropDown.querySelector(".logInDropdown__item");
const items = countries;

///////// Implementing the Dropdown ///////////
headerLogin.onclick = () => {
  loginList.style.display =
    loginList.style.display === "block" ? "none" : "block";
};

///////// To Add Each Of The Option ///////////
items.forEach((name) => {
  item.style.display = "none";
  const html = `
      <div class="logInDropdown__item"><span>${name.name}</span> ${svg}</div>
      `;
  loginList.insertAdjacentHTML("afterbegin", html);
  loginList.onclick = (e) => {
    headerLogin.innerHTML = `${e.target.textContent}${svg} `;
    loginList.style.display = "none";
  };
});

/////// TO remove the Dropdown each time it click outside //////
document.addEventListener("click", function (e) {
  if (!dropDown.contains(e.target)) {
    loginList.style.display = "none";
  }
});

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
