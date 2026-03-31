const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

function revealSections() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((item) => {
    const windowHeight = window.innerHeight;
    const elementTop = item.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      item.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

const typingElement = document.getElementById("typing-text");

const roles = [
  "Python Full Stack Developer",
  "AI/ML Enthusiast",
  "Django & React Developer",
  "Problem Solver (300+ DSA)",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const currentRole = roles[roleIndex];
  typingElement.textContent = currentRole.substring(0, charIndex);

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeEffect, 900);
  }
}

window.addEventListener("load", typeEffect);

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (scrollTop / height) * 100;
  const progressBar = document.getElementById("progress-bar");

  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 300) {
    backToTop.classList.add("show-btn");
  } else {
    backToTop.classList.remove("show-btn");
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const counters = document.querySelectorAll(".stat-card h2");
let counterStarted = false;

function runCounter() {
  if (counterStarted) return;

  const statsSection = document.querySelector(".stats-section");
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight - 100;

  if (sectionTop < triggerPoint) {
    counterStarted = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let count = 0;

      const increment = Math.max(1, Math.ceil(target / 80));

      const updateCounter = () => {
        count += increment;

        if (count < target) {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", runCounter);
window.addEventListener("load", runCounter);

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 900) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});
