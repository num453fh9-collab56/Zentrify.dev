import { motionCyberShield } from "./editable/motion-cyber-shield";
import { motionGlassProduct } from "./editable/motion-glass-product";
import { motionHoloFinance } from "./editable/motion-holo-finance";
import { motionKineticAgency } from "./editable/motion-kinetic-agency";
import { motionNeonArcade } from "./editable/motion-neon-arcade";
import { motionNeuralAi } from "./editable/motion-neural-ai";
import { motionVelocityAuto } from "./editable/motion-velocity-auto";
import { motionMarbleEstate } from "./editable/motion-marble-estate";
import { motionTitanFitness } from "./editable/motion-titan-fitness";
import { motionHorizonTravel } from "./editable/motion-horizon-travel";
import { motionPulseHealth } from "./editable/motion-pulse-health";
import { motionAperturePhoto } from "./editable/motion-aperture-photo";
import { motionNovaEdu } from "./editable/motion-nova-edu";
import { motionElanFashion } from "./editable/motion-elan-fashion";

export const motionTemplates = [
  {
    id: "motion-cyber-shield",
    name: "CyberShield — Cybersecurity",
    category: "Tech / SaaS",
    description: "Dark cybersecurity landing with animated threat counters, scanning grid, neon glow effects, security dashboard, and motion-rich micro-interactions.",
    thumb: "🛡️",
    getCode: () => motionCyberShield.render(motionCyberShield.defaults),
  },
  {
    id: "motion-glass-product",
    name: "Prism — 3D Glass Product",
    category: "E-Commerce",
    description: "Glass morphism product showcase with 3D perspective cards, floating elements, frosted-glass UI, reveal animations, and smooth parallax effects.",
    thumb: "💎",
    getCode: () => motionGlassProduct.render(motionGlassProduct.defaults),
  },
  {
    id: "motion-holo-finance",
    name: "Velaris — Digital Finance",
    category: "Finance",
    description: "Holographic-styled digital finance platform with animated ticker, gradient mesh orbs, floating cards, and futuristic trading dashboard.",
    thumb: "📊",
    getCode: () => motionHoloFinance.render(motionHoloFinance.defaults),
  },
  {
    id: "motion-kinetic-agency",
    name: "KINETIC — Creative Agency",
    category: "Agency",
    description: "Bold creative agency with full-viewport type, horizontal scroll reel, magnetic hover effects, and signature motion-design aesthetic.",
    thumb: "🎬",
    getCode: () => motionKineticAgency.render(motionKineticAgency.defaults),
  },
  {
    id: "motion-neon-arcade",
    name: "NEXUS — Gaming / Arcade",
    category: "Gaming / Esports",
    description: "Neon-soaked gaming landing page with arcade glow effects, scanline overlays, glitch text, animated specs grid, and edition cards.",
    thumb: "🕹️",
    getCode: () => motionNeonArcade.render(motionNeonArcade.defaults),
  },
  {
    id: "motion-neural-ai",
    name: "Synthora — Neural AI Platform",
    category: "Tech / SaaS",
    description: "Neural-network-themed AI platform with particle connections, pulsing metric rings, flowing workflow diagram, and deep-space atmosphere.",
    thumb: "🧠",
    getCode: () => motionNeuralAi.render(motionNeuralAi.defaults),
  },
  {
    id: "motion-velocity-auto",
    name: "Velocity — Supercar Showcase",
    category: "Automotive",
    description: "High-contrast automotive landing with speed-line decorations, animated spec bars, horizontal scroll gallery, and trim-level pricing.",
    thumb: "🏎️",
    getCode: () => motionVelocityAuto.render(motionVelocityAuto.defaults),
  },
  {
    id: "motion-marble-estate",
    name: "Marble — Luxury Properties",
    category: "Real Estate",
    description: "Elegant real estate showcase with Playfair serif headings, gold accent lines, property cards with price overlay, and editorial testimonials.",
    thumb: "🏛️",
    getCode: () => motionMarbleEstate.render(motionMarbleEstate.defaults),
  },
  {
    id: "motion-titan-fitness",
    name: "Titan — Performance Gym",
    category: "Fitness",
    description: "Bold fitness landing with diagonal stripe patterns, animated stat counters, class schedule table, trainer cards, and membership tiers.",
    thumb: "💪",
    getCode: () => motionTitanFitness.render(motionTitanFitness.defaults),
  },
  {
    id: "motion-horizon-travel",
    name: "Horizon — Travel Experience",
    category: "Travel",
    description: "Warm immersive travel page with destination cards, price badges, parallax hero, animated stats bar, and newsletter signup.",
    thumb: "✈️",
    getCode: () => motionHorizonTravel.render(motionHorizonTravel.defaults),
  },
  {
    id: "motion-pulse-health",
    name: "Pulse — Digital Health",
    category: "Healthcare",
    description: "Professional healthcare landing with pulsing badge animation, metric counters, doctor profiles, service grid, and FAQ accordion.",
    thumb: "🩺",
    getCode: () => motionPulseHealth.render(motionPulseHealth.defaults),
  },
  {
    id: "motion-aperture-photo",
    name: "Aperture — Photo Studio",
    category: "Photography",
    description: "Minimal gallery-focused photography page with masonry layout, hover zoom overlays, split about section, and service pricing.",
    thumb: "📷",
    getCode: () => motionAperturePhoto.render(motionAperturePhoto.defaults),
  },
  {
    id: "motion-nova-edu",
    name: "Nova — Learning Platform",
    category: "Education",
    description: "Vibrant e-learning platform with gradient orbs, course cards with star ratings, instructor profiles, stat counters, and pricing plans.",
    thumb: "🎓",
    getCode: () => motionNovaEdu.render(motionNovaEdu.defaults),
  },
  {
    id: "motion-elan-fashion",
    name: "Élan — Fashion House",
    category: "Fashion / Lifestyle",
    description: "Editorial high-fashion aesthetic with Playfair serif type, collection grid, lookbook gallery, press marquee ticker, and dramatic spacing.",
    thumb: "👗",
    getCode: () => motionElanFashion.render(motionElanFashion.defaults),
  },
];
