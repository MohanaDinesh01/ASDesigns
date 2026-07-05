import "./Services.css";

interface Service {
  time: string;
  title: string;
  description: string;
  tags: string[];
}

const services: Service[] = [
  {
    time: "00:00:01:00",
    title: "Brand identity",
    description:
      "Logos, color systems, and visual guidelines that make a brand recognizable at a glance.",
    tags: ["Logo design", "Brand guidelines", "Social kits"],
  },
  {
    time: "00:00:02:00",
    title: "Video editing",
    description:
      "Cut, color, and pace your footage into something people actually watch to the end.",
    tags: ["Reels & shorts", "Promo videos", "Color grading"],
  },
  {
    time: "00:00:03:00",
    title: "Motion graphics",
    description:
      "Titles, transitions, and animated elements that give your video work a polished edge.",
    tags: ["Titles & lower thirds", "Logo animation", "Explainer graphics"],
  },
  {
    time: "00:00:04:00",
    title: "Social content",
    description:
      "Ongoing design and edit support so your feed stays consistent and on-brand.",
    tags: ["Content calendars", "Templates", "Batch editing"],
  },
  {
    time: "00:00:05:00",
    title: "Website & UI Design",
    description:
      "High-converting layouts, wireframes, and digital interfaces built to turn casual visitors into loyal customers.",
    tags: ["UI/UX wireframes", "Landing pages", "Figma design"],
  },
  {
    time: "00:00:06:00",
    title: "Advertising Creative",
    description:
      "High-performance visual hooks and dynamic ad variants engineered to maximize clicks and stop the scroll.",
    tags: [
      "Meta & TikTok ads",
      "Static banner suites",
      "Direct-response hooks",
    ],
  },
];

export default function Services() {
  return (
    <section className="services">
      <div className="services__header">
        <span className="services__eyebrow">SERVICES</span>
        <h2 className="services__title">What I bring to the timeline</h2>
      </div>

      <div className="services__list">
        {services.map((service) => (
          <div key={service.time} className="service-card">
            <span className="service-card__time">{service.time}</span>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
            <div className="service-card__tags">
              {service.tags.map((tag) => (
                <span key={tag} className="service-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
