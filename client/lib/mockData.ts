export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price: number;
  paymentMethod: "online" | "cash";
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: "user" | "admin";
}

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Plumbing Repairs",
    category: "Plumbing",
    description: "Professional plumbing repairs for pipes, faucets, and leaks",
    price: 150,
    rating: 4.8,
    reviews: 342,
    image: "https://plus.unsplash.com/premium_photo-1664301135901-383935f2104f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UGx1bWJpbmclMjBSZXBhaXJzfGVufDB8fDB8fHww",
    duration: "2-3 hours",
  },
  {
    id: "2",
    name: "  Repair",
    category: "Electrical",
    description: "Expert electrical repair, wiring, and safety inspection services",
    price: 180,
    rating: 4.7,
    reviews: 298,
    image: "https://media.istockphoto.com/id/1170698387/photo/workers-use-clamp-meter-to-measure-the-current-of-electrical-wires-produced-from-solar-energy.webp?a=1&b=1&s=612x612&w=0&k=20&c=VnGCEmDfTPaJg_fsmDa93pITj7dxNpXrM2VBS3MUc5I=",
    duration: "1-2 hours",
  },
  {
    id: "3",
    name: "AC Repair & Maintenance",
    category: "HVAC",
    description: "Air conditioning repair, servicing, and maintenance",
    price: 200,
    rating: 4.9,
    reviews: 521,
    image: "https://media.istockphoto.com/id/1473146054/photo/aircon-maintenance-engineers.webp?a=1&b=1&s=612x612&w=0&k=20&c=MxMUWO3QSW8DCOgrpofYf9caTcc8vCYXux-Z9H9XQoM=",
    duration: "1.5-2 hours",
  },
  {
    id: "4",
    name: "Home Cleaning",
    category: "Cleaning",
    description: "Deep cleaning, regular maintenance, and eco-friendly cleaning services",
    price: 120,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEhvbWUlMjBDbGVhbmluZ3xlbnwwfHwwfHx8MA%3D%3D",
    duration: "2-4 hours",
  },
  {
    id: "5",
    name: "Painting Service",
    category: "Painting",
    description: "Interior and exterior painting with high-quality finishes",
    price: 250,
    rating: 4.7,
    reviews: 445,
    image: "https://plus.unsplash.com/premium_photo-1661313691854-343d607bbace?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBhaW50aW5nJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D",
    duration: "4-8 hours",
  },
  {
    id: "6",
    name: "Carpentry Work",
    category: "Carpentry",
    description: "Custom carpentry, furniture repair, and wood finishing",
    price: 160,
    rating: 4.8,
    reviews: 367,
    image: "https://media.istockphoto.com/id/472617726/photo/carpenter-at-his-workshop.webp?a=1&b=1&s=612x612&w=0&k=20&c=4TXhLgxLNjX-YCO1ghcKo3RvHcNfEw742zICCIy3cvQ=",
    duration: "2-6 hours",
  },
  {
    id: "7",
    name: "Pest Control",
    category: "Pest Control",
    description: "Safe and effective pest control treatments for all types of pests",
    price: 140,
    rating: 4.5,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFBlc3QlMjBDb250cm9sfGVufDB8fDB8fHww",
    duration: "1-2 hours",
  },
  {
    id: "8",
    name: "Locksmith Service",
    category: "Security",
    description: "Emergency locksmith, lock repair, and key duplication",
    price: 100,
    rating: 4.9,
    reviews: 612,
    image: "https://plus.unsplash.com/premium_photo-1663013665171-6fbaf0767d0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TG9ja3NtaXRoJTIwU2VydmljZXxlbnwwfHwwfHx8MA%3D%3D",
    duration: "30-60 minutes",
  },
  {
    id: "9",
    name: "Flooring Installation",
    category: "Flooring",
    description: "Hardwood, laminate, tile, and carpet installation",
    price: 300,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1624574470112-46944be68409?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Rmxvb3JpbmclMjBJbnN0YWxsYXRpb258ZW58MHx8MHx8fDA%3D",
    duration: "6-12 hours",
  },
  {
    id: "10",
    name: "Window Cleaning",
    category: "Cleaning",
    description: "Professional window cleaning for houses and offices",
    price: 100,
    rating: 4.6,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1482449609509-eae2a7ea42b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8V2luZG93JTIwQ2xlYW5pbmd8ZW58MHx8MHx8fDA%3D",
    duration: "1-2 hours",
  },
  {
    id: "11",
    name: "Handyman Services",
    category: "General",
    description: "General repairs, maintenance, and small home improvement projects",
    price: 130,
    rating: 4.7,
    reviews: 556,
    image: "https://plus.unsplash.com/premium_photo-1723874634715-246be2bb20ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGFuZHltYW4lMjBTZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    duration: "1-3 hours",
  },
  {
    id: "12",
    name: "Garden & Landscaping",
    category: "Landscaping",
    description: "Garden design, maintenance, and landscaping services",
    price: 170,
    rating: 4.6,
    reviews: 389,
    image: "https://media.istockphoto.com/id/157437387/photo/green-lawn-in-landscaped-formal-garden.webp?a=1&b=1&s=612x612&w=0&k=20&c=FRNuR_ji2sWA9GIGYToVloNtFyDrTvXYHML5DqiS1uw=",
    duration: "2-4 hours",
  },
  {
    id: "13",
    name: "Appliance Repair",
    category: "Appliances",
    description: "Repair and maintenance for all household appliances",
    price: 140,
    rating: 4.8,
    reviews: 467,
    image: "https://plus.unsplash.com/premium_photo-1661342474567-f84bb6959d9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QXBwbGlhbmNlJTIwUmVwYWlyfGVufDB8fDB8fHww",
    duration: "1-3 hours",
  },
  {
    id: "14",
    name: "Bathroom Renovation",
    category: "Renovation",
    description: "Complete bathroom renovation and modernization",
    price: 400,
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1629079447777-1e605162dc8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QmF0aHJvb20lMjBSZW5vdmF0aW9ufGVufDB8fDB8fHww",
    duration: "2-5 days",
  },
  {
    id: "15",
    name: "Kitchen Remodeling",
    category: "Renovation",
    description: "Custom kitchen design and complete remodeling services",
    price: 500,
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1682888813913-e13f18692019?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8S2l0Y2hlbiUyMFJlbW9kZWxpbmd8ZW58MHx8MHx8fDA%3D",
    duration: "3-7 days",
  },
  {
    id: "16",
    name: "Roof Repair",
    category: "Roofing",
    description: "Roof inspection, repair, and replacement services",
    price: 350,
    rating: 4.7,
    reviews: 212,
    image: "https://plus.unsplash.com/premium_photo-1682617326551-4749611516f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9vZiUyMHJlcGFpcnxlbnwwfHwwfHx8MA%3D%3D",
    duration: "3-8 hours",
  },
  {
    id: "17",
    name: "Gutter Cleaning",
    category: "Maintenance",
    description: "Professional gutter cleaning and maintenance",
    price: 90,
    rating: 4.5,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1664008760004-182420e58e7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEd1dHRlciUyMENsZWFuaW5nfGVufDB8fDB8fHww",
    duration: "1-2 hours",
  },
  {
    id: "18",
    name: "Pressure Washing",
    category: "Cleaning",
    description: "Pressure washing for driveways, patios, and exterior surfaces",
    price: 110,
    rating: 4.6,
    reviews: 523,
    image: "https://images.unsplash.com/photo-1718152470408-cfeebeb6b9fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UHJlc3N1cmUlMjBXYXNoaW5nfGVufDB8fDB8fHww",
    duration: "1-3 hours",
  },
  {
    id: "19",
    name: "Furniture Assembly",
    category: "Assembly",
    description: "Expert furniture assembly and installation services",
    price: 80,
    rating: 4.8,
    reviews: 612,
    image: "https://images.unsplash.com/photo-1645788241728-0ca8009c9e59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8RnVybml0dXJlJTIwQXNzZW1ibHl8ZW58MHx8MHx8fDA%3D",
    duration: "1-3 hours",
  },
  {
    id: "20",
    name: "Door Installation",
    category: "Doors & Windows",
    description: "Door installation, replacement, and repair",
    price: 180,
    rating: 4.7,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1762463464656-0102d99c3be3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RG9vciUyMEluc3RhbGxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    duration: "2-4 hours",
  },
  {
    id: "21",
    name: "Tile Installation",
    category: "Flooring",
    description: "Professional tile installation for bathrooms and kitchens",
    price: 200,
    rating: 4.8,
    reviews: 345,
    image: "https://images.unsplash.com/photo-1703868669362-562283170216?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VGlsZSUyMEluc3RhbGxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    duration: "4-8 hours",
  },
  {
    id: "22",
    name: "Drywall Installation",
    category: "Walls",
    description: "Drywall installation, repair, and finishing",
    price: 170,
    rating: 4.6,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1695651832926-66591245a88c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fERyeXdhbGwlMjBJbnN0YWxsYXRpb258ZW58MHx8MHx8fDA%3D",
    duration: "2-6 hours",
  },
  {
    id: "23",
    name: "Pool Cleaning & Maintenance",
    category: "Pools",
    description: "Regular pool cleaning, chemical balancing, and maintenance",
    price: 120,
    rating: 4.7,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1758530273222-440d6a8b0eea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UG9vbCUyMENsZWFuaW5nJTIwJTI2JTIwTWFpbnRlbmFuY2V8ZW58MHx8MHx8fDA%3D",
    duration: "1-2 hours",
  },
  {
    id: "24",
    name: "HVAC Installation",
    category: "HVAC",
    description: "New HVAC system installation and replacement",
    price: 600,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1716703432213-3c7a6f75e535?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SFZBQyUyMEluc3RhbGxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    duration: "4-8 hours",
  },
  {
    id: "25",
    name: "Insulation Installation",
    category: "Insulation",
    description: "Attic and wall insulation installation for energy efficiency",
    price: 250,
    rating: 4.7,
    reviews: 178,
    image: "https://plus.unsplash.com/premium_photo-1661957645816-099827ce621f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SW5zdWxhdGlvbiUyMEluc3RhbGxhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    duration: "3-6 hours",
  },
  {
    id: "26",
    name: "Water Heater Installation",
    category: "Plumbing",
    description: "Water heater installation and replacement services",
    price: 200,
    rating: 4.8,
    reviews: 234,
    image: "https://plus.unsplash.com/premium_photo-1682125979416-7633eff814c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2F0ZXIlMjBIZWF0ZXIlMjBJbnN0YWxsYXRpb258ZW58MHx8MHx8fDA%3D",
    duration: "2-4 hours",
  },
  {
    id: "27",
    name: "Carpet Cleaning",
    category: "Cleaning",
    description: "Professional carpet cleaning and stain removal",
    price: 130,
    rating: 4.6,
    reviews: 578,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FycGV0JTIwQ2xlYW5pbmd8ZW58MHx8MHx8fDA%3D",
    duration: "2-4 hours",
  },
  {
    id: "28",
    name: "Chimney Sweep",
    category: "Maintenance",
    description: "Chimney cleaning, inspection, and safety maintenance",
    price: 150,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1604413950933-073730fba9f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Q2hpbW5leSUyMFN3ZWVwfGVufDB8fDB8fHww",
    duration: "1-2 hours",
  },
  {
    id: "29",
    name: "Grout Cleaning",
    category: "Cleaning",
    description: "Professional grout cleaning and sealing services",
    price: 140,
    rating: 4.5,
    reviews: 223,
    image: "https://plus.unsplash.com/premium_photo-1663047003710-59dca9550087?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEdyb3V0JTIwQ2xlYW5pbmd8ZW58MHx8MHx8fDA%3D",
    duration: "2-3 hours",
  },
  {
    id: "30",
    name: "Deck Building & Repair",
    category: "Carpentry",
    description: "Custom deck construction, repair, and staining",
    price: 280,
    rating: 4.8,
    reviews: 267,
    image: "https://media.istockphoto.com/id/912332782/photo/wooden-deck-of-family-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=FZb17uCwiayOERnJ_YLdBrqddvKsPSqs0SAyAeN9x0Y=",
    duration: "2-5 days",
  },
  {
    id: "31",
    name: "Smart Home Installation",
    category: "Technology",
    description: "Installation of smart home devices and automation systems",
    price: 220,
    rating: 4.9,
    reviews: 312,
    image: "https://media.istockphoto.com/id/1435449590/photo/technician-installing-an-alarm-system-in-a-smart-home.webp?a=1&b=1&s=612x612&w=0&k=20&c=jsCExsL4lnR3iQM9r78lbp3cWpzg1tEO3O2whLoSrig=",
    duration: "2-4 hours",
  },
  {
    id: "32",
    name: "Attic Insulation",
    category: "Insulation",
    description: "Attic insulation installation and upgrade for energy savings",
    price: 280,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1553969536-e9b839932f42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QXR0aWMlMjBJbnN1bGF0aW9ufGVufDB8fDB8fHww",
    duration: "3-5 hours",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "B1",
    serviceId: "1",
    serviceName: "Plumbing Repairs",
    date: "2024-01-15",
    time: "10:00 AM",
    address: "123 Main St, Anytown, USA",
    status: "completed",
    price: 150,
    paymentMethod: "online",
    createdAt: "2024-01-14",
  },
  {
    id: "B2",
    serviceId: "4",
    serviceName: "Home Cleaning",
    date: "2024-01-20",
    time: "2:00 PM",
    address: "123 Main St, Anytown, USA",
    status: "confirmed",
    price: 120,
    paymentMethod: "cash",
    createdAt: "2024-01-16",
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find((s) => s.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return mockServices.filter((s) => s.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(mockServices.map((s) => s.category))).sort();
};

export const searchServices = (query: string): Service[] => {
  const lowerQuery = query.toLowerCase();
  return mockServices.filter(
    (s) =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.category.toLowerCase().includes(lowerQuery)
  );
};
