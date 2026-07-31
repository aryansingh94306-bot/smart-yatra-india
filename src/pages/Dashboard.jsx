import "./Dashboard.css";

function Dashboard() {

  const stats = [

    {
      title: "Active Buses",
      value: "1,248",
      icon: "🚌",
    },

    {
      title: "Passengers Today",
      value: "82,540",
      icon: "👥",
    },

    {
      title: "Parcels In Transit",
      value: "3,421",
      icon: "📦",
    },

    {
      title: "Average Delay",
      value: "3 min",
      icon: "⏱",
    },

  ];

  return (

    <div className="dashboard">

      <h1>🇮🇳 SmartYatra Control Centre</h1>

      <p>
        National Smart Public Transport Monitoring Dashboard
      </p>

      <div className="stats">

        {stats.map((item,index)=>(

          <div className="stat-card" key={index}>

            <h1>{item.icon}</h1>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

          </div>

        ))}

      </div>

      <div className="map-section">

        <h2>🗺 Live India Transport Network</h2>

        <div className="map-placeholder">

          🚍 Live GPS Tracking Map (Prototype)

        </div>

      </div>

    </div>

  );

}

export default Dashboard;