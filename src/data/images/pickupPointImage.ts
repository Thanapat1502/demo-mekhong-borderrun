export interface PickupPointImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  description: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const pickupPointImages: PickupPointImage[] = [
  {
    id: "tha-pae-gate",
    src: "/image/home/pickup/tha-pae-gate.jpg",
    alt: "Tha Pae Gate pickup point",
    title: "Tha Pae Gate",
    location: "Old City Center",
    description: "Historic gate and popular meeting point in Chiang Mai's old city",
    landmark: "Famous ancient city gate",
    coordinates: { lat: 18.7883, lng: 98.9917 },
  },
  {
    id: "central-festival",
    src: "/image/home/pickup/central.webp", 
    alt: "Central Festival Chiang Mai pickup point",
    title: "Central Festival",
    location: "Shopping Mall",
    description: "Major shopping center with easy access and parking",
    landmark: "Large shopping mall",
    coordinates: { lat: 18.8021, lng: 99.0158 },
  },
  {
    id: "maya-mall",
    src: "/image/home/pickup/maya.jpg",
    alt: "Maya Lifestyle Shopping Center pickup point", 
    title: "Maya Lifestyle",
    location: "Nimman Area",
    description: "Modern shopping center in trendy Nimman district",
    landmark: "Popular shopping destination",
    coordinates: { lat: 18.7969, lng: 98.9683 },
  },
  {
    id: "downtown-area",
    src: "/image/home/pickup/downtown1.jpg",
    alt: "Downtown Chiang Mai pickup point",
    title: "Downtown Area",
    location: "City Center", 
    description: "Central business district with multiple pickup options",
    landmark: "Business and commercial center",
    coordinates: { lat: 18.7883, lng: 98.9853 },
  },
  {
    id: "chiang-mai-gate",
    src: "/image/home/pickup/chiang-mai-gate.webp",
    alt: "Chiang Mai Gate pickup point",
    title: "Chiang Mai Gate",
    location: "South Gate",
    description: "Historic southern entrance to the old city",
    landmark: "Ancient city gate",
    coordinates: { lat: 18.7833, lng: 98.9867 },
  },
];

// Get pickup point by ID
export const getPickupPointById = (id: string): PickupPointImage | undefined => {
  return pickupPointImages.find(point => point.id === id);
};

// Get pickup points by location
export const getPickupPointsByLocation = (location: string): PickupPointImage[] => {
  return pickupPointImages.filter(point => 
    point.location.toLowerCase().includes(location.toLowerCase())
  );
};

// Get all pickup points sorted by title
export const getPickupPointsSorted = (): PickupPointImage[] => {
  return pickupPointImages.sort((a, b) => a.title.localeCompare(b.title));
};
