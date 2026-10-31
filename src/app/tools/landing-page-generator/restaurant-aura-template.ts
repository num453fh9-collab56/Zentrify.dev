import { auraDining } from "./editable/aura-dining";

// Aura Dining is fully editable; the gallery shows its default content.
export const restaurantAuraTemplates = [
  {
    id: auraDining.id,
    name: "Aura Dining — Luxury Restaurant",
    category: "Restaurant",
    description:
      "Luxury restaurant page with full-screen hero, menu, gallery, chef story, reviews, location with map and hours, and a working reservation form.",
    thumb: "🍽️",
    getCode: () => auraDining.render(auraDining.defaults),
  },
];
