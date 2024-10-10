const resendButton = document.querySelector(".resend__button");

const reCheckEmail = JSON.parse(localStorage.getItem("users")) || [];

/////// FOR VALIDATING OF THE EMAIL
let currentUserEmail;

resendButton.onclick = function () {
  const currentUserEmail = reCheckEmail.find((user) => user.email);

  if (currentUserEmail?.email) {
    const otp = generateOTP();
    /// adding otp to our current user object
    currentUserEmail.otp = otp;
    //   updating the users array in local storage
    localStorage.setItem("users", JSON.stringify(reCheckEmail));

    //// send otp to the user using Emailjs

    // resetEmail.value = "";

    ////////  GENERATING AN OTP
    function generateOTP() {
      return Math.floor(10000 + Math.random() * 900000);
    }

    ///////// FUNCTION TO SEND EMAIL USING EMAILJS
    const templateParams = {
      to_email: currentUserEmail?.email,
      otp: otp,
    };
    // Use emailjs.send function to send the email
    emailjs.send("service_eazppag", "template_nhr9m4e", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("OTP has been sent to " + currentUserEmail?.email);
      },
      function (error) {
        console.log("FAILED...", error);
        alert("Failed to send OTP.");
      }
    );

    return;
  }
};
