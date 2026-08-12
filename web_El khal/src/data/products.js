/**
 * Mock Product Dataset - Supabase Schema Ready
 * 
 * Database Schema Mapping for Supabase:
 * table: products
 * - id: uuid / text (primary key)
 * - title: text
 * - slug: text
 * - price: decimal
 * - original_price: decimal (optional for discount display)
 * - type: text ('crocs' | 'bags')
 * - target_audience: array of text ['Men', 'Women', 'Kids']
 * - categories: array of text ['Clogs', 'Platform', 'Totes', 'Crossbody', 'Slides', 'Backpacks']
 * - description: text
 * - images: array of text
 * - product_variants: jsonb (sizes, colors)
 * - is_featured: boolean
 * - in_stock: boolean
 * - rating: decimal
 * - review_count: integer
 * - created_at: timestamp
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
      "/public/assets/crocs_classic_clog.png"
    ],
    product_variants: {
      colors: ["Pastel Pink", "Lilac", "Sky Blue"],
      sizes: ["US 5 / W", "US 6 / W", "US 7 / W", "US 8 / W", "Kids M4/W6"]
    },
    is_featured: true,
    in_stock: true,
    rating: 4.9,
    review_count: 128
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
      "/public/assets/crocs_platform_clog.png"
    ],
    product_variants: {
      colors: ["Mint Green", "Teal", "Cloud White"],
      sizes: ["US 6", "US 7", "US 8", "US 9"]
    },
    is_featured: true,
    in_stock: true,
    rating: 4.8,
    review_count: 94
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
      "/public/assets/tote_bag_modern.png"
    ],
    product_variants: {
      colors: ["Warm Beige / Terracotta", "Charcoal / Tan"],
      sizes: ["Standard (15L)", "Large (22L)"]
    },
    is_featured: true,
    in_stock: true,
    rating: 4.9,
    review_count: 156
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
      "/public/assets/crossbody_mini_bag.png"
    ],
    product_variants: {
      colors: ["Pastel Lavender", "Pearl White", "Blush Pink"],
      sizes: ["One Size"]
    },
    is_featured: true,
    in_stock: true,
    rating: 4.7,
    review_count: 82
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
      "/public/assets/crocs_platform_clog.png"
    ],
    product_variants: {
      colors: ["Tactical Black", "Khaki Olive", "Slate Grey"],
      sizes: ["US 8 / M", "US 9 / M", "US 10 / M", "US 11 / M", "US 12 / M"]
    },
    is_featured: false,
    in_stock: true,
    rating: 4.9,
    review_count: 210
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
      "/public/assets/crocs_classic_clog.png"
    ],
    product_variants: {
      colors: ["Rainbow Multi", "Neon Yellow"],
      sizes: ["Kids C10", "Kids C11", "Kids C12", "Kids C13", "Junior J1"]
    },
    is_featured: false,
    in_stock: true,
    rating: 4.8,
    review_count: 73
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
      "/public/assets/tote_bag_modern.png"
    ],
    product_variants: {
      colors: ["Midnight Black", "Heather Grey", "Navy Blue"],
      sizes: ["20L Capacity"]
    },
    is_featured: false,
    in_stock: true,
    rating: 4.9,
    review_count: 114
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
      "/public/assets/crossbody_mini_bag.png"
    ],
    product_variants: {
      colors: ["Pastel Lavender", "Mint Dinosaur", "Sunny Yellow"],
      sizes: ["Mini (8L)"]
    },
    is_featured: false,
    in_stock: true,
    rating: 4.9,
    review_count: 65
  }
];

/**
 * Available Filter Categories & Audiences
 */
export const AUDIENCE_CATEGORIES = [
  { id: "ALL", label: "All Audiences", badgeColor: "bg-gray-100 text-gray-800 border-gray-200" },
  { id: "Women", label: "Women", badgeColor: "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200" },
  { id: "Men", label: "Men", badgeColor: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200" },
  { id: "Kids", label: "Kids", badgeColor: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200" }
];

export const PRODUCT_TYPES = [
  { id: "ALL", label: "All Products" },
  { id: "Crocs", label: "Crocs Collection" },
  { id: "Bags", label: "Bags & Totes" }
];

/**
 * Helper function for future Supabase integration.
 * In production with Supabase, replace this with:
 * const { data, error } = await supabase.from('products').select('*');
 */
export const fetchProducts = async () => {
  // Simulating async network delay for standard architecture readiness
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...PRODUCTS]);
    }, 100);
  });
};
