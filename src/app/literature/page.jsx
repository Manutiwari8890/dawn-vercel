"use client"
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);


  return (
<>
 <section
  style={{
    background:
      "linear-gradient(135deg,#f8fbff 0%,#eef4ff 50%,#dbeafe 100%)",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  }}
>
  {/* Background Circle */}
  <div
    style={{
      position: "absolute",
      right: "-150px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "700px",
      height: "700px",
      borderRadius: "50%",
      background: "rgba(37,99,235,0.06)",
      zIndex: 1,
    }}
  />

  <div
    style={{
      width: "100%",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "60px 40px",
      display: "grid",
      gridTemplateColumns: "1.1fr 0.9fr",
      gap: "50px",
      alignItems: "center",
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* LEFT CONTENT */}
    <div>
      <span
        style={{
          color: "#2563eb",
          fontSize: "14px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "2px",
          display: "block",
          marginBottom: "20px",
        }}
      >
        Literature Hub
      </span>

      <h1
        style={{
          fontSize: "64px",
          lineHeight: "1.1",
          fontWeight: "700",
          color: "#071a52",
          marginBottom: "25px",
        }}
      >
        Scientific Resource
        <br />
        Center
      </h1>

      <p
        style={{
          color: "#64748b",
          fontSize: "18px",
          lineHeight: "1.8",
          maxWidth: "620px",
          marginBottom: "35px",
        }}
      >
        Explore our comprehensive collection of product catalogs,
        and brochures.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px 28px",
            minWidth: "180px",
            boxShadow: "0 15px 40px rgba(0,0,0,.06)",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#2563eb",
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            100+
          </h3>

          <span
            style={{
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Leading Brands
          </span>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "20px 28px",
            minWidth: "180px",
            boxShadow: "0 15px 40px rgba(0,0,0,.06)",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#2563eb",
              fontSize: "34px",
              fontWeight: "700",
            }}
          >
            15+
          </h3>

          <span
            style={{
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Specialized Catalogs
          </span>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          width: "500px",
          height: "500px",
          background: "rgba(37,99,235,0.15)",
          borderRadius: "50%",
          filter: "blur(80px)",
        }}
      />

      {/* PDF Image */}
      <img
        src="/assets/images/literature-stack.png"
        alt="Literature Library"
        style={{
          width: "100%",
          maxWidth: "430px",
          position: "relative",
          zIndex: 2,
          filter: "drop-shadow(0 25px 50px rgba(0,0,0,.18))",
        }}
      />

      {/* Download Button */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "60px",
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "34px",
          zIndex: 3,
          boxShadow: "0 20px 40px rgba(37,99,235,.30)",
        }}
      >
        ↓
      </div>
    </div>
  </div>
</section>


<section
  style={{
    padding: "80px 20px",
    background: "linear-gradient(180deg,#ffffff 0%,#f8fbff 100%)",
  }}
>
  <style>{`
    .literature-marquee{
      overflow:hidden;
      width:100%;
      position:relative;
    }

    .literature-track{
      display:flex;
      gap:24px;
      width:max-content;
      animation:literatureScroll 35s linear infinite;
    }

    .literature-marquee:hover .literature-track{
      animation-play-state:paused;
    }

    .literature-card{
      width:320px;
      min-width:320px;
      background:#fff;
      border-radius:24px;
      overflow:hidden;
      border:1px solid #e5e7eb;
      box-shadow:0 10px 30px rgba(0,0,0,.05);
      transition:all .4s ease;
    }

    .literature-card:hover{
      transform:translateY(-8px);
      box-shadow:0 20px 45px rgba(0,0,0,.12);
    }

    .literature-image{
      background:#f8fafc;
      height:320px;
      padding:20px;
      display:flex;
      align-items:center;
      justify-content:center;
    }

    .literature-image img{
      width:100%;
      height:100%;
      object-fit:contain;
      filter:grayscale(100%);
      opacity:.75;
      transition:all .4s ease;
    }

    .literature-card:hover img{
      filter:grayscale(0%);
      opacity:1;
    }

    .literature-content{
      padding:24px;
    }

    .literature-title{
      font-size:20px;
      color:#071a52;
      font-weight:600;
      margin-bottom:10px;
      min-height:56px;
    }

    .literature-brand{
      color:#2563eb;
      font-weight:500;
      margin-bottom:20px;
    }

    .literature-buttons{
      display:flex;
      gap:10px;
    }

    .literature-btn{
      flex:1;
      text-align:center;
      padding:12px;
      border-radius:12px;
      text-decoration:none;
      font-weight:600;
      transition:.3s;
    }

    .preview-btn{
      background:#f1f5f9;
      color:#071a52;
    }

    .download-btn{
      background:#2563eb;
      color:#fff;
    }

    @keyframes literatureScroll{
      from{
        transform:translateX(0);
      }
      to{
        transform:translateX(-50%);
      }
    }

    @media(max-width:768px){

      .literature-card{
        width:260px;
        min-width:260px;
      }

      .literature-image{
        height:240px;
      }

      .literature-title{
        font-size:18px;
      }

      .literature-track{
        animation-duration:25s;
      }
    }
  `}</style>

  <div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "32px",
      padding: "60px 30px",
      boxShadow: "0 20px 60px rgba(0,0,0,.06)",
      border: "1px solid #edf2f7",
    }}
  >
    <div
      style={{
        textAlign: "center",
        marginBottom: "50px",
      }}
    >
      <div
        style={{
          color: "#2563eb",
          fontWeight: "700",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Catalogue Library
      </div>

      <h1
        style={{
          fontSize: "42px",
          color: "#071a52",
          marginBottom: "15px",
        }}
      >
        Scientific Product Catalogue Collection 
      </h1>

      <p
        style={{
          maxWidth: "750px",
          margin: "0 auto",
          color: "#64748b",
          lineHeight: "1.8",
        }}
      >
        Browse technical catalogues and scientific resources from our trusted laboratory brands for research, quality control, analytical testing, and industrial applications.
      </p>
    </div>

    <div className="literature-marquee">
      <div className="literature-track">

        {[

          {
            title:"Bluster Catalogue",
            brand:"Bluster",
            image:"/assets/images/Bluster catalogue image.webp",
            link:"https://technicaldoc.com/doc/bluster.pdf"
          },
          {
            title:"TriStains Catalogue",
            brand:"TriStains",
            image:"/assets/images/TriStains catalogue image.webp",
            link:"https://technicaldoc.com/doc/tristains.pdf"
          },
          {
            title:"ChemieR Catalogue",
            brand:"ChemieR",
            image:"/assets/images/ChemieR catalogue image.webp",
            link:"https://technicaldoc.com/doc/chemier-reagents.pdf"
          },
          {
            title:"cUSP Catalogue",
            brand:"cUSP",
            image:"/assets/images/cUSP Catalogue Page.webp",
            link:"https://technicaldoc.com/doc/cusp-reagents.pdf"
          },
          {
            title:"LiChrom Catalogue",
            brand:"LiChrom",
            image:"/assets/images/Lichrom catalogue image.webp",
            link:"https://technicaldoc.com/doc/lichrom.pdf"
          },
          {
            title:"EKS Catalogue",
            brand:"EKS",
            image:"/assets/images/EKS Catalogue image.webp",
            link:"https://technicaldoc.com/doc/eks.pdf"
          },
          {
            title:"Laboratory Consumables",
            brand:"Dawn Scientific",
            image:"/assets/images/Lab Consumables catalogue image.webp",
            link:"https://technicaldoc.com/doc/lab-consumable.pdf"
          },

          /* Duplicate for infinite marquee */

          {
            title:"Bluster Catalogue",
            brand:"Bluster",
            image:"/assets/images/Bluster catalogue image.webp",
            link:"https://technicaldoc.com/doc/bluster.pdf"
          },
          {
            title:"TriStains Catalogue",
            brand:"TriStains",
            image:"/assets/images/TriStains catalogue image.webp",
            link:"https://technicaldoc.com/doc/tristains.pdf"
          },
          {
            title:"ChemieR Catalogue",
            brand:"ChemieR",
            image:"/assets/images/ChemieR catalogue image.webp",
            link:"https://technicaldoc.com/doc/chemier-reagents.pdf"
          },
          {
            title:"cUSP Catalogue",
            brand:"cUSP",
            image:"/assets/images/cUSP Catalogue Page.webp",
            link:"https://technicaldoc.com/doc/cusp-reagents.pdf"
          },
          {
            title:"LiChrom Catalogue",
            brand:"LiChrom",
            image:"/assets/images/Lichrom catalogue image.webp",
            link:"https://technicaldoc.com/doc/lichrom.pdf"
          },
          {
            title:"EKS Catalogue",
            brand:"EKS",
            image:"/assets/images/EKS Catalogue image.webp",
            link:"https://technicaldoc.com/doc/eks.pdf"
          },
          {
            title:"Laboratory Consumables",
            brand:"Dawn Scientific",
            image:"/assets/images/Lab Consumables catalogue image.webp",
            link:"https://technicaldoc.com/doc/lab-consumable.pdf"
          }

        ].map((item,index)=>(

          <div className="literature-card" key={index}>

            <div className="literature-image">
              <img src={item.image} alt={item.title}/>
            </div>

            <div className="literature-content">

              <div className="literature-title">
                {item.title}
              </div>

              <div className="literature-brand">
                {item.brand}
              </div>

              <div className="literature-buttons">

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="literature-btn preview-btn"
                >
                  Preview
                </a>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="literature-btn download-btn"
                >
                  Download
                </a>

              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  </div>
</section>


<div
  style={{
    width: "100%",
    background: "linear-gradient(135deg,#041734 0%,#08244d 100%)",
    padding: "80px 20px",
    marginBottom: "80px",
  }}
>
  <div
    style={{
      maxWidth: "1250px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "40px",
    }}
  >
    {/* LEFT SIDE */}
    <div
      style={{
        flex: "1 1 450px",
        minWidth: "300px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(37,99,235,.18)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          background: "#fff",
          padding: "18px",
          borderRadius: "24px",
          boxShadow: "0 30px 80px rgba(0,0,0,.25)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src="/assets/images/Dawnscientific-catalogue.png"
          alt="Dawn Scientific Catalogue"
          style={{
            width: "100%",
            maxWidth: "340px",
            display: "block",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div
      style={{
        flex: "1 1 550px",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "10px 18px",
          borderRadius: "40px",
          background: "#2563eb",
          color: "#fff",
          fontSize: "13px",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        PRODUCT CATALOGUE
      </div>

      <h2
        style={{
          color: "#fff",
          fontSize: "clamp(32px,5vw,56px)",
          lineHeight: "1.1",
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Dawn Scientific Catalogue
      </h2>

      <p
        style={{
          color: "#cbd5e1",
          fontSize: "16px",
          lineHeight: "1.8",
          marginBottom: "35px",
          maxWidth: "600px",
        }}
      >
        Browse our extensive catalogue portfolio featuring laboratory
        reagents, solvents, consumables, and scientific solutions
        designed to support research, analytical testing, quality
        control, and industrial applications.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <a
          href="https://new.dawnscientific.com/public/DSI-Brand_2022_8102022_12Page.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2563eb",
            color: "#fff",
            textDecoration: "none",
            padding: "16px 30px",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          Download Catalogue
        </a>
 
        <a
          href="https://new.dawnscientific.com/public/DSI-Brand_2022_8102022_12Page.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            border: "1px solid rgba(255,255,255,.2)",
            color: "#fff",
            textDecoration: "none",
            padding: "16px 30px",
            borderRadius: "14px",
            fontWeight: "600",
          }}
        >
          View PDF
        </a>
      </div>
    </div>
  </div>
</div>

<section
      style={{
        background: "#fff",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        position: "relative",
        zIndex: "10",
        padding: "70px 40px 50px",
      }}
    >
      <div
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              background: "#eff6ff",
              color: "#2563eb",
              padding: "8px 18px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "500",
              marginBottom: "20px",
            }}
          >
            Literature Library
          </span>

          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              color: "#071a52",
              marginBottom: "15px",
            }}
          >
            Browse All Brand Brochures
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "17px",
              lineHeight: "1.8",
            }}
          >
            Explore brochures, and product portfolios from trusted scientific brands.
          </p>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "35px",
          }}
        >
          <button
           onClick={() => {
             setActiveTab("All");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "All" ? "#2563eb" : "#fff",
              color: activeTab === "All" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            All
          </button>

          <button
            onClick={() => {
             setActiveTab("TriStains");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "TriStains" ? "#2563eb" : "#fff",
              color: activeTab === "TriStains" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            TriStains
          </button>

          <button
            onClick={() => {
             setActiveTab("ChemieR");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "ChemieR" ? "#2563eb" : "#fff",
              color: activeTab === "ChemieR" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ChemieR
          </button>

          <button
            onClick={() => {
             setActiveTab("cUSP");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "cUSP" ? "#2563eb" : "#fff",
              color: activeTab === "cUSP" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            cUSP
          </button>

          <button
            onClick={() => {
             setActiveTab("LiChrom");
             setCurrentPage(1);
             }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "LiChrom" ? "#2563eb" : "#fff",
              color: activeTab === "LiChrom" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            LiChrom
          </button>

          <button
            onClick={() => {
             setActiveTab("EKS");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "EKS" ? "#2563eb" : "#fff",
              color: activeTab === "EKS" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            EKS
          </button>

          <button
            onClick={() => {
             setActiveTab("Bluster");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "Bluster" ? "#2563eb" : "#fff",
              color: activeTab === "Bluster" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Bluster
          </button>

          <button
            onClick={() => {
             setActiveTab("Laboratory Consumables");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "Laboratory Consumables" ? "#2563eb" : "#fff",
              color: activeTab === "Laboratory Consumables" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Laboratory Consumables
          </button>

          <button
            onClick={() => {
             setActiveTab("Dawn Scientific");
             setCurrentPage(1);
              }}
            style={{
              padding: "12px 24px",
              borderRadius: "50px",
              border: "1px solid #e5e7eb",
              background: activeTab === "Dawn Scientific" ? "#2563eb" : "#fff",
              color: activeTab === "Dawn Scientific" ? "#fff" : "#111827",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Dawn Scientific
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
             padding: `${window.innerWidth <= 768 ? 8 : 30}px`,
            minHeight: "200px",
          }}
        >
          {activeTab === "All" && (
<>
  {currentPage === 1 && (
<div
  style={{
    maxWidth: "1500px",
    margin: "60px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    width: "100%",
  }}
>
  {/* CARD 1 */}

  <div
  style={{
    background: "#fff",
    borderRadius: "24px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 10px 30px rgba(0,0,0,.05)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  }}
>
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        height: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/assets/images/Indicator-solid-400x514.webp"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>

   <div
  style={{
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }}
>
      <h3
    style={{
    fontSize: "20px",
    color: "#071a52",
    fontWeight: "500",
    marginBottom: "10px",
    minHeight: "60px",
    }}
   >
        TriStains Indicator Powder
      </h3>

      <div
        style={{
          color: "#2563eb",
          fontWeight: "500",
          marginBottom: "20px",
        }}
      >
        TriStains
      </div>

     <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
        <a
          href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-02.pdf"
          style={{
            flex: 1,
            minWidth: "120px",
            textAlign: "center",
            background: "#f1f5f9",
            color: "#071a52",
            padding: "12px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Preview
        </a>

        <a
          href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-02.pdf"
          style={{
            flex: 1,
            minWidth: "120px",
            textAlign: "center",
            background: "#2563eb",
            color: "#fff",
            padding: "12px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Download
        </a>
      </div>
    </div>
  </div>

  {/* CARD 2 */}

  <div
    style={{
      background: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 30px rgba(0,0,0,.05)",
    }}
  >
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        height: "320px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/assets/images/Histological-stain-solution-400x514.webp"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>

    <div
  style={{
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }}
>
      <h3
  style={{
    fontSize: "20px",
    color: "#071a52",
    fontWeight: "500",
    marginBottom: "10px",
    minHeight: "60px",
  }}
>
        Histological Stains Solution
      </h3>

      <div
        style={{
          color: "#2563eb",
          fontWeight: "500",
          marginBottom: "20px",
        }}
      >
        TriStains
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-04.pdf" style={{ flex: 1, textAlign: "center", background: "#f1f5f9", color: "#071a52", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Preview</a>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-04.pdf" style={{ flex: 1, textAlign: "center", background: "#2563eb", color: "#fff", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Download</a>
      </div>
    </div>
  </div>

  {/* CARD 3 */}

  <div
    style={{
      background: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 30px rgba(0,0,0,.05)",
    }}
  >
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        height: "320px",
      }}
    >
      <img
        src="/assets/images/Histological-dry-stains-dyes-400x514.webp"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>

    <div
  style={{
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }}
>
      <h3
  style={{
    fontSize: "20px",
    color: "#071a52",
    fontWeight: "500",
    marginBottom: "10px",
    minHeight: "60px",
  }}
>
        Histological Dry Stains & Dyes
      </h3>

      <div
        style={{
          color: "#2563eb",
          fontWeight: "500",
          marginBottom: "20px",
        }}
      >
        TriStains
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-03.pdf" style={{ flex: 1, textAlign: "center", background: "#f1f5f9", color: "#071a52", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Preview</a>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-03.pdf" style={{ flex: 1, textAlign: "center", background: "#2563eb", color: "#fff", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Download</a>
      </div>
    </div>
  </div>

  {/* CARD 4 */}

  <div
    style={{
      background: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
      boxShadow: "0 10px 30px rgba(0,0,0,.05)",
    }}
  >
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        height: "320px",
      }}
    >
      <img
        src="/assets/images/Indicator-solution-400x514.webp"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>

    <div
  style={{
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  }}
>
      <h3
  style={{
    fontSize: "20px",
    color: "#071a52",
    fontWeight: "500",
    marginBottom: "10px",
    minHeight: "60px",
  }}
>
        TriStains Indicator Solution
      </h3>

      <div
        style={{
          color: "#2563eb",
          fontWeight: "500",
          marginBottom: "20px",
        }}
      >
        TriStains
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-01.pdf" style={{ flex: 1, textAlign: "center", background: "#f1f5f9", color: "#071a52", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Preview</a>
        <a href="https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-01.pdf" style={{ flex: 1, textAlign: "center", background: "#2563eb", color: "#fff", padding: "12px", borderRadius: "12px", textDecoration: "none", fontWeight: "600" }}>Download</a>
      </div>
    </div>
  </div>

{/* CARD 5 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Chemier_acid_base.webp"
            alt="ChemieR - Acids & Base"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            ChemieR - Acids & Base
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            ChemieR
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/doc/Chemier_acid_base.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/doc/Chemier_acid_base.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 6 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Chemier_Inorganic_Organic.webp"
            alt="ChemieR - Inorganic Salt"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            ChemieR - Inorganic Salt
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            ChemieR
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/doc/Chemier_Inorganic_Organic.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/doc/Chemier_Inorganic_Organic.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>



{/* CARD 7 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Chemier_high_purity_solvent.webp"
            alt="ChemieR - Solvents"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            ChemieR - Solvents
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            ChemieR
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/doc/Chemier_high_purity_solvent.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/doc/Chemier_high_purity_solvent.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 8 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Buffer-solutions-400x514.webp"
            alt="cUSP - Buffer Solutions"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            cUSP - Buffer Solutions
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            cUSP
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-02.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-02.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>
  </div>
)}

{currentPage === 2 && (
<div
  style={{
    maxWidth: "1500px",
    margin: "60px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    width: "100%",
  }}
>

{/* CARD 9 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Test-solution-400x514.webp"
            alt="cUSP - Test Solutions"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            cUSP - Test Solutions
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            cUSP
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-04.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-04.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 10 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Percentage-solutions-400x514.webp"
            alt="cUSP - Percentage Solutions"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            cUSP - Percentage Solutions
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            cUSP
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-03.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-03.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 11 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Volumetric-solutions-400x514.webp"
            alt="cUSP - Volumetric Solutions"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            cUSP - Volumetric Solutions
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            cUSP
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-01.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-01.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 12 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Hplc-ion-pair-400x514.webp"
            alt="LiChrom - HPLC Ion-Pair Reagent"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            LiChrom - HPLC Ion-Pair Reagent
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            LiChrom
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-04.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-04.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 13 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Hplc-solvent-400x514.webp"
            alt="LiChrom - HPLC Solvents"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "20px", color: "#071a52", fontWeight: "500", marginBottom: "10px", minHeight: "60px" }}>
            LiChrom - HPLC Solvents
        </h3>

        <div style={{ color: "#2563eb", fontWeight: "500", marginBottom: "20px" }}>
            LiChrom
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-02.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Preview
            </a>

            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-02.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 14 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Hplc-buffer-salt-400x514.webp"
            alt="LiChrom - Buffer Salt"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "20px", color: "#071a52", fontWeight: "500", marginBottom: "10px", minHeight: "60px" }}>
            LiChrom - Buffer Salt
        </h3>

        <div style={{ color: "#2563eb", fontWeight: "500", marginBottom: "20px" }}>
            LiChrom
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-03.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Preview
            </a>

            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-03.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 15 */}


<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Bluster-gc-gc-hs-1-400x512.webp"
            alt="Bluster - For Gas Chromatography"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3 style={{ fontSize: "20px", color: "#071a52", fontWeight: "500", marginBottom: "10px", minHeight: "60px" }}>
            Bluster - For Gas Chromatography
        </h3>

        <div style={{ color: "#2563eb", fontWeight: "500", marginBottom: "20px" }}>
            Bluster
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Bluster-flyer.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Preview
            </a>

            <a href="https://technicaldoc.com/wp-content/uploads/2025/05/Bluster-flyer.pdf" target="_blank" rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}>
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 16 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Eks-400x512.webp"
            alt="EKS - Solution for Electronics"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            EKS - Solution for Electronics
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            EKS
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/EKS-flyer-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/EKS-flyer-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

</div>
)}

{currentPage === 3 && (
<div
  style={{
    maxWidth: "1500px",
    margin: "60px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))",
     justifyContent: "left",
    gap: "25px",
    width: "100%",
  }}
>



{/* CARD 17 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/Laboratory-400x513.webp"
            alt="Laboratory Consumables"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            Laboratory Consumables
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            Laboratory
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/Laboratory-Consumables02-.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/wp-content/uploads/2025/05/Laboratory-Consumables02-.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>

{/* CARD 18 */}

<div
    style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,.05)"
    }}
>
    <div
        style={{
            background: "#f8fafc",
            padding: "20px",
            height: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}
    >
        <img
            src="/assets/images/outlook_image.jpg"
            alt="Dawn Scientific Outlook"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain"
            }}
        />
    </div>

    <div style={{ padding: "24px" }}>
        <h3
            style={{
                fontSize: "20px",
                color: "#071a52",
                fontWeight: "500",
                marginBottom: "10px",
                minHeight: "60px"
            }}
        >
            Dawn Scientific Outlook
        </h3>

        <div
            style={{
                color: "#2563eb",
                fontWeight: "500",
                marginBottom: "20px"
            }}
        >
            Dawn Scientific
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
            <a
                href="https://technicaldoc.com/doc/Dawnscientific_outlook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#f1f5f9",
                    color: "#071a52",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Preview
            </a>

            <a
                href="https://technicaldoc.com/doc/Dawnscientific_outlook.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    fontWeight: "600"
                }}
            >
                Download
            </a>
        </div>
    </div>
</div>
</div>
)}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "40px",
  }}
>
  {[1, 2, 3].map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      style={{
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        background:
          currentPage === page ? "#2563eb" : "#e5e7eb",
        color:
          currentPage === page ? "#fff" : "#071a52",
        fontWeight: "600",
      }}
    >
      {page}
    </button>
  ))}
</div>
</>
)}

          {activeTab === "TriStains" && (
            <div
  style={{
    maxWidth: "1500px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    width: "100%",
    padding: "0 15px",
    boxSizing: "border-box"
  }}
>
  {[
    {
      title: "TriStains Indicator Powder",
      image: "/assets/images/Indicator-solid-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-02.pdf"
    },
    {
      title: "Histological Stains Solution",
      image: "/assets/images/Histological-stain-solution-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-04.pdf"
    },
    {
      title: "Histological Dry Stains & Dyes",
      image: "/assets/images/Histological-dry-stains-dyes-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-03.pdf"
    },
    {
      title: "TriStains Indicator Solution",
      image: "/assets/images/Indicator-solution-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/TriStains-flyer-Page-01.pdf"
    }
  ].map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        transition: "all .3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      {/* Image Section */}

      <div
        style={{
          background: "#f8fafc",
          padding: "15px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "170px",
            objectFit: "contain",
            display: "block",
            margin: "0 auto"
          }}
        />
      </div>

      {/* Content */}

      <div
        style={{
          padding: "20px"
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#071a52",
            lineHeight: "1.5",
            minHeight: "48px",
            marginBottom: "18px"
          }}
        >
          {item.title}
        </h3>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "8px"
          }}
        >
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1",
              textAlign: "center",
              background: "#f1f5f9",
              color: "#071a52",
              padding: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap"
            }}
          >
            Preview
          </a>

          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1",
              textAlign: "center",
              background: "#2563eb",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap"
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
          )}

          {activeTab === "ChemieR" && (
            <div><div
  style={{
    maxWidth: "1500px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))",
    justifyContent: "center",
    gap: "30px",
    padding: "0 15px",
    boxSizing: "border-box"
  }}
>
  {[
    {
      title: "ChemieR - Acids & Base",
      image: "/assets/images/Acid-base-400x514.webp",
      pdf: "https://technicaldoc.com/doc/Chemier_acid_base.pdf"
    },
    {
      title: "ChemieR - Inorganic Salt",
      image: "/assets/images/Inorganic-organic-reagents-400x514.webp",
      pdf: "https://technicaldoc.com/doc/Chemier_Inorganic_Organic.pdf"
    },
    {
      title: "ChemieR - Solvents",
      image: "/assets/images/High-purity-solvent-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/Chemier_Inorganic_Organic.pdf"
    }
  ].map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 20px rgba(0,0,0,.04)",
        transition: "all .3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          background: "#f8fafc",
          height: "240px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            maxWidth: "170px",
            height: "100%",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>

      <div
        style={{
          padding: "24px"
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#071a52",
            lineHeight: "1.5",
            minHeight: "52px",
            marginBottom: "22px"
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "#eef2f7",
              color: "#071a52",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Preview
          </a>

          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "#2563eb",
              color: "#fff",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ))}
</div></div>
          )}

          {activeTab === "cUSP" && (
            <div><div
  style={{
    maxWidth: "1500px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    width: "100%",
    padding: "0 15px",
    boxSizing: "border-box"
  }}
>
  {[
    {
      title: "cUSP - Test Solutions",
      image: "/assets/images/Test-solution-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-04.pdf"
    },
    {
      title: "cUSP - Percentage Solutions",
      image: "/assets/images/Percentage-solutions-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-03.pdf"
    },
    {
      title: "cUSP - Volumetric Solutions",
      image: "/assets/images/Volumetric-solutions-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-01.pdf"
    },
    {
      title: "cUSP - Buffer Solutions",
      image: "/assets/images/Buffer-solutions-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/cUSP-flyer-Page-02.pdf"
    }
  ].map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        transition: "all .3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <div
        style={{
          background: "#f8fafc",
          padding: "15px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "170px",
            objectFit: "contain",
            display: "block",
            margin: "0 auto"
          }}
        />
      </div>

      <div
        style={{
          padding: "20px"
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#071a52",
            lineHeight: "1.5",
            minHeight: "48px",
            marginBottom: "18px"
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "8px"
          }}
        >
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1",
              textAlign: "center",
              background: "#f1f5f9",
              color: "#071a52",
              padding: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap"
            }}
          >
            Preview
          </a>

          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: "1",
              textAlign: "center",
              background: "#2563eb",
              color: "#ffffff",
              padding: "10px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
              whiteSpace: "nowrap"
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ))}
</div></div>
          )}

          {activeTab === "LiChrom" && (
            <div><div
  style={{
    maxWidth: "1500px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))",
    justifyContent: "center",
    gap: "30px",
    padding: "0 15px",
    boxSizing: "border-box"
  }}
>
  {[
    {
      title: "LiChrom - HPLC Ion-Pair Reagent",
      image: "/assets/images/Hplc-ion-pair-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-04.pdf"
    },
    {
      title: "LiChrom - HPLC Solvents",
      image: "/assets/images/Hplc-solvent-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-02.pdf"
    },
    {
      title: "LiChrom - Buffer Salt",
      image: "/assets/images/Hplc-buffer-salt-400x514.webp",
      pdf: "https://technicaldoc.com/wp-content/uploads/2025/05/Lichrom-flyer-Page-03.pdf"
    }
  ].map((item, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "28px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 8px 20px rgba(0,0,0,.04)",
        transition: "all .3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          background: "#f8fafc",
          height: "240px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            maxWidth: "170px",
            height: "100%",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>

      <div
        style={{
          padding: "24px"
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#071a52",
            lineHeight: "1.5",
            minHeight: "52px",
            marginBottom: "22px"
          }}
        >
          {item.title}
        </h3>

        <div
          style={{
            display: "flex",
            gap: "10px"
          }}
        >
          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "#eef2f7",
              color: "#071a52",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Preview
          </a>

          <a
            href={item.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              background: "#2563eb",
              color: "#fff",
              padding: "12px",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ))}
</div></div>
          )}

          {activeTab === "EKS" && (
            <div><div
  style={{
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
    transition: "all .3s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <div
    style={{
      background: "#f8fafc",
      height: "240px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src="/assets/images/Eks-400x512.webp"
      alt="EKS - Solution for Electronics"
      style={{
        width: "100%",
        maxWidth: "170px",
        height: "100%",
        objectFit: "contain",
        display: "block"
      }}
    />
  </div>

  <div
    style={{
      padding: "24px"
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#071a52",
        lineHeight: "1.5",
        minHeight: "52px",
        marginBottom: "22px"
      }}
    >
      EKS - Solution for Electronics
    </h3>

    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/EKS-flyer-1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#eef2f7",
          color: "#071a52",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Preview
      </a>

      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/EKS-flyer-1.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#2563eb",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Download
      </a>
    </div>
  </div>
</div></div>
          )}

          {activeTab === "Bluster" && (
            <div><div
  style={{
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
    transition: "all .3s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <div
    style={{
      background: "#f8fafc",
      height: "240px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src="/assets/images/Bluster-gc-gc-hs-1-400x512.webp"
      alt="Bluster - For Gas Chromatography"
      style={{
        width: "100%",
        maxWidth: "170px",
        height: "100%",
        objectFit: "contain",
        display: "block"
      }}
    />
  </div>

  <div
    style={{
      padding: "24px"
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#071a52",
        lineHeight: "1.5",
        minHeight: "52px",
        marginBottom: "22px"
      }}
    >
      Bluster - For Gas Chromatography
    </h3>

    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/Bluster-flyer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#eef2f7",
          color: "#071a52",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Preview
      </a>

      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/Bluster-flyer.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#2563eb",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Download
      </a>
    </div>
  </div>
</div></div>
          )}

          {activeTab === "Laboratory Consumables" && (
            <div><div
  style={{
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
    transition: "all .3s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <div
    style={{
      background: "#f8fafc",
      height: "240px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src="/assets/images/Laboratory-400x513.webp"
      alt="Laboratory Consumables"
      style={{
        width: "100%",
        maxWidth: "170px",
        height: "100%",
        objectFit: "contain",
        display: "block"
      }}
    />
  </div>

  <div
    style={{
      padding: "24px"
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#071a52",
        lineHeight: "1.5",
        minHeight: "52px",
        marginBottom: "22px"
      }}
    >
      Laboratory Consumables
    </h3>

    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/Laboratory-Consumables02-.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#eef2f7",
          color: "#071a52",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Preview
      </a>

      <a
        href="https://technicaldoc.com/wp-content/uploads/2025/05/Laboratory-Consumables02-.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#2563eb",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Download
      </a>
    </div>
  </div>
</div></div>
          )}

          {activeTab === "Dawn Scientific" && (
            <div><div
  style={{
    width: "100%",
    maxWidth: "340px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,.04)",
    transition: "all .3s ease"
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>
  <div
    style={{
      background: "#f8fafc",
      height: "240px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <img
      src="/assets/images/outlook_image.jpg"
      alt="Dawn Scientific Outlook"
      style={{
        width: "100%",
        maxWidth: "170px",
        height: "100%",
        objectFit: "contain",
        display: "block"
      }}
    />
  </div>

  <div
    style={{
      padding: "24px"
    }}
  >
    <h3
      style={{
        fontSize: "16px",
        fontWeight: "600",
        color: "#071a52",
        lineHeight: "1.5",
        minHeight: "52px",
        marginBottom: "22px"
      }}
    >
      Dawn Scientific Outlook
    </h3>

    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <a
        href="https://technicaldoc.com/doc/Dawnscientific_outlook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#eef2f7",
          color: "#071a52",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Preview
      </a>

      <a
        href="https://technicaldoc.com/doc/Dawnscientific_outlook.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          textAlign: "center",
          background: "#2563eb",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}
      >
        Download
      </a>
    </div>
  </div>
</div></div>
          )}
        </div>
      </div>
    </section>    
    </>
  );
}