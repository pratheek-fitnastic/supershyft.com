(function () {
  "use strict";

  /* Always land on the hero (first section) after reload — ignore restored scroll */
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
  var openRevealTimer = null;
  var LID_LIFT_MS = reducedMotion ? 40 : 580;
  var OPEN_SETTLE_MS = reducedMotion ? 80 : 1600;

  function clearOpenTimers() {
    if (openAnimTimer) {
      window.clearTimeout(openAnimTimer);
      openAnimTimer = null;
    }
    if (openRevealTimer) {
      window.clearTimeout(openRevealTimer);
      openRevealTimer = null;
    }
  }

  function closeGiftBox() {
    if (!giftBox) return;
    clearOpenTimers();
    giftBox.classList.remove("is-open", "is-opening", "is-flipped");
    giftBox.setAttribute("aria-expanded", "false");
    giftBox.setAttribute("aria-label", "Open gift box");
    giftBox.setAttribute("role", "button");
    giftBox.setAttribute("tabindex", "0");
    var openStage = document.getElementById("gift-box-open");
    if (openStage) openStage.setAttribute("aria-hidden", "true");
    var flipBtnEl = document.getElementById("flip-package-card");
    if (flipBtnEl) flipBtnEl.setAttribute("tabindex", "-1");
  }

  function openGiftBox() {
    if (!giftBox || giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) {
      return;
    }
    boxHasOpened = true;
    clearOpenTimers();
    giftBox.classList.remove("is-flipped");
    /* Stage 1: lid lift on closed box */
    giftBox.classList.add("is-opening");
    var openStage = document.getElementById("gift-box-open");
    if (openStage) openStage.setAttribute("aria-hidden", "false");

    /* Stage 2: crossfade to open shell + rising card */
    openRevealTimer = window.setTimeout(function () {
      giftBox.classList.add("is-open");
      openRevealTimer = null;
    }, LID_LIFT_MS);

    /* Stage 3: settle — flip CTA becomes interactive */
    openAnimTimer = window.setTimeout(function () {
      giftBox.classList.remove("is-opening");
      giftBox.setAttribute("aria-expanded", "true");
      giftBox.setAttribute("aria-label", "Gift box opened — explore the package");
      giftBox.removeAttribute("role");
      giftBox.removeAttribute("tabindex");
      var flipBtnEl = document.getElementById("flip-package-card");
      if (flipBtnEl) flipBtnEl.setAttribute("tabindex", "0");
      openAnimTimer = null;
    }, LID_LIFT_MS + OPEN_SETTLE_MS);
  }

  function flipPackageCard() {
    if (!giftBox || !giftBox.classList.contains("is-open") || giftBox.classList.contains("is-opening")) {
      return;
    }
    giftBox.classList.toggle("is-flipped");
  }

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
      window.setTimeout(function () {
        openGiftBox();
      }, reducedMotion ? 50 : 450);
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
      if (e.target.closest && (e.target.closest("#flip-package-card") || e.target.closest("#flip-package-card-back"))) {
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
