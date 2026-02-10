document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     FOOTER YEAR
     ============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  /* ==============================
     HERO TYPING EFFECT
     ============================== */
  const typingEl = document.querySelector(".hero-kicker-typing");

  if (typingEl) {
    const roles = [
      "Front-end Developer",
      "UI/UX Designer",
      "Graphic Designer",
      "Video Editor",
      "Photographer",
      "Upcoming Software Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing
        typingEl.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          // Pause at full word
          setTimeout(() => {
            isDeleting = true;
            type();
          }, 1500);
          return;
        }
      } else {
        // Deleting
        typingEl.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      const delay = isDeleting ? 60 : 110; // speed: delete faster than type
      setTimeout(type, delay);
    }

    // Small initial delay before starting
    setTimeout(type, 500);
  }
  /* ==============================
     HERO ROLE ROTATOR
     ============================== */
  const roleEl = document.querySelector(".hero-kicker-rotating");
  if (roleEl) {
    const roles = [
      "Web Developer",
      "Front-end Developer",
      "Upcoming Software Developer",
      "UI/UX Designer",
      "Graphic Designer",
      "Video Editor",
      "Photographer"
    ];

    let index = 0;
    roleEl.textContent = roles[index];
    roleEl.classList.add("is-visible");

    setInterval(() => {
      const nextIndex = (index + 1) % roles.length;
      // Fade out current
      roleEl.classList.remove("is-visible");
      roleEl.classList.add("is-hidden");

      // After fade out, change text and fade in
      setTimeout(() => {
        roleEl.textContent = roles[nextIndex];
        roleEl.classList.remove("is-hidden");
        roleEl.classList.add("is-visible");
        index = nextIndex;
      }, 260); // this should match the CSS transition duration
    }, 2600); // change every 2.6 seconds
  }
  
  /* ==============================
     THEME TOGGLE (DARK / LIGHT)
     ============================== */
  const root = document.documentElement; // <html>
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = document.querySelector(".theme-toggle-label");

  function applyTheme(theme) {
    if (theme === "light") {
      root.classList.add("light-theme");
      if (themeLabel) themeLabel.textContent = "Light";
    } else {
      // default: dark
      root.classList.remove("light-theme");
      if (themeLabel) themeLabel.textContent = "Dark";
    }
  }

  // On load: use saved theme if available
    const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    // default to light
    applyTheme("light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.classList.contains("light-theme");
      const newTheme = isLight ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

const fadeElements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
});




  /* ==============================
     MOBILE NAV TOGGLE
     ============================== */
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      body.classList.toggle("nav-open");
    });

    // Close menu when a nav link is clicked
    navLinks.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        body.classList.remove("nav-open");
      }
    });
  }

  /* ==============================
     SMOOTH SCROLL WITH OFFSET
     ============================== */
  const header = document.querySelector(".header");

  function getHeaderOffset() {
    return header ? header.offsetHeight + 8 : 0;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = getHeaderOffset();
      const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
      const targetScroll = elementTop - headerOffset;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    });
  });

  /* ==============================
     SCROLL REVEAL ANIMATIONS
     ============================== */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add("visible"));
  }


   /* ==============================
     CLIENTS SLIDER (MANUAL ONLY)
     ============================== */
  const clientsTrack = document.querySelector(".clients-track");
  const prevClientsBtn = document.querySelector(".clients-arrow--prev");
  const nextClientsBtn = document.querySelector(".clients-arrow--next");

  if (clientsTrack) {
    const clientCards = Array.from(
      clientsTrack.querySelectorAll(".client-card")
    );

    // How far to scroll = width of one card (including gap)
    function getScrollAmount() {
      const firstCard = clientCards[0];
      if (!firstCard) return clientsTrack.clientWidth;

      const cardRect = firstCard.getBoundingClientRect();
      const style = window.getComputedStyle(firstCard);
      const gapRight = parseFloat(style.marginRight) || 0;

      return cardRect.width + gapRight;
    }

    function scrollByOne(direction) {
      clientsTrack.scrollBy({
        left: direction * getScrollAmount(),
        behavior: "smooth",
      });
    }

    // Arrows
    if (prevClientsBtn) {
      prevClientsBtn.addEventListener("click", () => scrollByOne(-1));
    }
    if (nextClientsBtn) {
      nextClientsBtn.addEventListener("click", () => scrollByOne(1));
    }

    // Users can still scroll / swipe horizontally themselves; no autoplay here.
  }

  
  /* ==============================
     CONTACT FORM (FRONT-END ONLY)
     ============================== */
  const contactForm = document.querySelector(".contact-form");
  const statusEl = document.querySelector(".form-status");

  if (contactForm && statusEl) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name")?.trim();
      const email = formData.get("email")?.trim();
      const message = formData.get("message")?.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in all the fields.";
        statusEl.style.color = "#f97373"; // soft red
        return;
      }

      // For now, we just show a success message (no backend here)
      statusEl.textContent =
        "Thanks for reaching out! Your message is noted. I’ll get back to you soon.";
      statusEl.style.color = "#9ca3af"; // muted

      contactForm.reset();
    });
  }
});