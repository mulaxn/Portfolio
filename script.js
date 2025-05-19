document.addEventListener("DOMContentLoaded", () => {
  // Interactive bubble movement
  const interBubble = document.querySelector(".interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;
  const move = () => {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  };
  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });
  move();

  // NavigationEffect for nav interactions
  class NavigationEffect {
    constructor(navigation) {
      this.previous = null;
      this.current = null;
      this.navigation = navigation;
      this.anchors = this.navigation.querySelectorAll("a");
      this.anchors.forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          this.handlePrevious();
          this.handleCurrent(anchor);
          const targetUrl = anchor.getAttribute("href");
          if (targetUrl) {
            setTimeout(() => {
              window.location = targetUrl;
            }, 1000);
          }
        });
      });
    }

    handleCurrent(current) {
      this.current = current;
      this.current.classList.toggle("active");
      const nodes = this.getNodes(this.current);
      gsap.to(nodes[0], {
        duration: 3,
        ease: "elastic.out(1.4, 0.4)",
        yPercent: "-100",
        stagger: 0.01,
        overwrite: true,
      });
      gsap.to(nodes[1], {
        duration: 3,
        ease: "elastic.out(1.4, 0.4)",
        yPercent: "100",
        stagger: 0.01,
        overwrite: true,
      });
    }

    handlePrevious() {
      this.previous = document.querySelector("nav a.active");
      if (this.previous) {
        this.previous.classList.toggle("active");
        const nodes = this.getNodes(this.previous);
        gsap.to(nodes[0], {
          duration: 0.2,
          ease: "power1.out",
          yPercent: "0",
          overwrite: true,
          stagger: 0.012,
        });
        gsap.to(nodes[1], {
          duration: 0.2,
          ease: "power1.out",
          yPercent: "0",
          overwrite: true,
          stagger: 0.012,
        });
      }
    }

    getNodes(item) {
      return [
        gsap.utils.selector(item)(".blue rect"),
        gsap.utils.selector(item)(".pink rect"),
      ];
    }
  }

  new NavigationEffect(document.querySelector("nav"));

  // ✅ Typing Animation on Scroll
  gsap.registerPlugin(ScrollTrigger);

  const aboutText = `I'm 24 years old. Outside of programming, I enjoy gaming to stay connected with my friends around the world. I also love hiking, playing soccer, and experimenting in the kitchen. One quote I strive to live by is: 
"No amount of money ever bought a second of time." by Tony Stark.
Here’s a picture of me lying down at the highest point of the Gros Morne Mountain Trail.`;

  let index = 0;
  let hasTyped = false;

  function typeText() {
    const typingEl = document.getElementById("typing-text");
    if (!typingEl) return;
    if (index < aboutText.length) {
      typingEl.textContent += aboutText.charAt(index);
      index++;
      setTimeout(typeText, 40);
    }
  }

  ScrollTrigger.create({
    trigger: "#typing-text",
    start: "top 80%",
    once: true,
    onEnter: () => {
      if (!hasTyped) {
        hasTyped = true;
        typeText();
      }
    }
  });
});
