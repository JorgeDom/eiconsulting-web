/* ============================================================
   EI Consulting — main.js
   Navbar · i18n · Reveal · Counters · Burger · Form
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR ──────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const updateNavbar = () => {
    const scrolled = window.scrollY > 30;
    navbar.dataset.scrolled = scrolled;
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── 2. BURGER ──────────────────────────────────────────── */
  const burger      = document.getElementById('burger');
  const burgerOpen  = document.getElementById('burger-open');
  const burgerClose = document.getElementById('burger-close');
  const mobileMenu  = document.getElementById('mobile-menu');

  burger?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    burgerOpen.classList.toggle('hidden', !isOpen);
    burgerClose.classList.toggle('hidden', isOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      burgerOpen.classList.remove('hidden');
      burgerClose.classList.add('hidden');
    });
  });

  /* ── 3. i18n ────────────────────────────────────────────── */
  let currentLang = document.documentElement.lang || 'es';

  async function loadLang(lang) {
    try {
      const res  = await fetch(`/api/lang/${lang}`);
      const data = await res.json();
      applyTranslations(data);
      currentLang = lang;
      document.documentElement.lang = lang;
      document.querySelectorAll('.lang-btn').forEach(btn => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('bg-brand-green',  active);
        btn.classList.toggle('text-brand-navy', active);
        btn.classList.toggle('text-white',      !active);
      });
    } catch (e) {
      console.error('i18n error:', e);
    }
  }

  function applyTranslations(t) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = el.dataset.i18n.split('.').reduce((o, k) => o?.[k], t);
      if (val === undefined) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });
  }

  document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => loadLang(btn.dataset.lang));
  });

  /* ── 4. SCROLL REVEAL ───────────────────────────────────── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.delay || 0, 10);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── 5. COUNTER ANIMATION ───────────────────────────────── */
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const start = performance.now();
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(easeOut(p) * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

  /* ── 6. ACTIVE NAV LINK ─────────────────────────────────── */
  const sections  = document.querySelectorAll('section[id], header[id]');
  const navLinks  = document.querySelectorAll('#nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
    });
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === `#${current}`;
      a.classList.toggle('text-brand-green', isActive);
    });
  }, { passive: true });

  /* ── 7. CONTACT FORM ────────────────────────────────────── */
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnText   = document.getElementById('btn-text');
  const spinner   = document.getElementById('btn-spinner');
  const formMsg   = document.getElementById('form-msg');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      message: form.message.value.trim(),
    };
    if (!payload.name || !payload.email || !payload.message) return;

    submitBtn.disabled = true;
    spinner.classList.remove('hidden');
    formMsg.className = 'hidden mb-4 px-4 py-3 rounded-lg text-sm font-medium';

    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.ok) {
        formMsg.className = 'success mb-4 px-4 py-3 rounded-lg text-sm font-medium';
        formMsg.textContent = currentLang === 'es'
          ? '¡Mensaje enviado correctamente!'
          : 'Message sent successfully!';
        form.reset();
      } else {
        formMsg.className = 'error mb-4 px-4 py-3 rounded-lg text-sm font-medium';
        formMsg.textContent = data.error || 'Error al enviar.';
      }
    } catch {
      formMsg.className = 'error mb-4 px-4 py-3 rounded-lg text-sm font-medium';
      formMsg.textContent = 'Error de red. Intente nuevamente.';
    } finally {
      submitBtn.disabled = false;
      spinner.classList.add('hidden');
    }
  });

});
