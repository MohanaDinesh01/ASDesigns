import { Link } from "react-router-dom";
import { caseStudies } from "../../data/caseStudies";
import "./CaseStudies.css";

export default function CaseStudies() {
  return (
    <section className="case-studies">
      <div className="case-studies__header">
        <span className="case-studies__eyebrow">CASE STUDIES</span>
        <h2 className="case-studies__title">Selected work</h2>
      </div>

      <div className="case-studies__grid">
        {caseStudies.map((study) => (
          <Link
            key={study.id}
            className="case-study-card"
            to={`/work/${study.id}`}
          >
            <div className="case-study-card__media">
              <img
                className="case-study-card__image"
                src={study.thumbnail}
                alt={`${study.client} ${study.title}`}
              />
            </div>
            <div className="case-study-card__content">
              <span className="case-study-card__category">
                {study.category}
              </span>
              <h3 className="case-study-card__title">{study.title}</h3>
              <p className="case-study-card__client">{study.client}</p>
              <p className="case-study-card__outcome">{study.outcome}</p>
              <div className="case-study-card__tags">
                {study.tags.map((tag) => (
                  <span key={tag} className="case-study-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
