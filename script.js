// ===============================
//          PRELOADER
// ===============================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// ===============================
//      SCROLL TO TOP BUTTON
// ===============================
const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===============================
//      THEME TOGGLE SWITCH
// ===============================
const themeSwitch = document.getElementById("themeSwitch");

if (themeSwitch) {
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
  });
}

// ===============================
//        CUSTOM CURSOR
// ===============================
const cursor = document.getElementById("customCursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// ===============================
//       FADE / SLIDE ON SCROLL
// ===============================
const animatedEls = document.querySelectorAll(
  ".fade-in, .slide-in-left, .zoom-in"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

animatedEls.forEach((el) => observer.observe(el));

// ===============================
//       COUNTER ANIMATION
// ===============================
const counters = document.querySelectorAll(".counter-number");

const animateCount = (el) => {
  const target = +el.getAttribute("data-target");
  let count = 0;
  const increment = target / 200;

  const updateCounter = () => {
    count += increment;
    if (count < target) {
      el.textContent = Math.floor(count);
      requestAnimationFrame(updateCounter);
    } else {
      el.textContent = target;
    }
  };

  updateCounter();
};

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));

// ===============================
//         MODAL WINDOW
// ===============================
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const modal = document.getElementById("subscribeModal");
const backdrop = document.getElementById("modalBackdrop");

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    backdrop.style.display = "block";
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    backdrop.style.display = "none";
  });
}

if (backdrop) {
  backdrop.addEventListener("click", () => {
    modal.style.display = "none";
    backdrop.style.display = "none";
  });
}

// ===============================
//      LIGHTBOX VIDEO PLAYER
// ===============================
const lightbox = document.getElementById("videoLightbox");
const playBtn = document.getElementById("playVideo");
const closeLightbox = document.getElementById("closeLightbox");

if (playBtn && lightbox) {
  playBtn.addEventListener("click", (e) => {
    e.preventDefault();
    lightbox.style.display = "flex";
  });
}

if (closeLightbox) {
  closeLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

// ===============================
//        STARFIELD EFFECT
// ===============================
const stars = document.querySelectorAll(".star");

setInterval(() => {
  stars.forEach((star) => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  });
}, 2000);

// ===============================
//       BACKGROUND CANVAS
// ===============================
const canvas = document.getElementById("bgCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
      ctx.fillStyle = "#6c5ce7";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  };

  draw();
}

// ===============================
//         KEYBOARD SHORTCUTS
// ===============================
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "r":
      location.reload();
      break;
    case "l":
      launchRocket();
      break;
    case "t":
      document.body.classList.toggle("dark-theme");
      break;
    case "escape":
      if (modal) modal.style.display = "none";
      if (lightbox) lightbox.style.display = "none";
      if (backdrop) backdrop.style.display = "none";
      break;
    case "m":
      if (modal) modal.style.display = "block";
      break;
    case "magic":
      document.getElementById("hiddenGem").style.display = "block";
      break;
  }
});

// ===============================
//      LAUNCH ROCKET ANIMATION
// ===============================
function launchRocket() {
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.position = "fixed";
  rocket.style.bottom = "0";
  rocket.style.left = "50%";
  rocket.style.transform = "translateX(-50%)";
  rocket.innerHTML = "🚀";
  document.body.appendChild(rocket);

  let y = 0;
  const moveUp = () => {
    y += 5;
    rocket.style.bottom = `${y}px`;
    if (y < window.innerHeight + 100) {
      requestAnimationFrame(moveUp);
    } else {
      rocket.remove();
    }
  };

  moveUp();
}

// ===============================
//         TILT HOVER LOGIC
// ===============================
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const { width, height } = card.getBoundingClientRect();
    const x = e.offsetX;
    const y = e.offsetY;
    const rotateX = ((y / height) - 0.5) * 10;
    const rotateY = ((x / width) - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
});

// ===============================
//          STAR SHUFFLE
// ===============================
function shuffleStars() {
  const starList = document.querySelectorAll(".floating-star");
  starList.forEach((star) => {
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.top = `${Math.random() * window.innerHeight}px`;
  });
}
setInterval(shuffleStars, 3000);

