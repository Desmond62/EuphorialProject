const resendButton = document.querySelector(".resend__button");

const reCheckEmail = JSON.parse(localStorage.getItem("users")) || [];

/////// FOR VALIDATING OF THE EMAIL
let currentUserCode;

////// FOR VARIFIACTION OF OTP /////////
const formOTP = document.getElementById("verifyPassword__form");
const inputOTP = document.getElementById("codeVerify");
const verifyMess = document.querySelector(".verificationMess");
const overlayContainer = document.querySelector(".verify__container");
const wholeOverlay = document.querySelector(".Verify__overlay");

inputOTP.oninput = function () {
  // Remove any non-numeric characters
  this.value = this.value.replace(/[^0-9]/g, "");

  // Limit to exactly 6 digits
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6);
  }

  if (this.value) {
    // Find the correct OTP to compare against
    const correctOTP = reCheckEmail[0].otp.toString(); // Assuming this is where your correct OTP is
    const enteredValue = this.value;

    // Check if current digits match the correct OTP so far
    const isCorrectSoFar = correctOTP.startsWith(enteredValue);

    if (isCorrectSoFar && enteredValue.length === 6) {
      currentUserCode = reCheckEmail.find((user) => +enteredValue === user.otp);
      this.style.border = "1px solid green";
    } else if (isCorrectSoFar) {
      this.style.border = "1px solid green";
      verifyMess.textContent = "";
    } else {
      this.style.border = "1px solid red";
      verifyMess.textContent = "Please enter the correct OTP";
      verifyMess.classList.add("errVerification");
      verifyMess.classList.remove("successVerifcation");

      return;
    }
  } else {
    this.style.border = "1px solid #8a33fd";
  }
};

formOTP.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputOTP.value)
    return (
      (verifyMess.textContent = "Please enter your OTP") &&
      verifyMess.classList.add("errVerification")
    );
  location.href = "/authentications/createNewPass.html";

  verifyMess.classList.add("successVerifcation");
  verifyMess.textContent = "Success! Your OTP has been verified.";
  inputOTP.value = "";
  inputOTP.style.border = "1px solid #8a33fd";
});

document.addEventListener("click", function (e) {
  if (!overlayContainer.contains(e.target))
    return (wholeOverlay.style.display = "none");
});

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
resendButton.onclick = function () {
  const currentUserCode = reCheckEmail.find((user) => user.email);

  if (currentUserCode?.email) {
    const otp = generateOTP();
    /// adding otp to our current user object
    currentUserCode.otp = otp;
    //   updating the users array in local storage
    localStorage.setItem("users", JSON.stringify(reCheckEmail));

    ////////  GENERATING AN OTP
    function generateOTP() {
      return Math.floor(10000 + Math.random() * 900000);
    }

    ///////// FUNCTION TO SEND EMAIL USING EMAILJS
    const templateParams = {
      to_email: currentUserCode?.email,
      otp: otp,
    };
    // Use emailjs.send function to send the email
    emailjs.send("service_eazppag", "template_nhr9m4e", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        // alert("OTP has been sent to " + currentUserCode?.email);
        wholeOverlay.style.display = "block";
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Failed to send OTP.");
      }
    );

    return;
  }
};

wholeOverlay.style.display = "block";
