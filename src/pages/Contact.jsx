import React from 'react';
import Navbar from '../components/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#4b2cbf,#8f5cff,#4b2cbf)",
          backgroundSize: "200% 200%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 20px"
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1050px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "22px",
            padding: "60px 40px",
            textAlign: "center",
            boxShadow: "0 40px 80px rgba(0,0,0,0.18)"
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#222",
              marginBottom: "10px"
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "16px",
              marginBottom: "50px"
            }}
          >
            Need help with property deals or advisor registration? Our team is
            always ready to assist you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: "30px"
            }}
          >
            {/* PHONE */}
            <div
              style={{
                padding: "35px",
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                transition: "0.3s"
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#ede9ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 15px"
                }}
              >
                <i
                  className="fa-solid fa-phone"
                  style={{ fontSize: "24px", color: "#6c63ff" }}
                ></i>
              </div>

              <h3 style={{ marginBottom: "8px" }}>Call Us</h3>
              <p style={{ color: "#555" }}>+91 97553 65517</p>
            </div>

            {/* LOCATION */}
            <div
              style={{
                padding: "35px",
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                transition: "0.3s"
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#ede9ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 15px"
                }}
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{ fontSize: "24px", color: "#6c63ff" }}
                ></i>
              </div>

              <h3 style={{ marginBottom: "8px" }}>Location</h3>
              <p style={{ color: "#555" }}>Bhopal, Madhya Pradesh</p>
            </div>

            {/* EMAIL */}
            <div
              style={{
                padding: "35px",
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                transition: "0.3s"
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#ede9ff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto 15px"
                }}
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ fontSize: "24px", color: "#6c63ff" }}
                ></i>
              </div>

              <h3 style={{ marginBottom: "8px" }}>Email</h3>
              <p style={{ color: "#555" }}>trionarealtygroup@gmail.com</p>
            </div>
          </div>

          <div style={{ marginTop: "45px" }}>
            <a
              href="https://wa.me/919755365517"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "linear-gradient(45deg,#25D366,#20b954)",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "30px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)"
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;