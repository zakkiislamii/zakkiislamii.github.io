// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Smooth reveal animations
function handleScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}

// Mobile navigation toggle
function setupMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Parallax effect for hero section
function handleParallax() {
  const hero = document.querySelector(".hero");
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
}

// Add typing effect to hero title
function addTypingEffect() {
  const title = document.querySelector(".hero-title");
  const text = title.textContent;
  title.textContent = "";
  title.style.borderRight = "3px solid";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      setTimeout(() => {
        title.style.borderRight = "none";
      }, 1000);
    }
  };

  setTimeout(typeWriter, 1000);
}

// Add cursor following effect
function addCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: rgba(99, 102, 241, 0.5);
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px";
    cursor.style.top = e.clientY - 10 + "px";
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)";
  });
}

// Initialize all effects
function init() {
  createParticles();
  setupMobileNav();
  setupSmoothScrolling();
  addTypingEffect();
  addCursorEffect();

  // Event listeners
  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleScrollReveal();
    handleParallax();
  });

  // Initial calls
  handleScrollReveal();
  handleNavbarScroll();
}

// Start everything when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Tech cards glow effect
  const techCards = document.querySelectorAll(".tech-card");
  techCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    });
  });

  // Project cards tilt effect
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    });
  });
});
