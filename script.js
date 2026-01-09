document.addEventListener("DOMContentLoaded", () => {
  /* ==============================
     FOOTER YEAR
     ============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
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
    // default to dark
    applyTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isLight = root.classList.contains("light-theme");
      const newTheme = isLight ? "dark" : "light";
      applyTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }

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