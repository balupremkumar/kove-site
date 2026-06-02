/* ============================================================
   KOVE v2 — site behaviour (Deep Cove)
   Robust against frozen-timeline environments:
   - reveals & draws fall back to final state via timers (not rAF)
   - count-ups use intervals (timers fire even when rAF is paused)
   ============================================================ */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- NAV ---------------- */
  const navHTML = `
    <div class="scroll-prog" id="scrollProg"></div>
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a href="index.html" class="brand" aria-label="Kove home">
          <svg class="brand-mark" width="28" height="28" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="navg" x1="20" y1="20" x2="100" y2="104" gradientUnits="userSpaceOnUse">
                <stop stop-color="#A7ECFF"/><stop offset="0.5" stop-color="#43A6F5"/><stop offset="1" stop-color="#3F6BFF"/></linearGradient>
            </defs>
            <circle class="nav-ping" cx="60" cy="60" r="16" stroke="url(#navg)" stroke-width="6"/>
            <circle cx="60" cy="60" r="46" stroke="url(#navg)" stroke-width="10" opacity="0.32"/>
            <circle cx="60" cy="60" r="30" stroke="url(#navg)" stroke-width="10" opacity="0.6"/>
            <circle class="nav-core" cx="60" cy="60" r="14" fill="url(#navg)"/>
          </svg>
          <span class="brand-word">Kove</span>
        </a>
        <div class="nav-links">
          <a href="work.html">Work</a>
          <a href="services.html">Services</a>
          <a href="about.html">About</a>
        </div>
        <a href="contact.html" class="nav-cta">Book a call <span class="arrow">→</span></a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>
    <div class="nav-overlay" id="navOverlay">
      <a href="work.html">Work</a><a href="services.html">Services</a><a href="about.html">About</a><a href="contact.html">Contact</a>
    </div>`;

  const footerHTML = `
    <footer class="footer">
      <div class="wrap">
        <div class="footer-top">
          <div>
            <a href="index.html" class="brand" style="margin-bottom:18px">
              <svg width="34" height="34" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <circle cx="60" cy="60" r="46" stroke="url(#navg)" stroke-width="10" opacity="0.32"/>
                <circle cx="60" cy="60" r="30" stroke="url(#navg)" stroke-width="10" opacity="0.6"/>
                <circle cx="60" cy="60" r="14" fill="url(#navg)"/></svg>
              <span class="brand-word">Kove</span>
            </a>
            <p class="footer-tag">Runs while you're on the tools.</p>
            <p class="faint" style="font-size:.85rem">Christchurch · Canterbury · NZ</p>
          </div>
          <div class="footer-cols">
            <div><h4>Sitemap</h4><a href="work.html">Work</a><a href="services.html">Services</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy.html">Privacy</a></div>
            <div><h4>Contact</h4><a href="mailto:balu@kove.nz">balu@kove.nz</a><a href="tel:+64211895800">021 189 5800</a><a href="https://www.linkedin.com/in/balu-prem-kumar-244b2050/" target="_blank" rel="noopener">LinkedIn</a></div>
          </div>
        </div>
        <div class="footer-bottom"><span>© 2026 Kove · Built in Christchurch</span><span>NZBN —</span></div>
      </div>
    </footer>`;

  const callBarHTML = `<a href="tel:+64211895800" class="call-bar" aria-label="Tap to call Kove">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Tap to call &nbsp;·&nbsp; 021 189 5800
  </a>`;

  const nm = document.getElementById("nav-mount");
  const fm = document.getElementById("footer-mount");
  if (nm) nm.outerHTML = navHTML;
  if (fm) fm.outerHTML = footerHTML;
  document.body.insertAdjacentHTML("beforeend", callBarHTML);

  const nav = document.getElementById("nav");
  const prog = document.getElementById("scrollProg");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (prog) {
      const h = document.documentElement.scrollHeight - innerHeight;
      prog.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    }
    // parallax
    parallaxEls.forEach((el) => {
      const sp = parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${y * sp}px, 0)`;
    });
  };

  const toggle = document.getElementById("navToggle");
  const overlay = document.getElementById("navOverlay");
  if (toggle && overlay) {
    toggle.addEventListener("click", () => overlay.classList.toggle("open"));
    overlay.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => overlay.classList.remove("open")));
  }

  /* ---------------- PARALLAX ---------------- */
  const parallaxEls = [...document.querySelectorAll("[data-parallax]")];
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ---------------- REVEALS (frozen-safe) ---------------- */
  const reveals = [...document.querySelectorAll(".reveal")];
  const showReveal = (e) => e.classList.add("in");
  const forceReveal = (e) => { e.style.transition = "none"; e.classList.add("in"); e.style.opacity = "1"; e.style.transform = "none"; e.style.filter = "none"; };

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(forceReveal);
  } else {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { showReveal(en.target); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((e) => io.observe(e));
    const t0 = document.timeline.currentTime;
    setTimeout(() => {
      const frozen = document.timeline.currentTime === t0;
      if (frozen) { reveals.forEach(forceReveal); return; }
      const vh = innerHeight;
      reveals.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) showReveal(e); });
    }, 1100);
    setTimeout(() => reveals.forEach((e) => { if (getComputedStyle(e).opacity === "0") forceReveal(e); }), 2600);
  }

  /* ---------------- COUNT-UP (timer-based, frozen-safe) ---------------- */
  const counters = [...document.querySelectorAll("[data-count]")];
  const runCount = (el) => {
    if (el.dataset.done) return; el.dataset.done = "1";
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1300, steps = 40, stepT = dur / steps;
    let i = 0;
    const tick = () => {
      i++;
      const p = i / steps;
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = val + suffix;
      if (i < steps) setTimeout(tick, stepT);
      else el.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
    };
    if (reduce) { el.textContent = target + suffix; return; }
    tick();
  };
  if ("IntersectionObserver" in window && !reduce) {
    const cio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
    setTimeout(() => counters.forEach(runCount), 1400); // frozen/no-IO fallback
  } else {
    counters.forEach((c) => { c.textContent = c.dataset.count + (c.dataset.suffix || ""); });
  }

  /* ---------------- MAGNETIC BUTTONS ---------------- */
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.05}px, ${my * 0.07}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });

    /* hero cursor light */
    const light = document.getElementById("heroLight");
    const hero = document.getElementById("hero");
    if (light && hero) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        light.style.setProperty("--lx", (e.clientX - r.left) + "px");
        light.style.setProperty("--ly", (e.clientY - r.top) + "px");
        light.style.opacity = "1";
      });
      hero.addEventListener("pointerleave", () => { light.style.opacity = "0"; });
    }

    /* ---------- Cursor-spotlight on glass cards (BridgeMind/Linear-style) ---------- */
    document.querySelectorAll(".glass").forEach((card) => {
      card.classList.add("has-spot");
      const layer = document.createElement("span");
      layer.className = "spotlight-layer";
      card.insertBefore(layer, card.firstChild);
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });

    /* ---------- Hover tilt on work cards ---------- */
    document.querySelectorAll(".work-card, .wx-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }
})();
