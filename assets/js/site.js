/* Shared interactions — vanilla JS, no dependencies */
(function(){
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- page wipe transition ---------- */
  var wipe = document.getElementById("wipe");
  function go(url){
    if(reduce){ window.location.href = url; return; }
    wipe.classList.add("go");
    setTimeout(function(){ window.location.href = url; }, 560);
  }
  if(wipe && !reduce){
    wipe.classList.add("cover");
    // force reflow so the leave animation runs on load
    void wipe.offsetWidth;
    requestAnimationFrame(function(){
      wipe.classList.add("leave");
      setTimeout(function(){ wipe.classList.remove("cover","leave"); }, 700);
    });
  }
  document.querySelectorAll('a[href$=".html"]').forEach(function(a){
    a.addEventListener("click", function(e){
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var href = a.getAttribute("href");
      if(!href || href.charAt(0) === "#") return;
      e.preventDefault();
      document.body.classList.remove("menu-open");
      burger && burger.setAttribute("aria-expanded","false");
      go(href);
    });
  });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  if(burger){
    burger.addEventListener("click", function(){
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Kathmandu clock ---------- */
  function tick(){
    try{
      var t = new Date().toLocaleTimeString("en-GB",{timeZone:"Asia/Kathmandu",hour:"2-digit",minute:"2-digit",second:"2-digit"});
      document.querySelectorAll(".ktm-clock").forEach(function(el){ el.textContent = t + " NPT"; });
    }catch(err){
      document.querySelectorAll(".ktm-clock").forEach(function(el){ el.textContent = "KATHMANDU"; });
    }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv").forEach(function(el){ io.observe(el); });

  /* ---------- skill bars ---------- */
  var bio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting) return;
      var bar = en.target.querySelector(".bar i");
      if(bar) bar.style.width = en.target.getAttribute("data-pc") + "%";
      bio.unobserve(en.target);
    });
  }, {threshold:.4});
  document.querySelectorAll(".skill").forEach(function(el){ bio.observe(el); });

  /* ---------- split-flap role rotator ---------- */
  var flap = document.getElementById("flap-word");
  if(flap){
    var words = ["Designer","Developer","Programmer"], i = 0;
    if(!reduce){
      setInterval(function(){
        flap.classList.add("flip");
        setTimeout(function(){
          i = (i+1) % words.length;
          flap.textContent = words[i];
          flap.classList.remove("flip");
        }, 240);
      }, 2600);
    }
  }

  /* ---------- custom cursor ---------- */
  var dot = document.getElementById("cdot"), ring = document.getElementById("cring");
  if(finePointer && !reduce && dot && ring){
    var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
    addEventListener("mousemove",function(e){
      mx=e.clientX; my=e.clientY;
      dot.style.transform="translate("+(mx-4)+"px,"+(my-4)+"px)";
    });
    (function loop(){
      rx+=(mx-rx)*.16; ry+=(my-ry)*.16;
      var s = ring.classList.contains("is-view")?46: ring.classList.contains("is-link")?32:22;
      ring.style.transform="translate("+(rx-s)+"px,"+(ry-s)+"px)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('[data-cursor="view"]').forEach(function(el){
      el.addEventListener("mouseenter",function(){ ring.classList.add("is-view"); });
      el.addEventListener("mouseleave",function(){ ring.classList.remove("is-view"); });
    });
    document.querySelectorAll("a,button,input,textarea").forEach(function(el){
      el.addEventListener("mouseenter",function(){ ring.classList.add("is-link"); });
      el.addEventListener("mouseleave",function(){ ring.classList.remove("is-link"); });
    });
  }

  /* ---------- floating project preview ---------- */
  var prev = document.getElementById("preview");
  if(prev && finePointer && !reduce){
    var px=0,py=0,tx=0,ty=0,active=false;
    addEventListener("mousemove",function(e){ tx=e.clientX+26; ty=e.clientY-100; });
    (function ploop(){
      px+=(tx-px)*.14; py+=(ty-py)*.14;
      prev.style.left=px+"px"; prev.style.top=py+"px";
      requestAnimationFrame(ploop);
    })();
    document.querySelectorAll(".prow[data-cover]").forEach(function(row){
      row.addEventListener("mouseenter",function(){
        var n=row.getAttribute("data-cover");
        var t=row.getAttribute("data-title")||"";
        var cap=row.getAttribute("data-cap")||"";
        var glyph=row.getAttribute("data-glyph")||t.charAt(0);
        prev.innerHTML='<div class="cover c'+n+'"><span class="mono-glyph">'+glyph+
          '</span><span class="cap"><span>'+t+'</span><span>'+cap+'</span></span></div>';
        prev.classList.add("on"); active=true;
      });
      row.addEventListener("mouseleave",function(){ prev.classList.remove("on"); active=false; });
    });
  }

  /* ---------- back to top ---------- */
  var toTop = document.getElementById("toTop");
  if(toTop){ toTop.addEventListener("click",function(e){ e.preventDefault(); scrollTo({top:0,behavior:reduce?"auto":"smooth"}); }); }

  /* ---------- footer year ---------- */
  document.querySelectorAll(".yr").forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
