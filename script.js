// ============================================================
// NAJWATUL FADILAH PORTFOLIO SCRIPT
// ============================================================
(function () {
  'use strict';

  // ---------- 1. MOBILE MENU TOGGLE ----------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('show');
    });

    // Tutup menu bila link diklik (di mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ---------- 2. SMOOTH SCROLLING (Fallback untuk browser lama) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- 3. ACTIVE NAV HIGHLIGHT ----------
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120; // Offset untuk navbar

    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = section.id;
      }
    });

    navItems.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });

  // ---------- 4. DYNAMIC FOOTER YEAR ----------
  const footerText = document.getElementById('footerText');
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = `© ${year} Najwatul Fadilah · Built with HTML, CSS &amp; JS`;
  }

  // ---------- 5. DARK MODE TOGGLE (with LocalStorage) ----------
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  function updateIcon(isDark) {
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Semak tema yang disimpan
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
    updateIcon(true);
  } else if (!savedTheme) {
    // Auto-detect ikut waktu (7 malam - 7 pagi)
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {
      htmlEl.setAttribute('data-theme', 'dark');
      updateIcon(true);
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      
      if (isDark) {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateIcon(false);
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon(true);
      }
    });
  }

  // ---------- 6. LIVE CURRENT TIME ----------
  const timeElement = document.getElementById('currentTime');

  function updateTime() {
    if (!timeElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  updateTime();
  setInterval(updateTime, 1000); // Update setiap 1 saat

  // ---------- 7. SCROLL TO TOP BUTTON ----------
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- 8. RESIZE HANDLER ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

})();
