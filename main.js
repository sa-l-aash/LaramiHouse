"use strict";

/* =========================
   LOAD COMPONENTS (NAV + FOOTER)
========================= */
document.addEventListener("DOMContentLoaded", async () => {

  const navbarContainer = document.getElementById("navbar-container");

  if (navbarContainer) {
    const navRes = await fetch("components/navbar.html");
    const navHtml = await navRes.text();

    navbarContainer.innerHTML = navHtml;

    requestAnimationFrame(() => {
      setActiveLink();
      initMobileMenu();
   });
  }

  const footerContainer = document.getElementById("footer-container");

  if (footerContainer) {
    const footerRes = await fetch("components/footer.html");
    const footerHtml = await footerRes.text();

    footerContainer.innerHTML = footerHtml;
  }

});/* =========================
   ACTIVE PAGE UNDERLINE LOGIC
========================= */

function setActiveLink() {
  const links = document.querySelectorAll(".nav-links a");

  let current = window.location.pathname.split("/").pop();

  if (!current || current === "") {
    current = "index.html";
  }

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
   HERO SLIDER
========================= */

let heroIndex = 0;

function initHeroSlider() {
  const heroSlides = document.querySelectorAll(".hero-slider .slide");

  if (!heroSlides.length) return;

  function showSlide(i) {
    heroSlides.forEach(s => s.classList.remove("active"));
    heroSlides[i].classList.add("active");
  }

  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showSlide(heroIndex);
  }, 5000);
}


/* =========================
   MOMENTS SLIDESHOW
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
   ROOM SLIDERS
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

function initReviewSlider() {
  const track = document.querySelector(".review-track");
  const cards = document.querySelectorAll(".review-card");

  if (!track || !cards.length) return;

  let index = 0;

  function getVisibleCount() {
    return window.innerWidth < 900 ? 1 : 4;
  }

  function moveSlider() {
    const visible = getVisibleCount();

    const cardWidth = cards[0].offsetWidth + 20; // gap included
    const maxIndex = cards.length - visible;

    index = (index >= maxIndex) ? 0 : index + 1;

    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  setInterval(moveSlider, 4000);
}
/* =========================
   LIGHTBOX
========================= */

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("closeLightbox");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  document.querySelectorAll(".slide-img img, .gallery-grid img").forEach(img => {
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
   FEATURED GALLERY SYSTEM
========================= */

function initGallery() {

  const featured = document.getElementById("featured-image");
  const caption = document.getElementById("gallery-caption");

  const thumbs = document.querySelectorAll(".gallery-thumb");

  // modal
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const closeBtn = document.getElementById("gallery-close");

  if (!featured || !thumbs.length) return;

  let current = 0;

  /* =========================
     SHOW IMAGE FUNCTION
  ========================== */

  function showImage(index) {

    const selected = thumbs[index];
    const title = selected.dataset.title || "";

    featured.style.opacity = 0;

    setTimeout(() => {

      featured.src = selected.src;
      modalImg.src = selected.src;

      // ✅ caption now comes from HTML
      caption.textContent = title;
      modalCaption.textContent = title;

      thumbs.forEach(t => t.classList.remove("active-thumb"));
      selected.classList.add("active-thumb");

      current = index;

      featured.style.opacity = 1;

    }, 250);
  }

  /* =========================
     THUMB CLICK
  ========================== */

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      showImage(index);
    });
  });

  /* =========================
     OPEN FULLSCREEN
  ========================== */

  featured.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = featured.src;
    modalCaption.textContent = caption.textContent;
  });

  /* CLOSE MODAL */
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  /* =========================
     KEYBOARD NAVIGATION
  ========================== */

  document.addEventListener("keydown", (e) => {

    if (!modal.classList.contains("active")) {

      if (e.key === "ArrowRight") {
        current = (current + 1) % thumbs.length;
        showImage(current);
      }

      if (e.key === "ArrowLeft") {
        current = (current - 1 + thumbs.length) % thumbs.length;
        showImage(current);
      }

    }

    if (e.key === "Escape") {
      modal.classList.remove("active");
    }

  });

  /* =========================
     SWIPE (MOBILE)
  ========================== */

  let startX = 0;

  featured.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  featured.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    let diff = startX - endX;

    if (Math.abs(diff) > 50) {

      if (diff > 0) {
        current = (current + 1) % thumbs.length;
      } else {
        current = (current - 1 + thumbs.length) % thumbs.length;
      }

      showImage(current);
    }

  });

  /* =========================
     AUTO SLIDESHOW
  ========================== */

  setInterval(() => {
    current = (current + 1) % thumbs.length;
    showImage(current);
  }, 4000);

  /* =========================
     LAZY LOADING
  ========================== */

  thumbs.forEach(img => {
    img.loading = "lazy";
  });

}
/* =========================
   INIT EVERYTHING
========================= */

window.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
  initMomentsSlider();
  initLightbox();
  initReviewSlider();
  initGallery();
});