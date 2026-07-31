import "./Features.css";

function Features() {
  const cards = [
    {
      title: "Nearby Local Buses",
      icon: "🚌",
      text: "Discover buses around your location instantly."
    },

    {
      title: "Smart Ticket Booking",
      icon: "🎫",
      text: "Book QR-based tickets within seconds."
    },

    {
      title: "Live Bus Tracking",
      icon: "📍",
      text: "Track buses in real time using GPS."
    },

    {
      title: "Parcel Delivery",
      icon: "📦",
      text: "Send parcels using registered buses."
    },

    {
      title: "AI Route Planner",
      icon: "🤖",
      text: "AI recommends the fastest travel route."
    },

    {
      title: "Multi Transport",
      icon: "🚇",
      text: "Metro, Auto, Bus & E-Rickshaw in one app."
    }
  ];

  return (
    <section className="features">

      <h2>Everything You Need In One App</h2>

      <div className="feature-grid">

        {cards.map((card, index) => (

          <div className="feature-card" key={index}>

            <h1>{card.icon}</h1>

            <h3>{card.title}</h3>

            <p>{card.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Features;