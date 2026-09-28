/* Saurav Shrestha — shared site interactions */
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
    if (theme === "anime") { startPetals(); } else { stopPetals(); }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
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
    don.textContent = "ドン！";
    burst.appendChild(don);
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
  var PETAL_COLORS = ["#FFB3C7", "#FFC9D9", "#FF8FAB"];
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function newPetal(anywhere) {
    return {
      x: Math.random() * petalCanvas.width,
      y: anywhere ? Math.random() * petalCanvas.height : -20,
      size: 6 + Math.random() * 9,
      speed: 30 + Math.random() * 55,
      sway: 20 + Math.random() * 40,
      phase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 3,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
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
      p.y += p.speed * dt;
      p.x += Math.sin(t * 1.4 + p.phase) * p.sway * dt;
      p.rot += p.rotSpeed * dt;
      if (p.y > petalCanvas.height + 24) { petals[i] = newPetal(false); continue; }
      petalCtx.save();
      petalCtx.translate(p.x, p.y);
      petalCtx.rotate(p.rot);
      petalCtx.globalAlpha = p.alpha;
      petalCtx.fillStyle = p.color;
      var s = p.size;
      petalCtx.beginPath();
      petalCtx.moveTo(0, -s);
      petalCtx.bezierCurveTo(s * 0.9, -s * 0.6, s * 0.7, s * 0.6, 0, s);
      petalCtx.bezierCurveTo(-s * 0.7, s * 0.6, -s * 0.9, -s * 0.6, 0, -s);
      petalCtx.fill();
      petalCtx.restore();
    }
  }

  function startPetals() {
    if (reduceMotion || petalCanvas) { return; }
    petalCanvas = document.createElement("canvas");
    petalCanvas.id = "petals";
    petalCanvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(petalCanvas);
    petalCtx = petalCanvas.getContext("2d");
    resizePetals();
    window.addEventListener("resize", resizePetals);
    petals = [];
    for (var i = 0; i < 28; i++) { petals.push(newPetal(true)); }
    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      drawPetals(dt, now / 1000);
      petalRaf = requestAnimationFrame(frame);
    }
    petalRaf = requestAnimationFrame(frame);
  }

  function stopPetals() {
    if (petalRaf) { cancelAnimationFrame(petalRaf); petalRaf = 0; }
    window.removeEventListener("resize", resizePetals);
    if (petalCanvas && petalCanvas.parentNode) { petalCanvas.parentNode.removeChild(petalCanvas); }
    petalCanvas = null;
    petalCtx = null;
    petals = [];
  }

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
