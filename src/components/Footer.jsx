import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#0F4C81",
        color: "white",
        padding: "60px 20px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h2>🚌 SmartYatra India</h2>

          <p style={{ marginTop: "15px", lineHeight: "1.7" }}>
            AI-powered rural-to-urban transportation platform connecting
            villages with cities through smarter, safer and more accessible
            travel.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>

          <p>Home</p>
          <p>Journey Planner</p>
          <p>Book Ticket</p>
          <p>Live Tracking</p>
          <p>Dashboard</p>
        </div>

        <div>
          <h3>Support</h3>

          <p>Email : support@smartyatra.in</p>
          <p>Phone : +91 98765 43210</p>
          <p>Available 24 × 7</p>
        </div>

        <div>
          <h3>Follow Us</h3>

          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "28px",
              marginTop: "20px",
            }}
          >
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0 20px",
          borderColor: "rgba(255,255,255,.2)",
        }}
      />

      <p
        style={{
          textAlign: "center",
        }}
      >
        © 2026 SmartYatra India. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;