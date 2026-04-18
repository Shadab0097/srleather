"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 145;
const FRAME_SPEED = 2.0;
const IMAGE_SCALE = 0.87;

const ClientShowcase = ({ clients }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="client-interactive-showcase">
      <div className="client-logo-grid">
        {clients.map((c, i) => (
          <div
            key={i}
            className={`client-badge ${activeIndex === i ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => setActiveIndex(i)}
          >
            <img
              src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${c.domain}&size=128`}
              alt={c.name}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <a
        href={`https://${clients[activeIndex].domain}`}
        target="_blank"
        rel="noreferrer"
        className="client-active-content client-card premium-styled"
      >
        <div className="card-mesh" />
        <div className="card-glare" />
        <div className="card-border" />
        <div className="client-card-inner" key={activeIndex} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 className="client-active-name">{clients[activeIndex].name}</h3>
          <p className="client-active-about">{clients[activeIndex].about}</p>
          <div className="visit-website-btn">
            <span>Explore Brand</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </a>
    </div>
  );
};

/* ── Section data ────────────────────────────────────────── */
const SECTIONS = [
  {
    id: "our-story",
    label: "001 / Our Story",
    heading: "Crafted with Purpose",
    body: (
      <>
        S R LEATHER is a New Delhi based workshop initiative that specialises in crafting leather collectibles while harnessing the skills of India's craftsmen. Simply put, we manufacture beautiful pure leather, Canvas & Vegan Leather bags and accessories.
        <br />
        <br />
        Our workshop consists of 25 artisans who give their full attention to the details, with our potential we have been able to work with National as well as International Brands, for your reference the catalogues are attached below. We would love to collaborate with you and produce best quality products for the brand.
      </>
    ),
    enter: 6,
    leave: 24,
    animation: "slide-left",
    align: "left",
  },
  {
    id: "products",
    type: "products",
    label: "002 / Products",
    heading: "What We Create",
    body: "From executive briefcases to everyday essentials, each piece is cut from premium full-grain leather and finished by hand.",
    products: [
      "Executive Briefcases & Portfolios",
      "Messenger Bags & Satchels",
      "Travel Duffels & Weekenders",
      "Wallets, Cardholders & Belts",
      "Custom Corporate Gifting",
      "Bespoke & Made-to-Order",
    ],
    enter: 28,
    leave: 42,
    animation: "slide-right",
    align: "right",
  },
  {
    id: "process",
    label: "003 / Process",
    heading: "From Hide to Heirloom",
    body: "Every SR Leather piece passes through 48 hours of meticulous handwork — from selecting the finest hides at trusted tanneries, to hand-cutting, stitching with waxed thread, edge finishing, and final quality inspection.",
    note: "Lifetime warranty on all hardware & stitching",
    enter: 46,
    leave: 60,
    animation: "fade-up",
    align: "left",
  },
  {
    id: "stats",
    type: "client-cards",
    enter: 55,
    leave: 88,
    animation: "stagger-up",
    persist: true,
    clients: [
      { name: "The Design Edge", domain: "thedesignedge.com.au", about: "An Australian brand dedicated to ethically sourced, premium cowhide and leather homewares and bags, defined by rustic elegance." },
      { name: "Green Hermitage", domain: "greenhermitage.com", about: "Pioneers in sustainable luxury, creating premium handcrafted vegan handbags and accessories mindful of the earth." },
      { name: "BThunderLuxe", domain: "bthunderluxe.com", about: "A visionary fashion label crafting exceptional Luxe TeePee leather handbags for those with bold, uncompromising style." },
      { name: "hHSK", domain: "hhsk.co.in", about: "Rooted in timeless elegance, hHSK blends heritage craftsmanship with contemporary silhouettes for the modern connoisseur." },
      { name: "FountainEarth", domain: "fountainearth.com", about: "Bridging aesthetics and ethics by producing high-quality, sustainably manufactured leather belting and lifestyle carry goods." },
      { name: "Naksha Outpost", domain: "nakshaoutpost.com", about: "Crafting modern heirlooms, Naksha Outpost draws inspiration from rugged terrains to forge durable, standout leather collections." },
      { name: "Songs of Siren", domain: "songsofsiren.com", about: "A sophisticated narrative of bold, seductive style expressed through meticulously designed, premium leather statement pieces." },
      { name: "Inchmark", domain: "inchmark.in", about: "Driven by absolute precision, Inchmark executes corporate and premium leather goods with flawless attention to the finest detail." },
      { name: "Pinjjai by H", domain: "instagram.com", about: "An exclusive artisan collection specializing in limited-run, intricately patterned leather goods that define boutique luxury." },
    ],
  },
  {
    id: "cta",
    type: "cta",
    label: "005 / Get in Touch",
    heading: "Let's Create Together",
    body: "Whether you need a single bespoke piece or a bulk corporate order — we'd love to hear from you.",
    enter: 85,
    leave: 100,
    animation: "scale-up",
    persist: true,
  },
];

export default function Home() {
  const canvasRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);
  const canvasWrapRef = useRef(null);
  const canvasBgRef = useRef(null);
  const darkOverlayRef = useRef(null);
  const marqueeTextRef = useRef(null);
  const marqueeWrapRef = useRef(null);
  const headerRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderBarRef = useRef(null);
  const loaderPercentRef = useRef(null);
  const sectionRefs = useRef({});
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const bgColorRef = useRef("#0a0806");
  const [loaded, setLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ── Sample background color from frame edges ──────────── */
  const sampleBgColor = useCallback((img) => {
    try {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      tempCtx.drawImage(img, 0, 0);
      const corners = [
        tempCtx.getImageData(2, 2, 1, 1).data,
        tempCtx.getImageData(img.naturalWidth - 3, 2, 1, 1).data,
        tempCtx.getImageData(2, img.naturalHeight - 3, 1, 1).data,
        tempCtx.getImageData(img.naturalWidth - 3, img.naturalHeight - 3, 1, 1).data,
      ];
      const avg = corners.reduce(
        (acc, c) => [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]],
        [0, 0, 0]
      );
      const r = Math.round(avg[0] / 4);
      const g = Math.round(avg[1] / 4);
      const b = Math.round(avg[2] / 4);
      bgColorRef.current = `rgb(${r},${g},${b})`;

      if (headerRef.current) {
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        if (luminance < 0.5) {
          headerRef.current.classList.add('header-dark');
        } else {
          headerRef.current.classList.remove('header-dark');
        }
      }
    } catch (e) {
      /* CORS or other issue, keep default */
    }
  }, []);

  /* ── Draw frame on canvas ──────────────────────────────── */
  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[index];
      if (!canvas || !ctx || !img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const isMobile = window.innerWidth <= 768;
      const isPortrait = ch > cw;

      let scale;
      if (isMobile && isPortrait) {
        // Prevent horizontal edges from cutting out on vertical screens.
        // Computes scale based on width to fit horizontally with a subtle 35% presence zoom
        // (increased to appear slightly larger as requested).
        scale = (cw / iw) * 1.45;
      } else {
        const scaleBase = Math.max(cw / iw, ch / ih);
        const adaptiveScale = isMobile ? 0.9 : IMAGE_SCALE;
        scale = scaleBase * adaptiveScale;
      }

      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = bgColorRef.current;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      // ── Soft edge vignette to eliminate sharp frame-edge seams ──
      const bg = bgColorRef.current;
      const feather = ch * 0.22; // 22% of canvas height — covers shadow zone

      // Bottom edge fade (where the sharp line is most visible)
      const botGrad = ctx.createLinearGradient(0, ch - feather, 0, ch);
      botGrad.addColorStop(0, "transparent");
      botGrad.addColorStop(1, bg);
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, ch - feather, cw, feather);

      // Top edge fade (softer, 12%)
      const topFeather = ch * 0.12;
      const topGrad = ctx.createLinearGradient(0, topFeather, 0, 0);
      topGrad.addColorStop(0, "transparent");
      topGrad.addColorStop(1, bg);
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, cw, topFeather);

      // Side edge fades (subtle, 8%)
      const sideFeather = cw * 0.08;
      const leftGrad = ctx.createLinearGradient(sideFeather, 0, 0, 0);
      leftGrad.addColorStop(0, "transparent");
      leftGrad.addColorStop(1, bg);
      ctx.fillStyle = leftGrad;
      ctx.fillRect(0, 0, sideFeather, ch);

      const rightGrad = ctx.createLinearGradient(cw - sideFeather, 0, cw, 0);
      rightGrad.addColorStop(0, "transparent");
      rightGrad.addColorStop(1, bg);
      ctx.fillStyle = rightGrad;
      ctx.fillRect(cw - sideFeather, 0, sideFeather, ch);
    },
    []
  );

  /* ── Resize canvas for DPR ─────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    // 72 is var(--header-height)
    const viewHeight = window.innerHeight - 72;
    canvas.width = window.innerWidth * dpr;
    canvas.height = viewHeight * dpr;
    // Rely on CSS width:100% and height:100% rather than hardcoded inline styles 
    // to prevent mobile viewport shifting and overflow bugs.
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    // Adjust draw dimensions after DPR scaling
    canvas.width = window.innerWidth * dpr;
    canvas.height = viewHeight * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    let gsapModule, ScrollTriggerModule, LenisModule;
    let lenis;
    let animationFrameId;

    const init = async () => {
      /* ── Load libraries ─────────────────────────────────── */
      const [gsapImport, stImport, lenisImport] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      gsapModule = gsapImport.gsap || gsapImport.default;
      ScrollTriggerModule = stImport.ScrollTrigger || stImport.default;
      LenisModule = lenisImport.default || lenisImport.Lenis;

      gsapModule.registerPlugin(ScrollTriggerModule);

      /* ── Preload frames ─────────────────────────────────── */
      const frames = new Array(FRAME_COUNT);
      let loadedCount = 0;

      const loadFrame = (i) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            frames[i] = img;
            loadedCount++;
            // Sample bg color every 20 frames
            if (i % 20 === 0) sampleBgColor(img);
            // Update loader
            const pct = Math.round((loadedCount / FRAME_COUNT) * 100);
            if (loaderBarRef.current) loaderBarRef.current.style.width = pct + "%";
            if (loaderPercentRef.current) loaderPercentRef.current.textContent = pct + "%";
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            resolve();
          };
          img.src = `/frames/frame_${String(i + 1).padStart(4, "0")}.webp`;
        });

      // Phase 1: load first 10 frames fast
      const firstBatch = [];
      for (let i = 0; i < Math.min(10, FRAME_COUNT); i++) {
        firstBatch.push(loadFrame(i));
      }
      await Promise.all(firstBatch);

      // Phase 2: load rest
      const restBatch = [];
      for (let i = 10; i < FRAME_COUNT; i++) {
        restBatch.push(loadFrame(i));
      }
      await Promise.all(restBatch);

      framesRef.current = frames;

      // Draw first frame & resize
      resizeCanvas();
      drawFrame(0);

      // Hide loader
      setLoaded(true);
      if (loaderRef.current) loaderRef.current.classList.add("hidden");

      /* ── Lenis smooth scroll ────────────────────────────── */
      lenis = new LenisModule({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTriggerModule.update);
      gsapModule.ticker.add((time) => lenis.raf(time * 1000));
      gsapModule.ticker.lagSmoothing(0);

      /* ── Hero entrance animation ────────────────────────── */
      const heroTl = gsapModule.timeline({ delay: 0.3 });
      heroTl
        .from(".hero-label", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" })
        .from(
          ".word-inner",
          { y: "110%", duration: 0.9, stagger: 0.08, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".hero-tagline",
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          ".hero-scroll-indicator",
          { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );

      /* ── Header scroll state ────────────────────────────── */
      ScrollTriggerModule.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (headerRef.current) {
            headerRef.current.classList.toggle("scrolled", self.progress > 0.92);
          }
        },
      });

      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      /* ── Frame-to-scroll binding ────────────────────────── */
      ScrollTriggerModule.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const accelerated = Math.min(self.progress * FRAME_SPEED, 1);
          const index = Math.min(
            Math.floor(accelerated * FRAME_COUNT),
            FRAME_COUNT - 1
          );
          if (index !== currentFrameRef.current) {
            currentFrameRef.current = index;
            requestAnimationFrame(() => drawFrame(index));
          }
        },
      });

      /* ── Circle-wipe hero → canvas reveal ───────────────── */
      ScrollTriggerModule.create({
        trigger: scrollContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Hero fades out
          if (heroRef.current) {
            heroRef.current.style.opacity = Math.max(0, 1 - p * 15);
          }
          // Canvas reveals via circle
          const wipeProgress = Math.min(1, Math.max(0, (p - 0.005) / 0.10));
          const radius = wipeProgress * 150; // Increased to fully cover the screen corners
          if (canvasWrapRef.current) {
            canvasWrapRef.current.style.clipPath = `circle(${radius}% at 50% 50%)`;
          }
          if (canvasBgRef.current) {
            canvasBgRef.current.style.clipPath = `circle(${radius}% at 50% 50%)`;
          }
        },
      });

      /* ── Dark overlay for stats section ─────────────────── */
      const statsSection = SECTIONS.find((s) => s.type === "client-cards");
      if (statsSection && darkOverlayRef.current) {
        const statsEnter = statsSection.enter / 100;
        const statsLeave = statsSection.leave / 100;
        const fadeRange = 0.04;

        ScrollTriggerModule.create({
          trigger: scrollContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            let opacity = 0;
            if (p >= statsEnter - fadeRange && p <= statsEnter) {
              opacity = (p - (statsEnter - fadeRange)) / fadeRange;
            } else if (p > statsEnter && p < statsLeave) {
              opacity = 0.9;
            } else if (p >= statsLeave && p <= statsLeave + fadeRange) {
              opacity = 0.9 * (1 - (p - statsLeave) / fadeRange);
            }
            darkOverlayRef.current.style.opacity = opacity;

            if (headerRef.current) {
              if (opacity > 0.4) {
                headerRef.current.classList.add("header-overlay-dark");
              } else {
                headerRef.current.classList.remove("header-overlay-dark");
              }
            }
          },
        });
      }

      /* ── Marquee scroll animation ───────────────────────── */
      if (marqueeTextRef.current && marqueeWrapRef.current) {
        gsapModule.to(marqueeTextRef.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: scrollContainer,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // Emerge from behind: starts behind canvas (z-index -1), pops
        // to foreground (z-index 3) with scale + blur depth effect
        ScrollTriggerModule.create({
          trigger: scrollContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            const ENTER = 0.10;
            const PEAK = 0.25; // fully emerged by 25%
            const EXIT = 0.50;

            let marqueeOpacity = 0;
            let scale = 1.4;
            let blur = 20;
            let zIndex = -1; // behind canvas

            if (p > ENTER && p < EXIT) {
              const fadeIn = Math.min(1, (p - ENTER) / 0.06);
              const fadeOut = Math.min(1, (EXIT - p) / 0.05);
              marqueeOpacity = Math.min(fadeIn, fadeOut) * 0.5;

              // Emergence: 0 → 1 from ENTER → PEAK
              const emergeProgress = Math.min(1, (p - ENTER) / (PEAK - ENTER));
              scale = 1.4 - 0.4 * emergeProgress;   // 1.4 → 1.0
              blur = 20 * (1 - emergeProgress);    // 20 → 0

              // Pop to foreground once emergence starts (opacity > 0)
              zIndex = 3;
            }

            const el = marqueeWrapRef.current;
            el.style.opacity = marqueeOpacity;
            el.style.transform = `translateY(-50%) scale(${scale})`;
            el.style.filter = `blur(${blur}px)`;
            el.style.zIndex = zIndex;
          },
        });
      }

      /* ── Section animations ─────────────────────────────── */
      const positionSections = () => {
        const scrollHeight = scrollContainer.scrollHeight;
        const isMobile = window.innerWidth <= 768;

        SECTIONS.forEach((section) => {
          const el = sectionRefs.current[section.id];
          if (!el) return;

          const enter = section.enter / 100;
          const leave = section.leave / 100;
          const midpoint = (enter + leave) / 2;

          // Perfectly center the section around the midpoint.
          // We add a slight downward offset to account for the fixed header
          // so the content's top heading isn't hidden underneath the navbar.
          const offset = isMobile ? window.innerHeight * 0.05 : 80;
          el.style.top = midpoint * scrollHeight + offset + "px";
          el.style.transform = "translateY(-50%)";
        });
      };

      positionSections();

      SECTIONS.forEach((section) => {
        const el = sectionRefs.current[section.id];
        if (!el) return;

        const enter = section.enter / 100;
        const leave = section.leave / 100;
        const persist = section.persist === true;

        // Get animatable children
        const children = el.querySelectorAll(
          ".section-label, .section-heading, .section-body, .section-note, .cta-button, .stat"
        );

        // Build entrance timeline
        const tl = gsapModule.timeline({ paused: true });
        const type = section.animation;

        switch (type) {
          case "fade-up":
            tl.from(children, {
              y: 50,
              opacity: 0,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
            });
            break;
          case "slide-left":
            tl.from(children, {
              x: -80,
              opacity: 0,
              stagger: 0.14,
              duration: 0.9,
              ease: "power3.out",
            });
            break;
          case "slide-right":
            tl.from(children, {
              x: 80,
              opacity: 0,
              stagger: 0.14,
              duration: 0.9,
              ease: "power3.out",
            });
            break;
          case "scale-up":
            tl.from(children, {
              scale: 0.85,
              opacity: 0,
              stagger: 0.12,
              duration: 1.0,
              ease: "power2.out",
            });
            break;
          case "rotate-in":
            tl.from(children, {
              y: 40,
              rotation: 3,
              opacity: 0,
              stagger: 0.1,
              duration: 0.9,
              ease: "power3.out",
            });
            break;
          case "stagger-up":
            tl.from(children, {
              y: 60,
              opacity: 0,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            });
            break;
          case "clip-reveal":
            tl.from(children, {
              clipPath: "inset(100% 0 0 0)",
              opacity: 0,
              stagger: 0.15,
              duration: 1.2,
              ease: "power4.inOut",
            });
            break;
        }

        let isPlayed = false;
        let isPersisted = false;

        ScrollTriggerModule.create({
          trigger: scrollContainer,
          start: "top top",
          end: "bottom bottom",
          scrub: false,
          onUpdate: (self) => {
            const p = self.progress;
            const isInRange = p >= enter && p <= leave;

            if (isInRange && !isPlayed) {
              el.classList.add("visible");
              tl.play();
              isPlayed = true;
            } else if (!isInRange && isPlayed && !isPersisted) {
              if (persist && p > leave) {
                isPersisted = true;
                // Keep visible
              } else {
                el.classList.remove("visible");
                tl.reverse();
                isPlayed = false;
              }
            }
          },
        });
      });

      /* ── Resize handler ─────────────────────────────────── */
      window.addEventListener("resize", () => {
        resizeCanvas();
        positionSections();
        ScrollTriggerModule.refresh();
      });
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [drawFrame, resizeCanvas, sampleBgColor]);

  return (
    <>
      {/* ── Loader ──────────────────────────────────────── */}
      <div ref={loaderRef} className="loader" id="loader">
        <img src="/sr-leather-logo.png" alt="SR Leather Logo" className="loader-logo" />
        <div className="loader-bar-container">
          <div ref={loaderBarRef} className="loader-bar" id="loader-bar" />
        </div>
        <div ref={loaderPercentRef} className="loader-percent" id="loader-percent">
          0%
        </div>
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      {/* ── Header ──────────────────────────────────────── */}
      <header ref={headerRef} className="site-header" id="site-header">
        <div className="header-logo">
          <img src="/sr-leather-logo.png" alt="SR Leather" />
        </div>

        {/* Hamburger Toggle */}
        <button
          className={`hamburger-toggle ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className="header-nav">
          <a href="#our-story">Our Story</a>
          <a href="#products">Products</a>
          <a href="#process">Process</a>
          <a href="#clients">Clients</a>
          <a href="#cta" className="header-cta">
            Contact Us
          </a>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}>
          <nav className="mobile-nav-links">
            <a href="#our-story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a>
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
            <a href="#process" onClick={() => setIsMobileMenuOpen(false)}>Process</a>
            <a href="#clients" onClick={() => setIsMobileMenuOpen(false)}>Clients</a>
            <a href="#cta" className="header-cta" onClick={() => setIsMobileMenuOpen(false)}>
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section ref={heroRef} className="hero-standalone" id="hero">
        <div className="hero-leather-texture" />
        <div className="hero-spotlights" />

        <div className="hero-content">
          <span className="hero-label">Handcrafted Since 1987</span>
          <h1 className="hero-heading">
            <div className="hero-title-row">
              <span className="word"><span className="word-inner heading-sans">The</span></span>
              <span className="word"><span className="word-inner heading-serif-italic">Art</span></span>
              <span className="word"><span className="word-inner heading-sans">of</span></span>
            </div>
            <div className="hero-title-row">
              <span className="word"><span className="word-inner heading-leather">Leather</span></span>
            </div>
          </h1>

          {/* Tagline removed per request, GSAP hook safely repurposed for scroll text */}
        </div>

        <div className="hero-scroll-indicator">
          <span className="hero-tagline scroll-pulse-text">Enter The Workshop</span>
          <div className="scroll-oval">
            <div className="scroll-drop" />
          </div>
        </div>
      </section>

      {/* ── Canvas ──────────────────────────────────────── */}
      <div ref={canvasBgRef} className="canvas-bg" />
      <div ref={canvasWrapRef} className="canvas-wrap">
        <canvas ref={canvasRef} id="canvas" />
      </div>

      {/* ── Dark Overlay ────────────────────────────────── */}
      <div ref={darkOverlayRef} className="dark-overlay" id="dark-overlay" />

      {/* ── Marquee ─────────────────────────────────────── */}
      <div ref={marqueeWrapRef} className="marquee-wrap">
        <div ref={marqueeTextRef} className="marquee-text">
          Briefcases &nbsp; • &nbsp; Wallets &nbsp; • &nbsp; Duffels
          &nbsp; • &nbsp; Portfolios &nbsp; • &nbsp; Belts &nbsp; • &nbsp;
          Satchels &nbsp; • &nbsp; Bespoke &nbsp; • &nbsp;
        </div>
      </div>

      {/* ── Scroll Container ────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="scroll-container"
        id="scroll-container"
        style={{ height: "500vh" }}
      >
        {SECTIONS.map((section) => {
          if (section.type === "client-cards") {
            return (
              <section
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-section section-client-cards"
                data-enter={section.enter}
                data-leave={section.leave}
                data-animation={section.animation}
              >
                <div className="section-inner client-cards-container">
                  <h2 className="client-cards-title section-heading">Brands We Craft For</h2>
                  <ClientShowcase clients={section.clients} />
                </div>
              </section>
            );
          }

          if (section.type === "cta") {
            return (
              <section
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className="scroll-section section-cta"
                data-enter={section.enter}
                data-leave={section.leave}
                data-animation={section.animation}
                data-persist={section.persist ? "true" : undefined}
              >
                <div className="section-inner">
                  <span className="section-label">{section.label}</span>
                  <h2 className="section-heading">{section.heading}</h2>

                  <div className="contact-details">
                    <div className="contact-item">
                      <span className="contact-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <p>
                        Punjabi dhaba, jk apartment- mehrauli rd,<br />
                        opp. poojs stationary, kishangarh village,<br />
                        vasant kunj, new delhi, delhi - 110070
                      </p>
                    </div>

                    <div className="contact-methods">
                      <div className="contact-item">
                        <span className="contact-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                        </span>
                        <a href="mailto:srleather100@gmail.com">srleather100@gmail.com</a>
                      </div>

                      <div className="contact-item">
                        <span className="contact-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </span>
                        <div>
                          <a href="tel:+919313324425">9313324425</a>
                          <span className="contact-divider">/</span>
                          <a href="tel:+919313104380">9313104380</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="cta-button">
                    <span>Request a Quote</span>
                    <span className="cta-arrow">→</span>
                  </button>
                </div>
              </section>
            );
          }

          if (section.type === "products") {
            return (
              <section
                key={section.id}
                ref={(el) => (sectionRefs.current[section.id] = el)}
                className={`scroll-section section-content align-${section.align}`}
                data-enter={section.enter}
                data-leave={section.leave}
                data-animation={section.animation}
              >
                <div className="section-inner">
                  <span className="section-label">{section.label}</span>
                  <h2 className="section-heading">{section.heading}</h2>
                  <p className="section-body">{section.body}</p>
                  <ul className="product-list">
                    {section.products.map((product, i) => (
                      <li key={i}>{product}</li>
                    ))}
                  </ul>
                </div>
              </section>
            );
          }

          return (
            <section
              key={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className={`scroll-section section-content align-${section.align}`}
              data-enter={section.enter}
              data-leave={section.leave}
              data-animation={section.animation}
            >
              <div className="section-inner">
                <span className="section-label">{section.label}</span>
                <h2 className="section-heading">{section.heading}</h2>
                <p className="section-body">{section.body}</p>
                {section.note && (
                  <p className="section-note">{section.note}</p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="site-footer">
        <span className="footer-text">
          © 2026 SR Leather. All rights reserved.
        </span>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </>
  );
}
