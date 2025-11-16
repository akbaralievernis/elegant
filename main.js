/* main.js — объединённые скрипты для 2var.html
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
  }

  // --- Countdown ---
  (function setupCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdown');
    if (!countdownContainer) return;

    function updateCountdown() {
      // TODO: при желании сделать дату динамической
      const weddingDate = new Date('October 20, 2025 15:00:00').getTime();
      const now = Date.now();
      const diff = weddingDate - now;

      if (diff <= 0) {
        countdownContainer.innerHTML = '<div class="countdown-item" style="grid-column: span 4; text-align:center;\'><div class="countdown-number">✨</div><div style="font-size:1.1rem">Свадьба сегодня!</div></div>';
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
      const name = document.getElementById('name')?.value || '';
      const attending = document.querySelector('input[name="attending"]:checked')?.value;

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
    // Set initial visibility
    guestsGroup.style.display = attendingYes.checked ? 'block' : 'none';
    attendingYes.addEventListener('change', function () {
      guestsGroup.style.display = this.checked ? 'block' : 'none';
    });
  }

  // --- Elegant petals animation ---
  (function setupPetals() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;

    const petalTypes = [
      `M10,0 C15,15 5,25 0,15 C-5,25 -15,15 -10,0 C-12,-8 12,-8 10,0 Z`,
      `M0,0 C8,10 8,20 0,25 C-8,20 -8,10 0,0 C2,-5 2,-5 0,0 Z`,
      `M5,0 C10,12 0,22 -5,12 C-10,22 -20,12 -15,0 C-17,-6 17,-6 15,0 Z`
    ];

    function createPetal() {
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
        if (petal.parentNode) petal.parentNode.removeChild(petal);
      }, (duration + delay) * 1000 + 1000);
    }

    for (let i = 0; i < 8; i++) setTimeout(createPetal, i * 800);
    setInterval(() => { if (Math.random() > 0.7) createPetal(); }, 2000);
  })();

  // --- Mosaic slideshow ---
  (function setupSlideshow() {
    const tiles = document.querySelectorAll('.tile');
    if (!tiles || tiles.length === 0) return;

    const weddingImages = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyFO0B3QLQL9KZAKvSeuodOof5vfqxGb8xQ&s',
      'https://cdn.nur.kz/images/1120/2cc65cad30fe2f0b.jpeg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1KJzK6JPvdDon1y33ynTbs9Ds5HJmN-QT2Q&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBnLqNFtkIJPRUjWDz2eEqNsQxCmslnzepA&s'
    ];

    while (weddingImages.length < tiles.length) {
      weddingImages.push(...weddingImages);
      if (weddingImages.length > 100) break;
    }

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

    animateGrid();
    setInterval(animateGrid, 2500);
  })();

});
 // AOS Init
    AOS.init({
      duration: 900,
      easing: 'ease-out-quart',
      once: false,
      offset: 100
    });

    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.querySelectorAll('.bar').forEach(bar => bar.classList.toggle('active'));
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
      });
    });

    // Countdown
    function updateCountdown() {
      const weddingDate = new Date('October 20, 2023 15:00:00').getTime();
      const now = new Date().getTime();
      const diff = weddingDate - now;
      
      if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<div class="countdown-item" style="grid-column: span 4;"><div class="countdown-number">✨</div><div style="font-size:1.1rem">Свадьба сегодня!</div></div>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = eval(id).toString().padStart(2, '0');
      });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // RSVP Form
    document.getElementById('rsvp-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const attending = document.querySelector('input[name="attending"]:checked')?.value;
      
      alert(attending === 'yes' 
        ? `Спасибо, ${name}! Мы с нетерпением ждём вас. 🌹` 
        : `Спасибо, ${name}. Нам будет не хватать вас. 💐`);
      
      console.log('RSVP:', Object.fromEntries(new FormData(this)));
      this.reset();
    });

    // Guests toggle
    document.getElementById('attending-yes').addEventListener('change', function() {
      document.getElementById('guests-group').style.display = this.checked ? 'block' : 'none';
    });

    // === Elegant Petals Animation ===
    document.addEventListener('DOMContentLoaded', () => {
      const petalsContainer = document.getElementById('petals');
      const petalTypes = [
        // SVG paths for rose/pion petals (minimal, elegant)
        `<path d="M10,0 C15,15 5,25 0,15 C-5,25 -15,15 -10,0 C-12,-8 12,-8 10,0 Z" fill="none" stroke="#c9a9a6" stroke-width="0.8" opacity="0.6"/>`,
        `<path d="M0,0 C8,10 8,20 0,25 C-8,20 -8,10 0,0 C2,-5 2,-5 0,0 Z" fill="none" stroke="#d4af37" stroke-width="0.6" opacity="0.4"/>`,
        `<path d="M5,0 C10,12 0,22 -5,12 C-10,22 -20,12 -15,0 C-17,-6 17,-6 15,0 Z" fill="none" stroke="#e8d3d0" stroke-width="0.7" opacity="0.5"/>`
      ];

      function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '-20 -10 40 30');
        svg.setAttribute('width', Math.random() * 20 + 15);
        svg.setAttribute('height', Math.random() * 30 + 20);
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', petalTypes[Math.floor(Math.random() * petalTypes.length)]
          .match(/d="([^"]+)"/)?.[1] || petalTypes[0].match(/d="([^"]+)"/)[1]);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', ['#c9a9a6', '#d4af37', '#e8d3d0'][Math.floor(Math.random()*3)]);
        path.setAttribute('stroke-width', (Math.random() * 0.6 + 0.4).toFixed(1));
        path.setAttribute('opacity', (Math.random() * 0.4 + 0.3).toFixed(1));
        
        svg.appendChild(path);
        petal.appendChild(svg);
        
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = '-30px';
        petal.style.opacity = '0';
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 90 - 45}deg)`;
        
        petalsContainer.appendChild(petal);
        
        // Animate
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        petal.animate([
          { top: '-30px', opacity: 0, transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 90 - 45}deg)` },
          { top: '110vh', opacity: 1, transform: `scale(${Math.random() * 0.5 + 0.5}) rotate(${Math.random() * 180 - 90}deg)` }
        ], {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'cubic-bezier(0.2, 0.6, 0.8, 0.4)',
          fill: 'forwards'
        });
        
        // Remove after animation
        setTimeout(() => {
          if (petal.parentNode) petal.parentNode.removeChild(petal);
        }, (duration + delay) * 1000 + 1000);
      }

      // Create initial petals
      for (let i = 0; i < 8; i++) {
        setTimeout(createPetal, i * 800);
      }

      // Continuous gentle rain
      setInterval(() => {
        if (Math.random() > 0.7) createPetal();
      }, 2000);
    });
  

 
    document.addEventListener('DOMContentLoaded', () => {
      const weddingImages = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyFO0B3QLQL9KZAKvSeuodOof5vfqxGb8xQ&s',
        'https://cdn.nur.kz/images/1120/2cc65cad30fe2f0b.jpeg ',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1KJzK6JPvdDon1y33ynTbs9Ds5HJmN-QT2Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZBnLqNFtkIJPRUjWDz2eEqNsQxCmslnzepA&s',
        'data:image/jpeg;base64,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',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_CibP1WCLsGWtdSml2PJTXPN0yXxS7gKmQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ5A4ZbHgC_f60AI7e0_hHtT6QhP2G2xC-sg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnOR0Uqr5CvNyWXKsi5fJqakdUdEDwWkDTg&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMp-SmQxqDS7o56X7-YGkemDznnenQQV1LOA&s',
        'data:image/jpeg;base64,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',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSbJdw44xx977Xjzw7uwHbAVyxNPy2Gg31BA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlrGKYr5xTHGr7RaT5APodqV_hp1YJ_6TAtw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgg0ViErax65UcXi8Fw4xuz0K1NG9YcTxK7Q&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWA1-1hm-xDdWDLF1Sc1hLOEQ3m5t4U-1Rw&s'
      ];

      const tiles = document.querySelectorAll('.tile');
      let currentIndex = 0;

      function shuffleArray(array) {
        const arr = [...array];
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
        const order = shuffleArray([...Array(tiles.length).keys()]);
        const batchImages = [];
        for (let i = 0; i < tiles.length; i++) {
          batchImages.push(weddingImages[(currentIndex + i) % weddingImages.length]);
        }
        currentIndex = (currentIndex + tiles.length) % weddingImages.length;
        order.forEach((tileIndex, idx) => {
          animateTile(tiles[tileIndex], batchImages[tileIndex], idx * 300);
        });
      }

      if (tiles.length) {
        animateGrid();
        setInterval(animateGrid, 2500);
      }
    });