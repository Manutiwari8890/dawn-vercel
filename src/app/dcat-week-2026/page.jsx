
export default function Page() {
  return (
    <>
      <style>{`

/* RESET */
body{
  margin:0;
  font-family:Arial,sans-serif;
  color:#222;
}

/* TYPOGRAPHY */
h1{font-size:34px;font-weight:700;margin-bottom:20px;}
h2{font-size:28px;font-weight:700;margin-bottom:15px;}
h3{font-size:22px;margin-bottom:15px;}
h4{font-size:18px;margin-bottom:6px;}
p{color:#555;line-height:1.8;margin-bottom:15px;}

/* HERO (NO GAP FIXED) */
.hero{
  padding:0 !important;
  margin:0;
}

.hero img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

/* CENTER */
.center{
  text-align:center;
  padding:80px 20px;
}
.center p{
  max-width:850px;
  margin:auto;
}

/* ABOUT (50-50 PERFECT) */
.about{
  display:flex;
  width:100%;
  min-height:600px;
}

.about-left,
.about-right{
  width:50%;
}

.about-left{
  background:#f5f5f5;
  padding:80px 70px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.about-right img{
  width:100%;
  height:100%;
  object-fit:cover;
}

/* POINTS */
.points{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:25px;
  margin:30px 0;
}

.point{
  position:relative;
  padding-left:20px;
}

.point span{
  position:absolute;
  left:0;
  width:3px;
  height:100%;
  background:#fab214;
}

/* PARTICIPATION */
.participation{
  padding:100px 20px;
  max-width:1200px;
  margin:auto;
}

.part-header{
  text-align:center;
  margin-bottom:50px;
}

.part-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:25px;
}

.part-card{
  padding:35px;
  border:1px solid #eee;
  transition:.3s;
  background:#fff;
  position:relative;
}

.part-card::before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  width:40px;
  height:3px;
  background:#fab214;
  transition:.3s;
}

.part-card:hover{
  transform:translateY(-6px);
  border-color:#fab214;
}

.part-card:hover::before{
  width:100%;
}

.part-footer{
  text-align:center;
  margin-top:40px;
  font-size:16px;
}

/* WHY SECTION */
.why-event{
  background:#f9fafb;
  padding:100px 0;
}

.why-container{
  max-width:1200px;
  margin:auto;
  padding:0 20px;
}

.why-top{
  text-align:center;
  margin-bottom:50px;
}

.why-subtitle{
  text-align:center;
  margin:40px 0;
  font-weight:600;
}

.why-subtitle::after{
  content:"";
  display:block;
  width:70px;
  height:3px;
  background:#fab214;
  margin:10px auto;
}

.why-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:25px;
}

.why-item{
  padding:35px 25px;
  background:#fff;
  border:1px solid #eee;
  border-radius:6px;
  transition:0.4s;
  position:relative;
}

.why-item::before{
  content:"";
  position:absolute;
  left:0;
  top:0;
  width:4px;
  height:100%;
  background:#fab214;
  transition:0.4s;
}

.why-item:hover{
  transform:translateY(-8px);
  box-shadow:0 15px 35px rgba(0,0,0,0.06);
  border-color:#fab214;
}

.why-item:hover::before{
  width:100%;
  opacity:0.05;
}

.why-bottom{
  text-align:center;
  margin-top:60px;
  max-width:850px;
  margin-left:auto;
  margin-right:auto;
}
  .heading-color{
    color:#fab214;
  }

/* RESPONSIVE */
@media(max-width:1024px){
  .why-grid{
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:768px){

  .hero img{
    height:300px;
  }

  .about{
    flex-direction:column;
  }

  .about-left,
  .about-right{
    width:100%;
  }

  .about-left{
    padding:50px 25px;
  }

  .points{
    grid-template-columns:1fr;
  }

  .part-grid{
    grid-template-columns:1fr;
  }

  .why-grid{
    grid-template-columns:1fr;
  }
}

      `}</style>

      {/* HERO */}
      <section className="hero">
        <img src="assets/images/DCAT Week 2026 Page Image.png" />
      </section>

      {/* INTRO */}
      <section className="center">
        <h1>Connecting Globally at DCAT Week 2026 – New York</h1>
        <p>
          Dawn Scientific is proud to be part of <strong>DCAT Week 2026,</strong> one of the most prestigious global events in the pharmaceutical and chemical industry, taking place in <strong>New York City from March 23–26, 2026.</strong>
        </p>
        <p>
          This premier industry gathering brings together leading companies, decision-makers, and suppliers from across the global bio/pharmaceutical value chain.
        </p>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-left">
          <h2 className="heading-color">About DCAT Week</h2>
          <p>
            <strong>DCAT Week</strong> is recognized as a premier global business event for the pharmaceutical, biotechnology, and chemical industries. It is not a traditional trade show, but a <strong>high-level business networking platform where companies conduct strategic meetings and build partnerships. </strong>.
          </p>

          <div className="points">
            <div className="point"><span></span><h4>01</h4><p>Global pharmaceutical companies</p></div>
            <div className="point"><span></span><h4>02</h4><p>API & chemical manufacturers</p></div>
            <div className="point"><span></span><h4>03</h4><p>Distributors and suppliers</p></div>
            <div className="point"><span></span><h4>04</h4><p>Decision-makers & business leaders</p></div>
          </div>

          <p>Thousands of industry professionals from over 50 countries participate, making it a key event for global collaboration</p>
        </div>

        <div className="about-right">
          <img src="assets/images/D'Cat-About US.png" alt="DCAT Week 2026" />
        </div>
      </section>

      {/* PARTICIPATION */}
      <section className="participation">
        <div className="part-header">
          <h2 className="heading-color">Our Participation</h2>
          <h3>Dawn Scientific at DCAT Week 2026</h3>
          <p>
            At <strong>Dawn Scientific,</strong> our participation in <strong>DCAT Week 2026</strong> reflects our <br />
            commitment to expanding our global presence in the pharmaceutical and laboratory supply chain.
          </p>
        </div>

        <div className="part-grid">
          <div className="part-card"><p>Building international partnerships</p></div>
          <div className="part-card"><p>Exploring new sourcing opportunities</p></div>
          <div className="part-card"><p>Understanding global market trends</p></div>
          <div className="part-card"><p>Strengthening pharma ecosystem relationships</p></div>
        </div>

        <div className="part-footer">
          This engagement helps us enhance our product offerings and deliver better value to our customers.
        </div>
      </section>

      {/* WHY */}
      {/* <section className="why-event">
        <div className="why-container">

          <div className="why-top">
            <h2 className="heading-color">Why This Event Matters</h2>
            <h3>Strengthening Global Network</h3>
            <p>
              Participating in DCAT Week 2026 allows us to connect with key stakeholders <br /> across the pharmaceutical industry and stay aligned with global developments.
            </p>
          </div>

          <div className="why-subtitle"><strong>Key Advantages:</strong></div>

          <div className="why-grid">
            <div className="why-item"><h4>Global Exposure</h4><p>Connect with leading pharma and chemical companies worldwide.</p></div>
            <div className="why-item"><h4>Business Meetings</h4><p>Engage in strategic discussions with decision-makers.</p></div>
            <div className="why-item"><h4>Industry Insights</h4><p>Engage in strategic discussions with decision-makers.</p></div>
            <div className="why-item"><h4>Partnerships</h4><p>Build long-term collaborations across the supply chain.</p></div>
          </div>

          <div className="why-bottom">
            The event is known for enabling private, high-impact business meetings and strategic collaborations among industry leaders.
          </div>

        </div>
      </section>*/}

    </>
  );
}
