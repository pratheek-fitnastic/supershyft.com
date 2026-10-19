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
  var boxHasOpened = false;
  var openAnimTimer = null;
  /* Must match the 3.2s keyframes on .g-box.is-opening in gifting.css */
  var OPEN_SEQUENCE_MS = 3200;
  var SPARKS_AT_MS = 1150;
  var boxCanvas = document.getElementById("gift-box-canvas");
  var sparkLayer = document.getElementById("gift-box-sparkles");
  var giftPackage = document.getElementById("gift-package");

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
    /* The box changes the page height (open state, card flip) — re-measure the pinned steps
       below so their scroll start stays correct and nothing overlaps. */
    var newH = document.documentElement.scrollHeight;
    if (window.ScrollTrigger && newH !== lastDocH) {
      lastDocH = newH;
      window.requestAnimationFrame(function () {
        ScrollTrigger.refresh();
      });
    }
  }

  function burstSparkles() {
    if (!sparkLayer || reducedMotion) return;
    sparkLayer.innerHTML = "";
    for (var i = 0; i < 46; i++) {
      var spark = document.createElement("span");
      var angle = Math.random() * Math.PI * 2;
      var dist = 180 + Math.random() * 420;
      spark.className = "g-box__spark";
      spark.style.setProperty("--dx", Math.cos(angle) * dist * 1.3 + "px");
      spark.style.setProperty("--dy", Math.sin(angle) * dist * 0.75 - 120 + "px");
      spark.style.setProperty("--sz", 6 + Math.random() * 16 + "px");
      spark.style.setProperty("--dur", 1.1 + Math.random() * 0.9 + "s");
      spark.style.setProperty("--delay", Math.random() * 0.25 + "s");
      sparkLayer.appendChild(spark);
    }
    window.setTimeout(function () {
      sparkLayer.innerHTML = "";
    }, 2600);
  }

  function clearOpenTimers() {
    if (openAnimTimer) {
      window.clearTimeout(openAnimTimer);
      openAnimTimer = null;
    }
  }

  function finishOpen() {
    giftBox.classList.remove("is-opening");
    giftBox.classList.add("is-open");
    giftBox.setAttribute("aria-expanded", "true");
    giftBox.setAttribute("aria-label", "Gift box opened — explore the package");
    giftBox.removeAttribute("role");
    giftBox.removeAttribute("tabindex");
    var flipBtnEl = document.getElementById("flip-package-card");
    if (flipBtnEl) flipBtnEl.setAttribute("tabindex", "0");
    document.querySelectorAll(".js-gift-flip").forEach(function (b) {
      b.setAttribute("tabindex", "0");
    });
    openAnimTimer = null;
    fitGiftBox();
  }

  /* Closed → shake → lid lifts → light burst + sparkles → open box, card rises (2.8s) */
  function openGiftBox() {
    if (!giftBox || giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) {
      return;
    }
    boxHasOpened = true;
    clearOpenTimers();
    giftBox.classList.remove("is-flipped");
    var openStage = document.getElementById("gift-box-open");
    if (openStage) openStage.setAttribute("aria-hidden", "false");

    if (reducedMotion) {
      finishOpen();
      return;
    }
    /* Decode the big open-box art first so the first frames never hitch on image decoding */
    /*
     * Start only once scrolling has settled and the art is decoded, then after two painted
     * frames — opening mid-scroll is what made the first half-second stutter.
     */
    Promise.all([decodeBoxImages(), waitForScrollIdle()]).then(function () {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          giftBox.classList.add("is-opening");
          window.setTimeout(burstSparkles, SPARKS_AT_MS);
          openAnimTimer = window.setTimeout(finishOpen, OPEN_SEQUENCE_MS);
        });
      });
    });
  }

  /*
   * Resolves once scrolling has really finished: the browser's `scrollend` event where
   * supported, otherwise 250ms with no scroll. A smooth scroll can pause mid-way, so a short
   * idle window alone is not enough. Never waits longer than 2s.
   */
  function waitForScrollIdle() {
    return new Promise(function (resolve) {
      var done = false;
      var idleTimer = null;
      var hasScrollEnd = "onscrollend" in window;
      function finish() {
        if (done) return;
        done = true;
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scrollend", onScrollEnd);
        window.clearTimeout(idleTimer);
        resolve();
      }
      function onScroll() {
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(finish, hasScrollEnd ? 600 : 250);
      }
      function onScrollEnd() {
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(finish, 80);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("scrollend", onScrollEnd);
      idleTimer = window.setTimeout(finish, 250);
      window.setTimeout(finish, 2000);
    });
  }

  function decodeBoxImages() {
    if (!giftBox) return Promise.resolve();
    var imgs = giftPack.querySelectorAll("img");
    var jobs = Array.prototype.map.call(imgs, function (img) {
      if (!img.decode) return Promise.resolve();
      return img.decode().catch(function () {});
    });
    /* Never wait more than 1.2s — start anyway on very slow connections */
    var cap = new Promise(function (resolve) {
      window.setTimeout(resolve, 1200);
    });
    return Promise.race([Promise.all(jobs), cap]);
  }

  var flipTimer = null;
  function flipPackageCard() {
    if (!giftBox || !giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) {
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
      }, 950);
    } else {
      giftBox.classList.toggle("is-flipped");
    }
    fitGiftBox();
  }

  fitGiftBox();
  window.addEventListener("resize", fitGiftBox);

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

  /* Explore Gifts → scroll to section 2 and play box-open animation */
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToEl(giftPack, "center");
      openGiftBox();
    });
  }

  /* Section in view → play opening animation once */
  if (giftPack && giftBox && "IntersectionObserver" in window) {
    var packObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !boxHasOpened) {
            openGiftBox();
          }
        });
      },
      { threshold: 0.42, rootMargin: "0px 0px -8% 0px" }
    );
    packObserver.observe(giftPack);
  }

  /* Click closed box → open */
  if (giftBox) {
    giftBox.addEventListener("click", function (e) {
      if (e.target.closest && (e.target.closest("#flip-package-card") || e.target.closest("#flip-package-card-back") || e.target.closest(".js-gift-flip"))) {
        return;
      }
      if (giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) return;
      openGiftBox();
    });

    giftBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        if (giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) return;
        e.preventDefault();
        openGiftBox();
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
      /* Figma shows the mandala mirrored (rotate-180 inside a flipped group) */
      gsap.set(mandalaImg, {
        scaleX: -1,
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

  function bootSteps() {
    if (window.gsap && window.ScrollTrigger) {
      initStepsScroll();
      forceHeroTop();
      return;
    }
    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      if (window.gsap && window.ScrollTrigger) {
        window.clearInterval(timer);
        initStepsScroll();
        forceHeroTop();
      } else if (tries > 40) {
        window.clearInterval(timer);
      }
    }, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSteps);
  } else {
    bootSteps();
  }

  window.addEventListener("load", function () {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (window.ScrollTrigger) {
        initStepsScroll();
        ScrollTrigger.refresh();
      }
    }, 200);
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
      festive: "CELEBRATE",
      messages: [
        "Because every milestone deserves a little love.",
        "A little gift to celebrate your special moments together.",
        "Here's to more beautiful memories together."
      ]
    },
    "just-because": {
      theme: "is-just-because",
      festive: "JUST BECAUSE",
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
    messages.forEach(function (msg) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "g-chip";
      btn.setAttribute("data-message", msg);
      btn.textContent = msg;
      chipsRoot.appendChild(btn);
    });
    bindChipClicks();
  }

  function setOccasion(key) {
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

  var form = document.getElementById("gift-form");
  var success = document.getElementById("gift-success");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      updatePreview();
      if (success) success.classList.add("is-visible");
    });
  }
})();
