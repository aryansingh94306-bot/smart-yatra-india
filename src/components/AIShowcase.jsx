function AIShowcase() {
  return (
    <section
      style={{
        background: "#0F4C81",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>
        Meet SmartYatra AI
      </h1>

      <p
        style={{
          maxWidth: "750px",
          margin: "25px auto",
          lineHeight: "1.8",
        }}
      >
        Ask anything.

        Find buses.

        Compare fares.

        Predict delays.

        Get safer routes.

        Book your journey within seconds.
      </p>

      <button
        style={{
          background: "white",
          color: "#0F4C81",
          padding: "15px 35px",
          borderRadius: "12px",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Chat with AI
      </button>
    </section>
  );
}

export default AIShowcase;