/* 公共脚本：主题切换、滚动出现、数据渲染 */
(function () {
  "use strict";

  /* ---- 主题 ---- */
  var root = document.documentElement;
  var saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
    root.setAttribute("data-theme", "dark");

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    var cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---- 渲染项目卡片 ---- */
  function renderProjects(el) {
    if (!el || !window.PROJECTS) return;
    var list = window.PROJECTS.slice();
    var limit = parseInt(el.getAttribute("data-limit"), 10);
    if (limit > 0) list = list.slice(0, limit);
    var html = list.map(function (p) {
      var links = "";
      if (p.gitee) links += '<a href="' + p.gitee + '" target="_blank" rel="noopener">Gitee ↗</a>';
      if (p.github) links += '<a href="' + p.github + '" target="_blank" rel="noopener">GitHub ↗</a>';
      var tech = (p.tech || []).map(function (t) { return "<span>" + t + "</span>"; }).join("");
      var note = p.note ? '<p style="color:var(--accent-3);font-size:12.5px;margin-top:2px">'+p.note+'</p>' : "";
      return (
        '<article class="card reveal">' +
          '<div class="top"><div class="icon">' + (p.icon || "⭐") + '</div>' +
            '<span class="badge ' + p.badge + '">' + p.badgeText + "</span></div>" +
          "<h3>" + p.name + "</h3>" +
          '<div class="en">' + (p.en || "") + "</div>" +
          "<p>" + p.desc + "</p>" + note +
          '<div class="tech">' + tech + "</div>" +
          (links ? '<div class="links">' + links + "</div>" : "") +
        "</article>"
      );
    }).join("");
    el.innerHTML = html;
    observeReveal();
  }

  /* ---- 渲染博客 ---- */
  function renderPosts(el) {
    if (!el || !window.POSTS) return;
    var hasArticle = !!document.getElementById("article");
    var html = window.POSTS.map(function (p) {
      var head =
        '<div class="date">' + p.date + " · " + (p.tag || "") + "</div>" +
        "<h3>" + p.title + "</h3>" +
        "<p>" + p.excerpt + "</p>";
      if (hasArticle) {
        return '<div class="post reveal" data-id="' + p.id + '" role="button" tabindex="0">' +
          head + '<span class="more">阅读全文 →</span></div>';
      }
      return '<a class="post reveal" href="blog.html">' + head +
        '<span class="more">阅读全文 →</span></a>';
    }).join("");
    el.innerHTML = html;
    if (hasArticle) {
      el.querySelectorAll(".post[data-id]").forEach(function (node) {
        node.addEventListener("click", function () { showArticle(node.getAttribute("data-id")); });
        node.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); showArticle(node.getAttribute("data-id")); }
        });
      });
    }
    observeReveal();
  }

  /* ---- 文章详情 ---- */
  function showArticle(id) {
    var list = window.POSTS || [];
    var p = list.filter(function (x) { return x.id === id; })[0];
    var wrap = document.getElementById("article");
    var grid = document.getElementById("posts-grid");
    if (!p || !wrap) return;
    wrap.innerHTML =
      '<button class="btn btn-ghost back" id="article-back">← 返回列表</button>' +
      '<div class="post-full">' +
        '<div class="date">' + p.date + " · " + (p.tag || "") + "</div>" +
        "<h1>" + p.title + "</h1>" +
        '<div class="lead">' + p.excerpt + "</div>" +
        (p.body || "<p>正文整理中…</p>") +
      "</div>";
    wrap.querySelector("#article-back").addEventListener("click", function () {
      wrap.hidden = true; wrap.innerHTML = "";
      grid.style.display = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    grid.style.display = "none";
    wrap.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
    observeReveal();
  }

  /* ---- 滚动出现 ---- */
  var io;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll(".reveal:not(.in)").forEach(function (n) { io.observe(n); });
  }

  /* ---- 导航高亮 ---- */
  function navActive() {
    var id = location.pathname.split("/").pop().replace(".html", "") || "index";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      if (a.getAttribute("data-page") === id) a.style.color = "var(--text)";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderProjects(document.getElementById("projects-grid"));
    renderPosts(document.getElementById("posts-grid"));
    navActive();
    observeReveal();
  });
})();
