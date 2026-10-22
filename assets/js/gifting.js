(function () {
  "use strict";

  /* Always land on the hero (first section) after reload — ignore restored scroll */
  /*
   * The site stylesheet sets html { scroll-behavior: smooth }. ScrollTrigger measures pin
   * positions by jumping the page to the top for an instant; smooth scrolling turns that jump
   * into a glide, so later refreshes measured from the wrong place and the pinned steps could
   * overlap the gift box. Our own smooth scrolls pass behavior: "smooth" explicitly.
   */
  document.documentElement.style.scrollBehavior = "auto";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  function forceHeroTop() {
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }
  forceHeroTop();
  window.addEventListener("pageshow", forceHeroTop);
  window.addEventListener("load", function () {
    forceHeroTop();
    /* After pin setup, keep the viewport on the first section */
    window.requestAnimationFrame(forceHeroTop);
  });

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var giftPack = document.getElementById("gift-pack");
  var giftBox = document.getElementById("gift-box");
  var exploreBtn = document.getElementById("explore-gifts");
  var bookBtn = document.getElementById("book-the-gift");
  var stepsRoot = document.getElementById("gift-steps");
  var stepsPin = document.getElementById("gift-steps-pin");
  var mandalaImg = document.getElementById("steps-mandala");
  var mandalaWrap = document.getElementById("steps-mandala-wrap");
  var stepPanels = document.querySelectorAll(".g-steps__panel");
  var boxCanvas = document.getElementById("gift-box-canvas");
  var sparkLayer = document.getElementById("gift-box-sparkles");
  var dustLayer = document.getElementById("gift-box-dust");
  var giftPackage = document.getElementById("gift-package");
  var boxOpenTl = null;
  var boxOpenST = null;
  var boxFullyOpen = false;
  var boxScrubActive = false;

  /* Scale the 1302 × 868 Figma canvas to the box width; on small screens pad for the taller card */
  var lastDocH = 0;
  function fitGiftBox() {
    if (!giftBox || !boxCanvas) return;
    var avail = giftBox.parentElement ? giftBox.parentElement.clientWidth : giftBox.clientWidth;
    var s = Math.min(1, avail / 1302);
    /*
     * Desktop: Figma's 1440 × 1010 frame shows the whole section on one screen. Text, spacing,
     * button and box all scale by s (CSS uses --g-pack-s), keeping Figma's proportions.
     */
    if (window.matchMedia("(min-width: 992px)").matches) {
      /* Everything in the section scales by s, so the full 1010px Figma frame fits the window height */
      s = Math.max(0.45, Math.min(s, window.innerHeight / 1010));
    }
    var w = Math.round(1302 * s);
    giftBox.style.width = window.matchMedia("(max-width: 767.98px)").matches ? "" : w + "px";
    giftBox.style.setProperty("--g-box-s", s.toFixed(5));
    if (giftPack) giftPack.style.setProperty("--g-pack-s", s.toFixed(5));
    giftBox.style.setProperty("--g-box-w", w + "px");
    /* Mobile box (< 768px): 552 × 637 Figma canvas, scaled to the 440px design phone width */
    /* Phones narrower than the 440px design get a slightly larger box (scale by width / 400) so the card text stays readable */
    var vw = window.innerWidth;
    giftBox.style.setProperty("--g-mbox-s", Math.min(1, vw >= 440 ? vw / 440 : vw / 400).toFixed(4));
    giftBox.style.marginBottom = "";
    if (giftPackage && window.matchMedia("(max-width: 991.98px)").matches && giftBox.classList.contains("is-open")) {
      var overflow = giftPackage.getBoundingClientRect().bottom - giftBox.getBoundingClientRect().bottom;
      if (overflow > 0) giftBox.style.marginBottom = Math.ceil(overflow + 16) + "px";
    }
    /* Never refresh ScrollTrigger mid-scrub — it resets the box pose and kills the animation */
    if (boxScrubActive) return;
    var newH = document.documentElement.scrollHeight;
    if (window.ScrollTrigger && newH !== lastDocH) {
      lastDocH = newH;
      window.requestAnimationFrame(function () {
        if (!boxScrubActive) ScrollTrigger.refresh();
      });
    }
  }

  function decodeBoxImages() {
    if (!giftPack) return Promise.resolve();
    var imgs = giftPack.querySelectorAll("img");
    var jobs = Array.prototype.map.call(imgs, function (img) {
      if (!img.decode) return Promise.resolve();
      return img.decode().catch(function () {});
    });
    var cap = new Promise(function (resolve) {
      window.setTimeout(resolve, 1200);
    });
    return Promise.race([Promise.all(jobs), cap]);
  }

  function setBoxInteractive(open) {
    if (!giftBox) return;
    boxFullyOpen = !!open;
    giftBox.classList.toggle("is-open", boxFullyOpen);
    giftBox.setAttribute("aria-expanded", boxFullyOpen ? "true" : "false");
    giftBox.setAttribute(
      "aria-label",
      boxFullyOpen ? "Gift box opened — explore the package" : "Open gift box — keep scrolling"
    );
    if (boxFullyOpen) {
      giftBox.removeAttribute("role");
      giftBox.removeAttribute("tabindex");
      giftBox.classList.remove("is-scrubbing");
    } else {
      giftBox.setAttribute("role", "button");
      giftBox.setAttribute("tabindex", "0");
      giftBox.classList.remove("is-flipped", "is-turning", "is-3d");
      giftBox.classList.add("is-scrubbing");
    }
    var flipBtnEl = document.getElementById("flip-package-card");
    if (flipBtnEl) flipBtnEl.setAttribute("tabindex", boxFullyOpen ? "0" : "-1");
    document.querySelectorAll(".js-gift-flip").forEach(function (b) {
      b.setAttribute("tabindex", boxFullyOpen ? "0" : "-1");
    });
    if (giftPack) giftPack.classList.toggle("is-box-open", boxFullyOpen);
    var openStage = document.getElementById("gift-box-open");
    if (openStage) openStage.setAttribute("aria-hidden", boxFullyOpen ? "false" : "true");
  }

  function snapBoxOpen() {
    if (!boxOpenST) return;
    window.scrollTo({
      top: boxOpenST.end,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  }

  /*
   * Scroll-pinned unboxing:
   *   Tray stays fixed. Only the L-lid lifts off, dissolves into open lid pose,
   *   then the card rises from inside the tray well.
   */
  function buildBoxOpenTimeline() {
    if (!giftBox || !window.gsap) return null;

    var llid = giftBox.querySelector(".g-box__llid") || document.getElementById("gift-box-llid");
    var lidClosed = giftBox.querySelector(".g-box__lid-closed");
    var lidOpen = giftBox.querySelector(".g-box__lid-open");
    var tray = giftBox.querySelector(".g-box__tray");
    var well = document.getElementById("gift-box-well");
    var pkg = giftPackage;
    var ambient = giftBox.querySelector(".g-box__ambient");
    var burst = giftBox.querySelector(".g-box__burst");
    var mClosed = giftBox.querySelector(".g-mbox__closed");
    var mOpen = giftBox.querySelector(".g-mbox__open");
    var mCard = giftBox.querySelector(".g-mbox__card");
    var isMobile = window.matchMedia("(max-width: 767.98px)").matches;

    if (dustLayer && !reducedMotion) {
      dustLayer.innerHTML = "";
      for (var d = 0; d < 14; d++) {
        var mote = document.createElement("span");
        mote.className = "g-box__mote";
        mote.style.setProperty("--mw", 1.5 + Math.random() * 2.5 + "px");
        mote.style.setProperty("--mh", 7 + Math.random() * 12 + "px");
        dustLayer.appendChild(mote);
      }
    }
    var motes = dustLayer ? dustLayer.querySelectorAll(".g-box__mote") : [];

    var tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

    if (llid) {
      gsap.set(llid, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        opacity: 1,
        transformOrigin: "50% 28%",
        force3D: true
      });
    }
    if (lidClosed) gsap.set(lidClosed, { opacity: 1, force3D: true });
    if (lidOpen) gsap.set(lidOpen, { opacity: 0, force3D: true });
    if (tray) gsap.set(tray, { opacity: 0.001, force3D: true });
    if (well) gsap.set(well, { autoAlpha: 0 });
    if (pkg) gsap.set(pkg, { yPercent: 110, autoAlpha: 1, force3D: true });
    if (ambient) gsap.set(ambient, { opacity: 0, scale: 0.85 });
    if (burst) gsap.set(burst, { opacity: 0, scale: 0.5 });
    if (mClosed) gsap.set(mClosed, { opacity: 1, y: 0, scale: 1, visibility: "visible" });
    if (mOpen) gsap.set(mOpen, { opacity: 0 });
    if (mCard) gsap.set(mCard, { yPercent: 110, autoAlpha: 1 });
    if (motes.length) gsap.set(motes, { opacity: 0, x: 0, y: 0, scale: 0.3 });

    if (ambient) tl.to(ambient, { opacity: 0.55, scale: 1, duration: 0.1 }, 0);

    /* Reveal tray under the lid as soon as lid starts to clear */
    if (!isMobile && tray) {
      tl.to(tray, { opacity: 1, duration: 0.18 }, 0.12);
    }

    /* Only the L-lid lifts — tray never moves */
    if (!isMobile && llid) {
      tl.to(
        llid,
        {
          y: -90,
          scale: 1.04,
          duration: 0.36,
          ease: "power2.inOut",
          force3D: true
        },
        0.06
      );
    }

    /* Hand off closed lid → open lid pose */
    if (!isMobile && lidOpen) {
      tl.to(lidOpen, { opacity: 1, duration: 0.22 }, 0.28);
    }
    if (!isMobile && lidClosed) {
      tl.to(lidClosed, { opacity: 0, duration: 0.2 }, 0.3);
    }
    if (!isMobile && llid) {
      tl.to(
        llid,
        {
          y: -40,
          scale: 1,
          duration: 0.28,
          ease: "power2.out",
          force3D: true
        },
        0.32
      );
    }

    if (burst) {
      tl.to(burst, { opacity: 0.75, scale: 1.05, duration: 0.12 }, 0.3);
      tl.to(burst, { opacity: 0, scale: 1.22, duration: 0.22 }, 0.46);
    }

    if (isMobile && mClosed) {
      tl.to(mClosed, { y: -22, scale: 1.03, duration: 0.3 }, 0.08);
      tl.to(mClosed, { opacity: 0, duration: 0.16 }, 0.32);
    }
    if (isMobile && mOpen) {
      tl.to(mOpen, { opacity: 1, duration: 0.22 }, 0.2);
    }

    if (ambient) {
      tl.to(ambient, { opacity: 0.9, scale: 1.1, duration: 0.16 }, 0.28);
      tl.to(ambient, { opacity: 0, duration: 0.18 }, 0.72);
    }

    if (motes.length) {
      Array.prototype.forEach.call(motes, function (mote, i) {
        var ang = (i / motes.length) * Math.PI * 2;
        var dist = 100 + (i % 5) * 36;
        tl.to(
          mote,
          {
            opacity: 0.85,
            x: Math.cos(ang) * dist,
            y: Math.sin(ang) * dist * 0.5 - 50,
            scale: 1,
            duration: 0.2
          },
          0.34 + (i % 4) * 0.02
        );
        tl.to(mote, { opacity: 0, y: "-=30", duration: 0.28 }, 0.58 + (i % 4) * 0.02);
      });
    }

    if (well) tl.to(well, { autoAlpha: 1, duration: 0.08 }, 0.42);
    if (!isMobile && pkg) {
      tl.fromTo(
        pkg,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.38, ease: "power3.out" },
        0.48
      );
    }
    if (isMobile && mCard) {
      tl.fromTo(
        mCard,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.38, ease: "power3.out" },
        0.48
      );
    }

    tl.to({}, { duration: 0.06 }, 0.96);
    return tl;
  }

  function killBoxOpenScroll() {
    boxScrubActive = false;
    if (boxOpenST) {
      boxOpenST.kill(true);
      boxOpenST = null;
    }
    if (boxOpenTl) {
      boxOpenTl.kill();
      boxOpenTl = null;
    }
    if (giftPack) giftPack.classList.remove("is-box-pinning");
  }

  function initBoxOpenScroll() {
    if (!giftPack || !giftBox) return;
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("[gifting] GSAP missing — box will open on click only");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    killBoxOpenScroll();

    giftBox.classList.remove("is-open", "is-flipped");
    if (giftPack) {
      giftPack.classList.remove("is-box-open");
      giftPack.classList.add("is-box-pinning");
    }
    boxFullyOpen = false;
    giftBox.classList.add("is-scrubbing");
    setBoxInteractive(false);

    /*
     * Always use scroll-scrub for the box open — even when prefers-reduced-motion is on.
     * Instant-snap was making the box look "already open with no animation" on Windows
     * machines that ship with animation effects reduced. Scroll-linked motion is user-driven.
     */
    boxOpenTl = buildBoxOpenTimeline();
    if (!boxOpenTl) return;

    var travel = Math.round(Math.max(window.innerHeight * 1.75, 1100));

    boxOpenST = ScrollTrigger.create({
      id: "gifting-box-open",
      trigger: giftPack,
      start: "top top",
      end: "+=" + travel,
      pin: true,
      pinSpacing: true,
      scrub: reducedMotion ? 0.35 : 0.75,
      anticipatePin: 1,
      animation: boxOpenTl,
      onEnter: function () {
        boxScrubActive = true;
      },
      onEnterBack: function () {
        boxScrubActive = true;
        setBoxInteractive(false);
        giftBox.classList.add("is-scrubbing");
      },
      onLeave: function () {
        boxScrubActive = false;
        setBoxInteractive(true);
      },
      onLeaveBack: function () {
        boxScrubActive = false;
        setBoxInteractive(false);
        giftBox.classList.add("is-scrubbing");
      },
      onUpdate: function (self) {
        boxScrubActive = self.isActive;
        if (self.progress >= 0.995) {
          if (!boxFullyOpen) setBoxInteractive(true);
        } else if (boxFullyOpen) {
          setBoxInteractive(false);
          giftBox.classList.add("is-scrubbing");
        }
      }
    });

    decodeBoxImages();
  }

  var flipTimer = null;
  function flipPackageCard() {
    if (!giftBox || !giftBox.classList.contains("is-open")) {
      return;
    }
    if (window.matchMedia("(max-width: 767.98px)").matches && !reducedMotion) {
      /* Mobile: switch 3D on from the current side, turn, then lay the new face flat again */
      giftBox.classList.add("is-3d");
      void giftBox.offsetWidth;
      giftBox.classList.add("is-turning");
      giftBox.classList.toggle("is-flipped");
      window.clearTimeout(flipTimer);
      flipTimer = window.setTimeout(function () {
        giftBox.classList.remove("is-turning", "is-3d");
      }, 800);
    } else {
      giftBox.classList.toggle("is-flipped");
    }
    fitGiftBox();
  }

  fitGiftBox();
  window.addEventListener("resize", fitGiftBox);

  /*
   * Every CTA on the page takes the hero "Explore Gifts" button's exact size (it scales with the
   * hero), so Book the Gift, Gift It and Continue always match it — see .g-btn--sync in gifting.css.
   */
  function syncCtaSize() {
    if (!exploreBtn) return;
    var r = exploreBtn.getBoundingClientRect();
    if (!r.width) return;
    var root = document.documentElement.style;
    root.setProperty("--g-cta-w", r.width.toFixed(2) + "px");
    root.setProperty("--g-cta-h", r.height.toFixed(2) + "px");
    root.setProperty("--g-cta-fs", getComputedStyle(exploreBtn).fontSize);
  }
  syncCtaSize();
  window.addEventListener("resize", syncCtaSize);
  window.addEventListener("load", syncCtaSize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncCtaSize);

  /*
   * Section 2's art is large (4096px background, 3072px open box). Decode it while the
   * visitor is still on the hero so reaching the section never stalls the opening animation.
   */
  window.addEventListener("load", function () {
    var warm = function () {
      decodeBoxImages();
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(warm, { timeout: 1500 });
    else window.setTimeout(warm, 300);
  });
  window.addEventListener("load", fitGiftBox);

  function scrollToEl(el, block) {
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: block || "start"
    });
  }

  /* Explore Gifts → land at the start of the pinned unboxing, then scroll to open */
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (boxOpenST) {
        window.scrollTo({
          top: boxOpenST.start,
          behavior: reducedMotion ? "auto" : "smooth"
        });
      } else {
        scrollToEl(giftPack, "start");
      }
    });
  }

  /* Click / keyboard on closed box → scrub to fully open (same position) */
  if (giftBox) {
    giftBox.addEventListener("click", function (e) {
      if (e.target.closest && (e.target.closest("#flip-package-card") || e.target.closest("#flip-package-card-back") || e.target.closest(".js-gift-flip") || e.target.closest(".g-mbox__card"))) {
        return;
      }
      if (giftBox.classList.contains("is-open")) return;
      snapBoxOpen();
    });

    giftBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        if (giftBox.classList.contains("is-open")) return;
        e.preventDefault();
        snapBoxOpen();
      }
    });
  }

  /* Explore Package → flip card (profiles back); click back to flip again */
  /* Mobile: tapping anywhere on the open card flips it */
  var mCard = document.querySelector(".g-mbox__card");
  if (mCard) {
    mCard.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      flipPackageCard();
    });
  }

  document.querySelectorAll(".js-gift-flip").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      flipPackageCard();
    });
  });

  var flipBtn = document.getElementById("flip-package-card");
  var flipBackBtn = document.getElementById("flip-package-card-back");
  if (flipBtn) {
    flipBtn.setAttribute("tabindex", "-1");
    flipBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      flipPackageCard();
    });
  }
  if (flipBackBtn) {
    flipBackBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      flipPackageCard();
    });
  }

  /* Book the Gift → scroll to pinned steps (no auto-tour) */
  if (bookBtn) {
    bookBtn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToEl(stepsRoot, "start");
    });
  }

  /* ===== Four steps: GSAP ScrollTrigger pin + mandala rotate (Figma 856:10815–10897) ===== */
  function setActiveStep(index) {
    stepPanels.forEach(function (panel, i) {
      panel.classList.toggle("is-active", i === index);
      panel.classList.toggle("is-past", i < index);
    });
  }

  function initStepsScroll() {
    if (!stepsRoot || !stepsPin || !window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach(function (t) {
      if (t.vars && t.vars.id === "gifting-steps") t.kill();
    });

    setActiveStep(0);
    /*
     * Rotate only the img — crop window (.g-steps__mandala) stays Figma-sized.
     */
    if (mandalaImg) {
      /* Not mirrored: a mirrored rangoli turns every swastika the wrong way (rotation keeps it correct) */
      gsap.set(mandalaImg, {
        scaleX: 1,
        rotation: 0,
        transformOrigin: "50% 50%",
        force3D: true
      });
    }

    /* ~1 viewport per step so all 4 panels appear while pinned */
    ScrollTrigger.create({
      id: "gifting-steps",
      trigger: stepsRoot,
      start: "top top",
      end: function () {
        return "+=" + Math.round(window.innerHeight * 4);
      },
      pin: stepsPin,
      pinSpacing: true,
      scrub: reducedMotion ? false : 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        var progress = self.progress;
        var idx = Math.min(3, Math.floor(progress * 4));
        if (progress >= 0.999) idx = 3;
        setActiveStep(idx);
        if (mandalaImg && !reducedMotion) {
          /* Mandala PNG is a transparent circle centred in its box: rotate at scale 1 so it never hits the crop edge */
          gsap.to(mandalaImg, {
            rotation: progress * 360,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      }
    });
  }

  function bootGiftingMotion() {
    function start() {
      initBoxOpenScroll();
      initStepsScroll();
      forceHeroTop();
      window.requestAnimationFrame(function () {
        forceHeroTop();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      });
    }
    if (window.gsap && window.ScrollTrigger) {
      start();
      return;
    }
    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      if (window.gsap && window.ScrollTrigger) {
        window.clearInterval(timer);
        start();
      } else if (tries > 100) {
        window.clearInterval(timer);
        console.warn("[gifting] GSAP/ScrollTrigger not available");
      }
    }, 40);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootGiftingMotion);
  } else {
    bootGiftingMotion();
  }

  window.addEventListener("load", function () {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (window.ScrollTrigger) {
        initBoxOpenScroll();
        initStepsScroll();
        ScrollTrigger.refresh();
      }
    }, 220);
  });

  /* Occasion tabs → swap preview card art + message chips */
  var messageInput = document.getElementById("gift-message");
  var recipientName = document.getElementById("recipient-name");
  var yourName = document.getElementById("your-name");
  var relationship = document.getElementById("relationship");
  var previewName = document.getElementById("preview-name");
  var previewMsg = document.getElementById("preview-msg");
  var previewFrom = document.getElementById("preview-from");
  var previewFor = document.getElementById("preview-for");
  var previewFestive = document.getElementById("preview-festive");
  var previewCard = document.getElementById("gift-preview-card");
  var previewCardImg = document.getElementById("preview-card-img");
  var previewNote = document.getElementById("preview-note");
  var chipsRoot = document.getElementById("gift-message-chips");

  /* Custom relationship dropdown (Figma 862:12515) — drives the hidden native <select> */
  var relBox = document.getElementById("rel-box");
  var relToggle = document.getElementById("rel-toggle");
  var relList = document.getElementById("rel-list");
  var relCurrent = document.getElementById("rel-current");
  var REL_OPTIONS = ["Mom", "Dad", "Spouse", "Sibling", "Friend", "Others"];

  function renderRelOptions() {
    if (!relList || !relationship) return;
    relList.innerHTML = "";
    REL_OPTIONS.forEach(function (value) {
      if (value === relationship.value) return;
      var li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("tabindex", "-1");
      li.setAttribute("data-value", value);
      li.textContent = value;
      relList.appendChild(li);
    });
  }

  function setRelOpen(open) {
    if (!relBox || !relList || !relToggle) return;
    relBox.classList.toggle("is-open", open);
    relList.hidden = !open;
    relToggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function chooseRel(value) {
    if (!relationship) return;
    relationship.value = value;
    if (relCurrent) relCurrent.textContent = value;
    relationship.dispatchEvent(new Event("change", { bubbles: true }));
    renderRelOptions();
    setRelOpen(false);
    if (relToggle) relToggle.focus();
  }

  if (relBox && relToggle && relList && relationship) {
    renderRelOptions();
    relToggle.addEventListener("click", function () {
      setRelOpen(relList.hidden);
      if (!relList.hidden && relList.firstElementChild) relList.firstElementChild.focus();
    });
    relList.addEventListener("click", function (e) {
      var li = e.target.closest("li[data-value]");
      if (li) chooseRel(li.getAttribute("data-value"));
    });
    relList.addEventListener("keydown", function (e) {
      var li = e.target.closest("li[data-value]");
      if (!li) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        chooseRel(li.getAttribute("data-value"));
      } else if (e.key === "ArrowDown" && li.nextElementSibling) {
        e.preventDefault();
        li.nextElementSibling.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (li.previousElementSibling) li.previousElementSibling.focus();
        else relToggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!relBox.contains(e.target)) setRelOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !relList.hidden) {
        setRelOpen(false);
        relToggle.focus();
      }
    });
  }

  var OCCASIONS = {
    diwali: {
      theme: "is-diwali",
      festive: "SHUBH DEEPAVALI",
      messages: [
        "For many more Diwalis together.",
        "A little gift for more moments together.",
        "Because I want you around for every celebration."
      ]
    },
    birthday: {
      theme: "is-birthday",
      festive: "CELEBRATING YOU",
      messages: [
        "Because every milestone deserves a little love.",
        "A little gift to celebrate your special moments together.",
        "Here's to more beautiful memories together."
      ]
    },
    "just-because": {
      theme: "is-just-because",
      festive: "BECAUSE YOU'RE SPECIAL",
      messages: [
        "A little gift to make an ordinary day feel special.",
        "No special occasion, just a little love.",
        "Just a little something to make you smile."
      ]
    }
  };

  function bindChipClicks() {
    if (!chipsRoot) return;
    chipsRoot.querySelectorAll(".g-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        chipsRoot.querySelectorAll(".g-chip").forEach(function (c) {
          c.classList.remove("is-active");
        });
        chip.classList.add("is-active");
        if (messageInput) {
          messageInput.value = chip.getAttribute("data-message") || "";
          messageInput.dispatchEvent(new Event("input"));
        }
      });
    });
  }

  function renderOccasionChips(messages) {
    if (!chipsRoot) return;
    chipsRoot.innerHTML = "";
    /* Shortest first, as in Figma: only the first pill sits beside the closed dropdown */
    messages.slice().sort(function (a, b) {
      return a.length - b.length;
    }).forEach(function (msg) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "g-chip";
      btn.setAttribute("data-message", msg);
      btn.textContent = msg;
      chipsRoot.appendChild(btn);
    });
    bindChipClicks();
  }

  /*
   * Longer messages (Birthdays, Just Because) wrap onto extra lines. The preview card is centred
   * beside the form, so a taller chip list would push it down. Reserve the tallest set's height.
   */
  function reserveChipHeight() {
    if (!chipsRoot) return;
    var saved = Array.prototype.slice.call(chipsRoot.children);
    var savedMin = chipsRoot.style.minHeight;
    chipsRoot.style.minHeight = "";
    var max = 0;
    Object.keys(OCCASIONS).forEach(function (key) {
      chipsRoot.innerHTML = "";
      OCCASIONS[key].messages.forEach(function (msg) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-chip";
        btn.textContent = msg;
        chipsRoot.appendChild(btn);
      });
      max = Math.max(max, chipsRoot.getBoundingClientRect().height);
    });
    chipsRoot.innerHTML = "";
    saved.forEach(function (el) {
      chipsRoot.appendChild(el);
    });
    chipsRoot.style.minHeight = max ? Math.ceil(max) + "px" : savedMin;
  }

  reserveChipHeight();
  window.addEventListener("load", reserveChipHeight);
  window.addEventListener("resize", function () {
    window.clearTimeout(reserveChipHeight.t);
    reserveChipHeight.t = window.setTimeout(reserveChipHeight, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(reserveChipHeight);

  var currentOccasion = "diwali";

  function setOccasion(key) {
    currentOccasion = OCCASIONS[key] ? key : "diwali";
    var config = OCCASIONS[key] || OCCASIONS.diwali;
    if (previewCard) {
      previewCard.classList.remove("is-diwali", "is-birthday", "is-just-because");
      previewCard.classList.add(config.theme);
    }
    if (previewCardImg) {
      previewCardImg.src = "assets/images/gifting/envelope.png";
      previewCardImg.alt = "Gift envelope";
    }
    if (previewFestive) previewFestive.textContent = config.festive;
    if (previewNote) {
      previewNote.textContent = "Personalised Gift Card inside the envelope";
    }
    renderOccasionChips(config.messages);
    if (messageInput) {
      messageInput.value = "";
      messageInput.dispatchEvent(new Event("input"));
    }
  }

  document.querySelectorAll(".g-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".g-tab").forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      setOccasion(tab.getAttribute("data-occasion") || "diwali");
    });
  });

  bindChipClicks();

  function updatePreview() {
    if (previewName && recipientName) {
      previewName.textContent = recipientName.value.trim() || "Their name";
    }
    if (previewMsg && messageInput) {
      previewMsg.textContent = messageInput.value.trim() || "Write your message";
    }
    if (previewFrom && yourName) {
      previewFrom.textContent = yourName.value.trim() || "Your name";
    }
    if (previewFor && relationship) {
      previewFor.textContent = "FOR " + (relationship.value || "Mom").toUpperCase();
    }
  }

  [recipientName, yourName, messageInput, relationship].forEach(function (el) {
    if (!el) return;
    el.addEventListener("input", updatePreview);
    el.addEventListener("change", updatePreview);
  });
  updatePreview();

  /* ===== Gift It → Book Appointment panel (Figma 862:13205) ===== */
  var API_BASE = "https://api.supershyft.com";
  var PROVIDER = "healthians";
  var PACKAGE_ID = 7;
  var SERVICEABILITY_DEBOUNCE_MS = 400;
  var PINCODE_CITY_MAP_URL = "assets/data/pincode-city.json";
  /* Birthday / Just Because: paste the real campaign code when you have it. Empty = no fake code. */
  var DISCOUNT_CODES = {
    diwali: "SUPERDIWALI",
    birthday: "",
    "just-because": "",
  };

  function getActiveOccasion() {
    var activeTab = document.querySelector(".g-tab.is-active");
    var fromTab = activeTab && activeTab.getAttribute("data-occasion");
    if (fromTab && OCCASIONS[fromTab]) return fromTab;
    return OCCASIONS[currentOccasion] ? currentOccasion : "diwali";
  }

  function getDiscountCode() {
    var code = DISCOUNT_CODES[getActiveOccasion()];
    return code ? String(code).trim() : "";
  }

  var form = document.getElementById("gift-form");
  var book = document.getElementById("gift-book");
  var bookBack = document.getElementById("gift-book-back");
  var bookDates = document.getElementById("book-dates");
  var bookSlots = document.getElementById("book-slots");
  var bookError = document.getElementById("gift-book-error");
  var bookContinue = document.getElementById("gift-book-continue");
  var bookAddress = document.getElementById("book-address");
  var bookCity = document.getElementById("book-city");
  var bookPincode = document.getElementById("book-pincode");
  var bookAge = document.getElementById("book-age");
  var otpPanel = document.getElementById("gift-otp");
  var otpBack = document.getElementById("gift-otp-back");
  var otpDigits = document.getElementById("gift-otp-digits");
  var otpHint = document.getElementById("gift-otp-hint");
  var otpTimerEl = document.getElementById("gift-otp-timer");
  var otpResend = document.getElementById("gift-otp-resend");
  var otpError = document.getElementById("gift-otp-error");
  var otpVerify = document.getElementById("gift-otp-verify");
  var paySuccess = document.getElementById("gift-pay-success");
  var payFailed = document.getElementById("gift-pay-failed");
  var paySuccessClose = document.getElementById("gift-pay-success-close");
  var payFailedClose = document.getElementById("gift-pay-failed-close");
  var payTxnId = document.getElementById("gift-pay-txn-id");
  var payAmount = document.getElementById("gift-pay-amount");
  var payDownload = document.getElementById("gift-pay-download");
  var payRetry = document.getElementById("gift-pay-retry");
  var payChange = document.getElementById("gift-pay-change");
  var formInner = form ? form.parentElement : null;
  var scheduleGroup = book ? book.querySelector(".g-book__group--schedule") : null;
  var scheduleStatus = null;
  var otpDigitInputs = otpDigits
    ? Array.prototype.slice.call(otpDigits.querySelectorAll(".g-otp__digit"))
    : [];

  var geoState = null;
  var serviceabilityTimer = null;
  var serviceabilityAbort = null;
  var serviceabilityGen = 0;
  var slotsAbort = null;
  var slotsGen = 0;
  var lastSlotPayload = null;
  var pincodeCityMap = null;
  var pincodeCityMapPromise = null;
  var lastAutofilledCity = "";
  var OTP_RESEND_SECONDS = 30;
  var onboardSession = {
    booker_user_id: null,
    otp_session_id: null,
    payment_required: true,
    engagement_ids: [],
    booking_ids: [],
    payload: null,
    bookerPhone: "",
    bookerEmail: "",
    bookerName: "",
    razorpay: null,
    amount_rupees: null,
    razorpay_payment_id: null,
    access_token: null,
  };
  var otpTimerId = null;
  var otpSecondsLeft = 0;
  var razorpayScriptPromise = null;

  function ensureScheduleStatus() {
    if (scheduleStatus || !scheduleGroup) return scheduleStatus;
    scheduleStatus = document.createElement("p");
    scheduleStatus.className = "g-book__status";
    scheduleStatus.id = "book-schedule-status";
    scheduleStatus.setAttribute("role", "status");
    scheduleStatus.hidden = true;
    scheduleGroup.appendChild(scheduleStatus);
    return scheduleStatus;
  }

  function setBookError(msg) {
    if (!bookError) return;
    bookError.textContent = msg || "";
    bookError.hidden = !msg;
  }

  function setScheduleStatus(msg) {
    var el = ensureScheduleStatus();
    if (!el) return;
    el.textContent = msg || "";
    el.hidden = !msg;
  }

  function setScheduleLoading(loading) {
    if (scheduleGroup) scheduleGroup.classList.toggle("is-loading", !!loading);
  }

  function abortServiceability() {
    if (serviceabilityTimer) {
      clearTimeout(serviceabilityTimer);
      serviceabilityTimer = null;
    }
    if (serviceabilityAbort) {
      serviceabilityAbort.abort();
      serviceabilityAbort = null;
    }
  }

  function abortSlots() {
    if (slotsAbort) {
      slotsAbort.abort();
      slotsAbort = null;
    }
  }

  function apiLabel(path) {
    var parts = String(path || "").split("/");
    return parts[parts.length - 1] || path || "api";
  }

  function clearDatesAndSlots() {
    if (bookDates) {
      bookDates.innerHTML = "";
      bookDates.removeAttribute("data-api");
    }
    if (bookSlots) {
      bookSlots.innerHTML = "";
      bookSlots.removeAttribute("data-api");
    }
    lastSlotPayload = null;
  }

  function resetOnboardSession() {
    stopOtpTimer();
    onboardSession.booker_user_id = null;
    onboardSession.otp_session_id = null;
    onboardSession.payment_required = true;
    onboardSession.engagement_ids = [];
    onboardSession.booking_ids = [];
    onboardSession.payload = null;
    onboardSession.bookerPhone = "";
    onboardSession.bookerEmail = "";
    onboardSession.bookerName = "";
    onboardSession.razorpay = null;
    onboardSession.amount_rupees = null;
    onboardSession.razorpay_payment_id = null;
    onboardSession.access_token = null;
    clearOtpInputs();
    setOtpError("");
  }

  function collectEngagementIds(members) {
    var ids = [];
    if (!members || !members.length) return ids;
    for (var i = 0; i < members.length; i++) {
      var id = members[i] && members[i].engagement_id;
      if (id != null && id !== "") ids.push(id);
    }
    return ids;
  }

  function applyOnboardResponse(data, payload) {
    var engagementIds = collectEngagementIds(data.members);
    if (!engagementIds.length) {
      throw new Error("Could not start booking. Please try again.");
    }
    onboardSession.payload = payload;
    onboardSession.booker_user_id = data.booker_user_id != null ? data.booker_user_id : null;
    onboardSession.otp_session_id = data.otp_session_id != null ? data.otp_session_id : null;
    onboardSession.payment_required = data.payment_required !== false;
    onboardSession.engagement_ids = engagementIds;
    onboardSession.booking_ids = [];
    onboardSession.bookerPhone = payload.booker.phone;
    onboardSession.bookerEmail = payload.booker.email;
    onboardSession.bookerName = payload.booker.name;
    onboardSession.razorpay = null;
    onboardSession.amount_rupees = null;
    onboardSession.razorpay_payment_id = null;
    onboardSession.access_token = null;
  }

  function resetBookingApiState() {
    abortServiceability();
    abortSlots();
    serviceabilityGen += 1;
    slotsGen += 1;
    geoState = null;
    lastSlotPayload = null;
    clearDatesAndSlots();
    setBookError("");
    setScheduleStatus("");
    setScheduleLoading(false);
    setContinueLoading(false);
    resetOnboardSession();
    lastAutofilledCity = "";
  }

  function apiErrorMessage(json, fallback) {
    if (!json) return fallback;
    if (typeof json.detail === "string") return json.detail;
    if (typeof json.message === "string") return json.message;
    if (typeof json.error === "string") return json.error;
    if (json.detail && typeof json.detail === "object" && json.detail.message) {
      return String(json.detail.message);
    }
    return fallback;
  }

  function apiPost(path, body, signal, token) {
    var url = API_BASE + path;
    var label = apiLabel(path);
    var headers = { "Content-Type": "application/json", Accept: "application/json" };
    if (token) headers.Authorization = "Bearer " + token;
    console.info("[gifting] POST " + url, body);
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      signal: signal,
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return null;
          })
          .then(function (json) {
            if (!res.ok) {
              console.error("[gifting] ← " + label + " " + res.status, json || res.statusText);
              var err = new Error(
                apiErrorMessage(json, "Request failed (" + res.status + ")")
              );
              err.status = res.status;
              err.payload = json;
              throw err;
            }
            console.info("[gifting] ← " + label + " " + res.status, json);
            return json;
          });
      })
      .catch(function (err) {
        if (err && err.name !== "AbortError" && err.status == null) {
          console.error("[gifting] ✕ " + label + " " + url, err);
        }
        throw err;
      });
  }

  function radio(name, value, inner, checked) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    var face = document.createElement("span");
    input.type = "radio";
    input.name = name;
    input.value = value;
    input.checked = !!checked;
    face.innerHTML = inner;
    label.appendChild(input);
    label.appendChild(face);
    return label;
  }

  function toIsoDate(d) {
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  /* Tomorrow through the next 5 days; none pre-selected */
  function renderBookDates() {
    if (!bookDates) return;
    var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    bookDates.innerHTML = "";
    bookDates.setAttribute("data-api", API_BASE + "/diagnostics/public/serviceability");
    for (var i = 1; i <= 5; i++) {
      var d = new Date();
      d.setHours(12, 0, 0, 0);
      d.setDate(d.getDate() + i);
      var el = radio(
        "book-date",
        toIsoDate(d),
        "<small>" + DAYS[d.getDay()] + "</small><b>" + d.getDate() + "</b>",
        false
      );
      el.className = "g-book__date";
      bookDates.appendChild(el);
    }
  }

  function formatClock(time) {
    if (!time) return "";
    var parts = String(time).split(":");
    var h = parseInt(parts[0], 10);
    var m = parts[1] || "00";
    if (isNaN(h)) return String(time).slice(0, 5);
    var suffix = h >= 12 ? " PM" : " AM";
    var h12 = h % 12 || 12;
    return String(h12).padStart(2, "0") + ":" + m + suffix;
  }

  function formatSlotLabel(slot) {
    return formatClock(slot.slot_time) || "Slot";
  }

  function renderBookSlotsFromApi(slots) {
    if (!bookSlots) return;
    bookSlots.innerHTML = "";
    bookSlots.setAttribute("data-api", API_BASE + "/diagnostics/public/available-slots");
    lastSlotPayload = null;
    if (!slots || !slots.length) {
      setScheduleStatus("No slots available for this date.");
      return;
    }
    setScheduleStatus("");
    slots.forEach(function (slot) {
      var stmId = slot.stm_id != null ? String(slot.stm_id) : "";
      var el = radio("book-slot", stmId || formatSlotLabel(slot), formatSlotLabel(slot), false);
      el.className = "g-book__slot";
      var input = el.querySelector("input");
      if (input && stmId) input.setAttribute("data-stm-id", stmId);
      if (input) {
        input.setAttribute("data-slot-time", slot.slot_time || "");
        input.setAttribute("data-end-time", slot.end_time || "");
        input.setAttribute("data-slot-date", slot.slot_date || "");
      }
      bookSlots.appendChild(el);
    });
  }

  function getSelectedGender() {
    var checked = book ? book.querySelector("input[name='book-gender']:checked") : null;
    return checked ? checked.value : "";
  }

  function hasFemalePatient() {
    return getSelectedGender() === "Female";
  }

  function getSelectedDate() {
    var checked = book ? book.querySelector("input[name='book-date']:checked") : null;
    return checked ? checked.value : "";
  }

  function addressFieldsReady() {
    var address = bookAddress ? bookAddress.value.trim() : "";
    var city = bookCity ? bookCity.value.trim() : "";
    var pincode = bookPincode ? bookPincode.value.trim() : "";
    return !!(address && city && /^\d{6}$/.test(pincode));
  }

  function loadPincodeCityMap() {
    if (pincodeCityMap) return Promise.resolve(pincodeCityMap);
    if (pincodeCityMapPromise) return pincodeCityMapPromise;
    pincodeCityMapPromise = fetch(PINCODE_CITY_MAP_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("pincode map " + res.status);
        return res.json();
      })
      .then(function (map) {
        pincodeCityMap = map && typeof map === "object" ? map : {};
        return pincodeCityMap;
      })
      .catch(function () {
        pincodeCityMap = {};
        pincodeCityMapPromise = null;
        return pincodeCityMap;
      });
    return pincodeCityMapPromise;
  }

  function cityMatchesAutofill(value) {
    return !!(lastAutofilledCity && value === lastAutofilledCity);
  }

  function maybeAutofillCity() {
    if (!bookCity || !bookPincode) return Promise.resolve(false);
    var pin = bookPincode.value.trim();
    var current = bookCity.value.trim();

    if (!/^\d{6}$/.test(pin)) {
      if (cityMatchesAutofill(current)) {
        bookCity.value = "";
        lastAutofilledCity = "";
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }

    return loadPincodeCityMap().then(function (map) {
      var city = map[pin];
      if (!city) return false;
      current = bookCity.value.trim();
      if (!current || cityMatchesAutofill(current)) {
        if (current === city) {
          lastAutofilledCity = city;
          return false;
        }
        bookCity.value = city;
        lastAutofilledCity = city;
        return true;
      }
      return false;
    });
  }

  function unwrapApiData(payload) {
    if (payload && payload.data != null && typeof payload.data === "object") {
      return payload.data;
    }
    return payload || {};
  }

  function pickProviderResult(payload) {
    var data = unwrapApiData(payload);
    var list = data.providers || [];
    var match = null;
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].provider === PROVIDER) {
        match = list[i];
        break;
      }
    }
    return match || list[0] || null;
  }

  function checkServiceability() {
    if (!addressFieldsReady()) return;

    abortServiceability();
    abortSlots();
    slotsGen += 1;

    var gen = (serviceabilityGen += 1);
    var address = bookAddress.value.trim();
    var city = bookCity.value.trim();
    var pincode = bookPincode.value.trim();

    geoState = null;
    clearDatesAndSlots();
    setBookError("");
    setScheduleStatus("Checking availability…");
    setScheduleLoading(true);

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    serviceabilityAbort = controller;

    apiPost(
      "/diagnostics/public/serviceability",
      {
        provider: PROVIDER,
        address_line: address,
        city: city,
        pincode: pincode,
        diagnostic_package_id: PACKAGE_ID,
      },
      controller ? controller.signal : undefined
    )
      .then(function (data) {
        if (gen !== serviceabilityGen) return;
        setScheduleLoading(false);
        serviceabilityAbort = null;

        var result = pickProviderResult(data);
        if (!result || !result.serviceable) {
          geoState = null;
          clearDatesAndSlots();
          setScheduleStatus("");
          setBookError(
            (result && result.message) || "This area is not serviceable."
          );
          placeBook();
          return;
        }

        geoState = {
          provider: result.provider || PROVIDER,
          zone_id: result.zone_id,
          latitude: result.latitude,
          longitude: result.longitude,
          pincode: pincode,
          serviceable: true,
        };
        setBookError("");
        setScheduleStatus("");
        renderBookDates();
        placeBook();
      })
      .catch(function (err) {
        if (gen !== serviceabilityGen) return;
        if (err && err.name === "AbortError") return;
        setScheduleLoading(false);
        serviceabilityAbort = null;
        geoState = null;
        clearDatesAndSlots();
        setScheduleStatus("");
        setBookError("Unable to check serviceability. Please try again.");
        placeBook();
      });
  }

  function scheduleServiceabilityCheck() {
    if (serviceabilityTimer) clearTimeout(serviceabilityTimer);
    if (!addressFieldsReady()) {
      abortServiceability();
      abortSlots();
      serviceabilityGen += 1;
      slotsGen += 1;
      geoState = null;
      clearDatesAndSlots();
      setScheduleStatus("");
      setScheduleLoading(false);
      /* Keep validation errors from Continue; clear only availability-style copy */
      if (bookError && /serviceable|availability|Unable to check/i.test(bookError.textContent || "")) {
        setBookError("");
      }
      return;
    }
    serviceabilityTimer = setTimeout(function () {
      serviceabilityTimer = null;
      checkServiceability();
    }, SERVICEABILITY_DEBOUNCE_MS);
  }

  function fetchAvailableSlots() {
    var slotDate = getSelectedDate();
    if (!slotDate || !geoState || !geoState.serviceable) return;

    if (!getSelectedGender()) {
      if (bookSlots) {
        bookSlots.innerHTML = "";
        bookSlots.removeAttribute("data-api");
      }
      lastSlotPayload = null;
      setScheduleStatus("");
      setBookError("Please select the recipient's gender.");
      placeBook();
      return;
    }

    abortSlots();
    var gen = (slotsGen += 1);
    setBookError("");
    setScheduleStatus("Loading slots…");
    if (bookSlots) {
      bookSlots.innerHTML = "";
      bookSlots.removeAttribute("data-api");
    }
    lastSlotPayload = null;

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    slotsAbort = controller;

    apiPost(
      "/diagnostics/public/available-slots",
      {
        provider: geoState.provider || PROVIDER,
        slot_date: slotDate,
        diagnostic_package_id: PACKAGE_ID,
        zone_id: geoState.zone_id,
        latitude: geoState.latitude,
        longitude: geoState.longitude,
        pincode: geoState.pincode,
        has_female_patient: hasFemalePatient(),
      },
      controller ? controller.signal : undefined
    )
      .then(function (payload) {
        if (gen !== slotsGen) return;
        slotsAbort = null;
        var data = unwrapApiData(payload);
        renderBookSlotsFromApi(data.slots || []);
        placeBook();
      })
      .catch(function (err) {
        if (gen !== slotsGen) return;
        if (err && err.name === "AbortError") return;
        slotsAbort = null;
        if (bookSlots) {
          bookSlots.innerHTML = "";
          bookSlots.removeAttribute("data-api");
        }
        lastSlotPayload = null;
        setScheduleStatus("");
        setBookError("Unable to load slots. Please try another date.");
        placeBook();
      });
  }

  function fieldValue(id) {
    var el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
  }

  function mapRelation(label) {
    /* API allows: spouse | child | sibling | parent | grandparent | other */
    var map = {
      Mom: "parent",
      Dad: "parent",
      Spouse: "spouse",
      Sibling: "sibling",
      Friend: "other",
      Others: "other",
    };
    return map[label] || "other";
  }

  function maskPhone(phone) {
    var digits = String(phone || "").replace(/\D/g, "");
    if (digits.length < 2) return "+91 ——————";
    return "+91 xxxxxxxx" + digits.slice(-2);
  }

  function maskEmail(email) {
    var parts = String(email || "").split("@");
    if (parts.length < 2) return "———@———";
    var local = parts[0];
    var domain = parts.slice(1).join("@");
    var head = local.slice(0, 2);
    var tail = local.length > 2 ? local.slice(-2) : "";
    return head + "xxxx" + tail + "@" + domain;
  }

  function setContinueLoading(loading) {
    if (!bookContinue) return;
    bookContinue.disabled = !!loading;
    bookContinue.textContent = loading ? "Please wait…" : "Continue";
  }

  function setOtpError(msg) {
    if (!otpError) return;
    otpError.textContent = msg || "";
    otpError.hidden = !msg;
  }

  function clearOtpInputs() {
    otpDigitInputs.forEach(function (input) {
      input.value = "";
    });
  }

  function getOtpValue() {
    return otpDigitInputs
      .map(function (input) {
        return String(input.value || "").replace(/\D/g, "");
      })
      .join("");
  }

  function stopOtpTimer() {
    if (otpTimerId) {
      clearInterval(otpTimerId);
      otpTimerId = null;
    }
  }

  function formatOtpTimer(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function startOtpTimer() {
    stopOtpTimer();
    otpSecondsLeft = OTP_RESEND_SECONDS;
    if (otpTimerEl) otpTimerEl.textContent = formatOtpTimer(otpSecondsLeft);
    if (otpResend) otpResend.disabled = true;
    otpTimerId = setInterval(function () {
      otpSecondsLeft -= 1;
      if (otpSecondsLeft <= 0) {
        stopOtpTimer();
        if (otpTimerEl) otpTimerEl.textContent = "00:00";
        if (otpResend) otpResend.disabled = false;
        return;
      }
      if (otpTimerEl) otpTimerEl.textContent = formatOtpTimer(otpSecondsLeft);
    }, 1000);
  }

  function activeOverlay() {
    if (paySuccess && !paySuccess.hidden) return paySuccess;
    if (payFailed && !payFailed.hidden) return payFailed;
    if (otpPanel && !otpPanel.hidden) return otpPanel;
    if (book && !book.hidden) return book;
    return null;
  }

  /* Pin the visible glass panel to the form (15px above it, as in Figma) */
  function placeBook() {
    var panel = activeOverlay();
    if (!panel || !form || !formInner) return;
    formInner.style.paddingBottom = "";
    panel.style.setProperty("--g-book-top", form.offsetTop - 15 + "px");
    var section = formInner.closest("section");
    var room = section ? parseFloat(getComputedStyle(section).paddingBottom) - 40 : 0;
    var extra =
      panel.offsetTop +
      panel.offsetHeight -
      (form.offsetTop + form.offsetHeight) -
      Math.max(0, room);
    if (extra > 0) formInner.style.paddingBottom = extra + "px";
  }

  function hidePanel(panel) {
    if (!panel) return;
    panel.classList.remove("is-visible");
    panel.hidden = true;
  }

  function showPanel(panel) {
    if (!panel) return;
    panel.hidden = false;
    placeBook();
    void panel.offsetWidth;
    panel.classList.add("is-visible");
    panel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    placeBook();
  }

  function lockFormUnderOverlay() {
    if (!form) return;
    form.classList.add("is-booking");
    form.setAttribute("aria-hidden", "true");
    form.inert = true;
  }

  function unlockForm() {
    if (!form) return;
    form.classList.remove("is-booking");
    form.removeAttribute("aria-hidden");
    form.inert = false;
    if (formInner) formInner.style.paddingBottom = "";
  }

  function openBook() {
    if (!book) return;
    hidePanel(otpPanel);
    hidePanel(paySuccess);
    hidePanel(payFailed);
    resetBookingApiState();
    lockFormUnderOverlay();
    showPanel(book);
    var first = book.querySelector("input[name='book-gender']");
    if (first) first.focus({ preventScroll: true });
    loadPincodeCityMap();
    maybeAutofillCity().then(function () {
      if (addressFieldsReady()) scheduleServiceabilityCheck();
    });
  }

  function closeBook() {
    hidePanel(book);
    hidePanel(otpPanel);
    hidePanel(paySuccess);
    hidePanel(payFailed);
    resetBookingApiState();
    unlockForm();
    var submit = form ? form.querySelector("[type='submit']") : null;
    if (submit) submit.focus();
  }

  function openOtpPanel() {
    hidePanel(book);
    hidePanel(paySuccess);
    hidePanel(payFailed);
    lockFormUnderOverlay();
    if (otpHint) {
      otpHint.textContent =
        "OTP sent on " +
        maskPhone(onboardSession.bookerPhone) +
        " and " +
        maskEmail(onboardSession.bookerEmail);
    }
    clearOtpInputs();
    setOtpError("");
    showPanel(otpPanel);
    startOtpTimer();
    if (otpDigitInputs[0]) otpDigitInputs[0].focus({ preventScroll: true });
  }

  function openPaySuccess(paymentId, amountRupees) {
    hidePanel(book);
    hidePanel(otpPanel);
    hidePanel(payFailed);
    lockFormUnderOverlay();
    if (payTxnId) payTxnId.textContent = paymentId || "—";
    if (payAmount) {
      var amt =
        amountRupees != null && amountRupees !== ""
          ? Number(amountRupees)
          : NaN;
      payAmount.textContent = isNaN(amt) ? "—" : "Rs. " + amt + "/-";
    }
    showPanel(paySuccess);
  }

  function openPayFailed() {
    hidePanel(book);
    hidePanel(otpPanel);
    hidePanel(paySuccess);
    lockFormUnderOverlay();
    showPanel(payFailed);
  }

  function buildFamilyOnboardPayload() {
    var bookerName = fieldValue("your-name");
    var bookerPhone = fieldValue("your-phone");
    var bookerEmail = fieldValue("your-email");
    var relationEl = document.getElementById("relationship");
    var relationLabel = relationEl ? relationEl.value : "Others";
    var ageNum = bookAge ? parseInt(bookAge.value, 10) : NaN;
    var slotTime = (lastSlotPayload && lastSlotPayload.slot_time) || "";
    /* Prefer HH:MM for API (strip seconds if present) */
    if (slotTime && slotTime.length >= 5) slotTime = slotTime.slice(0, 5);

    return {
      booker: {
        name: bookerName,
        phone: bookerPhone,
        email: bookerEmail,
      },
      members: [
        {
          name: fieldValue("recipient-name"),
          phone: fieldValue("recipient-phone"),
          email: fieldValue("recipient-email"),
          relation: mapRelation(relationLabel),
          age: isNaN(ageNum) ? 0 : ageNum,
          gender: getSelectedGender(),
          engagement_type: "bio_ai",
          diagnostic_package_id: PACKAGE_ID,
          blood_collection_date: getSelectedDate(),
          blood_collection_time_slot: slotTime,
          blood_collection_time_slot_id:
            (lastSlotPayload && lastSlotPayload.stm_id) || "",
          address: bookAddress ? bookAddress.value.trim() : "",
          pincode: bookPincode ? bookPincode.value.trim() : "",
          city: bookCity ? bookCity.value.trim() : "",
          booker_message: fieldValue("gift-message"),
        },
      ],
      discount_code: null,
    };
  }

  function submitFamilyOnboard() {
    var payload = buildFamilyOnboardPayload();
    setContinueLoading(true);
    setBookError("");

    return apiPost("/users/public/family-onboard", payload)
      .then(function (raw) {
        var data = unwrapApiData(raw);
        applyOnboardResponse(data, payload);
        setContinueLoading(false);
        openOtpPanel();
      })
      .catch(function (err) {
        if (err && err.name === "AbortError") return;
        var msg =
          (err && err.message) || "Something went wrong. Please try again.";
        setContinueLoading(false);
        setBookError(msg);
        placeBook();
      });
  }

  function resendOtp() {
    if (otpResend && otpResend.disabled) return;
    var phone = onboardSession.bookerPhone;
    if (!phone) {
      setOtpError("Session expired. Please go back and continue again.");
      return;
    }

    var body = { phone: phone };
    if (onboardSession.bookerEmail) body.email = onboardSession.bookerEmail;

    if (otpResend) otpResend.disabled = true;
    setOtpError("");

    return apiPost("/auth/resend-otp", body)
      .then(function (raw) {
        var data = unwrapApiData(raw);
        if (data.session_id != null) {
          onboardSession.otp_session_id = data.session_id;
        }
        clearOtpInputs();
        startOtpTimer();
        setOtpError("");
        if (otpDigitInputs[0]) otpDigitInputs[0].focus({ preventScroll: true });
      })
      .catch(function (err) {
        if (err && err.name === "AbortError") return;
        var msg =
          (err && err.message) || "Something went wrong. Please try again.";
        setOtpError(msg);
        if (otpResend && otpSecondsLeft <= 0) otpResend.disabled = false;
      });
  }

  function loadRazorpayScript() {
    if (window.Razorpay) return Promise.resolve();
    if (razorpayScriptPromise) return razorpayScriptPromise;
    razorpayScriptPromise = new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        razorpayScriptPromise = null;
        reject(new Error("Could not load payment gateway."));
      };
      document.head.appendChild(script);
    });
    return razorpayScriptPromise;
  }

  function openRazorpayCheckout() {
    var rz = onboardSession.razorpay;
    if (!rz || !rz.key_id || !rz.razorpay_order_id) {
      openPayFailed();
      return Promise.resolve();
    }

    return loadRazorpayScript().then(function () {
      return new Promise(function (resolve) {
        /* Razorpay also fires modal.ondismiss after a successful pay. Only the first
           outcome (handler / payment.failed / user cancel) may change the panel. */
        var settled = false;
        function settleOnce() {
          if (settled) return false;
          settled = true;
          return true;
        }

        var options = {
          key: rz.key_id,
          amount: rz.amount_paise,
          currency: rz.currency || "INR",
          name: "SuperShyft",
          description: "Gift booking",
          order_id: rz.razorpay_order_id,
          prefill: {
            name: onboardSession.bookerName || "",
            email: onboardSession.bookerEmail || "",
            contact: onboardSession.bookerPhone || "",
          },
          theme: { color: "#296359" },
          handler: function (response) {
            if (!settleOnce()) return;
            confirmFamilyPayment(response)
              .then(resolve)
              .catch(function () {
                openPayFailed();
                resolve();
              });
          },
          modal: {
            ondismiss: function () {
              if (!settleOnce()) return;
              openPayFailed();
              resolve();
            },
          },
        };
        try {
          var checkout = new window.Razorpay(options);
          checkout.on("payment.failed", function () {
            if (!settleOnce()) return;
            openPayFailed();
            resolve();
          });
          checkout.open();
        } catch (err) {
          console.error("[gifting] Razorpay open failed", err);
          if (settleOnce()) {
            openPayFailed();
            resolve();
          }
        }
      });
    });
  }

  function memberStatusFailed(status) {
    var s = String(status || "").toLowerCase();
    return s === "failed" || s === "error" || s === "failure";
  }

  function membersHaveFailure(members) {
    if (!members || !members.length) return false;
    for (var i = 0; i < members.length; i++) {
      if (members[i] && memberStatusFailed(members[i].status)) return true;
    }
    return false;
  }

  function confirmPaymentSucceeded(data) {
    if (data.payment_verified === false || data.payment_verified === "false") {
      return false;
    }
    if (membersHaveFailure(data.members)) return false;
    return true;
  }

  function confirmFamilyPayment(response) {
    var body = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
    };
    return apiPost(
      "/users/public/family-onboard/confirm-payment",
      body,
      undefined,
      onboardSession.access_token
    ).then(
      function (raw) {
        var data = unwrapApiData(raw);
        var paymentId =
          data.razorpay_payment_id || response.razorpay_payment_id || "";
        onboardSession.razorpay_payment_id = paymentId;
        if (data.booking_ids && data.booking_ids.length) {
          onboardSession.booking_ids = data.booking_ids;
        }
        if (confirmPaymentSucceeded(data)) {
          openPaySuccess(paymentId, onboardSession.amount_rupees);
        } else {
          openPayFailed();
        }
      }
    );
  }

  function verifyOtpAndPay() {
    var otp = getOtpValue();
    if (otp.length !== 6) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }
    if (!onboardSession.engagement_ids || !onboardSession.engagement_ids.length) {
      setOtpError("Session expired. Please go back and continue again.");
      return;
    }

    if (otpVerify) {
      otpVerify.disabled = true;
      otpVerify.textContent = "Please wait…";
    }
    setOtpError("");

    var verifyBody = {
      phone: onboardSession.bookerPhone,
      otp: otp,
      engagement_ids: onboardSession.engagement_ids.slice(),
      discount_code: getDiscountCode() || null,
    };

    apiPost("/users/public/family-onboard/verify-pay", verifyBody)
      .then(function (raw) {
        var data = unwrapApiData(raw);
        var tokens = (data && data.tokens) || (raw && raw.tokens) || {};
        onboardSession.access_token = tokens.access_token || null;
        if (data.booking_ids && data.booking_ids.length) {
          onboardSession.booking_ids = data.booking_ids;
        }
        onboardSession.razorpay = {
          key_id: data.key_id,
          razorpay_order_id: data.razorpay_order_id,
          amount_paise: data.amount_paise,
          currency: data.currency || "INR",
        };
        onboardSession.amount_rupees =
          data.amount_rupees != null ? data.amount_rupees : null;
        if (otpVerify) {
          otpVerify.disabled = false;
          otpVerify.textContent = "Verify OTP";
        }
        hidePanel(otpPanel);
        var hasOrder = !!(data.key_id && data.razorpay_order_id);
        if (!hasOrder) {
          if (onboardSession.payment_required === false) {
            openPaySuccess(
              data.booking_id ||
                (data.booking_ids && data.booking_ids[0]) ||
                "",
              onboardSession.amount_rupees
            );
            return;
          }
          throw new Error("Could not start payment. Please try again.");
        }
        return openRazorpayCheckout();
      })
      .catch(function (err) {
        if (err && err.name === "AbortError") return;
        if (otpVerify) {
          otpVerify.disabled = false;
          otpVerify.textContent = "Verify OTP";
        }
        setOtpError(
          (err && err.message) || "OTP verification failed. Please try again."
        );
        placeBook();
      });
  }

  function downloadReceipt() {
    var id = onboardSession.razorpay_payment_id || (payTxnId && payTxnId.textContent) || "";
    var amount = (payAmount && payAmount.textContent) || "";
    var lines = [
      "SuperShyft Gift Booking Receipt",
      "--------------------------------",
      "Transaction ID: " + id,
      "Amount: " + amount,
      "Engagement IDs: " + ((onboardSession.engagement_ids || []).join(", ") || "—"),
      "Booking IDs: " + ((onboardSession.booking_ids || []).join(", ") || "—"),
      "",
      "Thank you for gifting with SuperShyft.",
    ];
    var blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "supershyft-receipt-" + (id || "gift") + ".txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function wireOtpDigits() {
    otpDigitInputs.forEach(function (input, index) {
      input.addEventListener("input", function () {
        var digits = String(input.value || "").replace(/\D/g, "");
        if (digits.length > 1) {
          /* Paste / autofill into this box */
          var chars = digits.slice(0, otpDigitInputs.length - index).split("");
          chars.forEach(function (ch, i) {
            if (otpDigitInputs[index + i]) otpDigitInputs[index + i].value = ch;
          });
          var next = otpDigitInputs[Math.min(index + chars.length, otpDigitInputs.length - 1)];
          if (next) next.focus();
          return;
        }
        input.value = digits.slice(0, 1);
        if (digits && otpDigitInputs[index + 1]) otpDigitInputs[index + 1].focus();
      });

      input.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !input.value && otpDigitInputs[index - 1]) {
          otpDigitInputs[index - 1].focus();
        }
      });

      input.addEventListener("paste", function (e) {
        var text = (e.clipboardData || window.clipboardData).getData("text") || "";
        var digits = text.replace(/\D/g, "").slice(0, 6);
        if (!digits) return;
        e.preventDefault();
        otpDigitInputs.forEach(function (box, i) {
          box.value = digits[i] || "";
        });
        var focusIdx = Math.min(digits.length, otpDigitInputs.length - 1);
        otpDigitInputs[focusIdx].focus();
      });
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      updatePreview();
      openBook();
    });
  }

  if (bookBack) bookBack.addEventListener("click", closeBook);
  if (otpBack) {
    otpBack.addEventListener("click", function () {
      hidePanel(otpPanel);
      stopOtpTimer();
      setOtpError("");
      clearOtpInputs();
      lockFormUnderOverlay();
      showPanel(book);
      placeBook();
    });
  }
  if (otpVerify) otpVerify.addEventListener("click", verifyOtpAndPay);
  if (otpResend) {
    otpResend.addEventListener("click", function () {
      if (otpResend.disabled) return;
      resendOtp();
    });
  }
  if (paySuccessClose) paySuccessClose.addEventListener("click", closeBook);
  if (payFailedClose) payFailedClose.addEventListener("click", closeBook);
  if (payDownload) payDownload.addEventListener("click", downloadReceipt);
  if (payRetry) payRetry.addEventListener("click", function () {
    hidePanel(payFailed);
    openRazorpayCheckout();
  });
  if (payChange) payChange.addEventListener("click", function () {
    hidePanel(payFailed);
    openRazorpayCheckout();
  });

  wireOtpDigits();
  window.addEventListener("resize", placeBook);

  if (book) {
    book.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBook();
    });

    book.addEventListener("input", function (e) {
      var t = e.target;
      if (t && t.classList) t.classList.remove("is-invalid");
      if (!t) return;
      if (t.id === "book-address" || t.id === "book-city" || t.id === "book-pincode") {
        if (t.id === "book-pincode") {
          maybeAutofillCity().then(function () {
            scheduleServiceabilityCheck();
          });
          return;
        }
        scheduleServiceabilityCheck();
      }
    });

    book.addEventListener("change", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.name === "book-date") {
        fetchAvailableSlots();
        return;
      }
      if (t.name === "book-gender") {
        if (getSelectedDate() && geoState && geoState.serviceable) {
          fetchAvailableSlots();
        }
        return;
      }
      if (t.name === "book-slot") {
        lastSlotPayload = {
          stm_id: t.getAttribute("data-stm-id") || t.value,
          slot_time: t.getAttribute("data-slot-time") || "",
          end_time: t.getAttribute("data-end-time") || "",
          slot_date: t.getAttribute("data-slot-date") || getSelectedDate(),
          provider: (geoState && geoState.provider) || PROVIDER,
          zone_id: geoState ? geoState.zone_id : null,
        };
      }
    });

    book.addEventListener("submit", function (e) {
      e.preventDefault();
      var missing = [];
      book.querySelectorAll(".g-book__input").forEach(function (input) {
        var bad = !input.checkValidity();
        input.classList.toggle("is-invalid", bad);
        if (bad) missing.push(input);
      });
      var noGender = !book.querySelector("input[name='book-gender']:checked");
      var noDate = !book.querySelector("input[name='book-date']:checked");
      var noSlot = !book.querySelector("input[name='book-slot']:checked");
      var msg = "";
      if (noGender) msg = "Please select the recipient's gender.";
      else if (missing.length) msg = "Please fill in the highlighted details.";
      else if (!geoState || !geoState.serviceable) {
        msg = "Please enter a serviceable address before continuing.";
      } else if (noDate || noSlot) msg = "Please choose a date and a collection slot.";
      if (bookError) {
        bookError.textContent = msg;
        bookError.hidden = !msg;
      }
      if (msg) {
        if (missing.length) missing[0].focus();
        placeBook();
        return;
      }
      if (lastSlotPayload) {
        book.dataset.selectedSlot = JSON.stringify(lastSlotPayload);
      }
      submitFamilyOnboard();
    });
  }

  if (otpPanel) {
    otpPanel.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && otpBack) otpBack.click();
      if (e.key === "Enter") {
        e.preventDefault();
        verifyOtpAndPay();
      }
    });
  }
})();
