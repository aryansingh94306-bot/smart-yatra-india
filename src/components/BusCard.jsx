import "./BusCard.css";
import { useNavigate } from "react-router-dom";

function BusCard({ bus }) {

  const navigate = useNavigate();

  return (
    <div className="bus-card">

      <div className="bus-header">
        <h2>{bus.operator}</h2>
        <span className="bus-type">{bus.type}</span>
      </div>

      <div className="route-info">
        <h3>{bus.from} → {bus.to}</h3>
      </div>

      <div className="timing">
        <p><strong>Departure:</strong> {bus.departure}</p>
        <p><strong>Arrival:</strong> {bus.arrival}</p>
      </div>

      <div className="details">
        <p><strong>Fare:</strong> ₹{bus.price}</p>
        <p><strong>Seats Available:</strong> {bus.seats}</p>
      </div>

      <button
        className="book-btn"
        onClick={() => navigate("/ticket")}
      >
        Book Now
      </button>

    </div>
  );
}

export default BusCard;