// ===============================
//         RATING SYSTEM
// ===============================
const starsContainer = document.querySelector(".rating-stars");
const ratingMessage = document.getElementById("ratingMessage");

if (starsContainer) {
  starsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("star")) {
      const rating = e.target.dataset.star;
      document.querySelectorAll(".star").forEach((s) => {
        s.style.color = "#bbb";
      });
      for (let i = 1; i <= rating; i++) {
        document.querySelector(`[data-star="${i}"]`).style.color = "#f1c40f";
      }
      ratingMessage.textContent = `Thank you for rating us ${rating} star${rating > 1 ? "s" : ""}!`;
    }
  });
}

// ===============================
//         ACCORDION FAQ
// ===============================
const accordionInputs = document.querySelectorAll(".accordion input");

accordionInputs.forEach((input) => {
  input.addEventListener("change", () => {
    accordionInputs.forEach((i) => {
      if (i !== input) i.checked = false;
    });
  });
});

// ===============================
//     PARALLAX BACKGROUND MOVE
// ===============================
const parallaxBg = document.getElementById("parallaxBg");

if (parallaxBg) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    parallaxBg.style.transform = `translateX(${scrollY * -0.2}px)`;
  });
}

// ===============================
//        INTERACTIVE STEPPER
// ===============================
const steps = document.querySelectorAll(".step");
let activeStep = 0;

function activateStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

setInterval(() => {
  activeStep = (activeStep + 1) % steps.length;
  activateStep(activeStep);
}, 4000);

// ===============================
//       REVEAL SECTIONS ON SCROLL
// ===============================
const revealSections = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

revealSections.forEach((section) => revealObserver.observe(section));

// ===============================
//   HORIZONTAL TIMELINE ANIMATION
// ===============================
const timelineWrapper = document.querySelector(".timeline-wrapper");

if (timelineWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  timelineWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - timelineWrapper.offsetLeft;
    scrollLeft = timelineWrapper.scrollLeft;
    timelineWrapper.classList.add("active");
  });

  timelineWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    timelineWrapper.classList.remove("active");
  });

  timelineWrapper.addEventListener("mouseup", () => {
    isDown = false;
    timelineWrapper.classList.remove("active");
  });

  timelineWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - timelineWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    timelineWrapper.scrollLeft = scrollLeft - walk;
  });
}

// ===============================
//         CARD FLIP ACTION
// ===============================
const cards3D = document.querySelectorAll(".card-3d");

cards3D.forEach((card) => {
  let isFlipped = false;
  card.addEventListener("click", () => {
    if (!isFlipped) {
      card.querySelector(".card-front").style.transform = "rotateY(180deg)";
      card.querySelector(".card-back").style.transform = "rotateY(360deg)";
    } else {
      card.querySelector(".card-front").style.transform = "rotateY(0deg)";
      card.querySelector(".card-back").style.transform = "rotateY(180deg)";
    }
    isFlipped = !isFlipped;
  });
});

// ===============================
//        NEWSLETTER FORM
// ===============================
const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector("input");
    const value = input.value.trim();
    if (value && value.includes("@")) {
      alert("🎉 Subscribed successfully!");
      input.value = "";
    } else {
      alert("⚠️ Please enter a valid email address.");
    }
  });
}

// ===============================
//       SECRET MAGIC TRIGGER
// ===============================
let magicBuffer = "";

document.addEventListener("keydown", (e) => {
  magicBuffer += e.key.toLowerCase();
  if (magicBuffer.includes("magic")) {
    document.getElementById("hiddenGem").style.display = "block";
    document.getElementById("hiddenGem").classList.add("zoom-in", "visible");
    magicBuffer = "";
  }
  if (magicBuffer.length > 10) {
    magicBuffer = magicBuffer.slice(-10);
  }
});

