import { useParams, Link, Navigate } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import "./WorkDetail.css";

export default function WorkDetail() {
  const { id } = useParams();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return <Navigate to="/work" replace />;
  }

  return (
    <main className="work-detail">
      <Link to="/work" className="work-detail__back">
        ← Back to work
      </Link>

      <span className="work-detail__category">{study.category}</span>
      <h1 className="work-detail__title">{study.title}</h1>
      <p className="work-detail__client">{study.client}</p>

      <div className="work-detail__media">
        <img src={study.thumbnail} alt={study.title} />
      </div>

      <div className="work-detail__body">
        <p className="work-detail__description">{study.description}</p>

        <div className="work-detail__outcome">
          <span className="work-detail__outcome-label">Result</span>
          <span className="work-detail__outcome-value">{study.outcome}</span>
        </div>

        <div className="work-detail__tags">
          {study.tags.map((tag) => (
            <span key={tag} className="work-detail__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
