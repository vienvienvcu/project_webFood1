// show sidebar

const navToggle = document.querySelector(".nav-toggler");
const sidebarAdmin = document.querySelector(".sidebar-admin");
const mainActive = document.querySelector(".main");

navToggle.addEventListener("click", () => {
  sidebarAdmin.classList.toggle("active");
  mainActive.classList.toggle("active");
  navToggle.classList.toggle("transition");
});

// show search
const searchIcon = document.querySelector("#search-icon");
const searchOpen = document.querySelector("#input-search");

searchIcon.addEventListener("click", () => {
  searchOpen.classList.toggle("active");
});