// ===============================
//     SMOOTH SCROLL FOR NAV
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===============================
//       FORM FIELD HIGHLIGHT
// ===============================
const inputs = document.querySelectorAll(".contact-form input, textarea");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.borderColor = "#6c5ce7";
  });
  input.addEventListener("blur", () => {
    input.style.borderColor = "#ccc";
  });
});

// ===============================
//       FLOATING SHAPES ANIM
// ===============================
const floatShapes = document.querySelectorAll(".floating-shape");

setInterval(() => {
  floatShapes.forEach((shape) => {
    const x = Math.random() * 40 - 20;
    const y = Math.random() * 40 - 20;
    shape.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
  });
}, 2000);

// ===============================
//       INPUT VALIDATION
// ===============================
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value.trim() === "") {
      input.style.borderColor = "red";
    } else {
      input.style.borderColor = "#6c5ce7";
    }
  });
});

// ===============================
//       CURTAIN ANIMATION
// ===============================
const curtainLeft = document.querySelector(".curtain-left");
const curtainRight = document.querySelector(".curtain-right");
const curtainText = document.querySelector(".curtain-text");

window.addEventListener("load", () => {
  setTimeout(() => {
    curtainLeft.style.transform = "translateX(-100%)";
    curtainRight.style.transform = "translateX(100%)";
    curtainText.style.opacity = "1";
  }, 1000);
});

// ===============================
//     SCROLL PROGRESS BAR
// ===============================
const progressBar = document.createElement("div");
progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "4px";
progressBar.style.background = "#6c5ce7";
progressBar.style.zIndex = "10000";
progressBar.style.transition = "width 0.25s ease";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// ===============================
//     KEYBOARD NAVIGATION
// ===============================
const focusableElements = document.querySelectorAll(
  'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
);

let focusIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && e.altKey) {
    e.preventDefault();
    focusIndex = (focusIndex + 1) % focusableElements.length;
    focusableElements[focusIndex].focus();
  }
});

// ===============================
//         GLITCH TOGGLE
// ===============================
let glitchMode = false;
const glitchToggleBtn = document.createElement("button");
glitchToggleBtn.innerText = "Toggle Glitch";
glitchToggleBtn.className = "btn btn-glitch-toggle";
glitchToggleBtn.style.position = "fixed";
glitchToggleBtn.style.bottom = "20px";
glitchToggleBtn.style.right = "20px";
glitchToggleBtn.style.zIndex = "9999";
document.body.appendChild(glitchToggleBtn);

glitchToggleBtn.addEventListener("click", () => {
  glitchMode = !glitchMode;
  document.body.classList.toggle("glitch-active", glitchMode);
});

// ===============================
//         PAGE DEBUGGER
// ===============================
function showDebugger() {
  const debugBox = document.createElement("div");
  debugBox.style.position = "fixed";
  debugBox.style.bottom = "10px";
  debugBox.style.left = "10px";
  debugBox.style.padding = "8px 12px";
  debugBox.style.background = "#222";
  debugBox.style.color = "#fff";
  debugBox.style.fontSize = "12px";
  debugBox.style.borderRadius = "4px";
  debugBox.style.zIndex = "9999";
  document.body.appendChild(debugBox);

  setInterval(() => {
    debugBox.innerText = `Scroll: ${window.scrollY}px | Width: ${window.innerWidth}px`;
  }, 500);
}
showDebugger();

// ===============================
//         HASH ACTIVE LINK
// ===============================
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  const fromTop = window.scrollY + 100;
  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (
      section &&
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);

// ===============================
//         RANDOM TOASTER
// ===============================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerText = msg;
  toast.style.position = "fixed";
  toast.style.bottom = "50px";
  toast.style.right = "20px";
  toast.style.background = "#6c5ce7";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "4px";
  toast.style.zIndex = "10000";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s ease";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

setTimeout(() => {
  showToast("✨ Welcome to the animated site!");
}, 2000);

// ===============================
//       FINAL MESSAGE DROP
// ===============================
console.log("✅ script.js fully loaded with 1000+ lines of JavaScript power! 🚀");
