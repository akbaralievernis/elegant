/* main.js — объединённые скрипты для сайта
   Содержит: AOS init, navbar scroll, мобильное меню, countdown,
   RSVP обработчик, guests toggle, petals animation, slideshow.
*/
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- AOS Init ---
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: false,
      offset: 100
    });
  }

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // --- Mobile menu toggle ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.querySelectorAll('.bar').forEach(bar => bar.classList.toggle('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
      }
    });
  }

  // --- Smooth scroll for nav links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // --- Countdown ---
  (function setupCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown');
    if (!countdownContainer) return;

    function updateCountdown() {
      const weddingDate = new Date('October 20, 2025 15:00:00').getTime();
      const now = Date.now();
      const diff = weddingDate - now;

      if (diff <= 0) {
        if (diff > -86400000) { // Если сегодня
          countdownContainer.innerHTML = '<div class="countdown-item" style="grid-column: span 4; text-align:center;"><div class="countdown-number">✨</div><div style="font-size:1.1rem">Свадьба сегодня!</div></div>';
        } else {
          countdownContainer.innerHTML = '<div class="countdown-item" style="grid-column: span 4; text-align:center;"><div class="countdown-number">💐</div><div style="font-size:1.1rem">Свадьба прошла!</div></div>';
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  })();

  // --- RSVP form handling ---
  const rsvpForm = document.getElementById('rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const attending = document.querySelector('input[name="attending"]:checked')?.value;

      // Basic email validation
      if (!email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        alert('Пожалуйста, введите valid email.');
        return;
      }

      if (attending === 'yes') {
        alert(`Спасибо, ${name}! Мы с нетерпением ждём вас. 🌹`);
      } else {
        alert(`Спасибо, ${name}. Нам будет не хватать вас. 💐`);
      }

      console.log('RSVP:', Object.fromEntries(new FormData(this)));
      this.reset();
    });
  }

  // --- Guests toggle ---
  const attendingYes = document.getElementById('attending-yes');
  const guestsGroup = document.getElementById('guests-group');
  if (attendingYes && guestsGroup) {
    guestsGroup.style.display = attendingYes.checked ? 'block' : 'none';
    attendingYes.addEventListener('change', function () {
      guestsGroup.style.display = this.checked ? 'block' : 'none';
    });
  }

  // --- Elegant petals animation (optimized for mobile) ---
  (function setupPetals() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;

    const petalTypes = [
      `M10,0 C15,15 5,25 0,15 C-5,25 -15,15 -10,0 C-12,-8 12,-8 10,0 Z`,
      `M0,0 C8,10 8,20 0,25 C-8,20 -8,10 0,0 C2,-5 2,-5 0,0 Z`,
      `M5,0 C10,12 0,22 -5,12 C-10,22 -20,12 -15,0 C-17,-6 17,-6 15,0 Z`
    ];

    let petalCount = 0;
    const maxPetals = window.innerWidth < 576 ? 5 : 8; // Меньше на мобильных для perf

    function createPetal() {
      if (petalCount >= maxPetals) return;

      const petal = document.createElement('div');
      petal.className = 'petal';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '-20 -10 40 30');
      svg.setAttribute('width', String(Math.random() * 20 + 15));
      svg.setAttribute('height', String(Math.random() * 30 + 20));

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', ['#c9a9a6', '#d4af37', '#e8d3d0'][Math.floor(Math.random() * 3)]);
      path.setAttribute('stroke-width', (Math.random() * 0.6 + 0.4).toFixed(1));
      path.setAttribute('opacity', (Math.random() * 0.4 + 0.3).toFixed(1));

      svg.appendChild(path);
      petal.appendChild(svg);

      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.top = '-30px';
      petal.style.opacity = '0';
      petal.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 90 - 45}deg)`;

      petalsContainer.appendChild(petal);
      petalCount++;

      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 5;

      petal.animate([
        { top: '-30px', opacity: 0, transform: petal.style.transform },
        { top: '110vh', opacity: 1, transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 180 - 90}deg)` }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: 'cubic-bezier(0.2, 0.6, 0.8, 0.4)',
        fill: 'forwards'
      });

      setTimeout(() => {
        if (petal.parentNode) {
          petal.parentNode.removeChild(petal);
          petalCount--;
        }
      }, (duration + delay) * 1000 + 1000);
    }

    for (let i = 0; i < maxPetals / 2; i++) setTimeout(createPetal, i * 800);
    setInterval(() => { if (Math.random() > 0.7 && petalCount < maxPetals) createPetal(); }, 2000);
  })();

  // --- Mosaic slideshow ---
  (function setupSlideshow() {
    const tiles = document.querySelectorAll('.tile');
    if (!tiles || tiles.length === 0) return;

    const weddingImages = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyFO0B3QLQL9KZAKvSeuodOof5vfqxGb8xQ&s',
      'https://cdn.nur.kz/images/1120/2cc65cad30fe2f0b.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1KJzK6JPvdDon1y33ynTbs9Ds5HJmN-QT2Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBnLqNFtkIJPRUjWDz2eEqNsQxCmslnzepA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSbJdw44xx977Xjzw7uwHbAVyxNPy2Gg31BA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlrGKYr5xTHGr7RaT5APodqV_hp1YJ_6TAtw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgg0ViErax65UcXi8Fw4xuz0K1NG9YcTxK7Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWA1-1hm-xDdWDLF1Sc1hLOEQ3m5t4U-1Rw&s',
      'https://images.unsplash.com/photo-1511795409834-9453a357d3f2', // Добавил больше для разнообразия
      'https://images.unsplash.com/photo-1523438885200-e635ba2c371e',
      'https://images.unsplash.com/photo-1519225421953-7c8c188fee71',
      'https://images.unsplash.com/photo-1560253023-032f007a8c0f',
      'https://images.unsplash.com/photo-1519741497674-6924ad9396a1',
      'https://images.unsplash.com/photo-1515931469884-6327160e64d8'
    ];

    let currentIndex = 0;

    function shuffleArray(array) {
      const arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function animateTile(tile, imgSrc, delay) {
      setTimeout(() => {
        tile.style.backgroundImage = `url(${imgSrc})`;
        tile.classList.add('show');
        setTimeout(() => tile.classList.remove('show'), 2200);
      }, delay);
    }

    function animateGrid() {
      const order = shuffleArray(Array.from(Array(tiles.length).keys()));
      const batchImages = [];
      for (let i = 0; i < tiles.length; i++) {
        batchImages.push(weddingImages[(currentIndex + i) % weddingImages.length]);
      }
      currentIndex = (currentIndex + tiles.length) % weddingImages.length;
      order.forEach((tileIndex, idx) => {
        animateTile(tiles[tileIndex], batchImages[tileIndex], idx * 300);
      });
    }

    // Preload images for better perf
    weddingImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    animateGrid();
    setInterval(animateGrid, 2500);
  })();
});
