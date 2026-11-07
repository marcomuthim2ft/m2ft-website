/* M2FT — shared behaviour */
(function () {
    "use strict";

    document.documentElement.classList.add("js");

    /* Nav background on scroll */
    var nav = document.getElementById("nav");
    function onScroll() {
        if (!nav) return;
        if (window.scrollY > 24) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    var toggle = document.querySelector(".nav-toggle");
    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
        nav.querySelectorAll(".nav-links a").forEach(function (a) {
            a.addEventListener("click", function () {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Ensure intro video plays */
    var video = document.querySelector(".intro-video-bg");
    if (video) {
        var tryPlay = function () {
            var p = video.play();
            if (p && p.catch) p.catch(function () { /* autoplay blocked — poster remains */ });
        };
        if (video.readyState >= 2) tryPlay();
        else video.addEventListener("canplay", tryPlay, { once: true });
        document.addEventListener("visibilitychange", function () {
            if (!document.hidden) tryPlay();
        });

        /* Hero video — lazy: nothing downloads until the page is idle */
    var heroLazy = function () {
        var v = document.querySelector(".intro-video-bg");
        if (!v || v.dataset.kicked) return;
        v.dataset.kicked = "1";
        if (v.preload === "none") v.preload = "auto";
        try { v.load(); } catch (e) {}
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
    };
    if (document.readyState === "complete") setTimeout(heroLazy, 1200);
    else window.addEventListener("load", function () { setTimeout(heroLazy, 1200); });

    /* The line — one element, text swaps on the video clock:
           comment for the first 3.5s, brand for the rest of the loop */
        var line = document.querySelector(".intro-main h1");
        var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var CARD = 3.5;
        var COMMENT = "A place for athletes";
        var BRAND = "Marco Muthi Performance";
        var tick = function () {
            var t = video.currentTime;
            var d = video.duration || 0;
            var live = d > 0 && !video.paused && !video.ended;
            if (line) line.textContent = (live && !reduced && t < CARD) ? COMMENT : BRAND;
        };
        ["timeupdate", "playing", "seeked", "ended"].forEach(function (ev) {
            video.addEventListener(ev, tick);
        });
        tick();
    }

    /* The Work reel — play clips only while in view */
    var reelVideos = document.querySelectorAll(".work-card video");
    if (reelVideos.length && "IntersectionObserver" in window) {
        var reelIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                var v = en.target;
                if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
                else { v.pause(); }
            });
        }, { threshold: 0.3 });
        reelVideos.forEach(function (v) { reelIO.observe(v); });
    }
/* The Work — reveal the full library on demand */
    var moreBtn = document.querySelector(".work-more");
    if (moreBtn) {
        var extras = document.querySelectorAll(".work-card.is-extra");
        var total = extras.length + 8;
        moreBtn.textContent = "See all " + total + " clips";
        moreBtn.addEventListener("click", function () {
            var open = moreBtn.getAttribute("aria-expanded") === "true";
            extras.forEach(function (c) { c.classList.toggle("is-shown", !open); });
            moreBtn.setAttribute("aria-expanded", open ? "false" : "true");
            moreBtn.textContent = open ? "See all " + total + " clips" : "Show fewer";
            if (!open) {
                var first = extras[0];
                if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    }
})();
