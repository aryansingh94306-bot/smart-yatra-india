import { useState } from "react";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const getAnswer = () => {
    const q = question.toLowerCase();

    if (q.includes("indore") && q.includes("bhopal")) {
      setAnswer(
        "🚌 Best Route: Indore → Sehore → Bhopal\n⏱ Time: 3 hrs 20 mins\n💰 Fare: ₹320"
      );
    } else if (q.includes("sehore")) {
      setAnswer(
        "🚌 Next bus from Sehore leaves at 8:30 AM.\nETA: 2 hrs 10 mins."
      );
    } else if (q.includes("airport")) {
      setAnswer(
        "✈ Take RuralLink Express to Indore Airport. Next bus departs in 20 minutes."
      );
    } else {
      setAnswer(
        "🤖 Sorry, I don't have information for that route yet."
      );
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#0F4C81" }}>AI Travel Assistant</h1>

      <p>
        Ask anything about routes, buses or travel.
      </p>

      <input
        type="text"
        placeholder="Example: How do I travel from Indore to Bhopal?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <button
        onClick={getAnswer}
        style={{
          marginTop: "20px",
          background: "#0F4C81",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Ask AI
      </button>

      {answer && (
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            whiteSpace: "pre-line",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default AIAssistant;