/* Renders the page from content/site-data.js. You normally never need to edit this file. */
(function () {
  "use strict";
  var D = window.SITE;
  if (!D) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p style="padding:2rem;color:#ffb224;font-family:monospace">content/site-data.js could not be loaded. ' +
        "Check it for a missing comma, quote or bracket (open the browser console for the line number).</p>"
    );
    return;
  }

  var SVG_NS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny DOM helpers ---------- */
  function el(tag, attrs) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    }
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }
  function append(node, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) kid.forEach(function (k) { append(node, k); });
    else node.appendChild(typeof kid === "string" ? document.createTextNode(kid) : kid);
  }
  function svg(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs || {}) node.setAttribute(k, attrs[k]);
    for (var i = 2; i < arguments.length; i++) if (arguments[i]) node.appendChild(arguments[i]);
    return node;
  }
  var ICONS = {
    mail: "M3 6h18v12H3z M3 7l9 6 9-6",
    arrow: "M5 12h14 M13 6l6 6-6 6",
    down: "M12 4v12 M6 11l6 6 6-6 M5 20h14",
    pin: "M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.800 7 11 7 11z M12 12.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5z",
    link: "M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1 M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1",
    linkedin: "M5 9v10 M5 5v.5 M10 19v-6a3 3 0 0 1 6 0v6 M10 9v10",
    github: "M9 19c-4 1.300-4-2-6-2.500 M15 21v-3.500a3 3 0 0 0-.800-2.300c2.800-.300 5.800-1.400 5.800-6.200a4.800 4.800 0 0 0-1.300-3.300 4.500 4.500 0 0 0-.100-3.300s-1.100-.300-3.500 1.300a12 12 0 0 0-6.200 0C6.500 2.100 5.400 2.400 5.400 2.400a4.500 4.500 0 0 0-.100 3.300A4.800 4.800 0 0 0 4 9c0 4.800 3 5.900 5.800 6.200A3 3 0 0 0 9 17.500V21",
  };
  function icon(name) {
    return svg("svg", { viewBox: "0 0 24 24", class: "ico", "aria-hidden": "true" },
      svg("path", { d: ICONS[name], fill: "none", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" }));
  }
  function chips(items, cls) {
    return el("ul", { class: "chips " + (cls || "") }, (items || []).map(function (t) { return el("li", { text: t }); }));
  }
  function external(a) { a.setAttribute("target", "_blank"); a.setAttribute("rel", "noopener"); return a; }

  /* ---------- derived values ---------- */
  function yearsOfExperience() {
    var p = String(D.careerStart || "").split("-");
    if (p.length < 2) return 0;
    var now = new Date();
    var months = (now.getFullYear() - +p[0]) * 12 + (now.getMonth() + 1 - +p[1]);
    return Math.max(0, Math.floor(months / 12));
  }
  var YEARS = yearsOfExperience();

  var SECTIONS = [
    { id: "about", label: "About", show: !!D.about },
    { id: "skills", label: "Skills", show: (D.skills || []).length },
    { id: "experience", label: "Experience", show: (D.experience || []).length },
    { id: "projects", label: "Projects", show: (D.projects || []).length },
    { id: "education", label: "Education", show: (D.education || []).length },
    { id: "contact", label: "Contact", show: !!D.contact },
  ].filter(function (s) { return s.show; });

  function heading(id, title, sub) {
    var n = SECTIONS.map(function (s) { return s.id; }).indexOf(id) + 1;
    return el("header", { class: "sec-head reveal" },
      el("span", { class: "sec-no", text: (n < 10 ? "0" : "") + n }),
      el("h2", { text: title }),
      sub ? el("p", { class: "sec-sub", text: sub }) : null);
  }

  /* ---------- top bar ---------- */
  function renderTopbar() {
    var brand = document.getElementById("brand");
    append(brand, [el("span", { class: "brand-mark", text: D.initials || "" }), el("span", { class: "brand-name", text: D.name })]);
    var nav = document.getElementById("nav");
    SECTIONS.forEach(function (s) {
      nav.appendChild(el("a", { href: "#" + s.id, "data-nav": s.id, text: s.label }));
    });
    var btn = document.getElementById("menuBtn");
    function close() { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- hero ---------- */
  function renderHero() {
    var hero = document.getElementById("top");
    var c = D.contact || {};
    var actions = el("div", { class: "actions" },
      el("a", { class: "btn primary", href: "#projects" }, "View projects", icon("arrow")),
      c.email ? el("a", { class: "btn", href: "mailto:" + c.email }, icon("mail"), "Get in touch") : null,
      D.resume ? el("a", { class: "btn", href: D.resume, download: "" }, icon("down"), "Download CV") : null);

    var stats = el("dl", { class: "readouts" }, (D.stats || []).map(function (s) {
      return el("div", {},
        el("dt", { text: s.label }),
        el("dd", { text: String(s.value).replace("{years}", YEARS) }));
    }));

    var cluster = el("div", { class: "holo", id: "holo" },
      el("span", { class: "orbit o1", "aria-hidden": "true" }, el("i", {})),
      el("span", { class: "orbit o2", "aria-hidden": "true" }, el("i", {})),
      el("div", { class: "holo-frame" },
        D.photo
          ? el("img", { class: "portrait", src: D.photo, alt: "Portrait of " + D.name, width: "400", height: "400" })
          : el("div", { class: "portrait portrait-empty", text: D.initials || "" }),
        el("span", { class: "scan", "aria-hidden": "true" })),
      (D.heroTags || []).slice(0, 4).map(function (t, i) {
        return el("span", { class: "float-tag t" + (i + 1), text: t });
      }));

    append(hero, el("div", { class: "wrap hero-grid" },
      el("div", { class: "hero-copy" },
        el("p", { class: "eyebrow" }, el("i", { class: "pulse" }), D.role || ""),
        el("h1", { text: D.name }),
        el("p", { class: "lede", text: D.tagline || "" }),
        D.location ? el("p", { class: "loc" }, icon("pin"), D.location) : null,
        actions,
        stats),
      cluster));
  }

  /* ---------- about ---------- */
  function renderAbout() {
    var a = D.about; if (!a) return;
    var s = document.getElementById("about");
    append(s, el("div", { class: "wrap" },
      heading("about", "About"),
      el("div", { class: "about-grid" },
        el("div", { class: "prose reveal" },
          (a.paragraphs || []).map(function (p) { return el("p", { text: p }); }),
          (a.exploring || []).length
            ? el("div", { class: "exploring" }, el("span", { class: "label", text: "Currently exploring" }), chips(a.exploring, "accent"))
            : null),
        el("dl", { class: "panel facts reveal" }, (a.facts || []).map(function (f) {
          return el("div", {}, el("dt", { text: f.label }), el("dd", { text: f.value }));
        })))));
  }

  /* ---------- skills ---------- */
  function renderSkills() {
    if (!(D.skills || []).length) return;
    var s = document.getElementById("skills");
    append(s, el("div", { class: "wrap" },
      heading("skills", "Skills", "Grouped by where I use them."),
      el("div", { class: "skill-grid" }, D.skills.map(function (g, i) {
        return el("article", { class: "panel skill reveal" },
          el("span", { class: "label", text: "SYS-" + (i + 1 < 10 ? "0" : "") + (i + 1) }),
          el("h3", { text: g.group }),
          chips(g.items));
      }))));
  }

  /* ---------- experience (timeline) ---------- */
  var updateTimeline = function () {};
  function renderExperience() {
    if (!(D.experience || []).length) return;
    var s = document.getElementById("experience");
    var fill = el("span", {});
    var wrap = el("div", { class: "timeline" },
      el("div", { class: "tl-line", "aria-hidden": "true" }, fill),
      el("ol", { class: "tl-list" }, D.experience.map(function (x) {
        return el("li", { class: "tl-item reveal" },
          el("span", { class: "tl-dot", "aria-hidden": "true" }),
          el("p", { class: "tl-when", text: x.period || "" }),
          el("div", { class: "panel tl-card" },
            el("h3", { text: x.title }),
            el("p", { class: "company", text: x.company || "" }),
            x.summary ? el("p", { class: "muted", text: x.summary }) : null,
            (x.points || []).length ? el("ul", { class: "points" }, x.points.map(function (p) { return el("li", { text: p }); })) : null));
      })));
    append(s, el("div", { class: "wrap" }, heading("experience", "Experience", "The route so far."), wrap));

    // The line fills and each stop lights up as you scroll past it.
    updateTimeline = function () {
      var top = wrap.getBoundingClientRect().top;
      var reached = Math.max(0, Math.min(wrap.offsetHeight, window.innerHeight * 0.6 - top));
      fill.style.height = reached + "px";
      wrap.querySelectorAll(".tl-item").forEach(function (item) {
        item.classList.toggle("lit", item.offsetTop + 14 <= reached);
      });
    };
  }

  /* ---------- projects ---------- */
  function projectCard(p, i) {
    var no = "P-" + (i + 1 < 10 ? "0" : "") + (i + 1);
    var media = p.image
      ? el("img", { class: "proj-media", src: p.image, alt: p.title, loading: "lazy" })
      : el("div", { class: "proj-media placeholder", "aria-hidden": "true" }, el("span", { text: no }));
    var meta = [p.role, p.duration].filter(Boolean).join(" · ");
    return el("article", { class: "panel proj reveal" + (p.featured ? " featured" : ""), "data-cat": p.category || "" },
      media,
      el("div", { class: "proj-body" },
        el("p", { class: "label" }, el("span", { text: p.category || "" }), meta ? el("span", { text: meta }) : null),
        el("h3", { text: p.title }),
        el("p", { text: p.summary || "" }),
        p.contribution ? el("p", { class: "muted contribution" }, el("b", { text: "My part: " }), p.contribution) : null,
        chips(p.tech),
        p.link ? external(el("a", { class: "proj-link", href: p.link }, icon("link"), "View source / demo")) : null));
  }

  function renderProjects() {
    var list = D.projects || []; if (!list.length) return;
    var s = document.getElementById("projects");
    var cats = [];
    list.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
    var grid = el("div", { class: "proj-grid" }, list.map(projectCard));
    var filters = el("div", { class: "filters reveal", role: "group", "aria-label": "Filter projects" },
      ["All"].concat(cats).map(function (c, i) {
        return el("button", { type: "button", "data-filter": c, "aria-pressed": String(i === 0), text: c });
      }));
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var f = b.getAttribute("data-filter");
      filters.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      grid.querySelectorAll(".proj").forEach(function (card) {
        card.hidden = !(f === "All" || card.getAttribute("data-cat") === f);
        card.classList.add("in");
      });
    });
    append(s, el("div", { class: "wrap" },
      heading("projects", "Projects", "Selected work. Employer projects are described at a general level."),
      cats.length > 1 ? filters : null,
      grid));
  }

  /* ---------- education ---------- */
  function renderEducation() {
    if (!(D.education || []).length) return;
    var s = document.getElementById("education");
    function extra(title, items) {
      return (items || []).length ? el("div", { class: "panel extra reveal" }, el("span", { class: "label", text: title }), chips(items)) : null;
    }
    append(s, el("div", { class: "wrap" },
      heading("education", "Education"),
      el("div", { class: "edu-grid" }, D.education.map(function (e) {
        return el("article", { class: "panel edu reveal" },
          el("p", { class: "label", text: e.period || "" }),
          el("h3", { text: e.degree }),
          el("p", { class: "company", text: e.school || "" }),
          (e.notes || []).length ? el("ul", { class: "points" }, e.notes.map(function (n) { return el("li", { text: n }); })) : null);
      })),
      el("div", { class: "edu-grid extras" }, extra("Languages", D.languages), extra("Interests", D.interests))));
  }

  /* ---------- contact ---------- */
  function renderContact() {
    var c = D.contact; if (!c) return;
    var s = document.getElementById("contact");
    append(s, el("div", { class: "wrap" },
      heading("contact", "Contact"),
      el("div", { class: "panel contact reveal" },
        el("div", {},
          el("h3", { text: "Let's talk." }),
          c.message ? el("p", { class: "muted", text: c.message }) : null),
        el("div", { class: "contact-links" },
          c.email ? el("a", { class: "btn primary", href: "mailto:" + c.email }, icon("mail"), c.email) : null,
          c.linkedin ? external(el("a", { class: "btn", href: c.linkedin }, icon("linkedin"), "LinkedIn")) : null,
          c.github ? external(el("a", { class: "btn", href: c.github }, icon("github"), "GitHub")) : null,
          D.resume ? el("a", { class: "btn", href: D.resume, download: "" }, icon("down"), "Download CV") : null))));
  }

  function renderFooter() {
    append(document.getElementById("footer"),
      el("div", { class: "wrap" },
        el("span", { text: "© " + new Date().getFullYear() + " " + D.name }),
        el("a", { href: "#top", text: "Back to top ↑" })));
  }

  /* ---------- behaviour ---------- */
  function setupScroll() {
    var bar = document.getElementById("routeBar");
    var topbar = document.getElementById("topbar");
    var links = document.querySelectorAll("[data-nav]");
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
      topbar.classList.toggle("scrolled", window.scrollY > 12);
      var current = "";
      SECTIONS.forEach(function (s) {
        var node = document.getElementById(s.id);
        if (node.getBoundingClientRect().top <= window.innerHeight * 0.35) current = s.id;
      });
      updateTimeline();
      links.forEach(function (a) {
        if (a.getAttribute("data-nav") === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function setupReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- moving skills strip under the hero ---------- */
  function renderMarquee() {
    var items = [];
    (D.skills || []).forEach(function (g) { (g.items || []).forEach(function (t) { if (items.indexOf(t) < 0) items.push(t); }); });
    if (!items.length) return;
    function row() { return el("ul", {}, items.map(function (t) { return el("li", { text: t }); })); }
    document.getElementById("top").after(el("div", { class: "marquee", "aria-hidden": "true" }, el("div", { class: "marquee-track" }, row(), row())));
  }

  /* ---------- motion & pointer effects (all skipped when the visitor prefers reduced motion) ---------- */
  function scramble(node) {
    var final = node.textContent, pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01<>/#", start = performance.now(), dur = 1200;
    node.setAttribute("aria-label", final);
    (function step(now) {
      var t = Math.min(1, (now - start) / dur), shown = Math.floor(t * final.length), out = "";
      for (var i = 0; i < final.length; i++) {
        out += i < shown || final[i] === " " ? final[i] : pool[Math.floor(Math.random() * pool.length)];
      }
      node.textContent = out;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  function countUp() {
    document.querySelectorAll(".readouts dd").forEach(function (dd) {
      var m = /^(\d+)(.*)$/.exec(dd.textContent); if (!m) return;
      var target = +m[1], start = performance.now();
      (function step(now) {
        var t = Math.min(1, (now - start) / 1400), eased = 1 - Math.pow(1 - t, 3);
        dd.textContent = Math.round(target * eased) + m[2];
        if (t < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  function particles() {
    var hero = document.getElementById("top");
    var cv = el("canvas", { class: "fx", "aria-hidden": "true" });
    hero.prepend(cv);
    var ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 0, h = 0, pts = [], mouse = { x: -9999, y: -9999 }, visible = true;
    function size() {
      w = hero.clientWidth; h = hero.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, (w * h) / 15000));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35 });
      }
    }
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -9999; });
    window.addEventListener("resize", size);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(hero);
    }
    function link(a, b, max, rgb) {
      var dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d > max) return;
      ctx.strokeStyle = "rgba(" + rgb + "," + (1 - d / max) * 0.45 + ")";
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    function frame() {
      requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.fillStyle = "rgba(152,164,179,.55)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, 6.283); ctx.fill();
        for (var j = i + 1; j < pts.length; j++) link(p, pts[j], 110, "76,214,227");
        link(p, mouse, 190, "255,178,36");
      }
    }
    size(); frame();
  }

  function pointerEffects() {
    // trailing ring that follows the pointer and grows over clickable things
    var ring = el("div", { class: "cursor-ring", "aria-hidden": "true" });
    document.body.appendChild(ring);
    var tx = -100, ty = -100, x = -100, y = -100;
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      ring.classList.add("on");
      ring.classList.toggle("big", !!e.target.closest("a, button, .proj"));
      // spotlight that follows the pointer across panels
      var panel = e.target.closest(".panel");
      if (panel) {
        var r = panel.getBoundingClientRect();
        panel.style.setProperty("--mx", e.clientX - r.left + "px");
        panel.style.setProperty("--my", e.clientY - r.top + "px");
      }
    });
    document.addEventListener("pointerleave", function () { ring.classList.remove("on"); });
    (function follow() {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      ring.style.transform = "translate(" + x + "px," + y + "px)";
      requestAnimationFrame(follow);
    })();

    // project cards tilt toward the pointer
    document.querySelectorAll(".proj").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var rx = ((e.clientY - r.top) / r.height - 0.5) * -7, ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
        card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });

    // buttons pull slightly toward the pointer
    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.18 + "px," + (e.clientY - r.top - r.height / 2) * 0.3 + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });

    // portrait leans with the pointer
    var hero = document.getElementById("top"), holo = document.getElementById("holo");
    hero.addEventListener("pointermove", function (e) {
      var nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      holo.style.transform = "perspective(900px) rotateY(" + nx * 14 + "deg) rotateX(" + ny * -14 + "deg)";
    });
    hero.addEventListener("pointerleave", function () { holo.style.transform = ""; });
  }

  function setupEffects() {
    if (reduceMotion) return;
    scramble(document.querySelector(".hero h1"));
    countUp();
    particles();
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) pointerEffects();
  }

  /* ---------- go ---------- */
  document.title = D.name + (D.role ? " — " + D.role : "");
  ["about", "skills", "experience", "projects", "education", "contact"].forEach(function (id) {
    var keep = SECTIONS.some(function (s) { return s.id === id; });
    if (!keep) document.getElementById(id).remove();
  });
  renderTopbar();
  renderHero();
  renderMarquee();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
  renderContact();
  renderFooter();
  setupScroll();
  setupReveal();
  setupEffects();
})();
