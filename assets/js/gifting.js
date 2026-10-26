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
  var lidClosed = document.getElementById("gift-lid-closed");
  var lidOpen = document.getElementById("gift-lid-open");
  var giftPackage = document.getElementById("gift-package");
  var exploreBtn = document.getElementById("explore-gifts");
  var bookBtn = document.getElementById("book-the-gift");
  var stepsRoot = document.getElementById("gift-steps");
  var personalizeSec = document.getElementById("gift-personalize");
  var stepsPin = document.getElementById("gift-steps-pin");
  var mandalaImg = document.getElementById("steps-mandala");
  var mandalaWrap = document.getElementById("steps-mandala-wrap");
  var stepPanels = document.querySelectorAll(".g-steps__panel");

  /* Scale pack title/CTA to the 1440 × 1010 Figma frame. */
  var lastDocH = 0;
  var lastFitWidth = 0;
  var mobileScaleLocked = false;
  var mobileLayoutH = 0;

  function isMobilePack() {
    return window.matchMedia("(max-width: 767.98px)").matches;
  }

  function layoutWidth() {
    return document.documentElement.clientWidth || window.innerWidth;
  }

  /* Phone URL bar must not change --g-pack-s. Prefer 100lvh (large viewport) once. */
  function layoutHeight() {
    if (!isMobilePack()) return window.innerHeight;
    if (mobileLayoutH) return mobileLayoutH;
    var lvh = 0;
    try {
      var probe = document.createElement("div");
      probe.style.cssText = "position:fixed;left:0;top:0;height:100lvh;width:0;visibility:hidden;pointer-events:none";
      document.documentElement.appendChild(probe);
      lvh = probe.offsetHeight;
      probe.remove();
    } catch (e) {}
    mobileLayoutH = Math.max(window.innerHeight, lvh || 0);
    return mobileLayoutH;
  }

  function fitGiftBox(force) {
    if (!giftPack) return;
    var w = layoutWidth();
    if (isMobilePack() && mobileScaleLocked && !force && Math.abs(w - lastFitWidth) <= 2) {
      return;
    }
    var inner = giftPack.querySelector(".g-pack__inner");
    var avail = inner ? inner.clientWidth : giftPack.clientWidth;
    var s = Math.min(1, avail / 1344);
    var header = document.getElementById("header");
    var headerH = header ? header.getBoundingClientRect().height : 80;
    var viewH = layoutHeight();
    if (window.matchMedia("(min-width: 992px)").matches) {
      var frame = viewH - headerH - viewH * 0.04 - 12;
      s = Math.max(0.45, Math.min(s, frame / 1000));
    } else if (isMobilePack()) {
      var title = giftPack.querySelector(".g-pack__title");
      var sub = giftPack.querySelector(".g-pack__sub");
      var cta = giftPack.querySelector(".g-pack__cta");
      var titleH = title ? title.offsetHeight : 72;
      var subH = sub ? sub.offsetHeight : 44;
      var ctaH = cta ? cta.offsetHeight : 48;
      var padTop = Math.max(72, Math.min(96, viewH * 0.12));
      var padBot = Math.max(24, Math.min(48, viewH * 0.06));
      var budget = viewH - headerH - titleH - subH - ctaH - padTop - padBot - 20;
      /* Opened card hangs ~0.70 of box width above the tray; tray is ~0.48 wide */
      s = budget > 80 ? Math.max(0.52, Math.min(1, budget / (avail * 1.22))) : 0.62;
    }
    giftPack.style.setProperty("--g-pack-s", s.toFixed(5));
    if (giftPackage) {
      /* Mobile card artboard is Figma 856:11822 (322 × 415); desktop is 889 × 391 */
      var isMobileCard = isMobilePack();
      var cardS = isMobileCard
        ? Math.min(giftPackage.clientWidth / 322, giftPackage.clientHeight / 415)
        : Math.min(giftPackage.clientWidth / 889, giftPackage.clientHeight / 391);
      var cardSValue = cardS > 0 ? cardS.toFixed(5) : "1";
      giftPackage.style.setProperty("--g-card-s", cardSValue);
      giftPackage.style.setProperty("--g-back-s", cardSValue);
    }
    lastFitWidth = w;
    var newH = document.documentElement.scrollHeight;
    if (window.ScrollTrigger && newH !== lastDocH) {
      lastDocH = newH;
      if (!isMobilePack() || force) {
        window.requestAnimationFrame(function () {
          ScrollTrigger.refresh();
        });
      }
    }
  }

  function lockMobileScale() {
    fitGiftBox(true);
    if (isMobilePack()) mobileScaleLocked = true;
  }

  fitGiftBox();
  window.addEventListener("resize", function () {
    fitGiftBox();
  });

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
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      syncCtaSize();
      lockMobileScale();
    });
  }

  window.addEventListener("load", lockMobileScale);

  function whenGiftImagesReady(cb) {
    var imgs = document.querySelectorAll("#gift-box img, #gift-package img");
    var pending = 0;
    function done() {
      pending -= 1;
      if (pending <= 0) cb();
    }
    imgs.forEach(function (img) {
      if (img.complete) return;
      pending += 1;
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    });
    if (pending === 0) cb();
  }
  whenGiftImagesReady(function () {
    lockMobileScale();
    if (window.ScrollTrigger && !isMobilePack()) ScrollTrigger.refresh();
  });

  function scrollToEl(el, block) {
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: block || "start"
    });
  }

  /* Lid hinge: 2D scaleY only — no perspective, so the lid cannot grow. */
  var boxLidTl = null;

  function killBoxLidScroll() {
    if (window.ScrollTrigger) {
      ScrollTrigger.getAll().forEach(function (t) {
        if (t.vars && t.vars.id === "gifting-box") t.kill();
      });
    }
    if (boxLidTl) {
      boxLidTl.kill();
      boxLidTl = null;
    }
  }

  function initBoxLidScroll() {
    if (!giftPack || !lidClosed || !lidOpen) return;
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
    killBoxLidScroll();

    function cardHiddenY() {
      return giftPackage ? giftPackage.offsetHeight * 1.12 : 0;
    }
    function cardShownY() {
      return 0;
    }

    gsap.set(lidClosed, { scaleY: 1, transformOrigin: "50% 0%", force3D: false });
    gsap.set(lidOpen, { scaleY: 0, transformOrigin: "50% 100%", force3D: false });
    if (giftPackage) {
      gsap.set(giftPackage, { y: cardHiddenY, yPercent: 0, force3D: false });
    }

    if (reducedMotion) {
      gsap.set(lidClosed, { scaleY: 0 });
      gsap.set(lidOpen, { scaleY: 1 });
      if (giftPackage) gsap.set(giftPackage, { y: cardShownY, yPercent: 0 });
      if (giftBox) giftBox.classList.add("is-open");
      return;
    }

    boxLidTl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    boxLidTl.to(lidClosed, { scaleY: 0, duration: 1 }, 0);
    boxLidTl.to(lidOpen, { scaleY: 1, duration: 1 }, 1);
    if (giftPackage) {
      boxLidTl.fromTo(
        giftPackage,
        { y: cardHiddenY, yPercent: 0 },
        { y: cardShownY, yPercent: 0, duration: 1.35 },
        2
      );
    }

    ScrollTrigger.create({
      id: "gifting-box",
      trigger: giftPack,
      animation: boxLidTl,
      /* Pin while the block is still in the middle of the screen, below the header */
      start: function () {
        var header = document.getElementById("header");
        var headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 80;
        var air = Math.round(window.innerHeight * 0.04);
        return "top " + (headerH + air) + "px";
      },
      end: function () {
        return "+=" + Math.round(window.innerHeight * 2.4);
      },
      pin: giftPack,
      pinSpacing: true,
      scrub: 0.55,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: function (self) {
        if (!giftBox) return;
        var opened = self.progress > 0.97;
        giftBox.classList.toggle("is-open", opened);
        if (!opened) giftBox.classList.remove("is-flipped", "is-flat");
        if (opened && giftPackage && window.gsap) {
          gsap.set(giftPackage, { y: 0, yPercent: 0 });
        }
      }
    });
    syncOpenCard();
  }

  function syncOpenCard() {
    if (!giftBox || !giftPackage || !window.ScrollTrigger) return;
    var st = ScrollTrigger.getById("gifting-box");
    if (!st) return;
    if (st.progress > 0.97) {
      giftBox.classList.add("is-open");
      if (window.gsap) gsap.set(giftPackage, { y: 0, yPercent: 0 });
    }
  }

  function bindPackageFlip(id) {
    var el = document.getElementById(id);
    if (!el || !giftBox) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!giftBox.classList.contains("is-open")) return;
      unflattenCard();
      giftBox.classList.toggle("is-flipped");
      if (giftBox.classList.contains("is-flipped")) scheduleFlatten();
      else {
        clearTimeout(flattenTimer);
        giftBox.classList.remove("is-flat");
      }
    });
  }

  /*
   * A card left turned through 3D (rotateY 180° twice) is composited as a 3D layer, which blurs
   * its text on phones. Once the flip ends, .is-flat lays the back face out flat (same look).
   * Before flipping back, restore the 3D pose without a transition so the flip still animates.
   * Mobile browsers often skip transitionend — a timeout still flattens so the back stays readable.
   */
  var cardFlip = giftBox ? giftBox.querySelector(".g-box__card-flip") : null;
  var flattenTimer = null;
  var FLIP_MS = 900;
  function flattenIfNeeded() {
    if (giftBox && giftBox.classList.contains("is-flipped")) giftBox.classList.add("is-flat");
  }
  function scheduleFlatten() {
    clearTimeout(flattenTimer);
    var mobile = window.matchMedia("(max-width: 767.98px)").matches;
    flattenTimer = setTimeout(flattenIfNeeded, mobile ? 520 : FLIP_MS);
  }
  function unflattenCard() {
    clearTimeout(flattenTimer);
    if (!cardFlip || !giftBox.classList.contains("is-flat")) return;
    cardFlip.style.transition = "none";
    giftBox.classList.remove("is-flat");
    void cardFlip.offsetWidth;
    cardFlip.style.transition = "";
  }
  if (cardFlip) {
    function onFlipEnd(e) {
      if (e.target !== cardFlip) return;
      var prop = e.propertyName || "";
      if (prop && prop.indexOf("transform") === -1) return;
      clearTimeout(flattenTimer);
      flattenIfNeeded();
    }
    cardFlip.addEventListener("transitionend", onFlipEnd);
    cardFlip.addEventListener("webkitTransitionEnd", onFlipEnd);
  }
  bindPackageFlip("flip-package-card");
  bindPackageFlip("flip-package-card-back");

  /* Explore Gifts → the framed start pose (lid still closed) */
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      var st = window.ScrollTrigger && ScrollTrigger.getById("gifting-box");
      if (st) {
        window.scrollTo({
          top: st.start,
          behavior: reducedMotion ? "auto" : "smooth"
        });
        return;
      }
      scrollToEl(giftPack, "center");
    });
  }

  /* Book the Gift → section 4 booking form (jump past box/steps pins) */
  if (bookBtn) {
    bookBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!personalizeSec) return;
      var header = document.getElementById("header");
      var headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 80;
      personalizeSec.style.scrollMarginTop = headerH + "px";
      var y = personalizeSec.getBoundingClientRect().top + window.pageYOffset - headerH;
      var stepsST = window.ScrollTrigger && ScrollTrigger.getById("gifting-steps");
      if (stepsST && typeof stepsST.end === "number") {
        y = Math.max(y, stepsST.end + 8);
      }
      window.scrollTo(0, Math.max(0, y));
      window.requestAnimationFrame(function () {
        var y2 = personalizeSec.getBoundingClientRect().top + window.pageYOffset - headerH;
        window.scrollTo(0, Math.max(0, y2));
      });
    });
  }

  /* ===== Four steps: GSAP pin + one scroll gesture per step (Figma 856:10815–10897) ===== */
  var STEP_COUNT = 4;
  var STEP_LAST = STEP_COUNT - 1;
  var stepsST = null;
  var stepsCleanup = null;
  var currentStep = 0;
  var stepLock = false;
  var stepLockTimer = 0;
  var touchStartY = 0;

  function setActiveStep(index) {
    stepPanels.forEach(function (panel, i) {
      panel.classList.toggle("is-active", i === index);
      panel.classList.toggle("is-past", i < index);
    });
  }

  function rotateMandala(index) {
    if (!mandalaImg) return;
    var deg = index * 90;
    if (reducedMotion) {
      gsap.set(mandalaImg, { rotation: deg });
      return;
    }
    gsap.to(mandalaImg, {
      rotation: deg,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function stepScrollY(index) {
    if (!stepsST) return window.scrollY;
    return stepsST.start + (stepsST.end - stepsST.start) * (index / STEP_LAST);
  }

  function goToStep(index) {
    index = Math.max(0, Math.min(STEP_LAST, index));
    if (index === currentStep) return;
    currentStep = index;
    setActiveStep(index);
    rotateMandala(index);
    stepLock = true;
    window.clearTimeout(stepLockTimer);
    if (stepsST) window.scrollTo(0, stepScrollY(index));
    stepLockTimer = window.setTimeout(function () {
      stepLock = false;
    }, reducedMotion ? 80 : 520);
  }

  function stepsInRange() {
    if (!stepsST) return false;
    if (stepsST.isActive) return true;
    var y = window.scrollY;
    return y >= stepsST.start - 2 && y <= stepsST.end + 2;
  }

  function handleStepGesture(goingDown) {
    if (!stepsInRange()) return false;
    if (stepLock) return true;
    if (goingDown && currentStep < STEP_LAST) {
      goToStep(currentStep + 1);
      return true;
    }
    if (!goingDown && currentStep > 0) {
      goToStep(currentStep - 1);
      return true;
    }
    return false;
  }

  function initStepsScroll() {
    if (!stepsRoot || !stepsPin || !window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    if (stepsCleanup) {
      stepsCleanup();
      stepsCleanup = null;
    }

    ScrollTrigger.getAll().forEach(function (t) {
      if (t.vars && t.vars.id === "gifting-steps") t.kill();
    });
    stepsST = null;
    currentStep = 0;
    stepLock = false;
    window.clearTimeout(stepLockTimer);

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

    stepsST = ScrollTrigger.create({
      id: "gifting-steps",
      trigger: stepsRoot,
      start: "top top",
      end: function () {
        return "+=" + Math.round(window.innerHeight * STEP_LAST);
      },
      pin: stepsPin,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: function () {
        currentStep = 0;
        setActiveStep(0);
        rotateMandala(0);
        stepLock = true;
        window.clearTimeout(stepLockTimer);
        stepLockTimer = window.setTimeout(function () {
          stepLock = false;
        }, 280);
      },
      onEnterBack: function () {
        currentStep = STEP_LAST;
        setActiveStep(STEP_LAST);
        rotateMandala(STEP_LAST);
        stepLock = true;
        window.clearTimeout(stepLockTimer);
        stepLockTimer = window.setTimeout(function () {
          stepLock = false;
        }, 280);
      },
      onUpdate: function (self) {
        if (stepLock) return;
        var idx = Math.min(STEP_LAST, Math.round(self.progress * STEP_LAST));
        if (idx === currentStep) return;
        currentStep = idx;
        setActiveStep(idx);
        rotateMandala(idx);
      }
    });

    function onWheel(e) {
      if (!stepsInRange()) return;
      if (Math.abs(e.deltaY) < 4) return;
      if (handleStepGesture(e.deltaY > 0)) e.preventDefault();
    }

    function onTouchStart(e) {
      if (!e.touches || !e.touches.length) return;
      touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
      if (!stepsInRange() || !e.touches || !e.touches.length) return;
      var dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) < 28) return;
      if (handleStepGesture(dy > 0)) {
        e.preventDefault();
        touchStartY = e.touches[0].clientY;
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    stepsCleanup = function () {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.clearTimeout(stepLockTimer);
      stepLock = false;
    };
  }

  function bootGiftingMotion() {
    function start() {
      initBoxLidScroll();
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
    syncOpenCard();
  });

  var resizeTimer;
  var lastPinWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      var w = window.innerWidth;
      var widthChanged = Math.abs(w - lastPinWidth) > 2;
      lastPinWidth = w;
      if (!window.ScrollTrigger) return;
      /* Height-only resizes (phone URL bar) must not remasure pins — that bounces section 4. */
      if (!widthChanged) return;
      initBoxLidScroll();
      initStepsScroll();
      ScrollTrigger.refresh();
      syncOpenCard();
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
  var messageCount = document.getElementById("gift-message-count");
  var recipientPhone = document.getElementById("recipient-phone");
  var yourPhone = document.getElementById("your-phone");
  var recipientEmail = document.getElementById("recipient-email");
  var yourEmail = document.getElementById("your-email");
  var MESSAGE_MAX = 60;
  var PHONE_MAX = 10;
  var AGE_MAX = 2;
  var PINCODE_MAX = 6;
  var EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function clampMessage(value) {
    return String(value || "").slice(0, MESSAGE_MAX);
  }

  function clampPhone(value) {
    return String(value || "").replace(/\D/g, "").slice(0, PHONE_MAX);
  }

  [recipientPhone, yourPhone].forEach(function (el) {
    if (!el) return;
    el.addEventListener("input", function () {
      var next = clampPhone(el.value);
      if (el.value !== next) el.value = next;
    });
    el.addEventListener("paste", function (e) {
      e.preventDefault();
      var text = "";
      if (e.clipboardData) text = e.clipboardData.getData("text");
      else if (window.clipboardData) text = window.clipboardData.getData("Text");
      el.value = clampPhone(text);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  function isValidGiftEmail(value) {
    return EMAIL_RE.test(String(value || "").trim());
  }

  function setEmailError(input, show) {
    if (!input) return;
    var errorEl = document.getElementById(input.id + "-error");
    input.classList.toggle("is-invalid", !!show);
    input.setCustomValidity(show ? "Enter a valid email address." : "");
    if (errorEl) errorEl.hidden = !show;
  }

  function validateEmailField(input, onBlur) {
    if (!input) return true;
    var value = String(input.value || "").trim();
    if (!value) {
      setEmailError(input, false);
      return !onBlur;
    }
    var ok = isValidGiftEmail(value);
    setEmailError(input, !ok);
    return ok;
  }

  [recipientEmail, yourEmail].forEach(function (el) {
    if (!el) return;
    el.addEventListener("blur", function () {
      validateEmailField(el, true);
    });
    el.addEventListener("input", function () {
      if (!el.classList.contains("is-invalid")) return;
      validateEmailField(el, false);
    });
  });

  function updateMessageCount() {
    if (!messageCount) return;
    var length = messageInput ? messageInput.value.length : 0;
    messageCount.textContent = length + "/" + MESSAGE_MAX;
    messageCount.hidden = length === 0;
  }

  function fitMessageInput() {
    if (!messageInput) return;
    if (!window.matchMedia("(max-width: 1279.98px)").matches) {
      messageInput.style.height = "";
      return;
    }
    messageInput.style.height = "auto";
    messageInput.style.height = Math.max(messageInput.scrollHeight, 44) + "px";
  }

  if (messageInput) {
    messageInput.addEventListener("input", function () {
      var next = clampMessage(messageInput.value);
      if (messageInput.value !== next) messageInput.value = next;
      updateMessageCount();
      fitMessageInput();
    });
  }
  updateMessageCount();
  fitMessageInput();
  window.addEventListener("resize", function () {
    window.clearTimeout(fitMessageInput.t);
    fitMessageInput.t = window.setTimeout(fitMessageInput, 150);
  });

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
          messageInput.value = clampMessage(chip.getAttribute("data-message") || "");
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
  var DISCOUNT_CODES = {
    diwali: "SUPERDIWALI",
    birthday: "HAPPYBIRTHDAY",
    "just-because": "JUSTBECAUSE",
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
  var bookClose = document.getElementById("gift-book-close");
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
  var otpClose = document.getElementById("gift-otp-close");
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
  var payRetry = document.getElementById("gift-pay-retry");
  var payChange = document.getElementById("gift-pay-change");
  var formInner = form ? form.parentElement : null;
  var bookScrim = document.getElementById("gift-book-scrim");
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
      syncBookContinue();
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
    syncBookContinue();
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
    placeBook();
    revealBookSchedule();

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
          setBookError("This area is not serviceable.");
          placeBook();
          revealBookSchedule();
          syncBookContinue();
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
        revealBookSchedule();
        syncBookContinue();
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
        revealBookSchedule();
        syncBookContinue();
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
      syncBookContinue();
      return;
    }
    placeBook();
    revealBookSchedule();
    serviceabilityTimer = setTimeout(function () {
      serviceabilityTimer = null;
      checkServiceability();
    }, SERVICEABILITY_DEBOUNCE_MS);
  }

  function fetchAvailableSlots() {
    var slotDate = getSelectedDate();
    if (!slotDate || !geoState || !geoState.serviceable) return;
    var body = book && book.querySelector(".g-book__body");
    var savedScroll = body ? body.scrollTop : 0;

    if (!getSelectedGender()) {
      if (bookSlots) {
        bookSlots.innerHTML = "";
        bookSlots.removeAttribute("data-api");
      }
      lastSlotPayload = null;
      setScheduleStatus("");
      setBookError("Please select the recipient's gender.");
      placeBook();
      syncBookContinue();
      return;
    }

    abortSlots();
    var gen = (slotsGen += 1);
    setBookError("");
    setScheduleStatus("");
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
        restoreBookBodyScroll(body, savedScroll);
        syncBookContinue();
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
        restoreBookBodyScroll(body, savedScroll);
        syncBookContinue();
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

  function bookDetailsComplete() {
    if (!book) return false;
    var gender = book.querySelector("input[name='book-gender']:checked");
    var date = book.querySelector("input[name='book-date']:checked");
    var slot = book.querySelector("input[name='book-slot']:checked");
    var ageOk = bookAge && bookAge.checkValidity();
    var addrOk = bookAddress && bookAddress.checkValidity();
    var pinOk = bookPincode && bookPincode.checkValidity();
    var cityOk = bookCity && bookCity.checkValidity();
    return !!(
      gender &&
      ageOk &&
      addrOk &&
      pinOk &&
      cityOk &&
      geoState &&
      geoState.serviceable &&
      date &&
      slot
    );
  }

  function syncBookContinue() {
    if (!bookContinue) return;
    if (bookContinue.textContent === "Please wait…") return;
    bookContinue.disabled = !bookDetailsComplete();
  }

  function setContinueLoading(loading) {
    if (!bookContinue) return;
    if (loading) {
      bookContinue.disabled = true;
      bookContinue.textContent = "Please wait…";
      return;
    }
    bookContinue.textContent = "Continue";
    syncBookContinue();
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

  var overlayScrollY = 0;
  var overlayLocked = false;

  function lockPageScroll() {
    if (overlayLocked) return;
    overlayLocked = true;
    overlayScrollY = window.scrollY || window.pageYOffset || 0;
    document.documentElement.classList.add("g-overlay-open");
    document.body.style.top = -overlayScrollY + "px";
  }

  function unlockPageScroll() {
    if (!overlayLocked) return;
    overlayLocked = false;
    document.documentElement.classList.remove("g-overlay-open");
    document.body.style.top = "";
    window.scrollTo(0, overlayScrollY);
  }

  function isMobileOverlay() {
    return window.matchMedia("(max-width: 991.98px)").matches;
  }

  function viewportHeight() {
    if (window.visualViewport && window.visualViewport.height) {
      return window.visualViewport.height;
    }
    return window.innerHeight;
  }

  function syncBookScrim() {
    if (!bookScrim) return;
    var open = !!activeOverlay();
    bookScrim.hidden = !open;
    bookScrim.classList.toggle("is-visible", open);
    bookScrim.setAttribute("aria-hidden", open ? "false" : "true");
  }

  /* Pin the visible glass panel in the current viewport so Gift It / OTP
   * do not jump the page. Figma's 15px-above-form offset is used when the
   * form top is already on screen. Mobile uses position:fixed, so top is
   * viewport-relative. */
  var holdBookBodyScroll = false;

  function restoreBookBodyScroll(body, savedScroll) {
    if (!body || holdBookBodyScroll) return;
    body.scrollTop = savedScroll;
    requestAnimationFrame(function () {
      if (holdBookBodyScroll) return;
      body.scrollTop = savedScroll;
    });
  }

  function placeBook() {
    var panel = activeOverlay();
    if (!panel || !form || !formInner) return;
    var body = panel.querySelector(".g-book__body");
    var savedScroll = body ? body.scrollTop : 0;
    panel.style.height = "";
    panel.style.maxHeight = "";
    var header = document.querySelector(".bs-header");
    var headerH = header ? header.getBoundingClientRect().height : 80;
    var gap = 16;
    var minTopInView = headerH + gap;

    if (isMobileOverlay()) {
      panel.style.setProperty("--g-book-top", Math.round(minTopInView) + "px");
      var mobileMaxH = Math.max(240, Math.round(viewportHeight() - minTopInView - gap));
      panel.style.maxHeight = mobileMaxH + "px";
      panel.style.height = mobileMaxH + "px";
      restoreBookBodyScroll(body, savedScroll);
      return;
    }

    var innerRect = formInner.getBoundingClientRect();
    var figTop = form.offsetTop - 15;
    var figTopInView = innerRect.top + figTop;
    var top = figTopInView >= minTopInView ? figTop : minTopInView - innerRect.top;
    if (top < 0) top = 0;
    panel.style.setProperty("--g-book-top", Math.round(top) + "px");
    var panelTopInView = innerRect.top + top;
    var desktopMaxH = Math.max(240, Math.round(viewportHeight() - panelTopInView - gap));
    panel.style.maxHeight = desktopMaxH + "px";
    panel.style.height = desktopMaxH + "px";
    var usedH = desktopMaxH;
    var extra =
      panel.offsetTop + usedH - (form.offsetTop + form.offsetHeight);
    if (extra > 0) {
      var current = parseFloat(formInner.style.paddingBottom) || 0;
      if (extra > current) formInner.style.paddingBottom = extra + "px";
    }
    restoreBookBodyScroll(body, savedScroll);
  }

  function hidePanel(panel) {
    if (!panel) return;
    panel.classList.remove("is-visible");
    panel.hidden = true;
    panel.style.height = "";
    panel.style.maxHeight = "";
  }

  function showPanel(panel) {
    if (!panel) return;
    panel.hidden = false;
    lockPageScroll();
    syncBookScrim();
    placeBook();
    void panel.offsetWidth;
    panel.classList.add("is-visible");
  }

  function revealBookSchedule() {
    var target = scheduleGroup;
    if (!target) return;
    var body = book && book.querySelector(".g-book__body");
    var heading = target.querySelector(".g-book__heading") || target;
    holdBookBodyScroll = true;
    function apply(smooth) {
      if (!body) {
        heading.scrollIntoView({
          behavior: smooth && !reducedMotion ? "smooth" : "auto",
          block: "start",
        });
        return;
      }
      var delta = heading.getBoundingClientRect().top - body.getBoundingClientRect().top - 8;
      if (Math.abs(delta) < 2) return;
      var next = body.scrollTop + delta;
      if (smooth && !reducedMotion && typeof body.scrollTo === "function") {
        body.scrollTo({ top: next, behavior: "smooth" });
      } else {
        body.scrollTop = next;
      }
    }
    apply(false);
    requestAnimationFrame(function () {
      apply(false);
      requestAnimationFrame(function () {
        apply(!reducedMotion);
        holdBookBodyScroll = false;
      });
    });
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
    [book, otpPanel, paySuccess, payFailed].forEach(function (p) {
      if (p) {
        p.style.height = "";
        p.style.maxHeight = "";
      }
    });
    unlockPageScroll();
    syncBookScrim();
  }

  function openBook() {
    if (!book) return;
    hidePanel(otpPanel);
    hidePanel(paySuccess);
    hidePanel(payFailed);
    resetBookingApiState();
    lockFormUnderOverlay();
    showPanel(book);
    syncBookContinue();
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
    if (submit) submit.focus({ preventScroll: true });
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
      discount_code: getDiscountCode() || null,
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

  function confirmPaymentSucceeded(data) {
    return data.payment_verified === true || data.payment_verified === "true";
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
      var emailsOk = validateEmailField(recipientEmail, true) && validateEmailField(yourEmail, true);
      if (!emailsOk || !form.checkValidity()) {
        form.reportValidity();
        return;
      }
      updatePreview();
      openBook();
    });
  }

  if (bookBack) bookBack.addEventListener("click", closeBook);
  if (bookClose) bookClose.addEventListener("click", closeBook);
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
  if (otpClose) otpClose.addEventListener("click", closeBook);
  if (otpVerify) otpVerify.addEventListener("click", verifyOtpAndPay);
  if (otpResend) {
    otpResend.addEventListener("click", function () {
      if (otpResend.disabled) return;
      resendOtp();
    });
  }
  if (paySuccessClose) paySuccessClose.addEventListener("click", closeBook);
  if (payFailedClose) payFailedClose.addEventListener("click", closeBook);
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
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", function () {
      if (activeOverlay()) placeBook();
    });
  }

  if (book) {
    book.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeBook();
    });

    book.addEventListener("input", function (e) {
      var t = e.target;
      if (t && t.classList) t.classList.remove("is-invalid");
      if (!t) return;
      if (t.id === "book-age") {
        var age = String(t.value || "").replace(/\D/g, "").slice(0, AGE_MAX);
        if (t.value !== age) t.value = age;
        syncBookContinue();
        return;
      }
      if (t.id === "book-address" || t.id === "book-city" || t.id === "book-pincode") {
        if (t.id === "book-pincode") {
          var pin = String(t.value || "").replace(/\D/g, "").slice(0, PINCODE_MAX);
          if (t.value !== pin) t.value = pin;
          maybeAutofillCity().then(function () {
            scheduleServiceabilityCheck();
            syncBookContinue();
          });
          syncBookContinue();
          return;
        }
        scheduleServiceabilityCheck();
      }
      syncBookContinue();
    });

    book.addEventListener("change", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.name === "book-date") {
        fetchAvailableSlots();
        syncBookContinue();
        return;
      }
      if (t.name === "book-gender") {
        if (getSelectedDate() && geoState && geoState.serviceable) {
          fetchAvailableSlots();
        }
        syncBookContinue();
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
      syncBookContinue();
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
        if (missing.length) missing[0].focus({ preventScroll: true });
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
