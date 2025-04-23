let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  document.getElementById("slidesWrapper").style.transform = `translateX(-${index * 100}%)`;
  currentSlide = index;
}

function nextSlide() { showSlide((currentSlide + 1) % slides.length); }
function changeSlide(n) { showSlide((currentSlide + n + slides.length) % slides.length); }
function goToSlide(index) { showSlide(index); }

setInterval(nextSlide, 6000);

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
  document.querySelector(".theme-toggle").classList.add("spin");
  setTimeout(() => document.querySelector(".theme-toggle").classList.remove("spin"), 500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  showSlide(currentSlide);
  const animatedCards = document.querySelectorAll(".feature-card.animate");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.classList.add("fade-in-visible");
      }
    });
  }, { threshold: 0.1 });
  animatedCards.forEach(card => observer.observe(card));
});

function openSignup() { document.getElementById("signupModal").style.display = "block"; }
function closeSignup() { document.getElementById("signupModal").style.display = "none"; }
