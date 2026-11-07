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
        /* no v.load() here — it aborted the in-flight load and restarted the clip */
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
        v.addEventListener("playing", function () { v.classList.add("is-live"); }, { once: true });
    };
    if (document.readyState === "complete") setTimeout(heroLazy, 600);
    else window.addEventListener("load", function () { setTimeout(heroLazy, 600); });

    /* The headline is static. It used to be driven by the hero video clock
       (comment card for the first 3.5s, brand after) — but because the video is
       lazy-loaded it started seconds after paint, so the h1 visibly swapped text
       mid-view and re-swapped on every loop. That read as the page restarting. */
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
