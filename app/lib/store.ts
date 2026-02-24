import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "men" | "women";
  type:
    | "shirt"
    | "jeans"
    | "jogger"
    | "shoe"
    | "kurti"
    | "western"
    | "heel"
    | "g-shoe";
}

interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));

// Mock products data - in production this would come from API
export let products: Product[] = [
  // Men's products
  {
    id: "shirt1",
    name: "Difference of Opinion Printed Shirt",
    price: 449,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shirt1.png",
    category: "men",
    type: "shirt",
  },
  {
    id: "shirt2",
    name: "Moda Rapido Printed Round Neck T-shirt",
    price: 486,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shirt2.png",
    category: "men",
    type: "shirt",
  },
  {
    id: "shirt3",
    name: "DILLINGER Colourblocked Round Neck T-shirt",
    price: 404,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shirt3.png",
    category: "men",
    type: "shirt",
  },
  {
    id: "shirt4",
    name: "Roadster T-shirt with Shoulder patch",
    price: 519,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shirt4.png",
    category: "men",
    type: "shirt",
  },
  {
    id: "jeans1",
    name: "HIGHLANDER Men Slim Fit Jeans",
    price: 874,
    image: "/work/Merlin-Fashion-master/images/products-img/men/jeans1.png",
    category: "men",
    type: "jeans",
  },
  {
    id: "jeans2",
    name: "Roadster Men Super Skinny Fit Jeans",
    price: 1199,
    image: "/work/Merlin-Fashion-master/images/products-img/men/jeans2.png",
    category: "men",
    type: "jeans",
  },
  {
    id: "jeans3",
    name: "Calvin Klein Jeans Mean Slim Straight Jeans",
    price: 9599,
    image: "/work/Merlin-Fashion-master/images/products-img/men/jeans3.png",
    category: "men",
    type: "jeans",
  },
  {
    id: "jeans4",
    name: "LOCOMOTIVE Mean Slim Fit Jeans",
    price: 999,
    image: "/work/Merlin-Fashion-master/images/products-img/men/jeans4.png",
    category: "men",
    type: "jeans",
  },
  {
    id: "jogger1",
    name: "HRX Men Solid Joggers",
    price: 934,
    image: "/work/Merlin-Fashion-master/images/products-img/men/joggers1.png",
    category: "men",
    type: "jogger",
  },
  {
    id: "jogger2",
    name: "HRX Men Solid Joggers",
    price: 934,
    image: "/work/Merlin-Fashion-master/images/products-img/men/joggers1.png",
    category: "men",
    type: "jogger",
  },
  {
    id: "jogger3",
    name: "HRX Men Solid Joggers",
    price: 934,
    image: "/work/Merlin-Fashion-master/images/products-img/men/joggers1.png",
    category: "men",
    type: "jogger",
  },
  {
    id: "jogger4",
    name: "HRX Men Solid Joggers",
    price: 934,
    image: "/work/Merlin-Fashion-master/images/products-img/men/joggers1.png",
    category: "men",
    type: "jogger",
  },
  {
    id: "shoe1",
    name: "PUMA Men Clasp IDP Sneakers",
    price: 1304,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shoe1.png",
    category: "men",
    type: "shoe",
  },
  {
    id: "shoe2",
    name: "Levis Men Sneakers",
    price: 1169,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shoe2.png",
    category: "men",
    type: "shoe",
  },
  {
    id: "shoe3",
    name: "Mactree Men Sneakers",
    price: 679,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shoe3.png",
    category: "men",
    type: "shoe",
  },
  {
    id: "shoe4",
    name: "HRX Men Pro Sneakers",
    price: 1699,
    image: "/work/Merlin-Fashion-master/images/products-img/men/shoe4.png",
    category: "men",
    type: "shoe",
  },

  // Women's products
  {
    id: "kurti1",
    name: "AKS Kurta with Plazzo & Dupatta",
    price: 1799,
    image: "/work/Merlin-Fashion-master/images/products-img/women/kurti1.png",
    category: "women",
    type: "kurti",
  },
  {
    id: "kurti2",
    name: "Nayo Women Solid Kurta with Trouser",
    price: 1649,
    image: "/work/Merlin-Fashion-master/images/products-img/women/kurti2.png",
    category: "women",
    type: "kurti",
  },
  {
    id: "kurti3",
    name: "AKS Printed Straight Kurta",
    price: 659,
    image: "/work/Merlin-Fashion-master/images/products-img/women/kurti3.png",
    category: "women",
    type: "kurti",
  },
  {
    id: "kurti4",
    name: "Fabindia Slim Fit Straight Kurta",
    price: 1990,
    image: "/work/Merlin-Fashion-master/images/products-img/women/kurti4.png",
    category: "women",
    type: "kurti",
  },
  {
    id: "western1",
    name: "Ives Solid Shirt Style Top",
    price: 549,
    image: "/work/Merlin-Fashion-master/images/products-img/women/western1.png",
    category: "women",
    type: "western",
  },
  {
    id: "western2",
    name: "Style Quotient Solid Top",
    price: 554,
    image: "/work/Merlin-Fashion-master/images/products-img/women/western2.png",
    category: "women",
    type: "western",
  },
  {
    id: "western3",
    name: "HERE&NOW Printed A-Line Top",
    price: 549,
    image: "/work/Merlin-Fashion-master/images/products-img/women/western3.png",
    category: "women",
    type: "western",
  },
  {
    id: "western4",
    name: "SASSAFRAS Ruffled Shirt Style Top",
    price: 549,
    image: "/work/Merlin-Fashion-master/images/products-img/women/western4.png",
    category: "women",
    type: "western",
  },
  {
    id: "g-shoe1",
    name: "PUMA Women LQDCell",
    price: 6999,
    image: "/work/Merlin-Fashion-master/images/products-img/women/g-shoe1.png",
    category: "women",
    type: "g-shoe",
  },
  {
    id: "g-shoe2",
    name: "ADIDAS Women Ultraboost19 Running",
    price: 11899,
    image: "/work/Merlin-Fashion-master/images/products-img/women/g-shoe2.png",
    category: "women",
    type: "g-shoe",
  },
  {
    id: "g-shoe3",
    name: "HRX Women Absolute Run",
    price: 1549,
    image: "/work/Merlin-Fashion-master/images/products-img/women/g-shoe3.png",
    category: "women",
    type: "g-shoe",
  },
  {
    id: "g-shoe4",
    name: "Skecher Women GO RUN",
    price: 3249,
    image: "/work/Merlin-Fashion-master/images/products-img/women/g-shoe4.png",
    category: "women",
    type: "g-shoe",
  },
  {
    id: "heel1",
    name: "Shetopia Women Heels",
    price: 499,
    image: "/work/Merlin-Fashion-master/images/products-img/women/heels1.png",
    category: "women",
    type: "heel",
  },
  {
    id: "heel2",
    name: "ZAPATOZ Women Heeled Boots",
    price: 527,
    image: "/work/Merlin-Fashion-master/images/products-img/women/heels2.png",
    category: "women",
    type: "heel",
  },
  {
    id: "heel3",
    name: "Allen Solly Women Solid Wedged",
    price: 2499,
    image: "/work/Merlin-Fashion-master/images/products-img/women/heels3.png",
    category: "women",
    type: "heel",
  },
  {
    id: "heel4",
    name: "Shoetopia Women Heels",
    price: 499,
    image: "/work/Merlin-Fashion-master/images/products-img/women/heels4.png",
    category: "women",
    type: "heel",
  },
];

// Function to update products array (used by API routes)
export const updateProducts = (newProducts: Product[]) => {
  products = newProducts;
};
