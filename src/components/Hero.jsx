import "./Hero.css";
import { Link } from "react-router-dom";

function Hero(){

return(

<section className="hero">

<div className="hero-content">

<h1>SmartYatra</h1>

<h2>India's Unified Smart Mobility Platform</h2>

<p>

Plan journeys, discover nearby buses, send parcels, book digital tickets,
track vehicles live and navigate seamlessly across buses, metros,
autos and e-rickshaws — all in one application.

</p>

<Link to="/journey-planner">

<button>

Plan My Journey

</button>

</Link>

</div>

</section>

);

}

export default Hero;