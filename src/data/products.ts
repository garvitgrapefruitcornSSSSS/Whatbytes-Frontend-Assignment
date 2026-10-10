import type { Category, Product } from "@/types/product";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "home", label: "Home" },
];

export const PRICE_MIN = 0;
export const PRICE_MAX = 1000;

const unsplash = (id: string, params = "") =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop${params}`;

/** Main shot plus two zoomed crops for the product detail carousel. */
const gallery = (id: string) => [
  unsplash(id),
  unsplash(id, "&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.6"),
  unsplash(id, "&crop=focalpoint&fp-x=0.35&fp-y=0.6&fp-z=2"),
];

const product = (
  p: Omit<Product, "image" | "images"> & { photo: string },
): Product => {
  const { photo, ...rest } = p;
  return { ...rest, image: unsplash(photo), images: gallery(photo) };
};

export const products: Product[] = [
  product({
    id: 1,
    title: "Running Shoes",
    price: 99,
    category: "clothing",
    brand: "Stride",
    rating: 4.3,
    photo: "1600185365483-26d7a4cc7519",
    description:
      "Lightweight running shoes with a breathable knit upper and responsive foam midsole for everyday miles.",
    reviews: [
      { id: 1, author: "Aarav S.", rating: 5, comment: "Super comfortable right out of the box.", date: "2026-08-14" },
      { id: 2, author: "Meera K.", rating: 4, comment: "Great grip, runs slightly small.", date: "2026-07-02" },
    ],
  }),
  product({
    id: 2,
    title: "Wireless Headphones",
    price: 99,
    category: "electronics",
    brand: "Sonic",
    rating: 4.5,
    photo: "1618366712010-f4ae9c647dcb",
    description:
      "Over-ear wireless headphones with active noise cancellation and up to 30 hours of battery life.",
    reviews: [
      { id: 1, author: "Rohan P.", rating: 5, comment: "Noise cancellation is excellent.", date: "2026-09-01" },
      { id: 2, author: "Isha T.", rating: 4, comment: "Very comfy for long calls.", date: "2026-08-20" },
    ],
  }),
  product({
    id: 3,
    title: "Backpack",
    price: 129,
    category: "clothing",
    brand: "Trailway",
    rating: 4.4,
    photo: "1553062407-98eeb64c6a62",
    description:
      "Water-resistant everyday backpack with a padded 15\" laptop sleeve and plenty of organiser pockets.",
    reviews: [
      { id: 1, author: "Kabir M.", rating: 4, comment: "Fits my laptop and gym gear easily.", date: "2026-06-11" },
    ],
  }),
  product({
    id: 4,
    title: "Smartwatch",
    price: 249,
    category: "electronics",
    brand: "Pulse",
    rating: 4.2,
    photo: "1546868871-7041f2a55e12",
    description:
      "Fitness-focused smartwatch with heart-rate tracking, GPS, sleep insights and a bright always-on display.",
    reviews: [
      { id: 1, author: "Neha R.", rating: 4, comment: "Battery easily lasts two days.", date: "2026-09-12" },
      { id: 2, author: "Dev A.", rating: 4, comment: "Accurate step and sleep tracking.", date: "2026-08-03" },
    ],
  }),
  product({
    id: 5,
    title: "Sunglasses",
    price: 149,
    category: "clothing",
    brand: "Lumen",
    rating: 4.6,
    photo: "1572635196237-14b3f281503f",
    description:
      "Classic polarised sunglasses with UV400 protection and a durable lightweight frame.",
    reviews: [
      { id: 1, author: "Sara J.", rating: 5, comment: "Stylish and the polarisation is great.", date: "2026-07-22" },
    ],
  }),
  product({
    id: 6,
    title: "Digital Camera",
    price: 499,
    category: "electronics",
    brand: "Optix",
    rating: 4.7,
    photo: "1516035069371-29a1b244cc32",
    description:
      "Mirrorless digital camera with a 24MP sensor, 4K video and fast hybrid autofocus.",
    reviews: [
      { id: 1, author: "Vikram N.", rating: 5, comment: "Image quality is stunning.", date: "2026-05-30" },
      { id: 2, author: "Ananya B.", rating: 4, comment: "Compact and easy to learn.", date: "2026-05-02" },
    ],
  }),
  product({
    id: 7,
    title: "T-shirt",
    price: 29,
    category: "clothing",
    brand: "Basics Co.",
    rating: 4.1,
    photo: "1583743814966-8936f5b7be1a",
    description:
      "Soft 100% cotton crew-neck t-shirt with a relaxed fit for everyday wear.",
    reviews: [
      { id: 1, author: "Arjun L.", rating: 4, comment: "Good fabric, holds shape after washing.", date: "2026-09-18" },
    ],
  }),
  product({
    id: 9,
    title: "Desk Lamp",
    price: 79,
    category: "home",
    brand: "Nordlys",
    rating: 4.3,
    photo: "1507473885765-e6ed057f782c",
    description:
      "Minimal metal desk lamp with an adjustable arm and warm, glare-free light.",
    reviews: [
      { id: 1, author: "Pooja G.", rating: 4, comment: "Looks great on my desk.", date: "2026-08-08" },
    ],
  }),
  product({
    id: 10,
    title: "Succulent Planter",
    price: 35,
    category: "home",
    brand: "Greenery",
    rating: 4.5,
    photo: "1485955900006-10f4d324d411",
    description:
      "Matte ceramic planter with a live succulent — an easy-care touch of green for any shelf.",
    reviews: [
      { id: 1, author: "Riya D.", rating: 5, comment: "Arrived healthy and well packed.", date: "2026-09-05" },
    ],
  }),
  product({
    id: 11,
    title: "Ceramic Mug",
    price: 19,
    category: "home",
    brand: "Kiln",
    rating: 4.0,
    photo: "1514228742587-6b1558fcca3d",
    description:
      "Hand-glazed 350ml ceramic mug, microwave and dishwasher safe.",
    reviews: [
      { id: 1, author: "Karan V.", rating: 4, comment: "Perfect size for morning coffee.", date: "2026-07-15" },
    ],
  }),
  product({
    id: 8,
    title: "Smartphone",
    price: 699,
    category: "electronics",
    brand: "Nova",
    rating: 4.5,
    featured: true,
    photo: "1511707171634-5f897ff02aa9",
    description:
      "Lorem ipsum dolor amet, consectetur euisagend.",
    reviews: [
      { id: 1, author: "Ishaan K.", rating: 5, comment: "Blazing fast and the screen is gorgeous.", date: "2026-09-25" },
      { id: 2, author: "Tanvi S.", rating: 4, comment: "Camera is great in low light.", date: "2026-09-10" },
    ],
  }),
];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategoryLabel(category: Category): string {
  return CATEGORIES.find((c) => c.value === category)?.label ?? category;
}
