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
    id: "vanguard-branding",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    client: "Vanguard Coffee Co.",
    title:
      "Crafting a nostalgic yet modern visual identity for a premium roastery",
    category: "Logo Design / Brand Identity",
    outcome:
      "Created a comprehensive brand book, custom typography, and primary logos that helped secure prime retail placement in 45 regional supermarkets.",
    tags: ["Logo Design", "Typography", "Vector Illustration", "Packaging"],
  },
  {
    id: "velocity-marketing",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    client: "Velocity Apparel",
    title: "High-impact visual assets for an international streetwear launch",
    category: "Graphic Design / Digital Media",
    outcome:
      "Designed over 50 social media assets, lookbooks, and web banners, contributing to a sold-out debut collection within 48 hours of launch.",
    tags: [
      "Graphic Design",
      "Art Direction",
      "Photoshop",
      "Social Media Graphics",
    ],
  },
  {
    id: "pulse-commercial",
    thumbnail:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    client: "Pulse Energy Drinks",
    title: "Editing a fast-paced, rhythmic ad campaign for Gen-Z audiences",
    category: "Video Editing / Motion Graphics",
    outcome:
      "Cut a 30-second commercial sequence and multi-format vertical clips that generated over 2.4 million views across TikTok and Instagram Reels.",
    tags: ["Video Editing", "Color Grading", "Sound Design", "Premiere Pro"],
  },
];
