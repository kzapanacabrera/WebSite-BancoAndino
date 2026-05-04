/**
 * Banco Andino S.A. — main.js
 * Funciones: navegación responsive, cookie banner, scroll activo,
 *            animaciones en viewport, validación de formulario
 */

'use strict';

/* ============================================================
   Utilidades
   ============================================================ */

/**
 * Ejecuta `fn` cuando el DOM esté listo.
 * @param {Function} fn
 */
function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

/**
 * Selector múltiple abreviado.
 * @param {string} selector
 * @param {Element} [ctx=document]
 * @returns {NodeList}
 */
function $$(selector, ctx) {
  return (ctx || document).querySelectorAll(selector);
}

/* ============================================================
   Header: scroll shrink + clase active en nav
   ============================================================ */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Añade clase 'scrolled' al hacer scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Marca el enlace activo según la URL actual
  const navLinks = $$('.main-nav a, .mobile-menu a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ============================================================
   Menú hamburguesa (móvil)
   ============================================================ */
function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Cierra menú al hacer click en un enlace
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Cierra con Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      btn.focus();
    }
  });
}

/* ============================================================
   Cookie Banner
   ============================================================ */
function initCookieBanner() {
  const banner  = document.querySelector('.cookie-banner');
  const btnAccept  = document.querySelector('.btn-accept');
  const btnDecline = document.querySelector('.btn-decline');

  if (!banner) return;

  // Muestra el banner si no hay preferencia guardada
  if (!localStorage.getItem('ba_cookies')) {
    // Pequeño delay para no ser tan agresivo
    setTimeout(() => banner.classList.add('visible'), 1200);
  }

  function dismiss(value) {
    localStorage.setItem('ba_cookies', value);
    banner.classList.remove('visible');
  }

  if (btnAccept)  btnAccept.addEventListener('click',  () => dismiss('accepted'));
  if (btnDecline) btnDecline.addEventListener('click', () => dismiss('declined'));
}

/* ============================================================
   Animación de entrada al hacer scroll (IntersectionObserver)
   ============================================================ */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  // Añade la clase 'fade-in' a elementos que queremos animar
  const targets = $$('.service-card, .board-card, .product-card, .branch-card, .feature-item, .value-card, .timeline-item, .trust-item');

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.1}s, transform 0.5s ease ${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   Contador animado para números grandes (trust strip)
   ============================================================ */
function animateCounters() {
  if (!('IntersectionObserver' in window)) return;

  const counters = $$('.big-number[data-target]');
  if (!counters.length) return;

  const formatNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + formatNumber(current) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ============================================================
   Smooth scroll para anclas internas
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target   = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80; // altura del header
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============================================================
   Validación de formulario de contacto
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgBox = form.querySelector('.form-message');

  function showError(input, message) {
    input.classList.add('error');
    const errEl = input.parentElement.querySelector('.field-error');
    if (errEl) errEl.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error');
    const errEl = input.parentElement.querySelector('.field-error');
    if (errEl) errEl.textContent = '';
  }

  // Limpiar errores en tiempo real
  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const nombre  = form.querySelector('#nombre');
    const email   = form.querySelector('#email');
    const asunto  = form.querySelector('#asunto');
    const mensaje = form.querySelector('#mensaje');

    // Validar nombre
    if (!nombre || nombre.value.trim().length < 2) {
      showError(nombre, 'Por favor, ingresa tu nombre completo.');
      valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) {
      showError(email, 'Por favor, ingresa un correo electrónico válido.');
      valid = false;
    }

    // Validar asunto
    if (!asunto || asunto.value.trim().length < 3) {
      showError(asunto, 'El asunto debe tener al menos 3 caracteres.');
      valid = false;
    }

    // Validar mensaje
    if (!mensaje || mensaje.value.trim().length < 15) {
      showError(mensaje, 'El mensaje debe tener al menos 15 caracteres.');
      valid = false;
    }

    if (!valid) return;

    // Simula envío (no hay backend real)
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    }

    setTimeout(() => {
      if (msgBox) {
        msgBox.className = 'form-message success';
        msgBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
      }
    }, 1500);
  });
}

/* ============================================================
   Banca en línea — modal de aviso (demo)
   ============================================================ */
function initOnlineBank() {
  const btns = $$('.btn-online, [data-action="banca-en-linea"]');

  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showDemoModal(
        '<i class="fa-solid fa-lock" style="color:var(--gold);font-size:2.5rem;margin-bottom:1rem;display:block"></i>' +
        '<strong style="font-size:1.1rem">Banca en Línea</strong><br><br>' +
        '<p style="color:#4a5568;font-size:0.9rem">Este es un sitio de demostración. ' +
        'La plataforma de banca en línea no está disponible en la versión de ejemplo.</p>'
      );
    });
  });
}

/* ============================================================
   Modal genérico
   ============================================================ */
function showDemoModal(content) {
  // Crea el modal si no existe
  let overlay = document.getElementById('demo-modal-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'demo-modal-overlay';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
      background: #fff; border-radius: 16px; padding: 2.5rem;
      max-width: 440px; width: 100%; text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      position: relative;
      font-family: 'Open Sans', sans-serif;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closeBtn.style.cssText = `
      position: absolute; top: 1rem; right: 1rem;
      background: none; border: none; font-size: 1.2rem;
      cursor: pointer; color: #4a5568; padding: 0.25rem;
    `;
    closeBtn.addEventListener('click', () => overlay.remove());

    box.innerHTML = content;
    box.appendChild(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  } else {
    overlay.querySelector('div').innerHTML = content;
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', handler); }
  });
}

/* ============================================================
   Init
   ============================================================ */
onReady(() => {
  initHeader();
  initHamburger();
  initCookieBanner();
  initScrollAnimations();
  animateCounters();
  initSmoothScroll();
  initContactForm();
  initOnlineBank();
});
