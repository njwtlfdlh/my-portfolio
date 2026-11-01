// =====================================
// 4. READING PROGRESS BAR
// =====================================

const progressBar = document.createElement("div");

progressBar.id = "progressBar";

prog/* ==========================================
   script.js — Matcha & Strawberry Portfolio
   ========================================== */

// ===== 1. ACTIVE NAV LINK =====
// Highlights the current page in the navbar
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
});

// ===== 2. SCROLL REVEAL =====
// Fades in elements as you scroll down
const revealElements = document.querySelectorAll(
  '.project-card, .skill-item, .about-content, .section-title'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== 3. TYPING EFFECT (Hero) =====
// Optional: only runs if #typed-text exists on the page
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const phrases = [
    'multimedia.',
    'web development.',
    'digital creativity.',
    'learning new things.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex--);
    } else {
      typedEl.textContent = current.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === current.length + 1) {
      speed = 1500; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

// ===== 4. SMOOTH SCROLL =====
// For in-page anchor links like <a href="#projects">
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== 5. BACK TO TOP BUTTON =====
// Creates a floating button that appears on scroll
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});ressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0%";
progressBar.style.backgroundColor = "#A75F68";
progressBar.style.zIndex = "9999";
progressBar.style.transition = "width 0.1s ease";

document.body.appendChild(progressBar);

function updateProgressBar() {
    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    if (pageHeight > 0) {
        const progress = (scrollTop / pageHeight) * 100;
        progressBar.style.width = progress + "%";
    } else {
        progressBar.style.width = "100%";
    }
}

window.addEventListener("scroll", updateProgressBar);
window.addEventListener("resize", updateProgressBar);

updateProgressBar();
