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
          <a href="${R}power-platform.html">Power Platform</a>
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
      <a href="${R}work.html">Work</a><a href="${R}services.html">Services</a><a href="${R}power-platform.html">Power Platform</a><a href="${R}insights.html">Insights</a><a href="${R}about.html">About</a><a href="${R}contact.html">Contact</a>
    </div>`;

  const footerHTML = `
    <footer class="footer">
      <div class="floor" aria-hidden="true"><svg viewBox="0 0 1440 110" preserveAspectRatio="none" fill="none">
        <path d="M0,74 C180,40 360,96 560,70 C760,44 900,98 1100,72 C1260,52 1360,84 1440,64 L1440,110 L0,110 Z" fill="rgba(2,5,10,0.85)"/>
        <path d="M0,74 C180,40 360,96 560,70 C760,44 900,98 1100,72 C1260,52 1360,84 1440,64" stroke="rgba(154,233,255,0.10)" stroke-width="1"/>
        <path d="M0,92 C220,70 420,104 640,88 C860,72 1080,104 1280,88 C1360,82 1410,92 1440,86 L1440,110 L0,110 Z" fill="rgba(1,3,8,0.9)"/>
      </svg></div>
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
            <div><p class="fh">Sitemap</p><a href="${R}work.html">Work</a><a href="${R}services.html">Services</a><a href="${R}power-platform.html">Power Platform</a><a href="${R}insights.html">Insights</a><a href="${R}about.html">About</a><a href="${R}contact.html">Contact</a><a href="${R}privacy.html">Privacy</a></div>
            <div><p class="fh">Contact</p><a href="mailto:balu@kove.nz">balu@kove.nz</a><a href="tel:+64211895800">021 189 5800</a><a href="https://www.linkedin.com/in/balu-prem-kumar-244b2050/" target="_blank" rel="noopener">LinkedIn</a></div>
          </div>
        </div>
        <div class="footer-bottom"><span>© 2026 Kove · Built in Christchurch</span><span>balu@kove.nz</span></div>
      </div>
    </footer>`;

  const callBarHTML = `<a href="tel:+64211895800" class="call-bar">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Tap to call &nbsp;·&nbsp; 021 189 5800
  </a>`;

  const nm = document.getElementById("nav-mount");
  const fm = document.getElementById("footer-mount");
  if (nm) nm.outerHTML = navHTML;
  if (fm) fm.outerHTML = footerHTML;

  /* a11y: wrap primary content in a single <main> landmark (closes landmark-one-main).
     Runs before the beforeend appends below so depthShade/dgauge/call-bar stay outside main. */
  (function () {
    if (document.querySelector("main")) return;
    const navEnd = document.getElementById("navOverlay") || document.getElementById("nav");
    const footer = document.querySelector("footer.footer");
    if (!navEnd || !footer || navEnd.parentNode !== footer.parentNode) return;
    const main = document.createElement("main");
    main.id = "main";
    footer.parentNode.insertBefore(main, footer);
    let n = navEnd.nextSibling;
    while (n && n !== main) { const next = n.nextSibling; main.appendChild(n); n = next; }
  })();

  /* V5 cohesion: bring the homepage contour drift to inner-page heroes (.page-hero) */
  (function () {
    const ph = document.querySelector(".page-hero");
    if (!ph || ph.querySelector(".contours")) return;
    const bg = document.createElement("div");
    bg.className = "page-hero-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = '<svg class="contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g class="drift"><path d="M-100,250 Q480,120 1540,300"/><path d="M-100,330 Q520,200 1540,380"/><path d="M-100,410 Q560,290 1540,470"/></g><g class="drift2"><path class="c-far" d="M-100,540 Q520,420 1540,580"/><path class="c-far" d="M-100,640 Q560,520 1540,680"/><path class="c-far" d="M-100,740 Q600,650 1540,770"/></g></svg>';
    ph.insertBefore(bg, ph.firstChild);
  })();

  document.body.insertAdjacentHTML("beforeend", callBarHTML);

  /* ---------------- V4 DESCENT — depth shade + gauge ---------------- */
  document.body.insertAdjacentHTML("beforeend", `<div id="depthShade" aria-hidden="true"></div>`);
  let dgRead = null;
  if (matchMedia("(min-width:1100px)").matches) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="dgauge" aria-hidden="true">
        <span class="dg-track"><span class="dg-fill"></span></span>
        <span class="dg-tick" style="top:0"><i></i>0m</span>
        <span class="dg-tick" style="top:33.3%"><i></i>40m</span>
        <span class="dg-tick" style="top:66.6%"><i></i>80m</span>
        <span class="dg-tick" style="top:100%"><i></i>120m</span>
        <span class="dg-read">0m</span>
      </div>`);
    dgRead = document.querySelector(".dg-read");
  }
  /* ---------------- V5 CINEMATIC — hero video ----------------
     (film grain removed by Balu's call 2026-06-13: read as visual noise.
     If texture is ever wanted again it MUST be a canvas — image/SVG/
     background grain becomes the LCP element and costs ~13 perf points.) */
  const heroEl = document.getElementById("hero");
  const saveData = navigator.connection && navigator.connection.saveData;
  if (heroEl && !reduce && !saveData && matchMedia("(min-width:1024px) and (pointer:fine)").matches) {
    const injectVid = () => {
      const wrap = document.createElement("div");
      wrap.className = "hero-media";
      wrap.setAttribute("aria-hidden", "true");
      wrap.innerHTML = `<video autoplay muted loop playsinline preload="none" poster="${R}media/posters/hero.webp"><source src="${R}media/hero/loop.webm" type="video/webm"><source src="${R}media/hero/loop.mp4" type="video/mp4"></video>`;
      heroEl.insertBefore(wrap, heroEl.firstChild);
      const v = wrap.querySelector("video");
      v.addEventListener("canplay", () => wrap.classList.add("playing"), { once: true });
      const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
      tryPlay();
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((es) => es.forEach((en) => { en.isIntersecting ? tryPlay() : v.pause(); }), { threshold: 0.05 }).observe(heroEl);
      }
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) v.pause();
        else if (heroEl.getBoundingClientRect().bottom > 0) tryPlay();
      });
    };
    if ("requestIdleCallback" in window) requestIdleCallback(injectVid, { timeout: 3000 });
    else setTimeout(injectVid, 1500);
  }

  let themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) { themeMeta = document.createElement("meta"); themeMeta.name = "theme-color"; document.head.appendChild(themeMeta); }
  const themeBands = ["#070B12", "#05080E", "#020409"];
  let lastBand = -1, lastMetres = -1;

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
    // descent depth 0..1 — drives #depthShade, .dg-fill, .dg-read via CSS var
    const dh = document.documentElement.scrollHeight - innerHeight;
    const d = dh > 0 ? Math.min(1, Math.max(0, y / dh)) : 0;
    document.documentElement.style.setProperty("--depth", d.toFixed(4));
    if (dgRead) {
      const m = Math.round(d * 120);
      if (m !== lastMetres) { lastMetres = m; dgRead.textContent = m + "m"; }
    }
    const band = d < 0.33 ? 0 : d < 0.7 ? 1 : 2;
    if (band !== lastBand) { lastBand = band; themeMeta.setAttribute("content", themeBands[band]); }
    // parallax
    parallaxEls.forEach((el) => {
      const sp = parseFloat(el.dataset.parallax);
      el.style.transform = `translate3d(0, ${y * sp}px, 0)`;
    });
    // V5 C3: per-scene progress (0 entering viewport bottom -> 1 leaving top)
    if (!reduce) sceneEls.forEach((s) => {
      const r = s.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)));
      s.style.setProperty("--sp", p.toFixed(4));
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
  const sceneEls = [...document.querySelectorAll("[data-scene]")];
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
      const next = document.querySelector("main > section, .hero ~ section, .hero ~ div");
      if (next) next.scrollIntoView({ behavior: reduce ? "instant" : "smooth" });
    };
    hint.addEventListener("click", go);
    hint.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  }

  /* ---------------- V4 R2/R3 — sonar ping, decode kicker, click ripple, nav underline ---------------- */
  if (!reduce && !sessionStorage.koveSonar) {
    sessionStorage.koveSonar = "1";
    const brand = document.querySelector(".nav .brand");
    if (brand) setTimeout(() => { brand.classList.add("ping-once"); setTimeout(() => brand.classList.remove("ping-once"), 2400); }, 900);
  }

  const tag = document.querySelector(".hero-tag");
  if (tag && !reduce) {
    const finalText = tag.textContent;
    const glyphs = "▖▘▝▗·:╌─0123456789ABCDEF";
    let frame = 0;
    const total = 22;
    let settled = false;
    const settle = () => { if (!settled) { settled = true; tag.textContent = finalText; } };
    const tick = () => {
      if (settled) return;
      if (document.hidden) { settle(); return; } // throttled timers in hidden tabs freeze the scramble
      frame++;
      const reveal = Math.floor((frame / total) * finalText.length);
      tag.textContent = finalText.slice(0, reveal) + finalText.slice(reveal).replace(/[^\s·]/g, () => glyphs[(Math.random() * glyphs.length) | 0]);
      if (frame < total) setTimeout(tick, 34); else settle();
    };
    setTimeout(tick, 650);
    setTimeout(settle, 2400); // hard deadline, same pattern as the reveal fallback
  }

  document.addEventListener("click", (e) => {
    if (reduce) return;
    const t = e.target.closest(".btn, .nav-cta, .fnav-btn");
    if (!t) return;
    const r = t.getBoundingClientRect();
    const s = document.createElement("span");
    s.className = "clickwave";
    s.style.left = (e.clientX - r.left) + "px";
    s.style.top = (e.clientY - r.top) + "px";
    t.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });

  const navLinks = document.querySelector(".nav-links");
  if (navLinks && matchMedia("(pointer:fine)").matches) {
    navLinks.classList.add("has-u");
    const u = document.createElement("span");
    u.className = "nav-underline";
    navLinks.appendChild(u);
    const activeLink = navLinks.querySelector("a.active");
    const placeU = (a) => {
      if (!a) { u.style.opacity = "0"; return; }
      u.style.opacity = "1";
      u.style.width = a.offsetWidth + "px";
      u.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("pointerenter", () => placeU(a)));
    navLinks.addEventListener("pointerleave", () => placeU(activeLink));
    placeU(activeLink);
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

  /* ---------------- V4 DESCENT — directional page transitions ---------------- */
  /* forward nav = descend, back = ascend; keyed off route depth order */
  const routeDepth = (path) => {
    if (path.includes("/insights/")) return 6;
    if (path.includes("/lp/")) return 8.5;
    const f = (path.split("/").pop() || "index.html").replace(".html", "");
    if (f.indexOf("work-") === 0) return 4;
    const order = { index: 0, services: 1, "power-platform": 2, work: 3, insights: 5, about: 7, contact: 8, privacy: 9 };
    return f in order ? order[f] : 5;
  };
  window.addEventListener("pageswap", (e) => {
    if (!e.activation || !e.activation.entry) return;
    try {
      const to = new URL(e.activation.entry.url).pathname;
      document.documentElement.dataset.dir = routeDepth(to) >= routeDepth(location.pathname) ? "down" : "up";
    } catch (_) {}
  });
  window.addEventListener("pagereveal", () => {
    const act = window.navigation && navigation.activation;
    if (!act || !act.from || !act.from.url) return;
    try {
      const from = new URL(act.from.url).pathname;
      document.documentElement.dataset.dir = routeDepth(location.pathname) >= routeDepth(from) ? "down" : "up";
    } catch (_) {}
  });
})();
