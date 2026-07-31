import "./LiveTracking.css";

function LiveTracking() {
  return (
    <section className="tracking">

      <h2>📍 Live Bus Tracking</h2>

      <div className="tracking-card">

        <h3>🚌 Rural Express</h3>

        <p><strong>Status:</strong> 🟢 On Time</p>

        <p><strong>Current Location:</strong> Dewas</p>

        <p><strong>Next Stop:</strong> Indore</p>

        <p><strong>Arrival:</strong> 10:30 AM</p>

        <button>View on Map</button>

      </div>

    </section>
  );
}

export default LiveTracking;