// Select The Elements
var big_wrapper;
var hamburger_menu;

function declare() {
  big_wrapper = document.querySelector(".big-wrapper");
  hamburger_menu = document.querySelector(".hamburger-menu");
}

declare();


function toggleAnimation() {
  
}

function events() {
  hamburger_menu.addEventListener("click", () => {
    big_wrapper.classList.toggle("active");
  });
}

events();
