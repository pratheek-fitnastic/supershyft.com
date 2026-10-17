(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var giftPack = document.getElementById("gift-pack");
  var giftBox = document.getElementById("gift-box");
  var exploreBtn = document.getElementById("explore-gifts");
  var flipCardBtn = document.getElementById("flip-package-card");
  var sequenceRunning = false;
  var boxOpened = false;
  var sequenceToken = 0;
  var cardEnableTimer = null;

  function sleep(ms, token) {
    return new Promise(function (resolve) {
      window.setTimeout(function () {
        resolve(token === sequenceToken);
      }, ms);
    });
  }

  function setCardHitEnabled(enabled) {
    if (!flipCardBtn) return;
    flipCardBtn.tabIndex = enabled ? 0 : -1;
    flipCardBtn.setAttribute("aria-hidden", enabled ? "false" : "true");
  }

  function openGiftBox() {
    if (!giftBox) return;
    boxOpened = true;
    giftBox.classList.add("is-open");
    if (cardEnableTimer) window.clearTimeout(cardEnableTimer);
    /* Card clickable after open + card fade-in (~2.4s open + 1.4s delay + fade) */
    cardEnableTimer = window.setTimeout(
      function () {
        setCardHitEnabled(true);
      },
      reducedMotion ? 80 : 3200
    );
  }

  function scrollToGiftPack() {
    if (!giftPack) return;
    giftPack.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "center"
    });
  }

  /**
   * Video-like sequence:
   * 1) smooth scroll to section 2
   * 2) hold closed box
   * 3) slowly open box
   * 4) card fades in (CSS)
   */
  async function playGiftRevealSequence(options) {
    options = options || {};
    if (!giftPack || !giftBox) return;

    sequenceRunning = true;
    var token = ++sequenceToken;

    var heroHold = options.heroHold != null ? options.heroHold : 0;
    var scrollSettle = reducedMotion ? 50 : options.scrollSettle != null ? options.scrollSettle : 900;
    var closedHold = reducedMotion ? 80 : options.closedHold != null ? options.closedHold : 1100;

    try {
      if (heroHold > 0) {
        if (!(await sleep(heroHold, token))) return;
      }

      /* Always start from closed so the open feels cinematic */
      if (cardEnableTimer) window.clearTimeout(cardEnableTimer);
      giftBox.classList.remove("is-open", "is-flipped");
      boxOpened = false;
      setCardHitEnabled(false);

      if (!(await sleep(reducedMotion ? 40 : 80, token))) return;

      scrollToGiftPack();
      if (!(await sleep(scrollSettle, token))) return;

      /* Closed box visible, then slowly open → card reveals via CSS */
      if (!(await sleep(closedHold, token))) return;
      openGiftBox();
    } finally {
      if (token === sequenceToken) sequenceRunning = false;
    }
  }

  /* Page open → brief hero beat, then auto-scroll + open animation */
  function startPageEntryAnimation() {
    /* Skip if user deep-linked mid-page */
    if (window.location.hash && window.location.hash !== "#gifting-hero") {
      return;
    }
    /* If already scrolled past hero (restore), still open when pack is near */
    var scrollY = window.scrollY || window.pageYOffset || 0;
    if (scrollY > 120) {
      playGiftRevealSequence({ heroHold: 0, scrollSettle: 400, closedHold: 900 });
      return;
    }
    playGiftRevealSequence({
      heroHold: reducedMotion ? 100 : 700,
      scrollSettle: 1000,
      closedHold: 1200
    });
  }

  if (document.readyState === "complete") {
    startPageEntryAnimation();
  } else {
    window.addEventListener("load", startPageEntryAnimation, { once: true });
  }

  /* Explore Gifts → same scroll + open sequence */
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function (e) {
      e.preventDefault();
      playGiftRevealSequence({
        heroHold: 0,
        scrollSettle: 950,
        closedHold: 1100
      });
    });
  }

  /* Click only the card to flip — box shell stays still */
  if (flipCardBtn) {
    flipCardBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!giftBox || !giftBox.classList.contains("is-open")) return;
      giftBox.classList.toggle("is-flipped");
    });
  }

  /* Book the Gift → scroll through four steps */
  var bookBtn = document.getElementById("book-the-gift");
  var stepsRoot = document.getElementById("gift-steps");
  var tourRunning = false;

  if (bookBtn) {
    bookBtn.addEventListener("click", async function (e) {
      e.preventDefault();
      if (tourRunning) return;
      tourRunning = true;
      if (!boxOpened) openGiftBox();
      if (stepsRoot) stepsRoot.classList.add("is-touring");

      var steps = ["gift-step-1", "gift-step-2", "gift-step-3", "gift-step-4"];
      var pause = reducedMotion ? 400 : 2200;

      for (var i = 0; i < steps.length; i++) {
        var el = document.getElementById(steps[i]);
        if (el) {
          el.scrollIntoView({
            behavior: reducedMotion ? "auto" : "smooth",
            block: "center"
          });
          await sleep(pause);
        }
      }

      var formSec = document.getElementById("gift-personalize");
      if (formSec) {
        formSec.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start"
        });
      }
      if (stepsRoot) stepsRoot.classList.remove("is-touring");
      tourRunning = false;
    });
  }

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
        "Because I want you around for every celebration.",
        "A little gift for more moments together.",
        "For many more Diwalis together."
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
    /* Envelope stays; only inner card art swaps via CSS theme class */
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
