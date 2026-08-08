import Hero from "../components/Hero";
import JourneySearch from "../components/JourneySearch";
import LiveStats from "../components/LiveStats";
import IndiaNetwork from "../components/IndiaNetwork";
import LiveMap from "../components/Livemap";
import Features from "../components/Features";
import PopularRoutes from "../components/PopularRoutes";
import AIShowcase from "../components/AIShowcase";
import QuickServices from "../components/QuickServices";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import LocationPicker from "../components/LocationPicker";
function Home() {
  return (
    <>
      <Hero />
      <JourneySearch />
      <LocationPicker />
      <LiveStats />
      <IndiaNetwork />
      <LiveMap />
      <Features />
      <PopularRoutes />
      <AIShowcase />
      <QuickServices />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;
