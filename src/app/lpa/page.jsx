
export default function Page(){
  return (
    <div style={{ margin: 0, fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f4f7fb" }}>

      {/* HERO */}
      <div style={{ position: "relative" }}>
        <img src="assets/images/lpa_hero_section_image.webp"
          style={{ width: "100%", height: "600px", objectFit: "cover" }} alt="" />

        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.3))"
        }} />

        <div style={{
          position: "absolute", top: "50%", left: "8%",
          transform: "translateY(-50%)", color: "#fff", maxWidth: "600px"
        }}>
          <h1 style={{ fontSize: "44px", margin: 0, lineHeight: 1.2 }}>
            Our Industry Membership – LPA
          </h1>

          <p style={{ marginTop: "18px", fontSize: "18px", lineHeight: 1.6, color: "#ddd" }}>
            Empowering laboratory excellence through global collaboration and trusted industry partnerships.
          </p>
        </div>
      </div>

      {/* FLOATING STATS */}
      <div style={{ maxWidth: "1100px", margin: "-70px auto 60px auto", padding: "0 20px" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          background: "#ffffff", backdropFilter: "blur(12px)",
          borderRadius: "16px", padding: "30px 20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}>

          <div style={{ flex: 1, minWidth: "220px", textAlign: "center" }}>
            <div style={{ fontSize: "32px" }}>🌐</div>
            <div style={{ fontWeight: 700, marginTop: "10px", fontSize: "18px" }}>Global Network</div>
            <div style={{ fontSize: "13px" }}>Industry Connections</div>
          </div>

          <div style={{ flex: 1, minWidth: "220px", textAlign: "center" }}>
            <div style={{ fontSize: "32px" }}>🤝</div>
            <div style={{ fontWeight: 700, marginTop: "10px", fontSize: "18px" }}>Trusted Partnerships</div>
            <div style={{ fontSize: "13px" }}>Reliable Collaboration</div>
          </div>

          <div style={{ flex: 1, minWidth: "220px", textAlign: "center" }}>
            <div style={{ fontSize: "32px" }}>📊</div>
            <div style={{ fontWeight: 700, marginTop: "10px", fontSize: "18px" }}>Market Expertise</div>
            <div style={{ fontSize: "13px" }}>Industry Insights</div>
          </div>

        </div>
      </div>

      {/* INTRO */}
      <section style={{ maxWidth: "900px", margin: "100px auto 60px auto", padding: "0 20px", textAlign: "center" }}>
        <p style={{ color: "#555", lineHeight: 1.9 }}>
          At <b>Dawn Scientific</b>, we continuously work to expand our global reach and strengthen our position in the laboratory supply industry. Our membership with the <b>Laboratory Products Association (LPA)</b> reflects our commitment to industry collaboration, professional growth, and delivering better solutions to our customers.
        </p>

        <p style={{ color: "#555", lineHeight: 1.9, marginTop: "15px" }}>
          Through this association, we stay connected with key players in the laboratory products sector, helping us improve our product offerings, market understanding, and customer service.
        </p>
      </section>

      {/* ABOUT */}
      <section style={{ maxWidth: "1100px", margin: "auto", padding: "40px 20px 80px 20px" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center",
          background: "#fff", borderRadius: "20px", padding: "30px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)"
        }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <img src="assets/images/LPA About Dawn.webp"
              style={{ width: "100%", borderRadius: "16px" }} alt="" />
          </div>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={{ marginBottom: "15px" }}>About Dawn Scientific</h2>

            <p style={{ color: "#555", lineHeight: 1.8 }}>
              Dawn Scientific is focused on supplying high-quality laboratory products for research, industrial, and educational applications. Our goal is to provide reliable laboratory consumables, chemicals, and scientific solutions that meet the evolving needs of customers.
            </p>

            <p style={{ color: "#555", lineHeight: 1.8, marginTop: "12px" }}>
              By building strong industry relationships and continuously improving our processes, we ensure consistent quality and dependable service.
            </p>
          </div>
        </div>
      </section>

      {/* LPA MEMBERSHIP */}
      <section style={{ padding: "50px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "auto", textAlign: "center" }}>

          <div style={{ marginBottom: "20px" }}>
            <img src="assets/images/lpa_logo.png"
              style={{ height: "150px" }} alt="" />
          </div>

          <h2 style={{ fontSize: "30px" }}>
            Proud Member of the Laboratory Products Association
          </h2>
          
          <p style={{ color: "#666", maxWidth: "750px", margin: "15px auto 35px auto", lineHeight: 1.7 }}>
            Dawn Scientific is a member of the <b>Laboratory Products Association</b>, a global trade association representing manufacturers, distributors, and suppliers of laboratory products and services.
          </p>
         <h3 style={{ fontSize: "20px" }}>This membership connects us with a network of companies involved in:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            <div style={{ flex: 1, minWidth: "220px", background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
              Laboratory equipment and instruments
            </div>

            <div style={{ flex: 1, minWidth: "220px", background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
              Glassware and plasticware
            </div>

            <div style={{ flex: 1, minWidth: "220px", background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
              Chemicals and consumables
            </div>

            <div style={{ flex: 1, minWidth: "220px", background: "#fff", borderRadius: "14px", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
              Scientific research and life science products
            </div>
          </div>

          <p style={{ color: "#666", marginTop: "25px" }}>
            Being part of this association allows us to stay aligned with industry developments and best practices.
          </p>

        </div>
      </section>

      {/* INDUSTRY COLLAB */}
      <section style={{ padding: "30px 20px" }}>
        <div style={{ maxWidth: "850px", margin: "auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            Our Approach to Industry Collaboration
          </h2>

          <p style={{ textAlign: "center", color: "#666", marginBottom: "60px" }}>
            Through our LPA membership, Dawn Scientific stays actively engaged with the laboratory products industry by:
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "22px 0", borderBottom: "1px solid #e5e7eb" }}>
              Building relationships with global suppliers and distributors
            </div>
            <div style={{ padding: "22px 0", borderBottom: "1px solid #e5e7eb" }}>
              Staying updated on market trends and developments
            </div>
            <div style={{ padding: "22px 0", borderBottom: "1px solid #e5e7eb" }}>
              Participating in industry discussions and knowledge sharing
            </div>
            <div style={{ padding: "22px 0" }}>
              Continuously improving product quality and offerings
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ background: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "auto", textAlign: "center" }}>
          <h2>Our Commitment to the Laboratory Industry</h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "18px", marginTop: "30px"
          }}>
            <img src="assets/images/Laboratory workspace.webp" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} alt="" />
            <img src="assets/images/Lab consumables, Chemicals, Equipment.webp" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} alt="" />
            <img src="assets/images/Professional collaboration.webp" style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }} alt="" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fab214", padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>Industry Membership</h2>

        <p style={{ color: "#fff", marginTop: "12px", maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}>
          Dawn Scientific is proud to be associated with recognized global industry organizations that support growth, collaboration, and innovation in the laboratory products sector.
        </p>
      </section>

    </div>
  );
};
