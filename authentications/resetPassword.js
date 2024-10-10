"use strict";
const form = document.getElementById("resetPassword__form");
const resetEmail = form["email"];
const errorResetMess = document.querySelector(".resetEmail__errMess");
const successMess = document.querySelector(".successMess");

const getEmail = JSON.parse(localStorage.getItem("users")) || [];

///// FOR FORM HANDLING
form.addEventListener("submit", function (e) {
  e.preventDefault();

  validationEmailAndSendOtp();
});

/////// FOR VALIDATING OF THE EMAIL
let currentUserEmail;
function validationEmailAndSendOtp() {
  const email = resetEmail.value.trim();
  const currentUserEmail = getEmail.find((user) => email === user.email);

  if (!email) {
    errorResetMess.textContent = "Please your email is needed";
    errorResetMess.classList.remove("errHidden");
    return;
  }
  if (currentUserEmail?.email) {
    const otp = generateOTP();
    /// adding otp to our current user object
    currentUserEmail.otp = otp;
    //   updating the users array in local storage
    localStorage.setItem("users", JSON.stringify(getEmail));

    errorResetMess.style.display = "none";

    //// send otp to the user using Emailjs
    sendEmailWithOTP(currentUserEmail?.email, otp);
    resetEmail.value = "";

    return;
  } else {
    errorResetMess.textContent = "We can not find your email.";
    errorResetMess.classList.remove("errHidden");
  }
}

////////  GENERATING AN OTP
function generateOTP() {
  return Math.floor(10000 + Math.random() * 900000);
}

///////// FUNCTION TO SEND EMAIL USING EMAILJS
function sendEmailWithOTP(userEmail, otp) {
  const templateParams = {
    to_email: userEmail,
    otp: otp,
  };

  // Use emailjs.send function to send the email
  emailjs.send("service_eazppag", "template_nhr9m4e", templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      successMess.textContent = " OTP has been sent to your email!";

      setTimeout(function () {
        location.href = "/authentications/checkEmail.html";
      }, 3000);
    },
    function (error) {
      console.log("FAILED...", error);
      alert("Failed to send OTP.");
    }
  );
}
