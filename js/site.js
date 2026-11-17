/* =========================================================
   Scroll-driven animation system — CS Department
   GSAP + ScrollTrigger for pinned scenes, kinetic typography,
   image reveals and light/dark transitions.
   ========================================================= */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- register ScrollTrigger ---------- */
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- helpers ---------- */
  function splitWords(el) {
    var text = el.textContent.trim();
    var words = text.split(/\s+/);
    el.innerHTML = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "word";
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });
    return el.querySelectorAll(".word");
  }

  function splitKinetic(el) {
    var text = el.textContent.trim();
    var words = text.split(/\s+/);
    el.innerHTML = "";
    words.forEach(function (w) {
      var span = document.createElement("span");
      span.className = "k-word";
      span.textContent = w;
      el.appendChild(span);
      el.appendChild(document.createTextNode(" "));
    });
    return el.querySelectorAll(".k-word");
  }

  /* ---------- hero kinetic typography ---------- */
  var heroTitle = document.querySelector(".hero-title");
  if (heroTitle && !reduced.matches) {
    var heroWords = splitWords(heroTitle);
    gsap.from(heroWords, {
      y: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  var eyebrow = document.querySelector(".eyebrow");
  if (eyebrow && !reduced.matches) {
    gsap.from(eyebrow, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  var lede = document.querySelector(".lede");
  if (lede && !reduced.matches) {
    gsap.from(lede, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  var heroActions = document.querySelector(".hero-actions");
  if (heroActions && !reduced.matches) {
    gsap.from(heroActions, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6,
      scrollTrigger: {
        trigger: ".hero",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  /* ---------- pinned vision section ---------- */
  var visionSection = document.querySelector("#vision");
  if (visionSection && !reduced.matches) {
    var kineticWords = document.querySelectorAll("#vision .k-word");
    var floatWords = document.querySelectorAll(".float-word");

    gsap.from(kineticWords, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#vision",
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    floatWords.forEach(function (fw, i) {
      gsap.fromTo(
        fw,
        { y: 60, opacity: 0, rotate: Math.random() * 20 - 10 },
        {
          y: 0,
          opacity: 0.85,
          rotate: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: "#vision",
            start: "top 50%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.to(fw, {
        y: -40,
        rotate: 12,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      });
    });

    ScrollTrigger.create({
      trigger: "#vision",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      anticipatePin: 1
    });
  }

  /* ---------- section head kinetic typography ---------- */
  document.querySelectorAll("h2.kinetic").forEach(function (el) {
    if (reduced.matches) return;
    var kwords = splitKinetic(el);
    gsap.from(kwords, {
      y: 60,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  /* ---------- programmes cards parallax ---------- */
  if (!reduced.matches) {
    gsap.utils.toArray(".card").forEach(function (card, i) {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  /* ---------- research pinned scene ---------- */
  var researchSection = document.querySelector("#research");
  if (researchSection && !reduced.matches) {
    var researchItems = document.querySelectorAll("#research .research-list li");
    gsap.from(researchItems, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#research",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
  }

  /* ---------- news items reveal ---------- */
  if (!reduced.matches) {
    gsap.utils.toArray(".news-item").forEach(function (item, i) {
      gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 88%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  /* ---------- image-comparison style light -> dark wipe ----------
     Mirrors the ImageComparisonSpring component: a dark "image" is
     revealed from top to bottom behind a thin slider line, with a
     fast spring (bounce ~0.3) instead of a linear scroll tween.     */
  (function initThemeWipe() {
    var wipe = document.getElementById("theme-wipe");
    if (!wipe) return;

    var root = document.documentElement;
    var supportsBackdrop = !!(window.CSS && CSS.supports &&
      (CSS.supports("backdrop-filter", "invert(1)") ||
       CSS.supports("-webkit-backdrop-filter", "invert(1)")));

    // Spring easing: quick but smooth, damping ratio still 1 - bounce.
    var stiffness = 260;
    var damping = 2 * Math.sqrt(stiffness) * 0.7;
    var state = { target: 0, value: 0, velocity: 0 };
    var lastRender = -1;

    function clamp(n, min, max) {
      return Math.min(max, Math.max(min, n));
    }

    function render() {
      var x = clamp(state.value, 0, 1) * 100;
      if (Math.abs(x - lastRender) < 0.01) return;
      lastRender = x;
      root.style.setProperty("--wipe-y", x.toFixed(2) + "%");
      root.style.setProperty("--photo-invert", clamp(state.value, 0, 1).toFixed(3));
      wipe.classList.toggle("is-active", x > 1 && x < 99);
      document.body.classList.toggle("wipe-complete", x >= 99);
      if (!supportsBackdrop) {
        document.body.classList.toggle("theme-dark", state.value > 0.5);
      }
    }

    function frame(now) {
      var dt = Math.min((now - (frame.last || now)) / 1000, 0.032) || 0.016;
      frame.last = now;
      // Sub-stepping keeps the spring stable at any frame rate.
      var steps = 2;
      var h = dt / steps;
      for (var i = 0; i < steps; i++) {
        var force = -stiffness * (state.value - state.target) - damping * state.velocity;
        state.velocity += force * h;
        state.value += state.velocity * h;
      }
      render();
      requestAnimationFrame(frame);
    }

    // Smoothly darken on the way to the HOD section, then stay dark
    // for the rest of the page.
    var hod = document.getElementById("hod");

    function themeTarget() {
      if (!hod) return 0;
      var hodTop = hod.getBoundingClientRect().top + window.scrollY;
      var darkEnd = Math.max(1, hodTop - window.innerHeight);
      return clamp(window.scrollY / darkEnd, 0, 1);
    }

    function syncTheme() {
      state.target = themeTarget();
      if (reduced.matches) {
        state.value = state.target;
        state.velocity = 0;
        render();
      }
    }

    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate: syncTheme,
      onRefresh: syncTheme
    });

    if (!reduced.matches) requestAnimationFrame(frame);
    else render();
  })();

  /* ---------- faculty infinite slider ----------
     Seamless duplicated track; eases up to a faster speed on hover
     (the equivalent of InfiniteSlider's speedOnHover prop).        */
  (function initFacultySlider() {
    var marquee = document.querySelector(".faculty-marquee");
    var track = marquee && marquee.querySelector(".faculty-marquee-track");
    var group = track && track.querySelector(".faculty-marquee-group");
    if (!track || !group) return;

    var baseSpeed = 55;   // px per second
    var hoverSpeed = 180; // speedOnHover
    var currentSpeed = baseSpeed;
    var targetSpeed = baseSpeed;
    var offset = 0;
    var width = 0;
    var last = 0;

    function measure() {
      width = group.getBoundingClientRect().width;
      if (width && offset <= -width) offset += width;
    }

    marquee.addEventListener("mouseenter", function () { targetSpeed = hoverSpeed; });
    marquee.addEventListener("mouseleave", function () { targetSpeed = baseSpeed; });

    if (reduced.matches) return;

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    function tick(now) {
      var dt = Math.min((now - (last || now)) / 1000, 0.05) || 0.016;
      last = now;
      currentSpeed += (targetSpeed - currentSpeed) * Math.min(1, dt * 6);
      if (width) {
        offset -= currentSpeed * dt;
        if (offset <= -width) offset += width;
        track.style.transform = "translate3d(" + offset.toFixed(2) + "px, 0, 0)";
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ---------- event disclosure cards ---------- */
  document.querySelectorAll("[data-disclosure]").forEach(function (card) {
    var trigger = card.querySelector(".event-card-trigger");
    var image = card.querySelector(".event-card-media img");
    if (!trigger) return;

    trigger.addEventListener("click", function () {
      var open = !card.classList.contains("is-open");
      card.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", String(open));

      if (image && !reduced.matches) {
        gsap.to(image, {
          scale: open ? 1.1 : 1,
          filter: open ? "blur(3px)" : "blur(0px)",
          duration: 0.6,
          ease: "elastic.out(1, 0.7)"
        });
      }
    });
  });

  /* ---------- project custom cursor ---------- */
  document.querySelectorAll("[data-project-media]").forEach(function (media) {
    var cursor = media.querySelector(".project-cursor");
    if (!cursor) return;

    media.addEventListener("pointermove", function (e) {
      var rect = media.getBoundingClientRect();
      var x = e.clientX - rect.left + 10;
      var y = e.clientY - rect.top + 10;
      cursor.style.transform = "translate(" + x + "px, " + y + "px)";
    });
  });

  /* ---------- navigation active state ---------- */
  var navLinks = document.querySelectorAll(".nav a");
  var sections = Array.prototype.slice.call(navLinks).map(function (a) {
    return document.querySelector(a.getAttribute("href"));
  }).filter(Boolean);

  if (sections.length && !reduced.matches) {
    sections.forEach(function (sec) {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 20%",
        end: "bottom 20%",
        onEnter: function () { setActiveNav(sec.id); },
        onEnterBack: function () { setActiveNav(sec.id); }
      });
    });
  }

  function setActiveNav(id) {
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === "#" + id) {
        a.classList.add("is-active");
      } else {
        a.classList.remove("is-active");
      }
    });
  }

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var body = document.body;

  function closeNav() {
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", "false");
    body.classList.remove("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      body.classList.toggle("nav-open", !open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- scroll progress ---------- */
  var progress = document.querySelector(".scroll-progress");

  if (progress && !reduced.matches) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        anticipatePin: 1
      }
    });
  }

  /* ---------- full-page section entrance animations ---------- */
  if (!reduced.matches) {
    gsap.utils.toArray("main > section:not(.pinned-section):not(.pinned-scene)").forEach(function (sec) {
      gsap.from(sec, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }

  /* ---------- window resize refresh ---------- */
  window.addEventListener("resize", function () {
    ScrollTrigger.refresh();
  });
})();
