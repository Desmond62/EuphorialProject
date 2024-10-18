"use strict";

// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// // Initialize Swiper
// const swiper = new Swiper(".swiper-container", {
//   effect: "fade", // Use fade effect instead of sliding
//   loop: true, // Enable looping
//   autoplay: {
//     delay: 3000, // Change slide every 3 seconds
//     disableOnInteraction: false, // Continue autoplay after user interaction
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true, // Enable clickable pagination bullets
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // Optional: Fade effect settings
//   fadeEffect: {
//     crossFade: true, // Enable cross-fade for smoother transitions
//   },
// });
