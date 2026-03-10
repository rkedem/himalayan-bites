const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  if (slides.length === 0) return;

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function moveSlide(step) {
  if (slides.length === 0) return;

  currentSlide += step;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
}

if (slides.length > 0) {
  setInterval(() => {
    moveSlide(1);
  }, 3000);
}