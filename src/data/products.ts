export interface Review {
  id: number;
  user: string;
  rating: number; // ⭐ 1–5
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  reviews: Review[]; // ✅ always an array now
}

export const products: Product[] = [
  {
    id: 1,
    name: "Canvas Art",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1579965342575-16428a7c8881?w=600&auto=format&fit=crop&q=60",
    description:
      "Beautiful hand-painted canvas artwork that brings life to your walls.",
    reviews: [
      {
        id: Date.now(),
        user: "Alice",
        rating: 5,
        comment: "Absolutely love this art!",
        date: "2025-08-30",
      },
      {
        id: Date.now(),
        user: "Bob",
        rating: 4,
        comment: "Great quality, but a bit expensive.",
        date: "2025-08-31",
      },
    ],
  },
  {
    id: 2,
    name: "Sketchbook",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1623697899817-2e067e4a4036?w=600&auto=format&fit=crop&q=60",
    description:
      "Premium sketchbook with smooth pages for artists and students.",
    reviews: [], // ✅ ensure empty array instead of undefined
  },
  {
    id: 3,
    name: "Oil Paint Set",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1578321271369-d008a1ee4fd2?w=600&auto=format&fit=crop&q=60",
    description:
      "High-quality oil paints in vibrant colors for professional artwork.",
    reviews: [
      {
        id: Date.now(),
        user: "Charlie",
        rating: 5,
        comment: "The colors are so vibrant, loved painting with them.",
        date: "2025-08-29",
      },
    ],
  },
  {
    id: Date.now(),
    name: "Charcoal Pencils",
    price: 250,
    image:
      "https://i.pinimg.com/1200x/f7/4e/ee/f74eee477c920dda39bbc9195dc5efa3.jpg",
    description:
      "Perfect set of charcoal pencils for shading and sketching.",
    reviews: [],
  },
  {
    id: Date.now(),
    name: "Easel Stand",
    price: 1500,
    image:
      "https://i.pinimg.com/736x/59/ce/ed/59ceed8ce9f9e741ee196a5c16e9dd7e.jpg",
    description: "Sturdy wooden easel for painting comfortably.",
    reviews: [],
  },
];
