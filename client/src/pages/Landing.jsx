import { ArrowRight, Play } from "lucide-react" ;
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="landing-page">
      <section className="landing-copy">
        <img
          src="/dineway-logo.png"
          alt="Dineway Restaurant Solutions Logo"
          className="landing-logo"
        />
        <div className="welcome-rule">
          <span />
          <p>WELCOME TO DINEWAY</p>
          <span />
        </div>
        <h1>
          <span>Grow Your Business</span> With Us
        </h1>
        <p className="landing-text">
          All-in-one restaurant management solution to simplify operations and
          delight your customers
        </p>
        <div className="landing-actions">
          <Link className="primary-cta" to="/login">
            Get Started
            <ArrowRight size={38} />
          </Link>
          <button className="demo-cta" type="button">
            <span>
              <Play size={24} />
            </span>
            Watch Demo
          </button>
        </div>
      </section>
      <section className="landing-art" aria-label="Dineway restaurant preview">
        <div className="dot-grid dot-grid-one" />
        <div className="dot-grid dot-grid-two" />
        <div className="orbit orbit-one" />
        <div className="hero-plate">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=980&q=80"
            alt="Fine dining dish"
          />
        </div>
        {[0, 1, 2].map((item) => (
          <div className={`small-dish small-dish-${item + 1}`} key={item}>
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=260&q=80"
              alt="Food plate"
            />
          </div>
        ))}
        <div className="gold-moon" />
      </section>
    </main>
  );
}
