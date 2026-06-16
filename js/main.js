/**
 * Physical AI Website - Main Script
 * Version: 1.0 (Phase 1)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initActiveSectionObserver();
  initLiveTelemetry();
  initScrollReveal();
  initScrollTopButton();
});

/**
 * 1. Navigation & Mobile Menu Behavior
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      // Prevent body scrolling when menu is active
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close Mobile Menu on Link Click & Smooth Scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Smooth scroll target
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/**
 * 2. Intersection Observer to highlight current menu section
 */
function initActiveSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active area
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
}

/**
 * 3. Live Telemetry Update (Hero Section WoW Factor)
 * Periodically changes values on the floating panel text to simulate a real robot control stack.
 */
function initLiveTelemetry() {
  // 1. Vision Input Telemetry
  const visionValue = document.querySelector('.panel-1 .panel-value');
  if (visionValue) {
    setInterval(() => {
      const fps = Math.floor(Math.random() * 5) + 58; // 58 ~ 62 fps
      const confidence = (98.2 + Math.random() * 1.5).toFixed(1); // 98.2 ~ 99.7%
      visionValue.innerHTML = `<span class="panel-status-dot active"></span>FPS: ${fps} | Conf: ${confidence}%`;
    }, 2500);
  }

  // 2. World Model Simulation Status
  const worldValue = document.querySelector('.panel-2 .panel-value');
  if (worldValue) {
    const worldStates = ['PREDICTING...', 'SIMULATING (x10)', 'STABLE', 'UPDATING MESH'];
    setInterval(() => {
      const randomState = worldStates[Math.floor(Math.random() * worldStates.length)];
      const isProcessing = randomState.includes('...') || randomState.includes('(x10)');
      worldValue.innerHTML = `<span class="panel-status-dot ${isProcessing ? 'active' : 'warning'}"></span>${randomState}`;
    }, 3200);
  }

  // 3. Motion Plan Progress
  const motionValue = document.querySelector('.panel-3 .panel-value');
  if (motionValue) {
    setInterval(() => {
      const latency = Math.floor(Math.random() * 12) + 8; // 8 ~ 20ms
      motionValue.innerHTML = `<span class="panel-status-dot active"></span>Latency: ${latency}ms | OK`;
    }, 1800);
  }

  // 4. Actuator Control Output
  const actuatorValue = document.querySelector('.panel-4 .panel-value');
  if (actuatorValue) {
    setInterval(() => {
      const torque = (40.5 + Math.random() * 5).toFixed(1); // 40.5 ~ 45.5 Nm
      const joints = Math.floor(Math.random() * 4) + 18; // 18 ~ 22 active joints
      actuatorValue.innerHTML = `<span class="panel-status-dot active"></span>Torque: ${torque}Nm | Joints: ${joints}`;
    }, 2000);
  }
}

/**
 * 4. Scroll Reveal observer
 * Automatically applies 'reveal-active' to elements with 'reveal-element' as they enter viewport.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-element');
  
  const options = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.02
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * 5. Scroll to Top (UP) Button Behavior
 */
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  // Show or hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top smoothly on click
  scrollTopBtn.addEventListener('click', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
}
