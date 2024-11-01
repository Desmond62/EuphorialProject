"use strict";

////// FOR VARIFIACTION OF OTP /////////
const formOTP = document.getElementById("verifyPassword__form");
const verificationInput = document.getElementById("codeVerify");
const verifyMess = document.querySelector(".verificationMess");
const seconds = document.querySelector(".time__countDown");
const overlayContainer = document.querySelector(".verify__container");
const wholeOverlay = document.querySelector(".Verify__overlay");

const resendButton = document.querySelector(".resend__button");
const savedEmailMessage = document.querySelector(".saved__email");

const reCheckEmail = JSON.parse(localStorage.getItem("users")) || [];
let currentUserCode;

let timerInterval;

//////////////////////////////////////
/////////////////////////////////////
////////////////////////////////////

function startTimer() {
  const savedEmail = localStorage.getItem("currentUserEmail");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.email === savedEmail);

  timerInterval = setInterval(() => {
    const timeLeft = currentUser.otpExpiration - Date.now();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Clear expired OTP
      currentUser.otp = null;
      currentUser.otpExpiration = null;
      currentUser.otpUsed = null;
      localStorage.setItem("users", JSON.stringify(users));
      return;
    }

    const secondsLeft = Math.floor(timeLeft / 1000);
    seconds.textContent = `Time remaining: ${secondsLeft} seconds`;
    handlingErrorMess();
    verificationInput.style.border = "1px solid #8a33fd";
  }, 1000);

  if (timeLeft === 0) {
    seconds.style.display = "none";
    return;
  }
}

// Start the timer as soon as checkEmail.html loads
document.addEventListener("DOMContentLoaded", startTimer);

/////////////////////////////////////////////////
////////////////////////////////////////////////
///////////////////////////////////////////////

// Handle form submission
formOTP.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the current user email from local Storage
  const savedEmail = localStorage.getItem("currentUserEmail");

  if (!savedEmail) {
    verifyMess.textContent = "Please request OTP again";
    handlingErrorMess();
    return;
  }

  if (!verificationInput.value) {
    verifyMess.textContent = "Please, the Input must not be empty";
    handlingErrorMess();
    verificationInput.style.border = "1px solid red";
    return;
  }
  if (verificationInput.value.length < 6) {
    verifyMess.textContent = "Please OTP must be 6 characters";
    handlingErrorMess();
    verificationInput.style.border = "1px solid red";
    return;
  }

  currentUserCode = reCheckEmail.find(user => user.email === savedEmail) //prettier-ignore
  //Add OTP expiration check here
  if (currentUserCode && +verificationInput.value === currentUserCode.otp) {
    if (!currentUserCode.otpExpiration) {
      verifyMess.textContent =
        "Invalid or expired OTP. Please request a new one.";
      handlingErrorMess();
      return;
    }

    // Calculating the time left
    const timeLeft = currentUserCode.otpExpiration - +Date.now();

    // If time left is negative,  OTP has expired
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      seconds.textContent = "";
      verifyMess.textContent = "OTP has expired. Please request for a new one.";
      handlingErrorMess();

      ///////////////////////////
      //// Clear expired OTP  ////
      ///////////////////////////
      currentUserCode.otp = null;
      currentUserCode.otpExpiration = null;
      currentUserCode.otpUsed = null;
      localStorage.setItem("users", JSON.stringify(reCheckEmail));
      return;
      // handlingErrorMess();
    }

    // OTP is valid and not expired
    clearInterval(timerInterval); // Clear timer on successful verification
    seconds.textContent = "";
    currentUserCode.otpUsed = true;
    localStorage.setItem("users", JSON.stringify(reCheckEmail));
    verifyMess.textContent = "OTP verified successfully!";
    handlingSuccessMess();
    return;
  } else {
    verifyMess.textContent = "Invalid OTP";
    return handlingErrorMess();
  }

  // If exactly 6 digits, proceed with verification
  // if (verificationInput.value.length === 6) {
  //   verificationInput.style.border = "";
  //   handlingSuccessMess();
  //   return;
  // }
});

// Clean up when leaving the page
window.addEventListener("beforeunload", () => {
  clearInterval(timerInterval);
});

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
////////////////   Resend Button  ////////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

resendButton.onclick = function () {
  // Get the saved email
  const savedEmail = localStorage.getItem("currentUserEmail");

  if (!savedEmail) {
    handleErrorSavedEmail();
    return;
  }

  // Retrieve the users from localStorage
  const reSendEmail = JSON.parse(localStorage.getItem("users")) || [];

  const currentUserCode = reSendEmail.find((user) => user.email === savedEmail) //prettier-ignore

  if (currentUserCode) {
    const otp = generateOTP();
    /// adding otp to our current user object
    currentUserCode.otp = otp;
    currentUserCode.otpExpiration = Date.now() + 60000;
    currentUserCode.otpUsed = false; //Track if the OTP has been used

    //   updating the users array in local storage
    localStorage.setItem("users", JSON.stringify(reSendEmail));

    ///////// FUNCTION TO SEND EMAIL USING EMAILJS
    const templateParams = {
      to_email: currentUserCode?.email,
      otp: otp,
    };
    // Use emailjs.send function to send the email
    emailjs.send("service_peq5bqa", "template_34ejrut", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        wholeOverlay.style.display = "block";
        location.reload();
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Failed to send OTP.");
      }
    );

    return;
  } else {
    alert("User not found:");
  }
};

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////   ALL THE REUSABLE HANDEL EVENT FUNCTIONS   //////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Handling Successful Message
function handlingSuccessMess() {
  verifyMess.classList.remove("errVerification");
  verifyMess.classList.add("successVerifcation");
  return (verificationInput.style.border = "1px solid green");
}
/// Handling Error Message
function handlingErrorMess() {
  verifyMess.classList.remove("successVerifcation");
  verifyMess.classList.add("errVerification");
  return (verificationInput.style.border = "1px solid red");
}

// Removed all Events before resending OTP again
function handleRemoveAllEvents() {
  verifyMess.classList.remove("errVerification");
  verifyMess.classList.remove("successVerifcation");
  verifyMess.textContent = verificationInput.value = "";

  verificationInput.style.border = "1px solid #8a33fd";
}

//Handling OTP Verification
function handleVerificationInput(input) {
  // Remove any non-numeric characters
  input.value = input.value.replace(/[^0-9]/g, "");

  // Prevent typing more than 6 digits by truncating extra digits
  if (input.value.length > 6) {
    input.value = input.value.slice(0, 6);
  }
}

// Add event listeners
verificationInput.addEventListener("input", function () {
  handleVerificationInput(this);
});

document.addEventListener("click", function (e) {
  if (!overlayContainer.contains(e.target)) {
    handleRemoveAllEvents();
    wholeOverlay.style.display = "none";
    return;
  }
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

////////  GENERATING AN OTP  ////////
function generateOTP() {
  // let ran = [];
  // let code;
  // for (let i = 0; i < 6; i++) {
  //   code = Math.floor(Math.random() * 10);
  //   ran += code;
  //   return;
  // }
  return Math.floor(10000 + Math.random() * 900000);
}

// Handle event for successful message
function handleSuccessSavdEmail() {
  savedEmailMessage.textContent = "The OTP has been successfully resent again";
  savedEmailMessage.classList.add("successSaved__email");
}

// Handle eveny for for Unsuccessfull messaage
function handleErrorSavedEmail() {
  savedEmailMessage.textContent = "Please go back and enter your email again";
  savedEmailMessage.classList.add("errorSaved__email");
}

wholeOverlay.style.display = "block";
