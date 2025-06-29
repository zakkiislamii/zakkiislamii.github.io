async function loadComponents() {
  const components = [
    { id: "hero-container", url: "sections/hero.html" },
    { id: "about-container", url: "sections/about.html" },
    { id: "tech-container", url: "sections/tech.html" },
    { id: "projects-container", url: "sections/projects.html" },
    { id: "contact-container", url: "sections/contact.html" },
    { id: "footer-container", url: "footer.html" },
  ];

  for (const component of components) {
    try {
      const response = await fetch(component.url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const content = await response.text();
      const element = document.getElementById(component.id);
      if (element) {
        element.innerHTML = content;
      } else {
        console.warn(`Element with id "${component.id}" not found.`);
      }
    } catch (error) {
      console.error(`Failed to load component ${component.url}:`, error);
    }
  }
}

function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDelay = `${Math.random() * 6}s`;
    particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
    particlesContainer.appendChild(particle);
  }
}

function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

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

function setupMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = hamburger.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }
}

function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId.length <= 1) return;

      e.preventDefault();
      const targetElement = document.getElementById(targetId.substring(1));

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      const navLinks = document.querySelector(".nav-links");
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        const hamburger = document.getElementById("hamburger");
        const icon = hamburger.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
}

function handleParallax() {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
}

function addTypingEffect() {
  const title = document.querySelector(".hero-title");
  if (!title) return;
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

function addMagneticButtons() {
  const buttons = document.querySelectorAll(".social-link");
  buttons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.3}px, ${
        y * 0.3
      }px) scale(1.1)`;
      button.querySelector("i").style.transform = `translate(${x * 0.4}px, ${
        y * 0.4
      }px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
      button.querySelector("i").style.transform = "translate(0, 0)";
    });
  });
}

function addInteractiveEffects() {
  const techCards = document.querySelectorAll(".tech-card");
  techCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 40px rgba(99, 102, 241, 0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)";
    });
  });

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
}

async function init() {
  await loadComponents();

  createParticles();
  setupMobileNav();
  setupSmoothScrolling();
  addTypingEffect();
  addMagneticButtons();
  addInteractiveEffects();

  handleScrollReveal();
  handleNavbarScroll();

  window.addEventListener("scroll", () => {
    handleNavbarScroll();
    handleScrollReveal();
    handleParallax();
  });
}

document.addEventListener("DOMContentLoaded", init);
