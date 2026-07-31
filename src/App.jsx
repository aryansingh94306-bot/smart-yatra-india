import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import JourneyPlannerPage from "./pages/JourneyPlannerPage";
import BookTicket from "./pages/BookTicket";
import LiveTrackingPage from "./pages/LiveTrackingPage";
import Ticket from "./pages/Ticket";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journey-planner" element={<JourneyPlannerPage />} />
        <Route path="/book-ticket" element={<BookTicket />} />
        <Route path="/live-tracking" element={<LiveTrackingPage />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/ai-assistant" element={<Support />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;