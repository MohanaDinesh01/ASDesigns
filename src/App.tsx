// router components: BrowserRouter enables routing, Routes/Route define paths
import { BrowserRouter, Routes, Route } from "react-router-dom";

// top navigation bar component
import Navbar from "./Components/layout/Navbar";

// footer component
import Footer from "./Components/layout/Footer";

// likely a scroll-progress indicator (e.g. a line/dot that moves as you scroll)
import ScrollPlayhead from "./Components/ui/ScrollPlayhead";

// a label fixed to the side of the screen (decorative/branding UI)
import SideLabel from "./Components/ui/SideLabel";

// page components for each route
import Home from "./pages/Home";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrintPrep from "./pages/PrintPrep";

function App() {
  return (
    // enables client-side routing (URL changes without full page reload)
    <BrowserRouter>
      {/* shown on every page: scroll indicator */}
      <ScrollPlayhead />

      {/* shown on every page: side label */}
      <SideLabel />

      {/* shown on every page: navigation bar */}
      <Navbar />

      {/* defines which component renders for each URL path */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* homepage */}
        <Route path="/work" element={<Work />} /> {/* work listing page */}
        <Route path="/work/:id" element={<WorkDetail />} />{" "}
        {/* single work item, :id is a dynamic URL param */}
        <Route path="/about" element={<About />} /> {/* about page */}
        <Route path="/contact" element={<Contact />} /> {/* contact page */}
        <Route path="/tools/print-prep" element={<PrintPrep />} />
      </Routes>

      {/* shown on every page: footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App; // makes App available for import in main.tsx
