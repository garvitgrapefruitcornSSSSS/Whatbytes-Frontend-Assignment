export type Category = "electronics" | "clothing" | "home";

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  brand: string;
  rating: number;
  image: string;
  images: string[];
  reviews: Review[];
  /** Renders as the wide highlighted card in the product grid. */
  featured?: boolean;
}
