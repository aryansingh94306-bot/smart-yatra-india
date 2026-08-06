function TestimonialCard({ name, city, review }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "#0F4C81",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "15px",
        }}
      >
        {name[0]}
      </div>

      <h3>{name}</h3>
      <p style={{ color: "gray" }}>{city}</p>

      <p
        style={{
          marginTop: "15px",
          lineHeight: "1.7",
        }}
      >
        "{review}"
      </p>

      <div
        style={{
          marginTop: "15px",
          color: "#FFD700",
          fontSize: "22px",
        }}
      >
        ★★★★★
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section
      style={{
        background: "#F5F7FA",
        padding: "80px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0F4C81",
          marginBottom: "45px",
        }}
      >
        What Our Travelers Say
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <TestimonialCard
          name="Rahul Sharma"
          city="Indore"
          review="SmartYatra helped me travel from my village to Bhopal without any confusion."
        />

        <TestimonialCard
          name="Priya Patel"
          city="Sehore"
          review="The AI assistant suggested a cheaper route and saved me both time and money."
        />

        <TestimonialCard
          name="Aman Verma"
          city="Jabalpur"
          review="Live tracking and QR ticketing made my journey smooth and hassle-free."
        />
      </div>
    </section>
  );
}

export default Testimonials;