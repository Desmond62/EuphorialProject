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

const dropDown = document.querySelector(".custom__dropdown");
const header = dropDown.querySelector(".drop__header");
const list = dropDown.querySelector(".dropdown__list");
const item = dropDown.querySelector(".dropdown__item");
const items = countries;

///////// Implementing the Dropdown ///////////
header.onclick = () => {
  list.style.display = list.style.display === "block" ? "none" : "block";
};

///////// To Add Each Of The Option ///////////
items.forEach((name) => {
  item.style.display = "none";
  const html = `
      <div class="dropdown__item"><span>${name.name}</span> ${svg}</div>
      `;
  list.insertAdjacentHTML("afterbegin", html);
  list.onclick = (e) => {
    header.innerHTML = `${e.target.textContent}${svg} `;
    list.style.display = "none";
  };
});

/////// TO remove the Dropdown each time it click outside //////
document.addEventListener("click", function (e) {
  if (!dropDown.contains(e.target)) {
    list.style.display = "none";
  }
});

/////////////////// For Validation Sign Up //////////////////
const form = document.getElementById("myForm");
const emailInput = form["email"]; // document.querySelector(".email")
const passwordInput = form["password"]; // document.querySelector(".password")
const showPassword = document.querySelector(".signUp__passwordShow");
const hidePassword = document.querySelector(".signUp__passwordHide");
const errorMessagePassword = document.querySelector(".errorMess__password");
const errorMessageEmail = document.querySelector(".errorMess__email");

const checkbox = document.getElementById("terms");
const errorMessageTerms = document.querySelector(".error__terms");
const subscribeCheckbox = document.getElementById("subscribe");
const errorMessageSubscribe = document.querySelector(".error__subscribe");
const emailExisted = document.querySelector(".emailExisted");

// Initialize formUser as an empty array if not set in localStorage
let formUser = JSON.parse(localStorage.getItem("users")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  /////////// calling function validation //////////////
  handleValidation();
});

/////////////  Passing Text and Number Password/////////////
function validatePassword(password) {
  const hasNumber = /[0-9]/.test(password);
  const hasText = /[a-zA-Z]/.test(password);
  return hasNumber && hasText;
}

/////////////  Handling the validation ////////////
function handleValidation() {
  const password = passwordInput.value.trim();
  const email = emailInput.value.trim();
  const isChecked = checkbox.checked;
  const isChecked__subcribe = checkbox.checked;

  ////// Check email input //////
  if (!email) {
    errorMessageEmail.style.display = "inline";
  } else {
    errorMessageEmail.style.display = "none";
  }

  /////// Checking if the password has Both Number, Text and the length is not less or equal to 7 ////////
  if (!validatePassword(password) || password.length <= 7) {
    return (errorMessagePassword.style.display = "inline");
  } else {
    errorMessagePassword.style.display = "none";
  }

  // Check if terms checkbox is checked
  if (!isChecked) {
    errorMessageTerms.style.display = "inline";
  } else {
    errorMessageTerms.style.display = "none";
  }
  // Check if Subscribe checkbox is checked
  if (!isChecked__subcribe) return;

  ////// Checking If the Email is alredy Exist ///////
  const existEmail = formUser.some((user) => user.email === email);
  if (existEmail) {
    return (emailExisted.textContent = "Email is already existed");
  } else {
    emailExisted.textContent = "";
  }

  // Only proceed with form submission if all fields are valid
  if (email && validatePassword(password) && password.length > 7 && isChecked && isChecked__subcribe) {
    const formData = {
      email: emailInput.value,
      password: passwordInput.value,
      checkboxTerms: isChecked,
      checkboxSubscribe:isChecked__subcribe
    };

    formUser.push(formData);
    localStorage.setItem("users", JSON.stringify(formUser));
    
    ////// Emptying password, email, and icons after submitting the form
    passwordInput.value = emailInput.value = showPassword.style.display = hidePassword.style.display = ""
    checkbox.checked=subscribeCheckbox.checked= false
  } //prettier-ignore
}

////////////// For Handling Show and Hide Password /////////////

passwordInput.oninput = function () {
  if (this.value) {
    showPassword.style.display = "inline";
  } else {
    showPassword.style.display = "none";
    hidePassword.style.display = "none";
    this.type = "password";
  }
};

showPassword.onclick = function () {
  passwordInput.type = "text";
  showPassword.style.display = "none";
  hidePassword.style.display = "inline";
};
hidePassword.onclick = function () {
  passwordInput.type = "password";
  showPassword.style.display = "inline";
  hidePassword.style.display = "none";
};

// Function to set up event listeners based on media query

const selectLang = document.querySelector(".select__lang");
const searchLabel = document.querySelector('label[for="search"]');
const overlayInput = document.querySelector(".overlay__container");
const formOverlay = document.querySelector(".form__overlay");

const mediaQuery500 = window.matchMedia("(max-width: 500px)");
const mediaQuery667 = window.matchMedia("(max-width: 667px)");

function setupEventListeners() {
  if (mediaQuery500.matches) {
    selectLang.textContent = "Select Lang";
  } else {
    selectLang.textContent = "Select Language";
  }

  // Clear any existing listeners to avoid duplicates
  searchLabel.removeEventListener("click", showOverlay);
  searchLabel.removeEventListener("touchstart", showOverlay);
  if (mediaQuery667.matches) {
    // EventListener for phone
    searchLabel.addEventListener("click", showOverlay);
    searchLabel.addEventListener("touchstart", showOverlay);
  }
}
// Hide overlay if not in mobile view
document.addEventListener("click", function (e) {
  if (!formOverlay.contains(e.target)) {
    setTimeout(function () {
      return overlayInput.classList.add("hidden");
    }, 500);
  }
});

function showOverlay() {
  overlayInput.classList.remove("hidden");
}

function hideOverlay() {
  overlayInput.classList.add("hidden");
}

// Initial setup
setupEventListeners();

// Listen for media query changes
mediaQuery500.addEventListener("change", setupEventListeners);
mediaQuery667.addEventListener("change", setupEventListeners);
