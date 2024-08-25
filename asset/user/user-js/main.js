let subMenus = document.getElementById("subMenus");
let openMenus = document.querySelector(".menus");

openMenus.addEventListener("click", () => {
  subMenus.classList.toggle("open-menus");
});
let menu = document.getElementById("menu");
let navbar = document.querySelector(".navbar");

// show nav-toggle

const navToggle = document.querySelector(".nav-toggler"),
  headerToggle = document.querySelector(".header");

navToggle.addEventListener("click", () => {
  document.querySelector(".header .navbar").classList.toggle("open");
  navToggle.classList.toggle("transition");
});

// show search
document.querySelector("#search-icon").onclick = () => {
  document.querySelector("#search-form").classList.toggle("active");
};
document.querySelector("#close").onclick = () => {
  document.querySelector("#search-form").classList.remove("active");
};
// ======= SHOW SLIDER============

var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// ======= SHOW SLIDER food============

var swiper = new Swiper(".food-slider", {
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    769: {
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    1000: {
      slidesPerView: 3,
    },
  },
});
// show slides

function renderSlider() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  let stringSlide = ``;
  for (let i = 0; i < products.length; i++) {
    stringSlide += `
    <div class="swiper-slide food-item">
    <div class="food-content" id="food-content">
      <a href="#" class="heart"><i class="bx bxs-heart"></i></a>
      <div class="food-img">
        <img src="${products[i].image}" draggable="false" />
      </div>
      <div class="food-text">
        <h3>${products[i].name}</h3>
        <div class="star">
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star"></i>
          <i class="bx bxs-star-half"></i>
        </div>
        <div class="food-price">
          <a href="#" class="btn">order now</a>
          <span>${products[i].price}</span>
        </div>
      </div>
    </div>
  </div>
    `;
  }
  document.getElementById("slide-item").innerHTML = stringSlide;
}
renderSlider();
