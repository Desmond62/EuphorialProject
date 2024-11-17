"use strict";

$(document).ready(function () {
  $(".carousel").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2500, // 2.5 seconds
    pauseOnHover: true,
    fade: true, // Enable fade transition
    cssEase: "linear", // Use linear easing for smooth transition
  });
});
