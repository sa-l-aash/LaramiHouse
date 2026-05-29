"use strict";

/* =========================
   NAVBAR SCROLL
========================= */

const nav = document.querySelector(".nav");

function handleNavScroll() {
  if (!nav) return;

  const triggerPoint = 80; // consistent across all pages

  if (window.scrollY > triggerPoint) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

/* =========================
   SCROLL PROGRESS BAR
========================= */

function updateProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const progress = (scrollTop / height) * 100;
  bar.style.width = progress + "%";
}

/* =========================
   ACTIVE LINK HIGHLIGHT
========================= */

function setActiveLink() {
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });
}

/* =========================
   MOBILE MENU
========================= */

function initMobileMenu() {
  const menuBtn = document.querySelector(".menu-btn");
  const sideMenu = document.querySelector(".side-menu");
  const overlay = document.querySelector(".menu-overlay");

  if (!menuBtn || !sideMenu || !overlay) return;

  menuBtn.addEventListener("click", () => {
    sideMenu.classList.add("active");
    overlay.classList.add("active");
  });

  overlay.addEventListener("click", () => {
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
}

/* =========================
   HERO SLIDER (SAFE)
========================= */

let heroIndex = 0;
let heroInterval;

function initHeroSlider() {
  const heroSlides = document.querySelectorAll(".hero-slider .slide");

  if (!heroSlides.length) return;

  function showSlide(i) {
    heroSlides.forEach(s => s.classList.remove("active"));
    heroSlides[i].classList.add("active");
  }

  heroInterval = setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showSlide(heroIndex);
  }, 5000);
}

/* =========================
   MOMENTS SLIDESHOW (SAFE)
========================= */

let slideIndex = 1;

function initMomentsSlider() {
  const slides = document.querySelectorAll(".slide-img");
  const dots = document.querySelectorAll(".dots span");

  if (!slides.length) return;

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    slides.forEach(s => (s.style.display = "none"));
    dots.forEach(d => d.classList.remove("active-dot"));

    slides[slideIndex - 1].style.display = "block";

    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].classList.add("active-dot");
    }
  }

  window.changeSlide = function (n) {
    showSlides((slideIndex += n));
  };

  window.setSlide = function (n) {
    showSlides((slideIndex = n));
  };

  showSlides(slideIndex);

  setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
  }, 5000);
}
/* =========================
   ROOM CARD SLIDERS
========================= */

function initRoomSliders() {
  const sliders = document.querySelectorAll(".room-image.slider");

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll(".slide");
    let index = 0;

    if (!slides.length) return;

    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000);
  });
}

/* INIT */
window.addEventListener("load", () => {
  initRoomSliders();
});
/* =========================
   LIGHTBOX (NEW FIX)
========================= */

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("closeLightbox");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  document.querySelectorAll(".slide-img img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });
}

/* =========================
   INIT ALL
========================= */

window.addEventListener("scroll", () => {
  handleNavScroll();
  updateProgressBar();
});

window.addEventListener("DOMContentLoaded", () => {
  setActiveLink();
  initMobileMenu();
  initHeroSlider();
  initMomentsSlider();
  initLightbox();
});