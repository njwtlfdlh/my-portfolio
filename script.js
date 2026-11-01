(function () {
  'use strict';

  // ---------- 1. DARK MODE TOGGLE ----------
  const themeToggle = document.getElementById('themeToggle');
  const bodyEl = document.body; 

  if (localStorage.getItem('theme') === 'dark') {
    bodyEl.classList.add('dark');
    if (themeToggle) themeToggle.textContent = '☀️';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = bodyEl.classList.toggle('dark');
      if (isDark) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      }
    });
  }

  // ---------- 2. CURRENT TIME ----------
  const clockElement = document.getElementById('clock');
  function updateTime() {
    if (!clockElement) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `Local Time: ${h}:${m}:${s}`;
  }
  updateTime();
  setInterval(updateTime, 1000);

  // ---------- 3. MOBILE MENU ----------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 700) navMenu.classList.remove('is-open');
      });
    });
  }

  // ---------- 4. SCROLL PROGRESS & ACTIVE NAV ----------
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = scrollPercent + '%';

    let current = '';
    sections.forEach(section => {
      if (scrollTop >= section.offsetTop - 120) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('is-active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('is-active');
    });
  });

  // ---------- 5. DYNAMIC YEAR ----------
  const footerText = document.getElementById('footerText');
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = `© ${year} Najwatul Fadilah. All rights reserved.`;
  }

  // ---------- 6. COPY EMAIL BUTTON ----------
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#10b981';
        setTimeout(() => {
          copyBtn.textContent = orig;
          copyBtn.style.background = '';
        }, 2000);
      });
    });
  }

  // ---------- 7. BACK TO TOP BUTTON  ----------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }); 
  } 

})(); // <-- INI SANGAT PENTING UNTUK TUTUP FUNGSI UTAMA
