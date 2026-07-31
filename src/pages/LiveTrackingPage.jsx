import { FaBus, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function LiveTrackingPage() {
  return (
    <div
      style={{
        padding: "40px",
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#0F4C81",
          marginBottom: "40px",
        }}
      >
        Live Bus Tracking
      </h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "2",
            background: "white",
            borderRadius: "15px",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "120px",
            color: "#0F4C81",
            boxShadow: "0 5px 20px rgba(0,0,0,.1)",
          }}
        >
          🗺️
        </div>

        <div
          style={{
            flex: "1",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0,0,0,.1)",
          }}
        >
          <h2>Bus Information</h2>

          <hr />

          <p><FaBus /> Bus Number : RL-102</p>

          <p><FaMapMarkerAlt /> Next Stop : Sehore</p>

          <p><FaClock /> ETA : 12 Minutes</p>

          <p>Status : 🟢 On Time</p>

          <button
            style={{
              marginTop: "30px",
              background: "#0F4C81",
              color: "white",
              border: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Refresh Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default LiveTrackingPage;