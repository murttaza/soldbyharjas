/* ============================================================
   SOLD BY HD — Harjas Dulku Real Estate
   Multi-page: interactions, scroll animations, stat counters
   ============================================================ */

// --- THEME: Apply saved preference before DOM renders (prevents flash) ---
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      let next;
      if (current === 'light') {
        next = 'dark';
      } else if (current === 'dark') {
        next = 'light';
      } else {
        // No explicit theme set — toggle away from system preference
        next = prefersDark ? 'light' : 'dark';
      }

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // --- NAVBAR SCROLL (only toggle on homepage) ---
  const navbar = document.getElementById('navbar');
  const isHomepage = !!document.querySelector('.hero');

  if (isHomepage) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // --- MOBILE NAV TOGGLE ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- SCROLL REVEAL ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- STAT COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        animateStats();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateStats() {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        num.textContent = Math.round(target * eased);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          num.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  // --- CURSOR GLOW (desktop only) ---
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  // --- SMOOTH SCROLL FOR SAME-PAGE ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- FORM SUBMIT HANDLER (placeholder) ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = '#2a7a3a';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // --- PARALLAX ON HERO (subtle, desktop, homepage only) ---
  if (isHomepage && window.matchMedia('(hover: hover)').matches) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
          heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
        }
      }, { passive: true });
    }
  }

  // --- CARD TILT (subtle, desktop) ---
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.listing-card, .service-card, .value-card, .review-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // --- LISTING FILTER TABS ---
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const cards = document.querySelectorAll('[data-status]');

        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-status') === filter) {
            card.style.display = '';
            card.style.opacity = '1';
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // --- PAGE TRANSITION EFFECT ---
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
