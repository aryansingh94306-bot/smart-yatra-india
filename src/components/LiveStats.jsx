import { FaBus, FaUsers, FaMapMarkedAlt, FaRoute } from "react-icons/fa";

function StatCard({ icon, value, label }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,.1)",
      }}
    >
      <div style={{ fontSize: "40px", color: "#0F4C81" }}>{icon}</div>

      <h2 style={{ marginTop: "15px", fontSize: "32px" }}>{value}</h2>

      <p style={{ color: "gray" }}>{label}</p>
    </div>
  );
}

function LiveStats() {
  return (
    <section
      style={{
        background: "#F5F7FA",
        padding: "70px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "45px",
          color: "#0F4C81",
        }}
      >
        SmartYatra Network
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <StatCard
          icon={<FaBus />}
          value="850+"
          label="Daily Buses"
        />

        <StatCard
          icon={<FaUsers />}
          value="1.5M+"
          label="Passengers"
        />

        <StatCard
          icon={<FaMapMarkedAlt />}
          value="520+"
          label="Villages Connected"
        />

        <StatCard
          icon={<FaRoute />}
          value="2100+"
          label="Routes"
        />
      </div>
    </section>
  );
}

export default LiveStats;