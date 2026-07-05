import logoThumbnail from "../assets/logo.png";

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: string;
  thumbnail: string;
  outcome: string;
  tags: string[];
  description?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "nova-studio-refresh",
    client: "Nova Studio",
    title: "A sharper identity for a fast-moving creative team",
    category: "Brand identity",
    thumbnail: logoThumbnail,
    outcome: "40% increase in engagement",
    tags: ["Logo system", "Brand kit", "Launch assets"],
    description:
      "Nova Studio needed a visual identity that matched the pace of their work. We rebuilt their logo system, color palette, and social templates so every touchpoint felt consistent.",
  },
  {
    id: "pulse-fitness-campaign",
    client: "Pulse Fitness",
    title: "Social edits built to hold attention past the first second",
    category: "Video editing",
    thumbnail: logoThumbnail,
    outcome: "2.4x more video saves",
    tags: ["Reels", "Color grade", "Captions"],
    description:
      "Pulse Fitness came to us with raw gym footage and a scroll-past problem. We restructured pacing, added dynamic captions, and graded every clip for a consistent, punchy feed.",
  },
  {
    id: "orbit-product-launch",
    client: "Orbit Labs",
    title: "Motion-led launch visuals for a new product story",
    category: "Motion graphics",
    thumbnail: logoThumbnail,
    outcome: "65% lift in click-through",
    tags: ["Launch film", "Title design", "Social cutdowns"],
    description:
      "Orbit Labs needed their product launch to feel as sharp as the product itself. We built a full motion package: launch film, animated titles, and cutdowns for every platform.",
  },
];
