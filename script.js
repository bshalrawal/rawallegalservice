/* ===================================================================
   Rawal Legal Service — Under Construction
   Vanilla JavaScript: loader, typewriter, particles, parallax
   =================================================================== */

(function () {
  'use strict';

  /* ---------- Reduced-motion check ---------- */
  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===========================================
     1.  Page Loader
     =========================================== */
  window.addEventListener('load', function () {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 900);
    }
  });

  /* ===========================================
     2.  Typewriter Effect
     =========================================== */
  const typewriterEl = document.getElementById('typewriter');
  const cursorEl = document.querySelector('.cursor');
  const fullText = 'This site is under construction.';

  function typewrite() {
    if (!typewriterEl) return;
    let i = 0;
    typewriterEl.textContent = '';

    function tick() {
      if (i < fullText.length) {
        typewriterEl.textContent += fullText.charAt(i);
        i++;
        setTimeout(tick, 55 + Math.random() * 40);
      } else {
        /* Pause, then restart cycle for continuous animation */
        setTimeout(function () {
          eraseText();
        }, 5000);
      }
    }

    function eraseText() {
      let len = typewriterEl.textContent.length;
      function eraseTick() {
        if (len > 0) {
          typewriterEl.textContent = typewriterEl.textContent.slice(0, -1);
          len--;
          setTimeout(eraseTick, 30);
        } else {
          setTimeout(typewrite, 800);
        }
      }
      eraseTick();
    }

    /* Start after the page animations settle */
    setTimeout(tick, 1800);
  }

  typewrite();

  /* ===========================================
     3.  Particle Canvas (floating gold motes)
     =========================================== */
  const canvas = document.getElementById('bg-canvas');

  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    /* Create particles */
    const PARTICLE_COUNT = Math.min(50, Math.floor(window.innerWidth / 30));
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.15 - 0.08,
        opacity: Math.random() * 0.35 + 0.05,
        opTarget: Math.random() * 0.35 + 0.05,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        /* Move */
        p.x += p.dx;
        p.y += p.dy;

        /* Fade in/out gently */
        p.opacity += (p.opTarget - p.opacity) * 0.01;
        if (Math.random() < 0.005) {
          p.opTarget = Math.random() * 0.35 + 0.05;
        }

        /* Wrap */
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        /* Draw */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201,168,76,' + p.opacity + ')';
        ctx.fill();
      }

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ===========================================
     4.  Subtle Parallax on Mouse Move
     =========================================== */
  if (!prefersReduced) {
    const scalesContainer = document.querySelector('.scales-container');
    const brand = document.querySelector('.brand');

    document.addEventListener('mousemove', function (e) {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 … 1
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      if (scalesContainer) {
        scalesContainer.style.transform =
          'translate(calc(-50% + ' + (cx * 6) + 'px), calc(-50% + ' + (cy * 6) + 'px))';
      }
      if (brand) {
        brand.style.transform = 'translateY(' + (cy * -3) + 'px)';
      }
    });
  }

  /* ===========================================
     5.  Ambient light-ray regeneration
     =========================================== */
  /* Rays are CSS-animated; we just randomize their horizontal
     positions periodically so the pattern doesn't feel repetitive. */
  if (!prefersReduced) {
    const rays = document.querySelectorAll('.light-rays .ray');
    setInterval(function () {
      rays.forEach(function (ray) {
        ray.style.left = (Math.random() * 90 + 5) + '%';
        ray.style.height = (30 + Math.random() * 40) + 'vh';
      });
    }, 14000);
  }

  /* ===========================================
     6.  Year in footer copyright
     =========================================== */
  const yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
