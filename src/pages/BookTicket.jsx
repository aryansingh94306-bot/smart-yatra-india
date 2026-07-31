import { useState } from "react";
import busData from "../data/busData";
import BusCard from "../components/BusCard";

function BookTicket() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [filteredBuses, setFilteredBuses] = useState(busData);

  const searchBus = () => {
    const result = busData.filter((bus) => {
      return (
        bus.from.toLowerCase().includes(from.toLowerCase()) &&
        bus.to.toLowerCase().includes(to.toLowerCase())
      );
    });

    setFilteredBuses(result);
  };

  return (
    <div
      style={{
        padding: "50px",
        background: "#F5F7FA",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#0F4C81",
          marginBottom: "30px",
        }}
      >
        🚌 Book Your Journey
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{
            padding: "12px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{
            padding: "12px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="1">1 Passenger</option>
          <option value="2">2 Passengers</option>
          <option value="3">3 Passengers</option>
          <option value="4">4 Passengers</option>
        </select>

        <button
          onClick={searchBus}
          style={{
            background: "#0F4C81",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Search Buses
        </button>
      </div>

      <h2
        style={{
          color: "#0F4C81",
          marginBottom: "20px",
        }}
      >
        Available Buses
      </h2>

      {filteredBuses.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>No buses found.</h3>
          <p>Try changing your source or destination.</p>
        </div>
      ) : (
        filteredBuses.map((bus) => (
          <BusCard key={bus.id} bus={bus} />
        ))
      )}
    </div>
  );
}

export default BookTicket;