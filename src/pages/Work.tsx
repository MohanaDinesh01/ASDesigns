import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import "./Work.css";

export default function Work() {
  return (
    <main className="work-page">
      <div className="work-page__header">
        <span className="work-page__eyebrow">WORK</span>
        <h1 className="work-page__title">Selected projects</h1>
        <p className="work-page__subtext">
          A look at brand identity, video editing, and motion work delivered for
          clients across industries.
        </p>
      </div>

      <div className="work-page__grid">
        {caseStudies.map((study) => (
          <Link key={study.id} to={`/work/${study.id}`} className="work-card">
            <div className="work-card__media">
              <img src={study.thumbnail} alt={study.title} />
            </div>
            <div className="work-card__content">
              <span className="work-card__category">{study.category}</span>
              <h2 className="work-card__title">{study.title}</h2>
              <p className="work-card__client">{study.client}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
