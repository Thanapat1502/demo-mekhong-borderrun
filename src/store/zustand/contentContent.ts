import { create } from "zustand";
interface PickupPointsModalProps {
  image: string;
  name: string;
  description: string;
}
type State = {
  destinations: PickupPointsModalProps[];
};

export const useContentStore = create<State>(() => ({
  destinations: [
    {
      name: "Tha Pae Gate",
      image: "/image/home/pickup/tha-pae-gate.jpg",
      description: "Historic city gate area",
    },
    {
      name: "Chiang Mai Gate",
      image: "/image/home/pickup/chiang-mai-gate.webp",
      description: "Chiang Mai gate area",
    },
    {
      name: "Central Festival",
      image: "/image/home/pickup/central.webp",
      description: "Central Chiang Mai Shopping center",
    },
    {
      name: "MAYA Lifestyle",
      image: "/image/home/pickup/maya.jpg",
      description: "MAYA shopping mall",
    },
    {
      name: "Chiang Main Downtown",
      image: "/image/home/pickup/downtown1.jpg",
      description: "Chiang Main Downtown",
    },
  ],
}));
