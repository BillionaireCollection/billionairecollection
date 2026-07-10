/* ============================================================
   BILLIONAIRE COLLECTION — Official Store / Merch Page
   Dark luxury aesthetic: #0a0e1a bg, gold #C9A84C accents,
   square buttons, Playfair Display + Inter fonts.
   17 products across 6 categories. Cart modal + checkout.
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";
import { useJsonLd } from "@/hooks/useJsonLd";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Design tokens ────────────────────────────────────────────
const GOLD = "#C9A84C";
const NAVY = "#0a0e1a";
const IVORY = "#f5f0e8";

// ─── Product catalogue ─────────────────────────────────────────
type Category = "All" | "T-Shirts" | "Hoodies" | "Hats" | "Mugs" | "Posters" | "Tote Bags";

interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "All">;
  price: number; // USD whole dollar
  colors: string[];
  badge?: string;
  tagline: string;
  description: string;
  sizes?: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  // T-Shirts
  {
    id: "tee-crest-signature",
    name: "Crest Signature Tee",
    category: "T-Shirts",
    price: 320,
    colors: ["White", "Navy", "Black"],
    badge: "New",
    tagline: "Heritage crest. Premium cotton.",
    description: "The definitive BC statement piece. Heavyweight premium cotton with embroidered heritage crest.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/crest-signature-tee-v2-9QBKtrSwbhdQ6etGbD2PA4.webp",
  },
  {
    id: "tee-crest-classic",
    name: "Crest Tee Classic Fit",
    category: "T-Shirts",
    price: 280,
    colors: ["White", "Ivory", "Grey"],
    badge: "Best Seller",
    tagline: "Timeless. Effortless. Billionaire.",
    description: "Our best-selling classic fit tee. Relaxed silhouette, refined finish.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/crest-tee-classic-v3-3PkByaKVD9oKSe6NCngKXQ.webp",
  },
  {
    id: "tee-arch-logo",
    name: "Arch Logo Tee",
    category: "T-Shirts",
    price: 280,
    colors: ["Navy/Gold", "Black/Gold", "Dark Green/Gold"],
    tagline: "Arch print. Gold on dark.",
    description: "Bold arch typography in gold on premium dark fabric. A collector's essential.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/manus-storage/arch-logo-tee_f557ef32.png",
  },
  {
    id: "tee-crest-standard",
    name: "Crest Tee",
    category: "T-Shirts",
    price: 320,
    colors: ["Navy", "Black", "Ivory"],
    tagline: "The crest. The standard.",
    description: "Clean crest print on premium fabric. Understated luxury for the discerning collector.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/crest-tee-navy-v3-4z2YEcT8TJNTn5EVApHXoq.webp",
  },
  {
    id: "tee-mindset",
    name: "Ultra High Net Worth Mindset Tee",
    category: "T-Shirts",
    price: 280,
    colors: ["Black", "Navy", "Charcoal"],
    tagline: "Mindset before millions.",
    description: "A declaration of intent. Wear the philosophy that separates the exceptional from the ordinary.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/mindset-tee-v3-gmmhmJohWFEEcdU69L9GEE.webp",
  },
  {
    id: "tee-build-empire",
    name: "Build Empire Tee",
    category: "T-Shirts",
    price: 280,
    colors: ["Black", "Navy"],
    tagline: "Build. Scale. Dominate.",
    description: "For those who build legacies. Premium cotton, legacy print.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/build-empire-tee-v3-C5Bh9VhYqEGjuvshhZsQTJ.webp",
  },
  // Hoodies
  {
    id: "hoodie-crest-pullover",
    name: "Crest Pullover Hoodie",
    category: "Hoodies",
    price: 480,
    colors: ["Navy", "Black", "White"],
    badge: "New",
    tagline: "Heavyweight luxury. Crest embroidered.",
    description: "400gsm heavyweight fleece with embroidered crest. The pinnacle of casual luxury.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/manus-storage/crest-pullover-hoodie_d1866b2e.png",
  },
  {
    id: "hoodie-crest-embroidered",
    name: "Crest Hoodie (Embroidered)",
    category: "Hoodies",
    price: 640,
    colors: ["Navy", "Black", "Dark Green"],
    badge: "Premium",
    tagline: "Full embroidery. Heirloom quality.",
    description: "Full embroidered crest on premium fleece. Limited production. Collector's edition.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/manus-storage/crest-hoodie-embroidered_529f6e46.png",
  },
  {
    id: "hoodie-wealth-creation",
    name: "Wealth Creation & Preservation Hoodie",
    category: "Hoodies",
    price: 720,
    colors: ["Black/Gold", "Navy/Gold"],
    tagline: "Create. Preserve. Transcend.",
    description: "Our most exclusive hoodie. Gold foil print on premium fleece. For those who understand the game.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    image: "/manus-storage/wealth-preservation-hoodie_d16ea859.png",
  },
  // Hats
  {
    id: "hat-crest-cap",
    name: "Crest Cap",
    category: "Hats",
    price: 240,
    colors: ["Navy", "Black", "Dark Green"],
    badge: "Best Seller",
    tagline: "Six-panel. Embroidered crest.",
    description: "Structured six-panel cap with embroidered BC crest. Adjustable strap. One size fits most.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/crest-cap-v3-SGk6CF7AhXT7yjYkUrzYD3.webp",
  },
  {
    id: "hat-crown-snapback",
    name: "Crown Logo Snapback",
    category: "Hats",
    price: 264,
    colors: ["Black/Gold", "Navy/Gold"],
    tagline: "Crown the collection.",
    description: "Flat-brim snapback with gold crown logo embroidery. Adjustable snap closure.",
    image: "/manus-storage/crown-snapback_4eccbd23.png",
  },
  // Mugs
  {
    id: "mug-crest",
    name: "Crest Mug",
    category: "Mugs",
    price: 160,
    colors: ["White/Navy", "Black/Gold"],
    tagline: "Morning ritual. Elevated.",
    description: "11oz ceramic mug with BC crest. Dishwasher safe. The luxury morning ritual.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/bc-crest-mug-v3-5JWvTBkBzSrJaLrd3iBHew.webp",
  },
  {
    id: "mug-mindset",
    name: "Mindset Mug",
    category: "Mugs",
    price: 160,
    colors: ["Black", "Navy"],
    tagline: "Billionaire mindset. Every morning.",
    description: "11oz ceramic mug with Billionaire Collection mindset print. Start every day with intention.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028447909/DwwHDtJPUge8HmugY3BgSV/mindset-mug-v2-8Ev2KGtYzk88wG6XEkBoCK.webp",
  },
  // Posters
  {
    id: "poster-crest",
    name: "Crest Poster",
    category: "Posters",
    price: 200,
    colors: ["Navy/Gold", "Black/Gold"],
    badge: "Popular",
    tagline: "Gallery-quality. Frameable.",
    description: "A2 premium matte print. Gallery-quality paper. The BC crest rendered in gold on dark.",
    image: "/manus-storage/bc-crest-poster_4c6e5238.png",
  },
  {
    id: "poster-manifesto",
    name: "Manifesto Poster",
    category: "Posters",
    price: 200,
    colors: ["Black/Gold", "Navy/Gold"],
    tagline: "The Billionaire manifesto. Framed.",
    description: "A2 premium matte print featuring the Billionaire Collection manifesto in gold typography.",
    image: "/manus-storage/wealth-mindset-poster_09de1e2c.png",
  },
  // Tote Bags
  {
    id: "tote-crest",
    name: "Crest Tote Bag",
    category: "Tote Bags",
    price: 184,
    colors: ["Natural/Navy", "Black/Gold"],
    tagline: "Carry the crest.",
    description: "Heavy-duty canvas tote with BC crest print. Reinforced handles. 15L capacity.",
    image: "/manus-storage/bc-signature-tote_76305794.png",
  },
  {
    id: "tote-build-empire",
    name: "Build Empire Tote Bag",
    category: "Tote Bags",
    price: 160,
    colors: ["Natural/Black", "Black/Gold"],
    tagline: "Build empires. Carry essentials.",
    description: "Premium canvas tote with Build Empire print. The everyday carry for the ambitious.",
    image: "/manus-storage/arch-logo-tote_a926aa13.png",
  },
];

const CATEGORIES: Category[] = ["All", "T-Shirts", "Hoodies", "Hats", "Mugs", "Posters", "Tote Bags"];

// ─── Badge colour map ──────────────────────────────────────────
const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  New: { bg: GOLD, text: NAVY },
  "Best Seller": { bg: "#1a2744", text: GOLD },
  Premium: { bg: "#2a1a00", text: GOLD },
  Popular: { bg: "#1a1a2e", text: IVORY },
};

// ─── Cart types ────────────────────────────────────────────────
interface CartItem {
  product: Product;
  color: string;
  size?: string;
  qty: number;
}

// ─── Utility ───────────────────────────────────────────────────
function formatPrice(dollars: number) {
  return `$${dollars.toLocaleString()}`;
}

// ─── FadeUp animation ──────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Product Card ──────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product, color: string, size?: string) => void;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] ?? undefined); // default M
  const [hovered, setHovered] = useState(false);

  const badge = product.badge ? BADGE_STYLES[product.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `1px solid ${hovered ? GOLD : "#e5e7eb"}`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered ? `0 8px 32px rgba(201,168,76,0.15)` : "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: "288px", background: "#000", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />

        {/* Badge */}
        {badge && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: badge.bg,
              color: badge.text,
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "4px 10px",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {/* Name + price row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              color: NAVY,
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: GOLD,
              whiteSpace: "nowrap",
            }}
          >
            {formatPrice(product.price)}
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            color: GOLD,
            opacity: 0.85,
            letterSpacing: "0.05em",
          }}
        >
          {product.tagline}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.75rem",
            color: "#6b7280",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </div>

        {/* Color variants */}
        <div>
          <div style={{ fontSize: "0.65rem", color: "#9ca3af", fontFamily: "Inter, sans-serif", marginBottom: "6px", letterSpacing: "0.08em" }}>
            COLOR: <span style={{ color: NAVY, fontWeight: 600 }}>{selectedColor}</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  padding: "3px 10px",
                  fontSize: "0.65rem",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  border: `1px solid ${selectedColor === color ? GOLD : "#d1d5db"}`,
                  background: selectedColor === color ? GOLD : "transparent",
                  color: selectedColor === color ? NAVY : "#6b7280",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  borderRadius: 0,
                }}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Size selector (if applicable) */}
        {product.sizes && (
          <div>
            <div style={{ fontSize: "0.65rem", color: "#9ca3af", fontFamily: "Inter, sans-serif", marginBottom: "6px", letterSpacing: "0.08em" }}>
              SIZE: <span style={{ color: NAVY, fontWeight: 600 }}>{selectedSize}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: "36px",
                    height: "28px",
                    fontSize: "0.65rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    border: `1px solid ${selectedSize === size ? GOLD : "#d1d5db"}`,
                    background: selectedSize === size ? GOLD : "transparent",
                    color: selectedSize === size ? NAVY : "#6b7280",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    borderRadius: 0,
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Add to Cart button */}
        <button
          onClick={() => onAddToCart(product, selectedColor, selectedSize)}
          style={{
            width: "100%",
            padding: "12px",
            background: GOLD,
            color: NAVY,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            borderRadius: 0,
            transition: "background 0.15s ease, transform 0.1s ease",
          }}
          onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = "#b8942f"; }}
          onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = GOLD; }}
          onMouseDown={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(0.97)"; }}
          onMouseUp={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

// ─── Cart Modal ────────────────────────────────────────────────
function CartModal({
  cart,
  onClose,
  onUpdateQty,
  onRemove,
}: {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (idx: number, qty: number) => void;
  onRemove: (idx: number) => void;
}) {
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [submitting, setSubmitting] = useState(false);

  const placeOrder = trpc.merch.placeOrder.useMutation();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!email || !name || !address1 || !city || !zip || !countryCode) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await placeOrder.mutateAsync({
        email,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          color: item.color,
          size: item.size,
          qty: item.qty,
          unitPrice: item.product.price * 100, // cents
        })),
        shippingAddress: {
          name,
          address1,
          city,
          zip,
          country_code: countryCode,
        },
      });
      setStep("success");
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "#0d1630",
    border: `1px solid rgba(201,168,76,0.3)`,
    color: IVORY,
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    borderRadius: 0,
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "relative",
          width: "min(480px, 100vw)",
          height: "100vh",
          background: NAVY,
          borderLeft: `1px solid rgba(201,168,76,0.2)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: `1px solid rgba(201,168,76,0.15)`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ color: GOLD, fontSize: "0.6rem", letterSpacing: "0.3em", fontFamily: "Inter, sans-serif", marginBottom: "4px" }}>
              BILLIONAIRE COLLECTION
            </div>
            <div style={{ color: IVORY, fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700 }}>
              {step === "cart" ? "Your Cart" : step === "checkout" ? "Checkout" : "Order Confirmed"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: `1px solid rgba(201,168,76,0.3)`,
              color: GOLD,
              width: "36px",
              height: "36px",
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {step === "success" ? (
            <div style={{ textAlign: "center", paddingTop: "40px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✓</div>
              <div
                style={{
                  color: GOLD,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                Order Placed
              </div>
              <div style={{ color: IVORY, opacity: 0.7, fontFamily: "Inter, sans-serif", fontSize: "0.875rem", lineHeight: 1.6 }}>
                Thank you for your order. A confirmation has been sent to <strong style={{ color: GOLD }}>{email}</strong>.
                Your items will be fulfilled and shipped via Printful.
              </div>
              <button
                onClick={onClose}
                style={{
                  marginTop: "32px",
                  padding: "14px 32px",
                  background: GOLD,
                  color: NAVY,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 0,
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : step === "cart" ? (
            cart.length === 0 ? (
              <div style={{ textAlign: "center", paddingTop: "60px" }}>
                <div style={{ color: IVORY, opacity: 0.4, fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>
                  Your cart is empty.
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "16px",
                      background: "rgba(255,255,255,0.04)",
                      border: `1px solid rgba(201,168,76,0.1)`,
                    }}
                  >
                    {/* Mini image */}
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(135deg, #1a2744, #0d1630)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid rgba(201,168,76,0.2)`,
                      }}
                    >
                      <span style={{ color: GOLD, fontSize: "0.75rem", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>BC</span>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ color: IVORY, fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: "0.8rem", marginBottom: "4px" }}>
                        {item.product.name}
                      </div>
                      <div style={{ color: GOLD, opacity: 0.7, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "8px" }}>
                        {item.color}{item.size ? ` · ${item.size}` : ""}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        {/* Qty controls */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <button
                            onClick={() => item.qty > 1 ? onUpdateQty(idx, item.qty - 1) : onRemove(idx)}
                            style={{
                              width: "24px",
                              height: "24px",
                              background: "transparent",
                              border: `1px solid rgba(201,168,76,0.3)`,
                              color: GOLD,
                              cursor: "pointer",
                              fontSize: "1rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 0,
                            }}
                          >
                            −
                          </button>
                          <span style={{ color: IVORY, fontFamily: "Inter, sans-serif", fontSize: "0.875rem", minWidth: "20px", textAlign: "center" }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => onUpdateQty(idx, item.qty + 1)}
                            style={{
                              width: "24px",
                              height: "24px",
                              background: "transparent",
                              border: `1px solid rgba(201,168,76,0.3)`,
                              color: GOLD,
                              cursor: "pointer",
                              fontSize: "1rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 0,
                            }}
                          >
                            +
                          </button>
                        </div>
                        <div style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>
                          {formatPrice(item.product.price * item.qty)}
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(255,255,255,0.3)",
                        cursor: "pointer",
                        fontSize: "1rem",
                        alignSelf: "flex-start",
                        padding: "0",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Checkout form */
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "8px" }}>
                CONTACT INFORMATION
              </div>
              <div>
                <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  style={{ ...inputStyle }}
                />
              </div>

              <div style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", marginTop: "8px" }}>
                SHIPPING ADDRESS
              </div>
              <div>
                <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                  FULL NAME *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  style={{ ...inputStyle }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                  ADDRESS LINE 1 *
                </label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  placeholder="Street address"
                  style={{ ...inputStyle }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                    CITY *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    style={{ ...inputStyle }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                    ZIP / POSTCODE *
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="ZIP"
                    style={{ ...inputStyle }}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", fontSize: "0.7rem", marginBottom: "6px", letterSpacing: "0.08em" }}>
                  COUNTRY CODE *
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{ ...inputStyle, appearance: "none" }}
                >
                  <option value="US">United States (US)</option>
                  <option value="GB">United Kingdom (GB)</option>
                  <option value="CA">Canada (CA)</option>
                  <option value="AU">Australia (AU)</option>
                  <option value="AE">UAE (AE)</option>
                  <option value="SG">Singapore (SG)</option>
                  <option value="FR">France (FR)</option>
                  <option value="DE">Germany (DE)</option>
                  <option value="CH">Switzerland (CH)</option>
                  <option value="IT">Italy (IT)</option>
                  <option value="ES">Spain (ES)</option>
                  <option value="NL">Netherlands (NL)</option>
                  <option value="JP">Japan (JP)</option>
                  <option value="HK">Hong Kong (HK)</option>
                  <option value="NZ">New Zealand (NZ)</option>
                </select>
              </div>

              {/* Order summary */}
              <div
                style={{
                  marginTop: "8px",
                  padding: "16px",
                  background: "rgba(201,168,76,0.06)",
                  border: `1px solid rgba(201,168,76,0.15)`,
                }}
              >
                <div style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "12px" }}>
                  ORDER SUMMARY
                </div>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: IVORY, opacity: 0.7, fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>
                      {item.qty}× {item.product.name}
                    </span>
                    <span style={{ color: IVORY, fontFamily: "Inter, sans-serif", fontSize: "0.75rem" }}>
                      {formatPrice(item.product.price * item.qty)}
                    </span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid rgba(201,168,76,0.15)`, marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>Total</span>
                  <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "0.875rem" }}>{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "success" && (
          <div
            style={{
              padding: "24px",
              borderTop: `1px solid rgba(201,168,76,0.15)`,
              background: NAVY,
            }}
          >
            {step === "cart" ? (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ color: IVORY, opacity: 0.7, fontFamily: "Inter, sans-serif", fontSize: "0.875rem" }}>Subtotal</span>
                  <span style={{ color: GOLD, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: "1rem" }}>{formatPrice(subtotal)}</span>
                </div>
                <button
                  onClick={() => cart.length > 0 && setStep("checkout")}
                  disabled={cart.length === 0}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: cart.length > 0 ? GOLD : "rgba(201,168,76,0.3)",
                    color: NAVY,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: cart.length > 0 ? "pointer" : "not-allowed",
                    borderRadius: 0,
                  }}
                >
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={() => setStep("cart")}
                  style={{
                    flex: 1,
                    padding: "14px",
                    background: "transparent",
                    color: GOLD,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: `1px solid rgba(201,168,76,0.4)`,
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  style={{
                    flex: 2,
                    padding: "14px",
                    background: submitting ? "rgba(201,168,76,0.5)" : GOLD,
                    color: NAVY,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    borderRadius: 0,
                  }}
                >
                  {submitting ? "Placing Order..." : `Place Order · ${formatPrice(subtotal)}`}
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function Merch() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useSEO({
    title: "Official Store — Billionaire Collection",
    description:
      "Shop the official Billionaire Collection merchandise. Premium tees, hoodies, hats, mugs, posters and tote bags. Exclusive luxury apparel for the discerning collector.",
  });

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Billionaire Collection Official Store",
    description: "Premium luxury merchandise from the Billionaire Collection",
    url: "https://www.billionairecollection.com/marketplace",
    brand: {
      "@type": "Brand",
      name: "Billionaire Collection",
    },
  });

  const filteredProducts =
    activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product, color: string, size?: string) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (item) => item.product.id === product.id && item.color === color && item.size === size
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...updated[existing], qty: updated[existing].qty + 1 };
        return updated;
      }
      return [...prev, { product, color, size, qty: 1 }];
    });
    toast.success(`${product.name} added to cart`, {
      description: `${color}${size ? ` · ${size}` : ""} — ${formatPrice(product.price)}`,
    });
  };

  const updateQty = (idx: number, qty: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], qty };
      return updated;
    });
  };

  const removeItem = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          padding: "100px 0 80px",
          overflow: "hidden",
          borderBottom: `1px solid rgba(201,168,76,0.15)`,
        }}
      >
        {/* Background texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Top gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              style={{
                color: GOLD,
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              THE BILLIONAIRE COLLECTION — OFFICIAL STORE
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
              color: IVORY,
              textTransform: "uppercase",
              lineHeight: 1.05,
              marginBottom: "24px",
              letterSpacing: "-0.01em",
            }}
          >
            The Official
            <br />
            <span style={{ color: GOLD }}>Collection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: IVORY,
              opacity: 0.65,
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              maxWidth: "540px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Premium apparel and accessories for those who live the Billionaire Collection lifestyle.
            Exclusively crafted. Globally fulfilled.
          </motion.p>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 64px)",
              flexWrap: "wrap",
            }}
          >
            {[
              { stat: "17", label: "Exclusive Products" },
              { stat: "6", label: "Collections" },
              { stat: "Global", label: "Fulfilment via Printful" },
            ].map(({ stat, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: GOLD,
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.75rem",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat}
                </div>
                <div
                  style={{
                    color: IVORY,
                    opacity: 0.5,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gold line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          }}
        />
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      <div
        style={{
          position: "sticky",
          top: "64px",
          zIndex: 40,
          background: NAVY,
          borderBottom: `1px solid rgba(201,168,76,0.15)`,
          padding: "0 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              padding: "16px 0",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  borderRadius: 0,
                  transition: "all 0.2s ease",
                  background: activeCategory === cat ? GOLD : "transparent",
                  color: activeCategory === cat ? NAVY : GOLD,
                  border: `1px solid ${activeCategory === cat ? GOLD : "rgba(201,168,76,0.4)"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <section style={{ padding: "60px 0 80px" }}>
        <div className="container">
          {/* Count + Cart button row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ color: IVORY, opacity: 0.5, fontFamily: "Inter, sans-serif", fontSize: "0.8rem" }}>
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </div>

            {/* Cart button */}
            <button
              onClick={() => setCartOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 20px",
                background: cartCount > 0 ? GOLD : "transparent",
                color: cartCount > 0 ? NAVY : GOLD,
                border: `1px solid ${cartCount > 0 ? GOLD : "rgba(201,168,76,0.4)"}`,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 0,
                transition: "all 0.2s ease",
              }}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span
                  style={{
                    background: NAVY,
                    color: GOLD,
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
                gap: "24px",
              }}
            >
              {filteredProducts.map((product, idx) => (
                <FadeUp key={product.id} delay={idx * 0.04}>
                  <ProductCard product={product} onAddToCart={addToCart} />
                </FadeUp>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── BRAND PROMISE STRIP ── */}
      <FadeUp>
        <section
          style={{
            borderTop: `1px solid rgba(201,168,76,0.15)`,
            borderBottom: `1px solid rgba(201,168,76,0.15)`,
            padding: "48px 0",
            background: "rgba(201,168,76,0.03)",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                gap: "32px",
                textAlign: "center",
              }}
            >
              {[
                { icon: "✦", title: "Premium Materials", desc: "Every piece crafted from the finest fabrics and materials." },
                { icon: "✦", title: "Global Fulfilment", desc: "Worldwide shipping via Printful's premium fulfilment network." },
                { icon: "✦", title: "Exclusive Designs", desc: "Limited runs. Collector's quality. Never mass-produced." },
                { icon: "✦", title: "Hassle-Free Returns", desc: "30-day returns on all items. No questions asked." },
              ].map(({ icon, title, desc }) => (
                <div key={title}>
                  <div style={{ color: GOLD, fontSize: "1.25rem", marginBottom: "12px" }}>{icon}</div>
                  <div
                    style={{
                      color: IVORY,
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      marginBottom: "8px",
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ color: IVORY, opacity: 0.5, fontFamily: "Inter, sans-serif", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── FOOTER CTA ── */}
      <FadeUp>
        <section style={{ padding: "80px 0", textAlign: "center" }}>
          <div className="container">
            <div
              style={{
                color: GOLD,
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                fontFamily: "Inter, sans-serif",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              The Billionaire Collection Ecosystem
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                color: IVORY,
                marginBottom: "16px",
              }}
            >
              Beyond the Store
            </h2>
            <p style={{ color: IVORY, opacity: 0.6, fontFamily: "Inter, sans-serif", maxWidth: "480px", margin: "0 auto 32px", lineHeight: 1.7 }}>
              Explore the full Billionaire Collection ecosystem — ultra-prime real estate, private aviation,
              superyachts, and exclusive concierge services.
            </p>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "14px 40px",
                background: "transparent",
                color: GOLD,
                border: `1px solid ${GOLD}`,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.background = GOLD;
                (e.target as HTMLAnchorElement).style.color = NAVY;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.background = "transparent";
                (e.target as HTMLAnchorElement).style.color = GOLD;
              }}
            >
              Explore the Collection →
            </a>
          </div>
        </section>
      </FadeUp>

      {/* ── CART MODAL ── */}
      <AnimatePresence>
        {cartOpen && (
          <CartModal
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeItem}
          />
        )}
      </AnimatePresence>

      {/* Floating cart button (mobile) */}
      {cartCount > 0 && !cartOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          onClick={() => setCartOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 50,
            background: GOLD,
            color: NAVY,
            border: "none",
            width: "56px",
            height: "56px",
            borderRadius: 0,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
          }}
        >
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>🛒</span>
          <span style={{ marginTop: "2px" }}>{cartCount}</span>
        </motion.button>
      )}
    </div>
  );
}
