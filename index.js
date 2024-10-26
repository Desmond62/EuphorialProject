"use strict";

// Initialize Swiper FOR CAROUSEL
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

// New gallery carousel initialization
const gallerySlider = new Swiper(".gallery-container", {
  wrapperClass: "gallery-wrapper",
  slideClass: "gallery-slide",
  slidesPerView: "auto",
  spaceBetween: 12,
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev",
  },
  speed: 400,
});

const expiredTIme = Date.now() + 60000;
console.log(expiredTIme);
