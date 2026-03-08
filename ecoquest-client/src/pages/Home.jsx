

import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>🌿 Welcome to EcoQuest</h1>
        <p>
          Take eco-friendly challenges, earn rewards,
          and make the planet greener — one task at a time.
        </p>

        <Link to="/signup" className="cta-btn">
          Start Your Journey 🚀
        </Link>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step-card">
            <h3>1️⃣ Complete Tasks</h3>
            <p>Pick eco-friendly tasks like planting trees or recycling.</p>
          </div>

          <div className="step-card">
            <h3>2️⃣ Upload Proof</h3>
            <p>Submit images as proof and earn points.</p>
          </div>

          <div className="step-card">
            <h3>3️⃣ Earn Rewards</h3>
            <p>Level up and unlock eco-certificates.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose EcoQuest?</h2>

        <div className="feature-grid">
          <div className="feature">
            🌍 Real Environmental Impact
          </div>
          <div className="feature">
            🏆 Gamified Learning Experience
          </div>
          <div className="feature">
            📈 Track Your Progress
          </div>
          <div className="feature">
            🎖 Earn Recognized Certificates
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="final-cta">
        <h2>Ready to Make a Difference?</h2>
        <Link to="/signup" className="cta-btn">
          Join EcoQuest Now 🌱
        </Link>
      </section>

    </div>
  );
}

export default Home;