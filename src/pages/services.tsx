import Hero from "../components/services/Hero";
import AboutPage from "../components/services/AboutService";
import Package from "../components/services/Package";

const services = () => {
  return (
    <div className="services">
      <Hero />
      <AboutPage />
      <Package />
    </div>
  );
};

export default services;
