import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import type { ReactNode } from 'react'
import './App.css'

function MagneticButton({ children, href, className, ariaLabel }: { children: ReactNode, href: string, className: string, ariaLabel: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      aria-label={ariaLabel}
      style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.a>
  )
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 250]);

  const fadeInUp = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  }

  const slideLeft = {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  }

  const slideRight = {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 }
    },
    viewport: { once: true, margin: "-50px" }
  }

  const staggerItem = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const scaleInItem = {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 },
    whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  }

  const textRevealContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15, delayChildren: 0.1 }
    }
  }

  const textRevealWord = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const lineDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.5 } }
  }

  const [cursorState, setCursorState] = useState({ x: 0, y: 0, isHovering: false, isGallery: false });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const updateMousePosition = (e: MouseEvent) => {
      const target = e.target as Element;
      const isHovering = !!target.closest('a, button, img, .icon-btn');
      const isGallery = !!target.closest('.gallery-item');
      setCursorState({ x: e.clientX, y: e.clientY, isHovering, isGallery });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [prefersReducedMotion]);

  return (
    <>
      {!prefersReducedMotion && (
        <motion.div
          className="cursor-dot"
          animate={{ 
            x: cursorState.x - (cursorState.isHovering ? 40 : 20), 
            y: cursorState.y - (cursorState.isHovering ? 40 : 20),
            scale: cursorState.isHovering ? 2 : 1
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        >
          <span className="cursor-text" style={{ opacity: cursorState.isGallery ? 1 : 0 }}>VIEW</span>
        </motion.div>
      )}
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-logo">
            <a href="/" className="logo-link">
              <span className="logo-text">Nubira Creation</span>
            </a>
          </div>
          <div className="nav-icons">
            <button className="icon-btn" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
            <button className="icon-btn" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </button>
            <button className="icon-btn" aria-label="User">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container hero-container">
          <motion.div className="hero-content" initial="hidden" animate="show" variants={textRevealContainer}>
            <motion.h1 variants={textRevealWord}>nubira</motion.h1>
            <motion.h2 variants={textRevealContainer} style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span variants={textRevealWord} style={{ display: 'block' }}>Quality Apparel</motion.span>
              </span>
              <span style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span variants={textRevealWord} style={{ display: 'block' }}>Manufacturing</motion.span>
              </span>
              <span style={{ overflow: 'hidden', display: 'block' }}>
                <motion.span variants={textRevealWord} style={{ display: 'block' }}>Solutions</motion.span>
              </span>
            </motion.h2>
            <motion.div variants={textRevealWord}>
              <MagneticButton href="#contact" className="btn-primary" ariaLabel="Get a quote">GET A QUOTE</MagneticButton>
            </motion.div>
          </motion.div>
          <motion.div className="hero-image-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <motion.img style={{ y: heroParallaxY }} src="/hero.png" alt="Indian mythology style illustration" className="hero-image" />
          </motion.div>
        </div>
      </section>

      <section className="about bg-light section-padding">
        <div className="container about-container">
          <motion.div className="about-content" {...slideLeft}>
            <div className="about-text-wrapper">
              <h3>About us</h3>
              <p>
                Nubira's team has been in this trade for the past few years and
                understands the basic requirement of each segment of Indian &
                International Market, their social responsibility and strive hard in
                providing the best of services and quality. We take pride in the
                efficiency of what we do and always work on the most effective and
                latest technology available. We believe in putting forth our efforts as a
                team which in turn provides tremendous momentum and fortifies the
                course of our action. Our team believes in maintaining a perpetual
                relationship with our Counterparts, providing a comfort level in various
                aspects of work transactions and proceedings.
              </p>
            </div>
          </motion.div>
          <motion.div className="about-image-wrapper" {...slideRight} transition={{ delay: 0.2, duration: 0.6 }}>
            <img src="/about.png" alt="Clean modern sewing studio" className="about-image" />
          </motion.div>
        </div>
      </section>

      <section className="feature section-padding">
        <div className="container feature-container">
          <motion.div className="feature-image-wrapper" {...slideLeft}>
            <div className="circular-image">
              <img src="/feature.png" alt="Women working at sewing machines" />
            </div>
          </motion.div>
          <motion.div className="feature-content" {...slideRight} transition={{ delay: 0.2, duration: 0.6 }}>
            <h3>Quality Apparel Solutions<br />by nubira</h3>
            <p>
              Welcome to nubira, where we prioritize your needs in
              apparel manufacturing. Our dedicated team offers
              exceptional service from sampling to logistics,
              ensuring you receive timely updates. Experience a
              difference in quality and service with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="solutions section-padding bg-light">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>Solution</motion.h3>
          <motion.div className="solutions-grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Quality and Integrity</h4>
              <p>We give our Customers a promise of Quality, Integrity & Confidentiality in terms of client's specific requirements/information. This ensures long term trust of our Customers. We offer value added services at no extra cost which has been highly appreciated by our Valued Customers.</p>
            </motion.div>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Custom Designs</h4>
              <p>Our team of designers will work with you to create custom designs that perfectly represent your brand and vision.</p>
            </motion.div>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Fast Turnaround</h4>
              <p>We understand the importance of timely delivery and will work to get your order completed and shipped as quickly as possible.</p>
            </motion.div>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Our Assets</h4>
              <p>State-of-the-art machinery, modern production facilities, and a highly skilled workforce dedicated to precision manufacturing and strict quality control.</p>
            </motion.div>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Value added</h4>
              <p>We offer services at no extra cost which has been highly appreciated by our Valued Customers. We maintain excellence in Customer's Service and our thorough commitments of offering quality products has been the foundation of our success.</p>
            </motion.div>
            <motion.div className="solution-item" variants={staggerItem}>
              <h4>Responsibilities</h4>
              <p>Sourcing right vendors (after deeply studying their present/past capabilities, Industrial reputation).<br />Product development as per Customer's specification considering the competitive price parameters.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Walkthrough Section */}
      <section className="process-section section-padding">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>How It Works</motion.h3>
          <motion.div className="process-grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
            
            <div className="process-connector">
              <motion.div 
                style={{ width: '100%', height: '2px', backgroundColor: 'var(--accent-color)', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            <motion.div className="process-step" variants={staggerItem}>
              <div className="step-number">1</div>
              <h4>Design</h4>
              <p>Share your vision, sketches, or tech packs. We collaborate to perfect the details.</p>
            </motion.div>
            <motion.div className="process-step" variants={staggerItem}>
              <div className="step-number">2</div>
              <h4>Sample</h4>
              <p>We create a high-quality prototype for your review, ensuring fit and finish.</p>
            </motion.div>
            <motion.div className="process-step" variants={staggerItem}>
              <div className="step-number">3</div>
              <h4>Approve</h4>
              <p>Once you give the green light on the sample, we prepare for bulk production.</p>
            </motion.div>
            <motion.div className="process-step" variants={staggerItem}>
              <div className="step-number">4</div>
              <h4>Produce</h4>
              <p>Efficient, ethical manufacturing followed by strict quality control and delivery.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications & MOQ Section */}
      <section className="trust-section section-padding bg-light">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>Manufacturing Standards</motion.h3>
          <div className="trust-content text-center">
            <motion.p className="moq-text" {...fadeInUp}><strong>Low Minimum Order Quantity (MOQ):</strong> Start your line with flexibility. We support low MOQs to help emerging and established brands scale efficiently.</motion.p>
            <motion.div className="certifications-row" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
              <motion.div className="cert-badge" variants={scaleInItem}>
                <span className="cert-icon">ISO</span>
                <span className="cert-name">9001 Certified</span>
              </motion.div>
              <motion.div className="cert-badge" variants={scaleInItem}>
                <span className="cert-icon">GOTS</span>
                <span className="cert-name">Organic Standards</span>
              </motion.div>
              <motion.div className="cert-badge" variants={scaleInItem}>
                <span className="cert-icon">OEKO</span>
                <span className="cert-name">Tex Standard 100</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="vision-values section-padding">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>Our Vision & Values</motion.h3>
          <motion.div className="circular-grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
            <motion.div className="circular-card" variants={scaleInItem}>
              <div className="circular-image">
                <img src="/vision1.png" alt="Quality Above All" />
              </div>
              <h4>Quality Above All</h4>
              <p>Maintaining the highest standards in our apparel manufacturing. Our dedication to excellence sets us apart in the industry.</p>
            </motion.div>
            <motion.div className="circular-card" variants={scaleInItem}>
              <div className="circular-image">
                <img src="/core1.png" alt="Integrity" />
              </div>
              <h4>Integrity</h4>
              <p>Honesty and transparency are at the forefront of nubira. We believe in fostering long-term trust with our clients and partners.</p>
            </motion.div>
            <motion.div className="circular-card" variants={scaleInItem}>
              <div className="circular-image">
                <img src="/core3.png" alt="Customer Focus" />
              </div>
              <h4>Customer Focus</h4>
              <p>Our customers are at the heart of everything we do. We listen to their needs and work diligently to exceed their expectations.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product and Sales Section */}
      <section className="product-sales section-padding bg-light">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>Product and Sales</motion.h3>
          <motion.div className="two-col-grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
            <motion.div className="info-card" variants={slideLeft}>
              <img src="/prod1.png" alt="Product" className="card-image" />
              <h4>Product</h4>
              <p>Offer a full spectrum of garments, including shirts, t-shirts, dresses for all men's, women's, and kids' & bed sheets, cushion covers, and other home furnishing item ensuring you can cater to diverse demographics and seasonal demands.</p>
            </motion.div>
            <motion.div className="info-card" variants={slideRight}>
              <img src="/prod2.png" alt="Sales" className="card-image" />
              <h4>Sales</h4>
              <p>
                <strong>Expansion-Focused:</strong> "Accelerate Your Pan-India Reach. Connect Your Brand Directly to North India's Premier Retail and Distributor Network."<br/><br/>
                <strong>Network-Centric:</strong> "Your Gateway to 150+ Cities in North India. We Place Your Products Directly into the Hands of High-Volume Retailers."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section section-padding">
        <div className="container">
          <motion.h3 className="text-center section-title" {...fadeInUp}>Our Work</motion.h3>
          <motion.div className="gallery-grid" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}>
            <motion.div className="gallery-item" variants={staggerItem}>
              <img src="/gal1.png" alt="Premium Shirts" />
              <div className="gallery-label">Premium Shirts</div>
            </motion.div>
            <motion.div className="gallery-item" variants={staggerItem}>
              <img src="/gal2.png" alt="Knitwear" />
              <div className="gallery-label">Knitwear</div>
            </motion.div>
            <motion.div className="gallery-item" variants={staggerItem}>
              <img src="/gal3.png" alt="Home Furnishings" />
              <div className="gallery-label">Home Furnishings</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding bg-light">
        <div className="container">
          <motion.h3 className="text-center contact-title" {...fadeInUp}>Drop us a line!</motion.h3>
          <motion.div className="form-container" {...fadeInUp}>
            <form action="mailto:nubiracreation9@gmail.com" method="post" encType="text/plain">
              <div className="form-group">
                <input type="text" name="Name" placeholder="Name" aria-label="Name" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" name="Email" placeholder="Email*" aria-label="Email" className="form-input" required />
              </div>
              <div className="form-group">
                <input type="tel" name="Phone" placeholder="Phone" aria-label="Phone number" className="form-input" />
              </div>
              <div className="form-group">
                <textarea name="Notes" placeholder="Other notes" aria-label="Other notes" className="form-textarea" rows={4}></textarea>
              </div>
              <div className="form-actions">
                <span className="attach-file">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                  Attach Files
                </span>
                <span className="attachments-count">Attachments (0)</span>
              </div>
              <button type="submit" className="btn-submit">SEND</button>
            </form>
            <p className="recaptcha-text">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
          </motion.div>
          <div className="all-products-link text-center">
            <a href="#">All Products</a>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container text-center">
          <h3>Nubira's Vision</h3>
          <p className="footer-copyright">Copyright © 2026 nubira - All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default App
