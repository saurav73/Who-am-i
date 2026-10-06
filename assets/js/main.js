/* Saurav Shrestha: shared site interactions */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- theme ---------- */
  var THEME_KEY = "ss-theme";
  var THEMES = ["light", "dark", "anime"];
  var THEME_COLORS = { light: "#FBFBF9", dark: "#0C0C0E", anime: "#0A0A1C" };
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  var toggleBtn = document.getElementById("theme-toggle");
  var animeBtn = document.getElementById("anime-toggle");
  var lastNormal = "light"; /* last non-anime theme, used when leaving anime mode */
  var SUB_KEY = "ss-anime-sub-v2"; /* v2: default sub-mode is now JJK */
  var animeSub = "jjk"; /* anime sub-mode: "onepiece" | "jjk" */
  var subBar = document.getElementById("anime-sub");
  var KICKERS = {
    onepiece: "第1話 · THE DEVELOPER ARC",
    jjk: "呪術廻戦 · MALEVOLENT SHRINE"
  };

  function updateToggleLabel(theme) {
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-label", "Switch theme (currently " + theme + ")");
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (metaTheme) {
      metaTheme.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
    }
    if (theme === "light" || theme === "dark") { lastNormal = theme; }
    if (animeBtn) {
      animeBtn.classList.toggle("active", theme === "anime");
      animeBtn.setAttribute("aria-pressed", theme === "anime" ? "true" : "false");
    }
    updateToggleLabel(theme);
    if (theme === "anime") {
      root.setAttribute("data-anime", animeSub);
      if (subBar) { subBar.hidden = false; }
      startPetals();
    } else {
      if (subBar) { subBar.hidden = true; }
      stopPetals();
    }
  }

  /* anime sub-modes: One Piece / Jujutsu Kaisen */
  function syncSubUI() {
    root.setAttribute("data-anime", animeSub);
    if (subBar) {
      var btns = subBar.querySelectorAll(".sub-tab");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle("is-active", btns[i].getAttribute("data-sub") === animeSub);
      }
    }
    var kicker = document.querySelector(".anime-kicker");
    if (kicker && KICKERS[animeSub]) { kicker.textContent = KICKERS[animeSub]; }
  }

  /* Sukuna's domain chant - PARKED: voice removed for now.
     The user will supply their own audio; drop it in as
     assets/audio/ryoiki-tenkai.mp3 and call playDomainChant()
     from the JJK sub-tab click and the anime-mode entry. */
  var domainAudio = null;
  function assetUrl(path) {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var s = scripts[i].getAttribute("src") || "";
      var m = s.match(/^(.*)assets\/js\/main\.js/);
      if (m) { return m[1] + path; }
    }
    return path;
  }
  function playDomainChant() {
    try {
      warmDomainChant();
      domainAudio.currentTime = 0;
      var p = domainAudio.play();
      if (p && p.catch) { p.catch(function () { /* autoplay blocked; ignore */ }); }
    } catch (e) { /* audio unsupported; stay silent */ }
  }
  function warmDomainChant() {
    try {
      if (!domainAudio) {
        domainAudio = new Audio(assetUrl("assets/audio/ryoiki-tenkai.mp3"));
        domainAudio.preload = "auto";
        domainAudio.volume = 0.9;
      }
    } catch (e) { /* ignore */ }
  }

  function setAnimeSub(sub) {
    if (sub !== "onepiece" && sub !== "jjk") { return; }
    animeSub = sub;
    try { localStorage.setItem(SUB_KEY, sub); } catch (e) { /* ignore */ }
    syncSubUI();
    if (root.getAttribute("data-theme") === "anime") { restartPetals(); }
  }

  if (subBar) {
    subBar.addEventListener("click", function (ev) {
      var btn = ev.target && ev.target.closest ? ev.target.closest(".sub-tab") : null;
      if (!btn || !btn.getAttribute("data-sub")) { return; }
      var sub = btn.getAttribute("data-sub");
      setAnimeSub(sub);
    });
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    try {
      var savedSub = localStorage.getItem(SUB_KEY);
      if (savedSub === "bleach") {
        savedSub = "jjk"; /* Bleach retired; carry fans into the shrine */
        try { localStorage.setItem(SUB_KEY, "jjk"); } catch (e) { /* ignore */ }
      }
      if (savedSub === "onepiece" || savedSub === "jjk") { animeSub = savedSub; }
    } catch (e) { /* ignore */ }
    syncSubUI();
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (THEMES.indexOf(saved) !== -1) {
      if (saved === "anime") { lastNormal = prefersDark ? "dark" : "light"; }
      applyTheme(saved);
    } else if (prefersDark) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  }

  /* light/dark toggle (also exits anime mode back to the previous theme) */
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      var next = cur === "anime" ? lastNormal : (cur === "dark" ? "light" : "dark");
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* dedicated anime mode button */
  if (animeBtn) {
    animeBtn.addEventListener("click", function () {
      var cur = root.getAttribute("data-theme");
      var next = cur === "anime" ? lastNormal : "anime";
      if (next === "anime" && !reduceMotion) {
        playAnimeTransition(next);
      } else {
        applyTheme(next);
      }
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  /* ---------- dramatic entry transition into anime mode ---------- */
  function playAnimeTransition(next) {
    var ov = document.createElement("div");
    ov.className = "anime-transition";
    ov.setAttribute("aria-hidden", "true");
    var flash = document.createElement("div");
    flash.className = "at-flash";
    var burst = document.createElement("div");
    burst.className = "at-burst";
    var don = document.createElement("span");
    don.className = "at-don";
    don.textContent = animeSub === "jjk" ? "領域展開" : "ドン！";
    if (animeSub === "jjk") { ov.classList.add("at-jjk"); }
    var sub = document.createElement("span");
    sub.className = "at-sub";
    sub.textContent = animeSub === "jjk" ? "MALEVOLENT SHRINE" : "ANIME MODE";
    burst.appendChild(don);
    burst.appendChild(sub);
    ov.appendChild(flash);
    ov.appendChild(burst);
    document.body.appendChild(ov);
    window.setTimeout(function () { applyTheme(next); }, 200);
    window.setTimeout(function () { ov.classList.add("at-out"); }, 950);
    window.setTimeout(function () {
      if (ov.parentNode) { ov.parentNode.removeChild(ov); }
    }, 1350);
  }

  /* ---------- sakura petals (anime mode only) ---------- */
  var petalCanvas = null;
  var petalCtx = null;
  var petalRaf = 0;
  var petals = [];
  var PARTICLE_MODES = {
    onepiece: { colors: ["#FFB3C7", "#FFC9D9", "#FF8FAB"], shape: "petal", rise: false, count: 28, glow: 0 },
    jjk: { colors: ["#FF6B6B", "#E5383B", "#FF8C42"], shape: "orb", rise: true, count: 42, glow: 12 }
  };
  var particleMode = PARTICLE_MODES.jjk;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function newPetal(anywhere) {
    var colors = particleMode.colors;
    return {
      x: Math.random() * petalCanvas.width,
      y: anywhere ? Math.random() * petalCanvas.height : (particleMode.rise ? petalCanvas.height + 20 : -20),
      size: 6 + Math.random() * 9,
      speed: 30 + Math.random() * 55,
      sway: 20 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 3,
      color: colors[(Math.random() * colors.length) | 0],
      alpha: 0.55 + Math.random() * 0.35
    };
  }

  function resizePetals() {
    if (!petalCanvas) { return; }
    petalCanvas.width = window.innerWidth;
    petalCanvas.height = window.innerHeight;
  }

  function drawPetals(dt, t) {
    petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.y += (particleMode.rise ? -1 : 1) * p.speed * dt;
      p.x += Math.sin(t * 1.4 + p.phase) * p.sway * dt;
      p.rot += p.rotSpeed * dt;
      var out = particleMode.rise ? (p.y < -24) : (p.y > petalCanvas.height + 24);
      if (out) { petals[i] = newPetal(false); continue; }
      petalCtx.save();
      petalCtx.translate(p.x, p.y);
      petalCtx.rotate(p.rot);
      petalCtx.globalAlpha = p.alpha;
      petalCtx.fillStyle = p.color;
      var s = p.size;
      petalCtx.beginPath();
      if (particleMode.shape === "orb") {
        petalCtx.shadowBlur = particleMode.glow;
        petalCtx.shadowColor = p.color;
        petalCtx.arc(0, 0, s * 0.45, 0, Math.PI * 2);
      } else {
        petalCtx.moveTo(0, -s);
        petalCtx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.6, 0, s);
        petalCtx.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.9, -s * 0.6, 0, -s);
      }
      petalCtx.fill();
      petalCtx.shadowBlur = 0;
      petalCtx.restore();
    }
  }

  function startPetals() {
    if (reduceMotion || petalCanvas) { return; }
    particleMode = PARTICLE_MODES[animeSub] || PARTICLE_MODES.onepiece;
    petalCanvas = document.createElement("canvas");
    petalCanvas.id = "petals";
    petalCanvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(petalCanvas);
    petalCtx = petalCanvas.getContext("2d");
    resizePetals();
    window.addEventListener("resize", resizePetals);
    petals = [];
    for (var i = 0; i < particleMode.count; i++) { petals.push(newPetal(true)); }
    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      drawPetals(dt, now / 1000);
      petalRaf = requestAnimationFrame(frame);
    }
    petalRaf = requestAnimationFrame(frame);
  }

  function restartPetals() {
    stopPetals();
    startPetals();
  }

  function stopPetals() {
    if (petalRaf) { cancelAnimationFrame(petalRaf); petalRaf = 0; }
    window.removeEventListener("resize", resizePetals);
    if (petalCanvas && petalCanvas.parentNode) { petalCanvas.parentNode.removeChild(petalCanvas); }
    petalCanvas = null;
    petalCtx = null;
    petals = [];
  }

  /* ---------- optional JJK portrait art ----------
     If assets/img/profile-jjk.jpg exists next to profile-anime.jpg,
     it becomes the JJK-mode portrait automatically; otherwise JJK
     mode falls back to the curse-tinted photo. */
  (function initJjkArt() {
    var card = document.querySelector(".portrait-card");
    var ref = document.querySelector(".profile-anime");
    if (!card || !ref) { return; }
    var src = ref.getAttribute("src");
    if (!src || src.indexOf("profile-anime.jpg") === -1) { return; }
    var img = document.createElement("img");
    img.className = "profile-jjk";
    img.alt = "Sukuna-inspired anime portrait of Saurav Shrestha";
    img.setAttribute("aria-hidden", "true");
    img.addEventListener("load", function () {
      card.classList.add("has-jjk-art");
    });
    img.src = src.replace("profile-anime.jpg", "profile-jjk.jpg");
    card.insertBefore(img, ref);
  })();

  /* ---------- pill nav: hide on scroll down, show on scroll up ---------- */
  var nav = document.querySelector(".pill-nav");
  var lastY = window.scrollY || 0;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || 0;
    if (nav) {
      if (y > 140 && y > lastY + 4) {
        nav.classList.add("nav-hidden");
      } else if (y < lastY - 4 || y <= 140) {
        nav.classList.remove("nav-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- boot ---------- */
  initTheme();
})();
