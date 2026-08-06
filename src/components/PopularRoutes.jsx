function Card({ from, to, fare, time }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
      }}
    >
      <h2>{from}</h2>

      <h3 style={{ color: "#0F4C81" }}>⬇</h3>

      <h2>{to}</h2>

      <hr />

      <p>Fare : ₹{fare}</p>

      <p>Time : {time}</p>
    </div>
  );
}

function PopularRoutes() {
  return (
    <section
      style={{
        padding: "70px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#0F4C81",
        }}
      >
        Popular Routes
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <Card from="Indore" to="Bhopal" fare="320" time="4 hrs" />

        <Card from="Sehore" to="Bhopal" fare="120" time="1.5 hrs" />

        <Card from="Jabalpur" to="Indore" fare="520" time="8 hrs" />

        <Card from="Ujjain" to="Indore" fare="90" time="1 hr" />
      </div>
    </section>
  );
}

export default PopularRoutes;