export type ProductImage = {
  src: string;
  alt: string;
};

export type Testimonial = {
  name: string;
  quote: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ProductOffer = {
  id: string;
  name: string;
  label: string;
  description: string;
  price: number;
  regularPrice: number;
  badge?: string;
};

export type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export const productOffers = [
  {
    id: "budget",
    name: "Budget Combo",
    label: "Budget Combo",
    description: "A cute starter combo for daily styling and gifting.",
    price: 799,
    regularPrice: 1199,
    badge: "Affordable Pick"
  },
  {
    id: "standard",
    name: "Standard Trendy Combo",
    label: "Standard Trendy Combo",
    description: "Best sweet-spot offer with trendy pieces for multiple looks.",
    price: 1499,
    regularPrice: 2499,
    badge: "Save 40% Today"
  },
  {
    id: "premium",
    name: "Premium Luxury Combo",
    label: "Premium Luxury Combo",
    description: "More premium accessories for parties, gifts, and statement looks.",
    price: 2999,
    regularPrice: 4999,
    badge: "Premium Value"
  }
] satisfies ProductOffer[];

export const defaultOffer = productOffers[1];

export const product = {
  brandName: "StyleNest",
  name: "Fashion & Jewelry Combo Set",
  category: "Fashion and Jewelry Accessories",
  headline: "Upgrade Your Look in Seconds",
  subheadline: "Trendy, classy accessories that transform simple outfits into polished looks.",
  shortDescription:
    "A curated Fashion & Jewelry Combo Set designed for daily wear, office looks, parties, gifting, and effortless social-media-ready styling.",
  currency: "NPR",
  regularPrice: defaultOffer.regularPrice,
  offerPrice: defaultOffer.price,
  offers: productOffers,
  deliveryFee: 0,
  sheetTabName: "F&J Orders",
  heroImage: {
    src: "/images/products/hero-combo.png",
    alt: "Gold rings and jewelry accessories styled on hand"
  },
  images: [
    {
      src: "/images/products/hero-combo.png",
      alt: "Gold rings and jewelry accessories styled on hand"
    },
    {
      src: "/images/products/butterfly-pearl-set.png",
      alt: "Butterfly pearl jewelry combo set"
    },
    {
      src: "/images/products/gold-jewelry-combo.png",
      alt: "Gold fashion jewelry combo collection"
    },
    {
      src: "/images/products/gold-accessory-flatlay.png",
      alt: "Gold accessories with watch and earrings on satin"
    },
    {
      src: "/images/products/pink-butterfly-set.png",
      alt: "Pink butterfly pearl jewelry set"
    }
  ] satisfies ProductImage[],
  reels: [
    {
      title: "Styling Reel",
      src: "/videos/jewelry-styling-reel.mp4"
    },
    {
      title: "Accessories Showcase",
      src: "/videos/accessories-showcase-reel.mp4"
    },
    {
      title: "Closeup Reel",
      src: "/videos/jewelry-closeup-reel.mp4"
    }
  ],
  benefits: [
    "Instantly upgrades any outfit",
    "Stylish and trendy look effortlessly",
    "Affordable alternative to buying new clothes",
    "Multiple accessories in one combo set",
    "Saves time matching accessories separately",
    "Perfect for daily wear, parties, and social media photos",
    "Great gifting option for girls and women",
    "Boosts confidence and personal style",
    "Trend-inspired designs loved by modern fashion lovers",
    "Easy to mix and match with different outfits"
  ],
  trustItems: ["Cash on Delivery", "Free Delivery", "Fast dispatch", "Friendly support"],
  testimonials: [
    {
      name: "Priya S.",
      quote:
        "I honestly did not expect the quality to be this good at this price. The combo instantly upgraded my whole look!"
    },
    {
      name: "Sneha M.",
      quote:
        "Super trendy and beautiful accessories. I got so many compliments from my friends after wearing them."
    },
    {
      name: "Anisha K.",
      quote: "Affordable, stylish, and exactly like the photos. Definitely ordering more combos again!"
    },
    {
      name: "Riya T.",
      quote: "The jewelry looks premium and matches with almost every outfit. Totally worth it."
    },
    {
      name: "Samikshya R.",
      quote: "Perfect gift option! My sister absolutely loved the combo set."
    }
  ] satisfies Testimonial[],
  faqs: [
    {
      question: "What comes inside the combo set?",
      answer:
        "Each combo includes a curated mix of trendy fashion and jewelry accessories such as earrings, necklaces, bracelets, rings, hair accessories, handbags, or other stylish items depending on the combo type."
    },
    {
      question: "Are the accessories suitable for daily use?",
      answer:
        "Yes. Our accessories are lightweight, comfortable, and perfect for daily wear, college, office, parties, and casual outings."
    },
    {
      question: "Is the product quality good?",
      answer:
        "Absolutely. We carefully select trendy, quality products so you get stylish accessories at an affordable price."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes, Cash on Delivery is available in many locations across Nepal."
    },
    {
      question: "How long does delivery take?",
      answer: "Usually, delivery takes around 2-5 business days depending on your location."
    },
    {
      question: "Can I gift this combo to someone?",
      answer:
        "Definitely. Our combo sets make perfect gifts for birthdays, special occasions, or surprises for friends, sisters, and loved ones."
    },
    {
      question: "Do you have return or exchange options?",
      answer:
        "Yes. If you receive a damaged or wrong product, please contact us within 24 hours of delivery for support."
    }
  ] satisfies FAQ[]
};

export function formatMoney(amount: number) {
  return `${product.currency} ${amount.toLocaleString("en-NP")}`;
}

export function getOfferById(offerId?: string | null) {
  return productOffers.find((offer) => offer.id === offerId) || defaultOffer;
}

export function checkoutUrl(quantity = 1, offerId = defaultOffer.id) {
  const offer = getOfferById(offerId);
  const productName = `${product.name} - ${offer.name}`;
  const params = new URLSearchParams({
    product: productName,
    offer: offer.id,
    quantity: String(quantity),
    price: String(offer.price),
    total: String(offer.price * quantity)
  });

  return `/checkout?${params.toString()}`;
}

export function checkoutUrlForItems(items: CartItem[]) {
  const activeItems = items.filter((item) => item.quantity > 0);
  const total = activeItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalQuantity = activeItems.reduce((sum, item) => sum + item.quantity, 0);
  const productName = activeItems.length
    ? activeItems.map((item) => `${item.name} x${item.quantity}`).join(", ")
    : `${product.name} - ${defaultOffer.name}`;

  const params = new URLSearchParams({
    product: productName,
    items: JSON.stringify(activeItems),
    quantity: String(Math.max(1, totalQuantity)),
    price: String(total || defaultOffer.price),
    total: String(total || defaultOffer.price)
  });

  return `/checkout?${params.toString()}`;
}
