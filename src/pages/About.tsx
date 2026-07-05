import "./About.css";

const tools = ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"];

export default function About() {
  return (
    <main className="about-page">
      <div className="about-page__header">
        <span className="about-page__eyebrow">ABOUT</span>
        <h1 className="about-page__title">The studio behind the screen</h1>
        <p className="about-page__intro">
          AS Designs is a one-person studio built around a simple idea: brands
          deserve visuals that hold attention, not just fill space. Every
          project blends graphic design and video editing into one consistent
          voice — so whatever platform your audience finds you on, it feels like
          the same brand.
        </p>
      </div>

      <div className="about-page__section">
        <span className="about-page__label">How I work</span>
        <div className="about-page__process">
          <div className="process-step">
            <span className="process-step__time">00:00:01:00</span>
            <h3 className="process-step__title">Discovery</h3>
            <p className="process-step__desc">
              Understanding your brand, audience, and what "done well" actually
              looks like for your business.
            </p>
          </div>
          <div className="process-step">
            <span className="process-step__time">00:00:02:00</span>
            <h3 className="process-step__title">Concept</h3>
            <p className="process-step__desc">
              Exploring directions before committing — so the final result isn't
              the first idea, it's the right one.
            </p>
          </div>
          <div className="process-step">
            <span className="process-step__time">00:00:03:00</span>
            <h3 className="process-step__title">Production</h3>
            <p className="process-step__desc">
              Designing, editing, and refining with regular check-ins, not a
              black box until the deadline.
            </p>
          </div>
          <div className="process-step">
            <span className="process-step__time">00:00:04:00</span>
            <h3 className="process-step__title">Delivery</h3>
            <p className="process-step__desc">
              Final files, organized and ready to use, plus a short handoff so
              your team knows how to use them.
            </p>
          </div>
        </div>
      </div>

      <div className="about-page__section">
        <span className="about-page__label">Tools</span>
        <div className="about-page__tools">
          {tools.map((tool) => (
            <span key={tool} className="about-page__tool">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
