document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
       1. HEADER SCHAAL- & SHRINK-EFFECT BIJ SCROLLEN
    =================================================== */
  const siteHeader = document.getElementById("site-header");
  const siteLogo = document.getElementById("site-logo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      siteHeader.classList.remove("py-3");
      siteHeader.classList.add("py-1", "shadow-lg");
      siteLogo.style.height = "45px";
    } else {
      siteHeader.classList.remove("py-1", "shadow-lg");
      siteHeader.classList.add("py-3");
      siteLogo.style.height = "";
    }
  });

  /* ===================================================
       2. LIGHTBOX FUNCTIONALITEIT (Met Navigatie & Swipe)
    =================================================== */
  const projectImages = [
    "images/project1.jpg",
    "images/project2.jpg",
    "images/project3.jpg",
    "images/project4.jpg",
    "images/project5.jpg",
    "images/project6.jpg",
  ];

  let currentLightboxIndex = 0;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  window.openLightbox = function (index) {
    currentLightboxIndex = index;
    lightboxImg.src = projectImages[currentLightboxIndex];
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
    setTimeout(() => {
      lightbox.classList.remove("opacity-0");
      lightboxImg.classList.remove("scale-95");
      lightboxImg.classList.add("scale-100");
    }, 10);
  };

  window.closeLightbox = function () {
    lightbox.classList.add("opacity-0");
    lightboxImg.classList.remove("scale-100");
    lightboxImg.classList.add("scale-95");
    setTimeout(() => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    }, 300);
  };

  window.nextLightboxImage = function (e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % projectImages.length;
    lightboxImg.src = projectImages[currentLightboxIndex];
  };

  window.prevLightboxImage = function (e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + projectImages.length) % projectImages.length;
    lightboxImg.src = projectImages[currentLightboxIndex];
  };

  lightbox.addEventListener("click", () => closeLightbox());

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") closeLightbox();
    }
  });

  let lbTouchStartX = 0;
  let lbTouchEndX = 0;

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      lbTouchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      lbTouchEndX = e.changedTouches[0].screenX;
      if (lbTouchStartX - lbTouchEndX > 40) nextLightboxImage();
      else if (lbTouchEndX - lbTouchStartX > 40) prevLightboxImage();
    },
    { passive: true },
  );

  /* ===================================================
       3. MOBIEL MENU TOGGLE
    =================================================== */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  /* ===================================================
       4. SCROLLSPY
    =================================================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateScrollspy() {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateScrollspy);

  /* ===================================================
       5. SCROLL ANIMATIES
    =================================================== */
  const animatedElements = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedElements.forEach((el) => observer.observe(el));

  /* ===================================================
       6. MOBIELE SLIDESHOW FUNCTIONALITEIT
    =================================================== */
  let currentSlide = 0;
  const track = document.getElementById("slider-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const dots = document.querySelectorAll("#slider-dots .dot");
  const totalSlides = dots.length;

  window.goToSlide = function (index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.remove("bg-gray-300");
        dot.classList.add("bg-brand");
      } else {
        dot.classList.remove("bg-brand");
        dot.classList.add("bg-gray-300");
      }
    });
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));
  }

  let touchStartX = 0;
  let touchEndX = 0;

  if (track) {
    track.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    track.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 40) goToSlide(currentSlide + 1);
        else if (touchEndX - touchStartX > 40) goToSlide(currentSlide - 1);
      },
      { passive: true },
    );
  }
});
