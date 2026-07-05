import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import CaseStudies from "../components/sections/CaseStudies";
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
