import { useState } from "react";

export default function JourneyPlannerPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [budget, setBudget] = useState(500);

  const [result, setResult] = useState(null);

  function planJourney() {
    if (!from || !to) {
      alert("Please enter source and destination.");
      return;
    }

    setResult({
      route: `${from} → ${to}`,
      bus: "SmartYatra Express",
      fare: "₹320",
      duration: "4 Hours",
      departure: "08:30 AM",
      seatAvailability: "23 Seats Available",
      recommendation:
        "AI Recommendation: This route offers the best balance of cost and travel time.",
    });
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-center text-4xl font-bold text-slate-800">
          🤖 AI Journey Planner
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Plan the fastest and most affordable trip.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From"
            className="rounded-xl border p-4"
          />

          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To"
            className="rounded-xl border p-4"
          />

        </div>

        <div className="mt-8">

          <label className="font-semibold">
            Maximum Budget : ₹{budget}
          </label>

          <input
            type="range"
            min="100"
            max="1000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-3 w-full"
          />

        </div>

        <button
          onClick={planJourney}
          className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700"
        >
          Plan Journey
        </button>

        {result && (
          <div className="mt-10 rounded-2xl bg-slate-50 p-8">

            <h2 className="mb-6 text-3xl font-bold">
              Recommended Route
            </h2>

            <p><strong>Route:</strong> {result.route}</p>

            <p><strong>Bus:</strong> {result.bus}</p>

            <p><strong>Fare:</strong> {result.fare}</p>

            <p><strong>Duration:</strong> {result.duration}</p>

            <p><strong>Departure:</strong> {result.departure}</p>

            <p><strong>Seats:</strong> {result.seatAvailability}</p>

            <div className="mt-6 rounded-xl bg-green-100 p-5">
              {result.recommendation}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}