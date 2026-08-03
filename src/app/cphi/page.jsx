"use client"
import { useEffect } from "react";

export default function Page(){
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const brands = [
    {
      name: "Chemier",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/ChemieR-Logo-6167d5.webp",
      link: "https://www.dawnscientific.com/brand/chemier",
    },
    {
      name: "TriStains",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/TriStains_Logo1-b5d457.webp",
      link: "https://www.dawnscientific.com/brand/tristains",
    },
    {
      name: "cUSP",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/Cusp-4bba61.png",
      link: "https://www.dawnscientific.com/brand/cusp",
    },
    {
      name: "Lichrom",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/LiChrom_uLogo-cb652d.webp",
      link: "https://www.dawnscientific.com/brand/lichrom",
    },
    {
      name: "Bluster",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/Bluster-d53059.webp",
      link: "https://www.dawnscientific.com/brand/bluster",
    },
    {
      name: "EKS",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/EKS-eb06b6.webp",
      link: "https://www.dawnscientific.com/brand/eks",
    },
    {
      name: "Kaappa",
      logo:
        "https://new.dawnscientific.com/public/storage/brands/Kappaa-690398.webp",
      link: "https://www.dawnscientific.com/brand/kappaa",
    },
  ];

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f3f6fb",
        scrollBehavior: "smooth",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "92vh",
        }}
      >
        {/* HERO IMAGE */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="/assets/images/cphi_america.webp"
            alt="CPHI Exhibition"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              filter: "brightness(0.72)",
            }}
          />

          {/* OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.85) 35%, rgba(2,6,23,0.45) 70%, rgba(2,6,23,0.15) 100%)",
            }}
          />
        </div>

        {/* CONTENT */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            minHeight: "92vh",
            display: "flex",
            alignItems: "center",
            padding: "120px 8%",
          }}
        >
          <div
            style={{
              maxWidth: "620px",
            }}
          >
            {/* TAG */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 22px",
                borderRadius: "50px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  color: "#67e8f9",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                CPHI Exhibition 2026
              </span>
            </div>

            {/* TITLE */}
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(44px, 8vw, 52px)",
                lineHeight: "1",
                margin: 0,
                fontWeight: "900",
              }}
            >
              Meet DawnScientific at
              <br />
              CPHI America 2026
            </h1>

            {/* DESCRIPTION */}
            <p
              style={{
                marginTop: "38px",
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: "1.9",
                color: "#cbd5e1",
                maxWidth: "600px",
              }}
            >
             Meet Dawn Scientific at CPHI America 2026 and discover trusted scientific solutions for laboratory, pharmaceutical, research, and industrial applications. We provide high-quality laboratory consumables, reagents, and scientific equipment through our specialized scientific brands, focused on quality, reliability, and industry support.
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "46px",
                flexWrap: "wrap",
              }}
            >
              {/* SCHEDULE */}
              <a
                href="#schedule-meeting"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    background: "#fbbf24",
                    color: "#111827",
                    border: "none",
                    padding: "18px 40px",
                    borderRadius: "16px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "0.35s ease",
                    boxShadow:
                      "0 12px 35px rgba(251,191,36,0.35)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.background = "#ffffff";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.background = "#fbbf24";
                  }}
                >
                  Schedule Meeting
                </button>
              </a>

              {/* BRANDS */}
              <a
                href="#brands"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255,255,255,0.10)",
                    padding: "18px 40px",
                    borderRadius: "16px",
                    fontSize: "15px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "0.35s ease",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-4px)";
                    e.target.style.background = "#ffffff";
                    e.target.style.color = "#111827";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0px)";
                    e.target.style.background =
                      "rgba(255,255,255,0.08)";
                    e.target.style.color = "#ffffff";
                  }}
                >
                  Explore Brands
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          background: "#eef2f7",
          padding: "90px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "30px",
            textAlign: "center",
          }}
        >
          {[
            { icon: "⚡", title: "Fast Response" },
            { icon: "📦", title: "Reliable Supply" },
            { icon: "🤝", title: "Business Partnership" },
            { icon: "🧩", title: "Flexible Support" },
          ].map((item, index) => (
            <div key={index}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  margin: "0 auto 24px auto",
                  borderRadius: "30px",
                  background: "#dbeafe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "42px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: "#0f172a",
                  fontWeight: "700",
                }}
              >
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDLY */}
      <section
        id="schedule-meeting"
        style={{
          background: "#ffffff",
          padding: "110px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "14px",
            }}
          >
            SCHEDULE MEETING
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "52px",
              lineHeight: "1.2",
              color: "#0f172a",
              fontWeight: "800",
            }}
          >
           Meet Us at CPHI America 2026
          </h2>

          <p
            style={{
              marginTop: "22px",
              color: "#64748b",
              fontSize: "18px",
              lineHeight: "1.8",
            }}
          >
            Schedule a one-on-one meeting with the Dawn Scientific team at CPHI America 2026 to explore our scientific solutions and products.
          </p>

          {/* CALENDLY */}
          <div
            style={{
              marginTop: "60px",
              borderRadius: "28px",
              overflow: "hidden",
              background: "#ffffff",
              boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
            }}
          >
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/cphi-2026/new-meeting"
              style={{
                minWidth: "320px",
                height: "700px",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section
        id="brands"
        style={{
          background: "#f3f6fb",
          padding: "120px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* TITLE */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "70px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "52px",
                color: "#0f172a",
                fontWeight: "800",
                lineHeight: "1.2",
              }}
            >
              Delivering excellence through a <br></br>trusted Popular Brands
            </h2>
          </div>

          {/* BRAND GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "28px",
            }}
          >
            {brands.map((brand, index) => (
              <a
                key={index}
                href={brand.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    padding: "45px 25px",
                    minHeight: "210px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.35s ease",
                    cursor: "pointer",
                    boxShadow:
                      "0 10px 30px rgba(15,23,42,0.04)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px) scale(1.02)";

                    e.currentTarget.style.boxShadow =
                      "0 25px 50px rgba(15,23,42,0.10)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0px) scale(1)";

                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(15,23,42,0.04)";
                  }}
                >
                  {/* LOGO */}
                  <div
                    style={{
                      height: "90px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "28px",
                    }}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        maxWidth: "160px",
                        maxHeight: "80px",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* NAME */}
                  <h3
                    style={{
                      margin: 0,
                      color: "#0f172a",
                      fontSize: "24px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    {brand.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

