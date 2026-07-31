import "./JourneyPlanner.css";

function JourneyPlanner() {
  return (
    <section className="planner">

      <h2>🗺️ Smart Journey Planner</h2>

      <p>
        Plan your complete journey from your village to your destination.
      </p>

      <div className="planner-card">

        <input type="text" placeholder="Enter Village" />

        <input type="text" placeholder="Destination City" />

        <button>Plan Journey</button>

      </div>

    </section>
  );
}

export default JourneyPlanner;