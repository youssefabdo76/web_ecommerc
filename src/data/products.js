/**
 * Fallback Product Dataset - Supabase Schema Aligned
 */

export const PRODUCTS = [
  {
    id: "prod-croc-001",
    title: "Classic Pastel Charm Clog",
    slug: "classic-pastel-charm-clog",
    price: 49.99,
    original_price: 59.99,
    type: "Crocs",
    target_audience: ["Women", "Kids"],
    categories: ["Clogs", "Casual", "Summer"],
    description: "Ultra-lightweight, water-friendly classic clogs decorated with colorful charms. Features iconic comfort cushioning and heel straps.",
    images: [
      "/assets/crocs_classic_clog.png"
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"],
    colors: ["Pastel Pink", "Lilac", "Sky Blue"],
    product_variants: {
      colors: ["Pastel Pink", "Lilac", "Sky Blue"],
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40", "EU 41"]
    },
    is_featured: true,
    in_stock: true
  },
  {
    id: "prod-croc-002",
    title: "Chunky Mint Platform Clog",
    slug: "chunky-mint-platform-clog",
    price: 64.99,
    original_price: 74.99,
    type: "Crocs",
    target_audience: ["Women"],
    categories: ["Platform", "Trending", "Streetwear"],
    description: "Elevate your style with bold 2.4-inch platform soles. Features breathable ventilation ports and ergonomic slip-resistant footbeds.",
    images: [
      "/assets/crocs_platform_clog.png"
    ],
    sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"],
    colors: ["Mint Green", "Teal", "Cloud White"],
    product_variants: {
      colors: ["Mint Green", "Teal", "Cloud White"],
      sizes: ["EU 36", "EU 37", "EU 38", "EU 39", "EU 40"]
    },
    is_featured: true,
    in_stock: true
  },
  {
    id: "prod-bag-001",
    title: "Aesthetic Terracotta Canvas Tote",
    slug: "aesthetic-terracotta-canvas-tote",
    price: 38.50,
    original_price: 45.00,
    type: "Bags",
    target_audience: ["Women", "Men"],
    categories: ["Totes", "Everyday", "Work & Travel"],
    description: "Heavy-duty eco-friendly canvas tote bag with reinforced vegan leather handles, zip closure, and interior laptop divider.",
    images: [
      "/assets/tote_bag_modern.png"
    ],
    sizes: ["Standard (15L)", "Large (22L)"],
    colors: ["Warm Beige / Terracotta", "Charcoal / Tan"],
    product_variants: {
      colors: ["Warm Beige / Terracotta", "Charcoal / Tan"],
      sizes: ["Standard (15L)", "Large (22L)"]
    },
    is_featured: true,
    in_stock: true
  },
  {
    id: "prod-bag-002",
    title: "Lavender Quilted Mini Crossbody",
    slug: "lavender-quilted-mini-crossbody",
    price: 42.00,
    original_price: 52.00,
    type: "Bags",
    target_audience: ["Women", "Kids"],
    categories: ["Crossbody", "Evening", "Mini Bags"],
    description: "Chic luxury quilted mini handbag with detachable woven gold-tone chain shoulder strap and magnetic snap lock.",
    images: [
      "/assets/crossbody_mini_bag.png"
    ],
    sizes: ["One Size"],
    colors: ["Pastel Lavender", "Pearl White", "Blush Pink"],
    product_variants: {
      colors: ["Pastel Lavender", "Pearl White", "Blush Pink"],
      sizes: ["One Size"]
    },
    is_featured: true,
    in_stock: true
  },
  {
    id: "prod-croc-003",
    title: "All-Terrain Adventure Clog",
    slug: "all-terrain-adventure-clog",
    price: 59.99,
    original_price: 69.99,
    type: "Crocs",
    target_audience: ["Men", "Women"],
    categories: ["Outdoor", "Clogs", "Utility"],
    description: "Rugged lug outsoles for increased traction and support. Adjustable turbo straps lock in a snug, secure fit for outdoor exploration.",
    images: [
      "/assets/crocs_platform_clog.png"
    ],
    sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
    colors: ["Tactical Black", "Khaki Olive", "Slate Grey"],
    product_variants: {
      colors: ["Tactical Black", "Khaki Olive", "Slate Grey"],
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"]
    },
    is_featured: false,
    in_stock: true
  },
  {
    id: "prod-croc-004",
    title: "Junior Rainbow Glow Slide",
    slug: "junior-rainbow-glow-slide",
    price: 32.99,
    original_price: 39.99,
    type: "Crocs",
    target_audience: ["Kids"],
    categories: ["Slides", "Kids Special", "Summer"],
    description: "Fun, vibrant slide sandals designed for active kids. Easy slip-on design, quick drying, and flexible lightweight foam.",
    images: [
      "/assets/crocs_classic_clog.png"
    ],
    sizes: ["EU 28", "EU 30", "EU 32", "EU 34", "EU 35"],
    colors: ["Rainbow Multi", "Neon Yellow"],
    product_variants: {
      colors: ["Rainbow Multi", "Neon Yellow"],
      sizes: ["EU 28", "EU 30", "EU 32", "EU 34", "EU 35"]
    },
    is_featured: false,
    in_stock: true
  },
  {
    id: "prod-bag-003",
    title: "Ergonomic Urban Commuter Backpack",
    slug: "ergonomic-urban-commuter-backpack",
    price: 54.99,
    original_price: 68.00,
    type: "Bags",
    target_audience: ["Men", "Women"],
    categories: ["Backpacks", "Travel", "Work"],
    description: "Water-resistant commuter backpack with padded 15.6-inch laptop sleeve, hidden anti-theft back pocket, and USB charging pass-through.",
    images: [
      "/assets/tote_bag_modern.png"
    ],
    sizes: ["20L Capacity"],
    colors: ["Midnight Black", "Heather Grey", "Navy Blue"],
    product_variants: {
      colors: ["Midnight Black", "Heather Grey", "Navy Blue"],
      sizes: ["20L Capacity"]
    },
    is_featured: false,
    in_stock: true
  },
  {
    id: "prod-bag-004",
    title: "Kids Animal Explorer Mini Backpack",
    slug: "kids-animal-explorer-mini-backpack",
    price: 29.99,
    original_price: 36.00,
    type: "Bags",
    target_audience: ["Kids"],
    categories: ["Backpacks", "Kids Special", "School"],
    description: "Cute lightweight school and outing backpack for children. Features safety chest buckle, soft padded shoulder straps, and drink pouch.",
    images: [
      "/assets/crossbody_mini_bag.png"
    ],
    sizes: ["Mini (8L)"],
    colors: ["Pastel Lavender", "Mint Dinosaur", "Sunny Yellow"],
    product_variants: {
      colors: ["Pastel Lavender", "Mint Dinosaur", "Sunny Yellow"],
      sizes: ["Mini (8L)"]
    },
    is_featured: false,
    in_stock: true
  }
];

export const AUDIENCE_CATEGORIES = [
  { id: "ALL", label: "All Audiences", badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700" },
  { id: "Women", label: "Women", badgeColor: "bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-900/50 hover:bg-pink-200 dark:hover:bg-pink-900/80" },
  { id: "Men", label: "Men", badgeColor: "bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-900/50 hover:bg-sky-200 dark:hover:bg-sky-900/80" },
  { id: "Kids", label: "Kids", badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-900/80" }
];

export const PRODUCT_TYPES = [
  { id: "ALL", label: "All Products" },
  { id: "Crocs", label: "Crocs Collection" },
  { id: "Bags", label: "Bags & Totes" }
];

export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...PRODUCTS]);
    }, 100);
  });
};
