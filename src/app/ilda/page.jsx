
export default function Page() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", color: "#1a1a1a", background: "#fffdf5" }}>

      {/* HERO */}
      <section style={{
        padding: "100px 8%",
        background: "linear-gradient(135deg,#d99a00,#fab214)",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          maxWidth: "1150px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "40px"
        }}>

          {/* LOGO */}
          <div style={{ flex: "1", textAlign: "center", position: "relative" }}>
            <div style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              background: "#fff",
              borderRadius: "50%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }} />
            <img
              src="assets/images/ILDA-logo.png"
              alt="ILDA"
              style={{ width: "160px", position: "relative" }}
            />
          </div>

          {/* TEXT */}
          <div style={{ flex: "2", minWidth: "280px" }}>
            <h1 style={{ fontSize: "clamp(28px,4vw,42px)", marginBottom: "15px" }}>
              Trusted Laboratory Supplier with Global Industry Connections
            </h1>

            <p style={{ fontSize: "18px", color: "#3a2a00" }}>
              Connecting Independent Laboratory Distributors Worldwide
            </p>
          </div>

        </div>

        {/* GLOW */}
        <div style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "rgba(255,215,0,0.25)",
          borderRadius: "50%",
          top: "-100px",
          right: "-100px"
        }} />
      </section>

      {/* INTRO */}
      <section style={{ padding: "70px 10%", textAlign: "center", background: "#fff" }}>
        <p style={{ maxWidth: "900px", margin: "auto", fontSize: "18px", lineHeight: "1.8" }}>
          At Dawn Scientific, we believe strong industry collaboration helps deliver better laboratory solutions. Our membership with the Independent Laboratory Distributors Association (ILDA) reflects our commitment to professional standards, global networking, and continuous growth in the laboratory supply industry.
        </p>

        <p style={{ maxWidth: "900px", margin: "20px auto 0", fontSize: "18px", lineHeight: "1.8" }}>
          Through this association, we stay connected with leading distributors, manufacturers, and suppliers worldwide—allowing us to provide better products, knowledge, and service to our customers.
        </p>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "70px 8%" }}>
        <div style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "#fff",
          padding: "40px",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>About Dawn Scientific</h2>

          <p style={{ lineHeight: "1.8" }}>
            Dawn Scientific is dedicated to supplying reliable laboratory products for research, education, and industrial applications. Our focus is on providing high-quality laboratory consumables, chemicals, and scientific solutions to customers.
          </p>

          <p style={{ lineHeight: "1.8" }}>
            With a strong commitment to quality and customer satisfaction, we continuously work to expand our network and improve our offerings to meet the evolving needs of laboratories.
          </p>

          <div style={{ marginTop: "20px", color: "#d99a00", fontWeight: "600" }}>
            ✔ Quality Focused &nbsp; ✔ Global Reach &nbsp; ✔ Trusted Solutions
          </div>
        </div>
      </section>

      {/* ILDA SECTION */}
      <section style={{ padding: "80px 8%", background: "#fff" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "40px"
        }}>

          <div style={{ flex: "1", textAlign: "center" }}>
            <img
              src="assets/images/ILDA Image.jpg"

              alt="ILDA"
              style={{ width: "100%", maxWidth: "500px", borderRadius: "12px" }}
            />
          </div>

          <div style={{ flex: "2", minWidth: "280px" }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
              Proud Member of the Independent Laboratory Distributors Association
            </h2>

            <p style={{ lineHeight: "1.8" }}>
              Dawn Scientific is a recognized member of the Independent Laboratory Distributors Association, an international network that connects independent laboratory distributors and suppliers across the scientific industry.
            </p>

            <p style={{ lineHeight: "1.8" }}>Our membership allows us to:</p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "15px",
              marginTop: "20px"
            }}>
              {[
                "Strengthen global business relationships",
                "Stay connected with industry developments",
                "Expand our professional network",
                "Collaborate with trusted laboratory suppliers"
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "15px",
                  background: "#fff8e1",
                  borderLeft: "3px solid #fab214"
                }}>
                  ✔ {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* IMAGE GRID */}
      <section style={{ padding: "80px 8%", textAlign: "center" }}>
  <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>
    Our Commitment to the Laboratory Industry
  </h2>

  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  }}>
    
    <div style={{
      width: "320px",
      overflow: "hidden",
      borderRadius: "14px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }}>
      <img src="/assets/images/Equipment in lab.jpg" style={{ width: "100%" }} alt="" />
    </div>

    <div style={{
      width: "320px",
      overflow: "hidden",
      borderRadius: "14px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }}>
      <img src="/assets/images/Scientist in lab.jpg" style={{ width: "100%" }} alt="" />
    </div>

    <div style={{
      width: "320px",
      overflow: "hidden",
      borderRadius: "14px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
    }}>
      <img src="/assets/images/Consumable in lab.jpg" style={{ width: "100%" }} alt="" />
    </div>

  </div>
</section>

       
      {/* CERTIFICATION (WHITE BACKGROUND FIXED) */}
      <section style={{
        padding: "100px 8%",
        textAlign: "center",
        background: "#fff"
      }}>
        <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
          Industry Membership
        </h2>

        <img

          src="assets/images/ILDA-logo.png"
          alt="ILDA"
          style={{
            maxWidth: "160px",
            padding: "15px",
            border: "1px solid #eee",
            borderRadius: "10px"
          }}
        />

        <p style={{
          maxWidth: "600px",
          margin: "20px auto",
          lineHeight: "1.8"
        }}>
          Dawn Scientific is proud to be associated with global industry organizations that promote collaboration, innovation, and professional growth within the laboratory supply sector.
        </p>
      </section>

    </div>
  );
}