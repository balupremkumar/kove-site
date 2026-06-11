/* ============================================================
   KOVE v2 — site behaviour (Deep Cove)
   Robust against frozen-timeline environments:
   - reveals & draws fall back to final state via timers (not rAF)
   - count-ups use intervals (timers fire even when rAF is paused)
   ============================================================ */
(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* root prefix — pages one level deep (e.g. /insights/...) need ../ on injected links */
  const depth = location.pathname.split("/").length - 2;
  const R = depth > 0 ? "../".repeat(depth) : "";

  /* ---------------- NAV ---------------- */
  const navHTML = `
    <div class="scroll-prog" id="scrollProg"></div>
    <nav class="nav" id="nav">
      <div class="nav-inner">
        <a href="${R}index.html" class="brand" aria-label="Kove home">
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
          <a href="${R}work.html">Work</a>
          <a href="${R}services.html">Services</a>
          <a href="${R}insights.html">Insights</a>
          <a href="${R}about.html">About</a>
        </div>
        <a href="${R}contact.html" class="nav-cta">Book a call <span class="arrow">→</span></a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>
      </div>
    </nav>
    <div class="nav-overlay" id="navOverlay">
      <a href="${R}work.html">Work</a><a href="${R}services.html">Services</a><a href="${R}insights.html">Insights</a><a href="${R}about.html">About</a><a href="${R}contact.html">Contact</a>
    </div>`;

  const footerHTML = `
    <footer class="footer">
      <div class="wrap">
        <nav class="fnav" aria-label="Footer navigation">
          <a href="${R}work.html" class="fnav-btn"><span class="fnav-bg"></span><span class="fnav-label">See the work</span><span class="fnav-arrows" aria-hidden="true"><span class="fnav-arrow a1">→</span><span class="fnav-arrow a2">→</span></span></a>
          <a href="${R}services.html" class="fnav-btn"><span class="fnav-bg"></span><span class="fnav-label">Services</span><span class="fnav-arrows" aria-hidden="true"><span class="fnav-arrow a1">→</span><span class="fnav-arrow a2">→</span></span></a>
          <a href="${R}contact.html" class="fnav-btn"><span class="fnav-bg"></span><span class="fnav-label">Book a call</span><span class="fnav-arrows" aria-hidden="true"><span class="fnav-arrow a1">→</span><span class="fnav-arrow a2">→</span></span></a>
        </nav>
        <div class="footer-top">
          <div>
            <a href="${R}index.html" class="brand" style="margin-bottom:18px">
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
            <div><h4>Sitemap</h4><a href="${R}work.html">Work</a><a href="${R}services.html">Services</a><a href="${R}power-platform.html">Power Platform</a><a href="${R}insights.html">Insights</a><a href="${R}about.html">About</a><a href="${R}contact.html">Contact</a><a href="${R}privacy.html">Privacy</a></div>
            <div><h4>Contact</h4><a href="mailto:balu@kove.nz">balu@kove.nz</a><a href="tel:+64211895800">021 189 5800</a><a href="https://www.linkedin.com/in/balu-prem-kumar-244b2050/" target="_blank" rel="noopener">LinkedIn</a></div>
          </div>
        </div>
        <div class="footer-bottom"><span>© 2026 Kove · Built in Christchurch</span><span>balu@kove.nz</span></div>
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

  /* skip link (a11y) */
  const firstHeader = document.querySelector("header");
  if (firstHeader) {
    firstHeader.id = firstHeader.id || "maincontent";
    document.body.insertAdjacentHTML("afterbegin", `<a class="skip-link" href="#${firstHeader.id}">Skip to content</a>`);
  }

  /* nav active page */
  const page = (location.pathname.split("/").pop() || "index.html");
  const inInsights = location.pathname.includes("insights");
  document.querySelectorAll(".nav-links a, .nav-overlay a").forEach((a) => {
    const target = a.getAttribute("href").replace(R, "");
    if (target === page || (inInsights && target === "insights.html")) a.classList.add("active");
  });

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
    // process-flow progress fills
    if (!reduce) flowFills.forEach((f) => {
      const r = f.step.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.82 - r.top) / (r.height + innerHeight * 0.22)));
      f.fill.style.setProperty("--p", p.toFixed(3));
      f.step.classList.toggle("done", p > 0.92);
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
  const flowFills = [...document.querySelectorAll(".pf-step")].map((step) => {
    const fill = step.querySelector(".pf-fill");
    return fill ? { step, fill } : null;
  }).filter(Boolean);
  window.addEventListener("scroll", () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ---------------- SPLIT-WORD HEADINGS ---------------- */
  if (!reduce) {
    document.querySelectorAll(".split-h2").forEach((h) => {
      const words = h.textContent.trim().split(/\s+/);
      h.textContent = "";
      words.forEach((w, i) => {
        const outer = document.createElement("span");
        outer.className = "w";
        const inner = document.createElement("span");
        inner.style.setProperty("--i", i);
        inner.textContent = w;
        outer.appendChild(inner);
        h.appendChild(outer);
        if (i < words.length - 1) h.appendChild(document.createTextNode(" "));
      });
    });
  }

  /* ---------------- REVEALS (frozen-safe) ---------------- */
  const reveals = [...document.querySelectorAll(".reveal")];
  const showReveal = (e) => e.classList.add("in");
  const forceReveal = (e) => { e.style.transition = "none"; e.classList.add("in"); e.style.opacity = "1"; e.style.transform = "none"; e.style.filter = "none"; e.querySelectorAll(".w > span").forEach((s) => { s.style.transition = "none"; s.style.transform = "none"; }); };

  const startReveals = () => {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(forceReveal);
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { showReveal(en.target); io.unobserve(en.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach((e) => io.observe(e));
    const t0 = document.timeline.currentTime;
    setTimeout(() => {
      const frozen = document.timeline.currentTime === t0;
      if (frozen) { reveals.forEach(forceReveal); return; }
      const vh = innerHeight;
      reveals.forEach((e) => { const r = e.getBoundingClientRect(); if (r.top < vh && r.bottom > 0) showReveal(e); });
    }, 1100);
    setTimeout(() => reveals.forEach((e) => { if (getComputedStyle(e).opacity === "0" && !e.classList.contains("split-h2")) forceReveal(e); }), 2600);
  };

  /* anti-flash: transitions stay off until first paint, then reveals begin.
     rAF doesn't fire in hidden/background tabs — timer fallback guarantees start. */
  let revealsStarted = false;
  const beginReveals = () => {
    if (revealsStarted) return;
    revealsStarted = true;
    document.documentElement.classList.remove("preload");
    startReveals();
  };
  if (document.documentElement.classList.contains("preload")) {
    requestAnimationFrame(() => requestAnimationFrame(beginReveals));
    setTimeout(beginReveals, 400);
  } else {
    beginReveals();
  }

  /* ---------------- COUNT-UP (timer-based, frozen-safe) ---------------- */
  const counters = [...document.querySelectorAll("[data-count]")];
  const runCount = (el) => {
    if (el.dataset.done) return; el.dataset.done = "1";
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1300, steps = 40, stepT = dur / steps;
    let i = 0;
    const tick = () => {
      i++;
      const p = i / steps;
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = prefix + val + suffix;
      if (i < steps) setTimeout(tick, stepT);
      else el.textContent = prefix + (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
    };
    if (reduce) { el.textContent = prefix + target + suffix; return; }
    tick();
  };
  if ("IntersectionObserver" in window && !reduce) {
    const cio = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } }), { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
    setTimeout(() => counters.forEach(runCount), 1400); // frozen/no-IO fallback
  } else {
    counters.forEach((c) => { c.textContent = (c.dataset.prefix || "") + c.dataset.count + (c.dataset.suffix || ""); });
  }

  /* ---------------- SCROLL HINT → next section ---------------- */
  const hint = document.querySelector(".scroll-hint");
  if (hint) {
    hint.setAttribute("role", "button");
    hint.setAttribute("tabindex", "0");
    const go = () => {
      const next = document.querySelector(".hero ~ section, .hero ~ div");
      if (next) next.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
    };
    hint.addEventListener("click", go);
    hint.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  }

  /* ---------------- MAGNETIC BUTTONS ---------------- */
  if (!reduce && matchMedia("(pointer:fine)").matches) {
    /* button text-roll: wrap label text so it rolls up on hover */
    document.querySelectorAll(".btn").forEach((btn) => {
      const tn = [...btn.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
      if (!tn) return;
      const label = tn.textContent;
      const roll = document.createElement("span");
      roll.className = "btn-roll";
      const orig = document.createElement("span");
      orig.className = "orig";
      orig.textContent = label;
      const dup = document.createElement("span");
      dup.className = "dup";
      dup.setAttribute("aria-hidden", "true");
      dup.textContent = label;
      roll.appendChild(orig);
      roll.appendChild(dup);
      btn.replaceChild(roll, tn);
    });

    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.05}px, ${my * 0.07}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });

    /* hero cursor light + contour lean */
    const light = document.getElementById("heroLight");
    const hero = document.getElementById("hero");
    if (light && hero) {
      const contours = hero.querySelector(".contours");
      if (contours) contours.style.transition = "transform .9s cubic-bezier(0.16, 1, 0.3, 1)";
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        light.style.setProperty("--lx", (e.clientX - r.left) + "px");
        light.style.setProperty("--ly", (e.clientY - r.top) + "px");
        light.style.opacity = "1";
        if (contours) {
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          contours.style.transform = `translate3d(${px * 14}px, ${py * 10}px, 0)`;
        }
      });
      hero.addEventListener("pointerleave", () => {
        light.style.opacity = "0";
        if (contours) contours.style.transform = "";
      });
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
