import Hero from "../Components/sections/Hero";
import Services from "../Components/sections/Services";
import CaseStudies from "../Components/sections/CaseStudies";
import Testimonials from "../components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <CaseStudies />
      <Testimonials />
    </main>
  );
}
