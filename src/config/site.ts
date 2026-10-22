/** Add verified contact details here. Empty fields are intentionally not rendered as links. */
export const site = {
  name: "Nasim Akbari",
  professionalTitle: "Product Designer & AI-Powered Web Creator",
  contact: {
    email: "",
  },
};

/** Paths verified against the uploaded originals in public/images. */
export const projects = [
  {
    id: "beatpass",
    name: "BeatPass",
    image: "/images/beatpass.png",
    href: "https://www.behance.net/gallery/235854753/BeatPass-Music-Ticketing-UXUI-Case-Study",
  },
  {
    id: "ecogold",
    name: "EcoGold",
    image: "/images/ecogold.png",
    href: "https://www.behance.net/gallery/236959891/EcoGold-Smart-Investment-Web-App",
  },
  {
    id: "shipply",
    name: "Shipply",
    image: "/images/shipply.png",
    href: "https://www.behance.net/gallery/237315851/Cargo-Delivery-App",
  },
] as const;
