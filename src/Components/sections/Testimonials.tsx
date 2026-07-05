// import logoavatar from "../../assets/logo.png";
import d2decorslogo from "../../assets/D2DECORS.png";
import "./Testimonials.css";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: "d2-decors",
    quote:
      "I am extremely happy with the design work. Every design was modern, attractive, and exactly matched my requirements. I highly recommend this designer to anyone looking for high-quality, creative, and reliable design services. Thank you for the excellent work!",
    name: "Umapathy",
    role: "Founder, D2 Decors",
    avatar: d2decorslogo,
  },
  {
    id: "pulse-fitness",
    quote:
      "Our reels used to get scrolled past in seconds. After the edits, people actually watch to the end and comment.",
    name: "Daniel Cho",
    role: "Marketing Lead, Pulse Fitness",
    avatar: d2decorslogo,
  },
  {
    id: "orbit-labs",
    quote:
      "Fast turnaround, sharp motion work, and genuinely good instincts on pacing. Exactly what our launch needed.",
    name: "Sara Al-Farsi",
    role: "Product Manager, Orbit Labs",
    avatar: d2decorslogo,
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__header">
        <span className="testimonials__eyebrow">TESTIMONIALS</span>
        <h2 className="testimonials__title">What clients say</h2>
      </div>

      <div className="testimonials__grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <span className="testimonial-card__mark">&ldquo;</span>
            <p className="testimonial-card__quote">{testimonial.quote}</p>
            <div className="testimonial-card__author">
              <img
                className="testimonial-card__avatar"
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <div className="testimonial-card__author-info">
                <span className="testimonial-card__name">
                  {testimonial.name}
                </span>
                <span className="testimonial-card__role">
                  {testimonial.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
