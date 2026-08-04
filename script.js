// Register GSAP plugins only when all plugin globals are available.
if (
  window.gsap &&
  window.SplitText &&
  window.ScrollTrigger &&
  window.ScrollSmoother &&
  window.ScrollToPlugin
) {
  gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother, ScrollToPlugin);
}

document.addEventListener("DOMContentLoaded", () => {
  const removeWebflowBadge = () => {
    document.querySelectorAll(".w-webflow-badge").forEach((badge) => {
      badge.remove();
    });
  };

  removeWebflowBadge();

  const badgeObserver = new MutationObserver(() => {
    removeWebflowBadge();
  });

  if (document.body) {
    badgeObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  const previewVideo = document.querySelector(".preview-video");
  const popup = document.querySelector("#videoPopup");
  const wistiaIframe = document.querySelector("#wistiaPopupVideo");
  const closeBtn = document.querySelector("#videoClose");
  const popupBg = document.querySelector(".video-popup-bg");

  if (previewVideo && popup && wistiaIframe && closeBtn && popupBg) {
    const wistiaVideoId = "3jdoaoaek5";
    const wistiaPopupSrc =
      "https://fast.wistia.net/embed/iframe/" +
      wistiaVideoId +
      "?autoplay=1&muted=0&controlsVisibleOnLoad=1";

    previewVideo.addEventListener("click", () => {
      popup.classList.add("is-open");
      document.body.classList.add("video-popup-open");
      wistiaIframe.src = wistiaPopupSrc;
    });

    const closePopup = () => {
      popup.classList.remove("is-open");
      document.body.classList.remove("video-popup-open");
      wistiaIframe.src = "";
    };

    closeBtn.addEventListener("click", closePopup);
    popupBg.addEventListener("click", closePopup);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePopup();
    });
  }

  const phoneInput = document.getElementById("whatsapp_no");
  const form = document.getElementById("contact-form");
  const validationMessage = document.getElementById("validationMessage");

  if (phoneInput && form && validationMessage) {
    form.addEventListener("submit", (event) => {
      const regex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
      if (!regex.test(phoneInput.value)) {
        event.preventDefault();
        validationMessage.textContent =
          "**Invalid phone number. Please enter a valid phone number";
        validationMessage.style.display = "block";
      } else {
        validationMessage.style.display = "none";
      }
    });
  }

  const toggleButtons = document.querySelectorAll(
    '[data-toggle="form-overlay"]',
  );
  const overlay = document.getElementById("form-overlay");

  if (overlay && toggleButtons.length > 0) {
    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        overlay.style.display =
          overlay.style.display === "flex" ? "none" : "flex";
      });
    });
  }

  const cursorWrpr = document.querySelector(".cursor-wrpr");
  const cursor = document.querySelector(".cursor");
  const cursorImg = document.querySelector(".cursor-img");
  const heroVideos = document.querySelectorAll(".Hero-video, .hero-video");
  const lightCursorSections = ".why-us-section, .price-div, .footer-section-nw";

  const cursorDelay = 0.18;
  const normalCursorSize = 12;
  const pointerCursorSize = 35;
  const defaultCursorColor = "";
  const lightCursorColor = "#FFFAEB";

  let isOverHeroVideo = false;

  if (window.gsap && cursorWrpr && cursor && cursorImg) {
    cursorWrpr.style.setProperty("pointer-events", "none", "important");
    cursor.style.setProperty("pointer-events", "none", "important");
    cursorImg.style.setProperty("pointer-events", "none", "important");

    gsap.set(cursorWrpr, {
      position: "fixed",
      inset: 0,
      zIndex: 1000,
    });

    gsap.set([cursor, cursorImg], {
      position: "fixed",
      top: 0,
      left: 0,
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(cursor, {
      width: normalCursorSize,
      height: normalCursorSize,
      opacity: 1,
    });

    gsap.set(cursorImg, {
      scale: 0,
      opacity: 0,
      transformOrigin: "center center",
    });

    window.addEventListener("mousemove", (e) => {
      gsap.to([cursor, cursorImg], {
        x: e.clientX,
        y: e.clientY,
        duration: cursorDelay,
        ease: "power2.out",
      });

      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (!hoveredElement || isOverHeroVideo) return;

      const hoveredCursor = window.getComputedStyle(hoveredElement).cursor;
      const isPointer = hoveredCursor === "pointer";
      const isInLightSection = hoveredElement.closest(lightCursorSections);

      gsap.to(cursor, {
        width: isPointer ? pointerCursorSize : normalCursorSize,
        height: isPointer ? pointerCursorSize : normalCursorSize,
        opacity: isPointer ? 0.15 : 1,
        backgroundColor: isInLightSection
          ? lightCursorColor
          : defaultCursorColor,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    heroVideos.forEach((heroVideo) => {
      heroVideo.addEventListener("mouseenter", () => {
        isOverHeroVideo = true;
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(cursorImg, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      heroVideo.addEventListener("mouseleave", () => {
        isOverHeroVideo = false;
        gsap.to(cursor, {
          width: normalCursorSize,
          height: normalCursorSize,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(cursorImg, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }

  if (window.gsap) {
    document.querySelectorAll(".qna").forEach((qna) => {
      const btn = qna.querySelector(".qna-btn");
      const ans = qna.querySelector(".ans");
      if (!btn || !ans) return;

      gsap.set(ans, {
        height: 0,
        overflow: "hidden",
      });

      gsap.set(btn, {
        rotate: 0,
        transformOrigin: "center center",
      });

      gsap.set(qna, {
        marginBottom: 24,
      });

      btn.addEventListener("click", () => {
        const isOpen = qna.classList.contains("is-open");

        if (isOpen) {
          gsap.to(ans, {
            height: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(btn, {
            rotate: 0,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(qna, {
            marginBottom: 24,
            duration: 0.9,
            ease: "power3.out",
          });

          qna.classList.remove("is-open");
        } else {
          gsap.to(ans, {
            height: "auto",
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(btn, {
            rotate: 135,
            duration: 0.9,
            ease: "power3.out",
          });

          gsap.to(qna, {
            marginBottom: 56,
            duration: 0.9,
            ease: "power3.out",
          });

          qna.classList.add("is-open");
        }
      });
    });
  }
});

window.history.scrollRestoration = "manual";
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);

    if (window.ScrollSmoother) {
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(0, false);
    }
  }, 0);
});
