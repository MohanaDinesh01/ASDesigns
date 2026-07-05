import logoAvatar from "../../assets/logo.png";
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
    id: "nova-studio",
    quote:
      "AS Designs completely changed how our brand looks online. Every asset feels intentional now, not thrown together.",
    name: "Priya Menon",
    role: "Founder, Nova Studio",
    avatar: logoAvatar,
  },
  {
    id: "pulse-fitness",
    quote:
      "Our reels used to get scrolled past in seconds. After the edits, people actually watch to the end and comment.",
    name: "Daniel Cho",
    role: "Marketing Lead, Pulse Fitness",
    avatar: logoAvatar,
  },
  {
    id: "orbit-labs",
    quote:
      "Fast turnaround, sharp motion work, and genuinely good instincts on pacing. Exactly what our launch needed.",
    name: "Sara Al-Farsi",
    role: "Product Manager, Orbit Labs",
    avatar: logoAvatar,
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
