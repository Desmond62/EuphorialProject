"use strict";

const galleryWrapper = document.querySelector(".gallery-wrapper");

const newArrival = [
  {
    id: "1",
    img: "/images/image4.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "2",
    img: "/images/image5.jpeg",
    brand: "Full Sleeve",
  },
  {
    id: "3",
    img: "/images/image6.jpeg",
    brand: "Active T-Shirts",
  },
  {
    id: "4",
    img: "/images/image7.jpeg",
    brand: "Urban Shirts",
  },
  {
    id: "5",
    img: "/images/image21.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "6",
    img: "/images/image9.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "7",
    img: "/images/image10.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "8",
    img: "/images/image19.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "9",
    img: "/images/image12.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "10",
    img: "/images/image13.jpeg",
    brand: "Knitted Joggers",
  },
  {
    id: "11",
    img: "/images/image14.jpeg",
    brand: "Knitted Joggers",
  },
];

//

galleryWrapper.innerHTML = "";

newArrival.forEach((item) => {
  const html = `
               <div class="gallery-slide">
                  <img class="skeleton__image skeleton-loading" src=${item.img} alt=${item.brand} />
                  <p class="skeleton__text skeleton-loading">${item.brand}</p>
                </div>
    `;
  galleryWrapper.insertAdjacentHTML("beforeend", html);
});

// For Handling Skeleton
function handleImageLoading() {
  const gallerySlides = document.querySelectorAll(".gallery-slide");

  gallerySlides.forEach((slide) => {
    const img = slide.querySelector(".skeleton__image");
    const text = slide.querySelector(".skeleton__text");

    // Add loading state initially
    if (!img.complete) {
      img.classList.add("skeleton-loading");
      text.classList.add("skeleton-loading");
    }

    img.onload = function () {
      // Remove skeleton from both image and text when image loads
      img.classList.remove("skeleton-loading");
      text.classList.remove("skeleton-loading");
      img.style.opacity = "1";
      text.style.opacity = "1";
    };

    // Handle cached images
    if (img.complete) {
      img.classList.remove("skeleton-loading");
      text.classList.remove("skeleton-loading");
      img.style.opacity = "1";
      text.style.opacity = "1";
    }
  });
}

// Call when DOM loads
document.addEventListener("DOMContentLoaded", handleImageLoading);
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
