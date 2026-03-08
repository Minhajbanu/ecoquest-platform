function ProgressBar({ points }) {
  const maxPoints = 600; // Level 4 max
  const percentage = (points / maxPoints) * 100;

  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{
        background: "#ddd",
        borderRadius: "20px",
        height: "20px",
        width: "100%"
      }}>
        <div style={{
          width: `${percentage}%`,
          background: "#2e7d32",
          height: "100%",
          borderRadius: "20px",
          transition: "0.5s"
        }} />
      </div>
      <p style={{ marginTop: "8px" }}>
        Progress: {points} / {maxPoints}
      </p>
    </div>
  );
}

export default ProgressBar;