import QRCode from "react-qr-code";

function Ticket() {
  return (
    <div
      style={{
        background: "#F5F7FA",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px"
      }}
    >
      <div
        style={{
          background: "white",
          width: "700px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,.15)"
        }}
      >
        <div
          style={{
            background: "#0F4C81",
            color: "white",
            padding: "25px"
          }}
        >
          <h1>🚌 RuralLink Transit</h1>
          <p>Digital Bus Ticket</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "35px"
          }}
        >
          <div>

            <h2>Aryan Singh</h2>

            <p><b>Bus :</b> RuralLink Express</p>

            <p><b>Route :</b> Indore → Bhopal</p>

            <p><b>Date :</b> 31 July 2026</p>

            <p><b>Departure :</b> 08:30 AM</p>

            <p><b>Seat :</b> A12</p>

            <p><b>Fare :</b> ₹320</p>

          </div>

          <QRCode
            value="RuralLink-IND-BPL-A12-31-07-2026"
            size={170}
          />

        </div>
      </div>
    </div>
  );
}

export default Ticket;