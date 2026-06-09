import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container nav-container">
          <div className="nav-logo">
            {/* Logo placeholder if needed, currently empty on left based on screenshot, icons on right */}
            <span></span>
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
          <div className="hero-content">
            <h1>nubira</h1>
            <h2>Quality Apparel<br />Manufacturing<br />Solutions</h2>
            <button className="btn-primary">EXPLORE OUR SERVICES</button>
          </div>
          <div className="hero-image-wrapper">
            <img src="/hero.png" alt="Indian mythology style illustration" className="hero-image" />
          </div>
        </div>
      </section>

      <section className="about bg-light section-padding">
        <div className="container about-container">
          <div className="about-content">
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
          </div>
          <div className="about-image-wrapper">
            <img src="/about.png" alt="Clean modern sewing studio" className="about-image" />
          </div>
        </div>
      </section>

      <section className="feature section-padding">
        <div className="container feature-container">
          <div className="feature-image-wrapper">
            <div className="circular-image">
              <img src="/feature.png" alt="Women working at sewing machines" />
            </div>
          </div>
          <div className="feature-content">
            <h3>Quality Apparel Solutions<br />by nubira</h3>
            <p>
              Welcome to nubira, where we prioritize your needs in
              apparel manufacturing. Our dedicated team offers
              exceptional service from sampling to logistics,
              ensuring you receive timely updates. Experience a
              difference in quality and service with us.
            </p>
          </div>
        </div>
      </section>

      <section className="solutions section-padding bg-light">
        <div className="container">
          <h3 className="text-center section-title">Solution</h3>
          <div className="solutions-grid">
            <div className="solution-item">
              <h4>Quality and Integrity</h4>
              <p>We give our Customers a promise of Quality, Integrity & Confidentiality in terms of client's specific requirements/information. This ensures long term trust of our Customers. We offer value added services at no extra cost which has been highly appreciated by our Valued Customers.</p>
            </div>
            <div className="solution-item">
              <h4>Custom Designs</h4>
              <p>Our team of designers will work with you to create custom designs that perfectly represent your brand and vision.</p>
            </div>
            <div className="solution-item">
              <h4>Fast Turnaround</h4>
              <p>We understand the importance of timely delivery and will work to get your order completed and shipped as quickly as possible.</p>
            </div>
            <div className="solution-item">
              <h4>Our Assets</h4>
              <p>We give our Customers a promise of Quality, Integrity & Confidentiality in terms of client's specific requirements/information. This ensures long term trust of our Customers..</p>
            </div>
            <div className="solution-item">
              <h4>Value added</h4>
              <p>We offer services at no extra cost which has been highly appreciated by our Valued Customers. We maintain excellence in Customer's Service and our thorough commitments of offering quality products has been the foundation of our success.</p>
            </div>
            <div className="solution-item">
              <h4>Responsibilities</h4>
              <p>Sourcing right vendors (after deeply studying their present/past capabilities, Industrial reputation).<br />Product development as per Customer's specification considering the competitive price parameters.</p>
            </div>
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
