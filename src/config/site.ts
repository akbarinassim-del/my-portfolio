/** Verified identity, assets, and contact details supplied by Nasim Akbari. */
export const site = {
  name: "Nasim Akbari",
  professionalTitle: "Product Designer & AI-Powered Web Creator",
  url: "https://nasim-akbari.vercel.app",
  portrait: { src: "/images/nasim-hero-dark.png", width: 1086, height: 1448 },
  cv: "/Nasim-Akbari-CV.pdf",
  profile: "https://talents.xgen.design/#nasim-akbari",
  certificate: "https://xgen.design/certificate/XGA-UIHack-2-2025-C302-8319/",
  contact: {
    email: "akbari.nassim@gmail.com",
    phone: "+98 918 997 7130",
    phoneHref: "tel:+989189977130",
    linkedin: "https://www.linkedin.com/in/nasimakbari-uiux",
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
