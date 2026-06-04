const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const CART_STORAGE_KEY = "kinglikeCart";
const WISHLIST_STORAGE_KEY = "kinglikeWishlist";
const STORE_UPDATED_KEY = "kinglikeStoreUpdatedAt";
const WHATSAPP_PHONE = "8562051777641";
const MESSENGER_ID = "Kinglikesikai";
const MESSENGER_URL = `https://www.messenger.com/t/${MESSENGER_ID}`;
const IDB_NAME = "kinglikeAdminStore";
const IDB_STORE = "records";
const BED_COLOR_PALETTE = [
  ["fabric-01", "01 Cream", "#f4ead2"], ["fabric-02", "02 Ivory", "#fff3cf"],
  ["fabric-03", "03 Sand", "#d9c89a"], ["fabric-04", "04 Wheat", "#c7ae72"],
  ["fabric-05", "05 Honey", "#d6a85a"], ["fabric-06", "06 Camel", "#b98a55"],
  ["fabric-07", "07 Taupe", "#a98d70"], ["fabric-08", "08 Mocha", "#7a5d45"],
  ["fabric-09", "09 Walnut", "#5b4134"], ["fabric-10", "10 Chocolate", "#3f2b24"],
  ["fabric-11", "11 Charcoal", "#252b2d"], ["fabric-12", "12 Navy", "#182837"],
  ["fabric-13", "13 Slate", "#3f4a4a"], ["fabric-14", "14 Smoke", "#686f67"],
  ["fabric-15", "15 Olive", "#7f8a62"], ["fabric-16", "16 Lime", "#9ac13f"],
  ["fabric-17", "17 Sage", "#b6bd93"], ["fabric-18", "18 Khaki", "#b2a77c"],
  ["fabric-19", "19 Beige", "#d4c19a"], ["fabric-20", "20 Champagne", "#e4d6b3"],
  ["fabric-21", "21 Gold", "#d4ad55"], ["fabric-22", "22 Mustard", "#c99738"],
  ["fabric-23", "23 Orange", "#d77b35"], ["fabric-24", "24 Terracotta", "#a95b3e"],
  ["fabric-25", "25 Brick", "#8f4638"], ["fabric-26", "26 Coral", "#d95e5f"],
  ["fabric-27", "27 Rose", "#c9495b"], ["fabric-28", "28 Wine", "#7d3446"],
  ["fabric-29", "29 Plum", "#5a4159"], ["fabric-30", "30 Mauve", "#8b6678"],
  ["fabric-31", "31 Gray Beige", "#a5a093"], ["fabric-32", "32 Linen Gray", "#c8c7b8"]
].map(([id, name, hex]) => ({ id, name, hex, available: true }));
const DEFAULT_LAYER_STORY = {
  eyebrow: "Inside this model",
  title: "ຂ້າງໃນແຕ່ລະຊັ້ນ ຕັ້ງໃຈເລືອກມາເພື່ອການນອນທີ່ດີຂຶ້ນ",
  description: "ລາຍລະອຽດວັດສະດຸຊ່ວຍໃຫ້ລູກຄ້າເຂົ້າໃຈວ່າຮຸ່ນນີ້ເໝາະກັບໃຜ ໂດຍບໍ່ຕ້ອງຕັດສິນໃຈຈາກລາຄາຢ່າງດຽວ."
};

function openLocalDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(IDB_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(key) {
  const db = await openLocalDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(IDB_STORE, "readonly");
    const request = transaction.objectStore(IDB_STORE).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
const SYNC_STORE_URL = "/api/store";
const STATIC_STORE_URL = new URL("data/store.json", window.location.href).toString();

const collectionProducts = {
  mattresses: [
    { ...product("foam-comfort", "Kinglike Foam Comfort", "Foam", "ນຸ່ມ", "10 ນິ້ວ", 5200000, 3590000, 31, "Foam"), type: "foam" },
    { ...product("latex-natural", "Kinglike Natural Latex", "Latex", "ນຸ່ມແນ່ນ", "10 ນິ້ວ", 6900000, 4690000, 32, "Latex"), type: "latex" },
    { ...product("spring-cloud", "Kinglike Foam Spring", "Hybrid", "ນຸ່ມແນ່ນ", "12 ນິ້ວ", 7800000, 5290000, 32, "Hybrid"), type: "foam-spring" },
    { ...product("foam-latex-luxe", "Kinglike Foam Latex Luxe", "Foam + Latex", "ນຸ່ມ", "11 ນິ້ວ", 7400000, 5190000, 30, "Premium"), type: "foam-latex" },
    { ...product("grand-hybrid", "Kinglike Grand Hybrid", "Foam + Spring + Latex", "ນຸ່ມແນ່ນ", "13 ນິ້ວ", 9200000, 6590000, 28, "Hotel Grade"), type: "foam-spring-latex" }
  ],
  "mattress-beds": [
    product("mattress-bed-signature", "Kinglike Signature Sleep Set", "Mattress + Bed", "ນຸ່ມແນ່ນ", "12 ນິ້ວ + ຕຽງ Queen / King", 15500000, 10990000, 29, "Set")
  ],
  pillows: [
    product("pillow-cloud", "Kinglike Cloud Pillow", "Pillow", "ນຸ່ມ", "Premium microfiber", 890000, 590000, 34, "Best Seller"),
    product("pillow-latex", "Kinglike Latex Pillow", "Pillow", "ນຸ່ມແນ່ນ", "Natural latex", 1290000, 790000, 39, "Promotion"),
    product("pillow-cool", "Kinglike Cool Gel Pillow", "Pillow", "ນຸ່ມ", "Cooling gel foam", 1490000, 990000, 34, "New"),
    product("pillow-hotel", "Kinglike Hotel Pillow", "Pillow", "ນຸ່ມແນ່ນ", "Hotel fiber", 990000, 690000, 30, "Hotel Grade")
  ],
  toppers: [
    product("topper-luxe", "Kinglike Luxe Topper", "Topper", "ນຸ່ມ", "3 ນິ້ວ", 2490000, 1690000, 32, "Best Seller"),
    product("topper-latex", "Kinglike Latex Topper", "Topper", "ນຸ່ມແນ່ນ", "2 ນິ້ວ", 2890000, 1990000, 31, "Promotion"),
    product("topper-hotel", "Kinglike Hotel Topper", "Topper", "ນຸ່ມ", "4 ນິ້ວ", 3290000, 2390000, 27, "Hotel Grade"),
    product("topper-cool", "Kinglike Cool Topper", "Topper", "ນຸ່ມແນ່ນ", "Cooling fabric", 3590000, 2590000, 28, "New")
  ],
  blankets: [
    product("blanket-soft", "Kinglike Soft Blanket", "Blanket", "ນຸ່ມ", "Premium fiber", 1290000, 790000, 39, "New")
  ],
  beds: [
    product("bed-luxury", "Kinglike Luxury Bed", "Bed", "ແຂງແຮງ", "Queen / King", 6900000, 4990000, 28, "Hotel Grade")
  ],
  bedding: [
    product("sheet-gold", "Kinglike Gold Sheet Set", "Bedding", "ນຸ່ມ", "Cotton sateen", 1590000, 990000, 38, "Promotion"),
    product("protector-premium", "Kinglike Mattress Protector", "Bedding", "ນຸ່ມ", "Waterproof", 990000, 690000, 30, "New")
  ]
};

function product(id, name, category, firmness, thickness, price, salePrice, discountPercent, badge) {
  return {
    id,
    name,
    category,
    firmness,
    thickness,
    price,
    salePrice,
    discountPercent,
    badge,
    rating: 4.8,
    sizes: ["ມາດຕະຖານ"],
    sku: id.toUpperCase(),
    warranty: "1 ປີ",
    stock: "ມີສິນຄ້າ",
    materials: ["Premium fabric", "Comfort support", "Easy care"],
    freebies: ["2 pillows", "Premium bedsheet"],
    description: `${name} ຖືກອອກແບບໃຫ້ເຂົ້າກັບຫ້ອງນອນພຣີມຽມ ແລະຊ່ວຍໃຫ້ການນອນສະບາຍຂຶ້ນ.`
  };
}

let adminProductsOverride = null;
let activeGalleryItems = [];
let activeGalleryIndex = 0;
let galleryAutoTimer = null;

function loadAdminProducts() {
  if (Array.isArray(adminProductsOverride)) return adminProductsOverride.map(normalizeAdminProduct);
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.map(normalizeAdminProduct) : [];
  } catch (error) {
    return [];
  }
}

function normalizeAdminProduct(item) {
  const price = Number(item.price || 0);
  const salePrice = Number(item.salePrice || 0);
  const images = productImages(item);
  return {
    ...item,
    image: images[0] || item.image || "",
    images,
    price,
    salePrice,
    discountPercent: item.discountPercent || discountPercent(price, salePrice),
    sizes: Array.isArray(item.sizes) && item.sizes.length ? item.sizes : ["ມາດຕະຖານ"],
    rating: item.rating || 4.8,
    sku: item.sku || (item.id || "KINGLIKE").toUpperCase(),
    warranty: item.warranty || "1 ປີ",
    stock: item.stock || "ມີສິນຄ້າ",
    materials: Array.isArray(item.materials) && item.materials.length ? item.materials : ["Premium fabric", "Comfort support"],
    freebies: Array.isArray(item.freebies) ? item.freebies.filter(Boolean) : [],
    description: item.description || `${item.name} ສິນຄ້າພຣີມຽມຈາກ Kinglike.`
  };
}

function productImages(product) {
  if (Array.isArray(product?.images) && product.images.length) return product.images.filter(Boolean);
  return product?.image ? [product.image] : [];
}

function galleryItems(product) {
  const images = productImages(product);
  if (images.length) {
    return images.map((image, index) => ({
      image,
      label: index === 0 ? "ຮູບສິນຄ້າ" : `ຮູບ ${index + 1}`
    }));
  }
  return [
    { image: "", label: "ຍັງບໍ່ມີຮູບສິນຄ້າ" }
  ];
}

function primaryImage(product) {
  return productImages(product)[0] || "";
}

function layerStory(product) {
  const saved = product?.layerStory && typeof product.layerStory === "object" ? product.layerStory : {};
  return {
    eyebrow: String(saved.eyebrow || DEFAULT_LAYER_STORY.eyebrow).trim(),
    title: String(saved.title || DEFAULT_LAYER_STORY.title).trim(),
    description: String(saved.description || DEFAULT_LAYER_STORY.description).trim()
  };
}

function productCollectionKey(product) {
  if (product?.type && collectionProducts.mattresses.some((item) => item.id === product.id)) return "mattresses";
  return collectionFromAdminProduct(product);
}

function productUrl(product) {
  return `product.html?id=${encodeURIComponent(product.id)}&category=${encodeURIComponent(productCollectionKey(product))}`;
}

function openProductPage(product, pushHistory = true) {
  if (!product) return;
  const nextCategory = productCollectionKey(product);
  products = getProductList(nextCategory);
  currentProduct = products.find((item) => item.id === product.id) || product;
  if (pushHistory) window.history.pushState({ productId: currentProduct.id }, "", productUrl(currentProduct));
  renderProduct();
  window.scrollTo(0, 0);
}

function navigateToProductPage(product) {
  if (!product) return;
  window.location.href = productUrl(product);
}

function relatedProducts(product) {
  const key = productCollectionKey(product);
  const sameCollection = getProductList(key).filter((item) => item.id !== product.id);
  const sameType = sameCollection.filter((item) => item.type && product.type && item.type === product.type);
  const sameCategory = sameCollection.filter((item) => item.category === product.category);
  const adjacent = allProducts.filter((item) => item.id !== product.id);
  const merged = [...sameType, ...sameCategory, ...sameCollection, ...adjacent];
  return merged
    .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
}

function relatedTitle(product) {
  const key = productCollectionKey(product);
  if (key === "pillows") return "ໝອນແນະນຳ";
  if (key === "mattress-beds") return "ເສື່ອນອນ+ຕຽງນອນແນະນຳ";
  if (key === "toppers") return "ທັອບເປີແນະນຳ";
  if (key === "blankets") return "ຜ້າຫົ່ມແນະນຳ";
  if (key === "beds") return "ຕຽງນອນແນະນຳ";
  if (key === "bedding") return "ອຸປະກອນການນອນແນະນຳ";
  return "ສິນຄ້າທີ່ໃກ້ຄຽງ";
}

function relatedProductCard(product) {
  const image = primaryImage(product);
  const imageClass = image ? "has-admin-image" : "";
  const savingLabel = productSavingLabel(product);
  return `
    <article class="product-card related-product-card clickable-card" data-related-detail="${product.id}">
      <div class="product-art ${imageClass}">
        ${image ? `<img src="${image}" alt="${product.name}" />` : ""}
        ${image ? "" : `<span class="image-placeholder">ຍັງບໍ່ມີຮູບສິນຄ້າ</span>`}
        <span class="${productBadgeClass(product)}">${productBadgeText(product)}</span>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="meta">${product.category} • ${product.thickness} • ${product.firmness}</div>
        <div class="prices" aria-label="ລາຄາສິນຄ້າ">
          <span class="price-label">ລາຄາເລີ່ມຕົ້ນ</span>
          <strong class="sale-price">${productCardPrice(product)}</strong>
          <span class="regular-price">${productCardPrice(product, "regularPrice")}</span>
          ${savingLabel ? `<span class="save-chip">${savingLabel}</span>` : ""}
        </div>
        <div class="card-actions">
          <button class="add-cart" type="button" data-add-cart="${product.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="view-btn" type="button" data-related-detail="${product.id}">ລາຍລະອຽດ</button>
        </div>
      </div>
    </article>
  `;
}

function productFreebies(product) {
  const saved = Array.isArray(product?.freebies) ? product.freebies.filter(Boolean) : [];
  if (saved.length) return saved;
  const category = (product?.category || "").toLowerCase();
  if (category.includes("pillow")) return ["Pillow cover"];
  if (category.includes("topper")) return ["Aroma fabric spray"];
  return ["2 pillows", "Premium bedsheet"];
}

function discountPercent(price, salePrice) {
  if (!price || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

function collectionFromAdminProduct(product) {
  const category = (product.category || "").toLowerCase();
  if ((category.includes("mattress") || category.includes("ເສື່ອ") || category.includes("ທີ່ນອນ")) && (category.includes("bed") || category.includes("ຕຽງ"))) return "mattress-beds";
  if (category.includes("blanket") || category.includes("duvet") || category.includes("comforter")) return "blankets";
  if (category === "bed" || category.includes("bed frame") || category.includes("bedframe")) return "beds";
  if (category.includes("pillow")) return "pillows";
  if (category.includes("topper")) return "toppers";
  if (category.includes("bedding") || category.includes("sheet") || category.includes("protector")) return "bedding";
  return "mattresses";
}

function isBedProduct(product) {
  const collectionKey = collectionFromAdminProduct(product);
  return collectionKey === "beds" || collectionKey === "mattress-beds";
}

function bedColorOptions(product) {
  const saved = new Map((Array.isArray(product?.bedColors) ? product.bedColors : []).map((item) => [item?.id, item]));
  return BED_COLOR_PALETTE.map((color) => {
    const current = saved.get(color.id) || {};
    return {
      ...color,
      name: current.name || color.name,
      hex: current.hex || color.hex,
      available: current.available !== false
    };
  });
}

function selectedDetailColor(product) {
  if (!isBedProduct(product)) return null;
  const options = bedColorOptions(product);
  const selectedId = els.page?.querySelector("[data-bed-color].is-active")?.dataset.bedColor || "";
  return options.find((color) => color.id === selectedId && color.available) || options.find((color) => color.available) || null;
}

function colorNameForCartItem(item, product) {
  if (item?.colorName) return item.colorName;
  const color = bedColorOptions(product).find((option) => option.id === item?.color);
  return color?.name || "";
}

function getProductList(category) {
  const base = collectionProducts[category] || collectionProducts.pillows;
  const adminProducts = loadAdminProducts().filter((item) => collectionFromAdminProduct(item) === category);
  return [...adminProducts, ...base].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
}

const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "pillows";
const id = params.get("id");
if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
let products = getProductList(categoryKey);
let allProducts = mergedAllProducts();
let currentProduct = products.find((item) => item.id === id) || products[0];
const state = { cart: loadCart(), wishlist: loadWishlist() };
const money = new Intl.NumberFormat("lo-LA").format;

const els = {
  header: document.querySelector("[data-header]"),
  page: document.querySelector("[data-product-page]"),
  cartDrawer: document.querySelector("[data-cart-drawer]"),
  wishlistDrawer: document.querySelector("[data-wishlist-drawer]"),
  cartItems: document.querySelector("[data-cart-items]"),
  wishlistItems: document.querySelector("[data-wishlist-items]"),
  cartCount: document.querySelector("[data-cart-count]"),
  wishlistCount: document.querySelector("[data-wishlist-count]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  mobileMenu: document.querySelector("[data-mobile-menu]"),
  menuBackdrop: document.querySelector("[data-menu-backdrop]")
};

function mergedAllProducts() {
  return [...loadAdminProducts(), ...Object.values(collectionProducts).flat()]
    .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
}

async function loadSyncedStore() {
  for (const url of [SYNC_STORE_URL, STATIC_STORE_URL]) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;
      const store = await response.json();
      store.__source = url === STATIC_STORE_URL ? "static" : "api";
      if (store && (Array.isArray(store.products) || store.promotion)) return store;
    } catch (error) {
      // Try the next source.
    }
  }
  return null;
}

function shouldUseSyncedStore(store) {
  if (!store) return false;
  if (store.__source !== "static") return true;
  const localTime = Date.parse(localStorage.getItem(STORE_UPDATED_KEY) || "");
  const remoteTime = Date.parse(store.updatedAt || "");
  return !localTime || (remoteTime && remoteTime > localTime);
}

async function hydrateSyncedStore() {
  const store = await loadSyncedStore();
  try {
    const idbProducts = await idbGet(PRODUCT_STORAGE_KEY);
    if (Array.isArray(idbProducts) && idbProducts.length) {
      adminProductsOverride = idbProducts;
      try {
        localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(idbProducts));
      } catch (error) {
        // Use the in-memory copy for this page load.
      }
      products = getProductList(categoryKey);
      allProducts = mergedAllProducts();
      currentProduct = products.find((item) => item.id === id) || products[0];
      renderProduct();
      renderCart();
      renderWishlist();
    }
  } catch (error) {
    // Keep local/static fallback.
  }
  if (!shouldUseSyncedStore(store) || !Array.isArray(store.products) || !store.products.length) return;
  adminProductsOverride = store.products;
  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(store.products));
  } catch (error) {
    // Use the in-memory copy for this page load.
  }
  if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
  products = getProductList(categoryKey);
  allProducts = mergedAllProducts();
  currentProduct = products.find((item) => item.id === id) || products[0];
  renderProduct();
  renderCart();
  renderWishlist();
}

function formatKip(value) {
  return `${money(Number(value || 0))} ₭`;
}

function productPrice(product, key) {
  return Number(product?.[key] || 0);
}

function productDiscountPercent(product) {
  return Math.max(0, Math.round(Number(product?.discountPercent || 0)));
}

function productBadgeText(product) {
  const discount = productDiscountPercent(product);
  return discount > 0 ? `ຫຼຸດ ${discount}%` : product.badge || "New";
}

function productBadgeClass(product) {
  return productDiscountPercent(product) > 0 ? "badge is-discount" : "badge";
}

function productSizes(product) {
  return Array.isArray(product?.sizes) && product.sizes.length ? product.sizes.filter(Boolean) : ["ມາດຕະຖານ"];
}

function productSizeOptions(product) {
  const sizes = productSizes(product);
  const baseSale = productPrice(product, "salePrice");
  const baseRegular = productPrice(product, "price");
  return sizes.map((size, index) => {
    const salePrice = Number(product?.sizePrices?.[size] || 0) || Math.round(baseSale + (baseSale * index * 0.12));
    const regularPrice = Number(product?.sizeRegularPrices?.[size] || 0) || Math.round(baseRegular + (baseRegular * index * 0.12));
    return { size, salePrice, regularPrice };
  });
}

function productSizeOption(product, size = "") {
  const options = productSizeOptions(product);
  return options.find((option) => option.size === size) || options[0] || { size: "ມາດຕະຖານ", salePrice: productPrice(product, "salePrice"), regularPrice: productPrice(product, "price") };
}

function productDisplayPrice(product, key = "salePrice") {
  const prices = productSizeOptions(product).map((option) => option[key]).filter((value) => value > 0);
  if (!prices.length) return formatKip(productPrice(product, key));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? formatKip(min) : `${formatKip(min)} - ${formatKip(max)}`;
}

function productCardPrice(product, key = "salePrice") {
  const prices = productSizeOptions(product).map((option) => option[key]).filter((value) => value > 0);
  if (!prices.length) return formatKip(productPrice(product, key));
  return formatKip(Math.min(...prices));
}

function productSavingLabel(product) {
  const options = productSizeOptions(product);
  const savings = options.map((option) => option.regularPrice - option.salePrice).filter((value) => value > 0);
  if (!savings.length) return "";
  const maxSaving = Math.max(...savings);
  const discount = productDiscountPercent(product);
  return `ປະຢັດສູງສຸດ ${formatKip(maxSaving)}${discount ? ` • ${discount}%` : ""}`;
}

function cartKey(id, size = "", color = "") {
  return `${id}__${size || ""}__${color || ""}`;
}

function detailBenefitIcon(type) {
  const icons = {
    delivery: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3z"/><path d="M14 10h3l4 4v2h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    warranty: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-2.9 8.5-7 10-4.1-1.5-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    inspect: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16 16l4 4"/><path d="M8.5 11l1.7 1.7 3.5-3.8"/></svg>',
    support: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v3a2 2 0 0 0 2 2h1v-7H6a2 2 0 0 0-2 2z"/><path d="M20 13v3a2 2 0 0 1-2 2h-1v-7h1a2 2 0 0 1 2 2z"/><path d="M9 19c1 1 5 1 6 0"/></svg>',
    gift: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4z"/><path d="M3 7h18v3H3z"/><path d="M12 7v13"/><path d="M12 7c-1.8-3-5.8-2.2-5 1 2.4.2 4-.2 5-1z"/><path d="M12 7c1.8-3 5.8-2.2 5 1-2.4.2-4-.2-5-1z"/></svg>'
  };
  return icons[type] || icons.inspect;
}

function detailBenefitCard(type, title, text, extraClass = "") {
  return `
    <article class="detail-benefit-card ${extraClass}">
      <span class="detail-benefit-icon">${detailBenefitIcon(type)}</span>
      <div>
        <strong>${title}</strong>
        <p>${text}</p>
      </div>
    </article>
  `;
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
}

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved.filter(Boolean) : []);
  } catch (error) {
    return new Set();
  }
}

function renderProduct() {
  document.title = `Kinglike - ${currentProduct.name}`;
  const related = relatedProducts(currentProduct);
  const selectedOption = productSizeOption(currentProduct);
  const saving = selectedOption.regularPrice - selectedOption.salePrice;
  const gallery = galleryItems(currentProduct);
  const heroImage = gallery[0]?.image || "";
  const imageClass = heroImage ? "has-admin-image" : "";
  const bedColors = isBedProduct(currentProduct) ? bedColorOptions(currentProduct) : [];
  const firstBedColor = bedColors.find((color) => color.available);
  const story = layerStory(currentProduct);
  els.page.innerHTML = `
    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="detail-hero-art ${productCollectionKey(currentProduct) === "pillows" ? "pillow-detail-art" : ""} ${imageClass}" data-gallery-hero data-open-gallery="0">
          ${heroImage ? `<img src="${heroImage}" alt="${currentProduct.name}" data-gallery-hero-image />` : ""}
          ${heroImage ? "" : `<span class="image-placeholder detail-image-placeholder">ຍັງບໍ່ມີຮູບສິນຄ້າ</span>`}
          <span class="${productBadgeClass(currentProduct)}">${productBadgeText(currentProduct)}</span>
          ${gallery.length > 1 ? `
            <button class="gallery-nav gallery-prev" type="button" data-gallery-prev aria-label="Previous image">‹</button>
            <button class="gallery-nav gallery-next" type="button" data-gallery-next aria-label="Next image">›</button>
          ` : ""}
        </div>
        ${gallery.length > 1 ? `
          <div class="gallery-dots" data-gallery-dots aria-label="Product image slides">
            ${gallery.map((item, index) => `
              <button class="${index === 0 ? "is-active" : ""}" type="button" data-gallery-dot="${index}" aria-label="${item.label || `Image ${index + 1}`}"></button>
            `).join("")}
          </div>
        ` : ""}
        <div class="detail-thumbs" data-gallery-thumbs>
          ${gallery.map((item, index) => `
            <button class="${index === 0 ? "is-active" : ""} ${item.image ? "" : "is-empty"}" type="button" data-gallery-index="${index}">
              ${item.image ? `<img src="${item.image}" alt="${item.label}" />` : ""}
              ${item.image ? "" : `<span>${item.label}</span>`}
            </button>
          `).join("")}
        </div>
      </div>
      <aside class="detail-buybox">
        <h2>${currentProduct.name}</h2>
        <div class="detail-code">SKU: ${currentProduct.sku} • ${currentProduct.stock}</div>
        <div class="meta">${currentProduct.category} • ${currentProduct.thickness} • ${currentProduct.firmness} • ★ ${currentProduct.rating}</div>
        <div class="detail-price" aria-label="ລາຄາສິນຄ້າ">
          <span class="price-label">ລາຄາພິເສດ</span>
          <strong data-detail-sale-price>${formatKip(selectedOption.salePrice)}</strong>
          <span class="regular-price" data-detail-regular-price>${formatKip(selectedOption.regularPrice)}</span>
        </div>
        <div class="save-line">ປະຢັດ ${formatKip(saving)} (${currentProduct.discountPercent}%)</div>
        <div class="option-group">
          <label>ເລືອກຂະໜາດ</label>
          <div class="size-options">${productSizeOptions(currentProduct).map((option, index) => `<button class="${index === 0 ? "is-active" : ""}" type="button" data-size-option="${option.size}" data-size-sale="${option.salePrice}" data-size-regular="${option.regularPrice}">${option.size}</button>`).join("")}</div>
        </div>
        ${bedColors.length ? `
          <div class="option-group bed-color-group">
            <label>ເລືອກສີຜ້າ</label>
            <div class="bed-color-options">
              ${bedColors.map((color) => `<button class="bed-color-swatch ${firstBedColor?.id === color.id ? "is-active" : ""}" type="button" data-bed-color="${color.id}" data-bed-color-name="${color.name}" style="--swatch:${color.hex}" ${color.available ? "" : "disabled"} aria-label="${color.name}${color.available ? "" : " sold out"}"><span></span></button>`).join("")}
            </div>
            <small class="bed-color-selected" data-selected-bed-color>${firstBedColor ? firstBedColor.name : "ສີທີ່ເລືອກໝົດຊົ່ວຄາວ"}</small>
          </div>
        ` : ""}
        <div class="option-group">
          <label>ຈຳນວນ</label>
          <div class="qty-control">
            <button type="button" data-detail-qty-decrease>−</button>
            <input data-detail-qty type="number" min="1" step="1" inputmode="numeric" value="1" aria-label="ຈຳນວນ" />
            <button type="button" data-detail-qty-increase>＋</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="add-cart" type="button" data-add-cart="${currentProduct.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="buy-now" type="button" data-buy-now="${currentProduct.id}">ສັ່ງຊື້</button>
        </div>
      </aside>
    </div>
    <div class="detail-benefits">
      ${detailBenefitCard("delivery", "ຈັດສົ່ງຟຣີທົ່ວນະຄອນຫຼວງ", "ຈັດສົ່ງໄວ ແລະປະສານງານກ່ອນສົ່ງ.")}
      ${detailBenefitCard("warranty", `ຮັບປະກັນ ${currentProduct.warranty}`, "ຄຸ້ມຄອງຕາມເງື່ອນໄຂຂອງຮ້ານ.")}
      ${detailBenefitCard("inspect", "ກວດສອບກ່ອນຮັບ", "ກວດສະພາບ ແລະຂະໜາດສິນຄ້າກ່ອນຮັບໄດ້.")}
      ${detailBenefitCard("support", "ມີທີມງານແນະນຳ", "ຊ່ວຍເລືອກຮຸ່ນ ຂະໜາດ ແລະຄວາມນຸ່ມ.")}
      ${productFreebies(currentProduct).length ? detailBenefitCard("gift", "ຂອງແຖມ", productFreebies(currentProduct).join(", "), "detail-gift-benefit") : ""}
    </div>
    <section class="detail-layer-story" aria-label="Mattress structure">
      <div class="layer-story-copy">
        <span>${story.eyebrow}</span>
        <h3>${story.title}</h3>
        <p>${story.description}</p>
      </div>
      <div class="layer-stack">
        ${currentProduct.materials.map((item, index) => `
          <article>
            <strong>${String(index + 1).padStart(2, "0")}</strong>
            <span>${item}</span>
          </article>
        `).join("")}
      </div>
    </section>
    <section class="detail-hotel-proof" aria-label="Kinglike hotel comfort">
      <span>Hotel Comfort</span>
      <h3>ຟີລທີ່ນອນໂຮງແຮມໃນຫ້ອງນອນຂອງທ່ານ</h3>
      <p>ເລືອກຂະໜາດໃຫ້ກົງກັບຕຽງ, ກົດສັ່ງຊື້ ແລ້ວໃຫ້ແອດມິນຢືນຢັນຮອບຈັດສົ່ງ ແລະເງື່ອນໄຂຮັບປະກັນກ່ອນຊຳລະເງິນ.</p>
    </section>
    <div class="detail-info">
      <section>
        <h3>ລາຍລະອຽດສິນຄ້າ</h3>
        <p>${currentProduct.description}</p>
      </section>
      <section>
        <h3>ຄຸນສົມບັດຫຼັກ</h3>
        <ul>${currentProduct.materials.map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
    </div>
    ${related.length ? `
      <section class="related-products">
        <div class="section-heading">
          <p class="eyebrow">RECOMMENDED</p>
          <h2>${relatedTitle(currentProduct)}</h2>
        </div>
        <div class="product-grid related-product-grid" data-related-products></div>
      </section>
    ` : ""}
  `;
  bindGallery(gallery);
  renderRelatedProducts();
}

function renderRelatedProducts() {
  const grid = els.page.querySelector("[data-related-products]");
  if (!grid) return;
  const related = relatedProducts(currentProduct);
  grid.innerHTML = related.slice(0, 8).map(relatedProductCard).join("");
  grid.onclick = (event) => {
    if (event.target.closest("[data-add-cart]")) return;
    const target = event.target.closest("[data-related-detail]");
    if (!target || !grid.contains(target)) return;
    event.preventDefault();
    event.stopPropagation();
    const product = allProducts.find((candidate) => candidate.id === target.dataset.relatedDetail);
    navigateToProductPage(product);
  };
}

function bindGallery(gallery) {
  if (!gallery.length) return;
  if (galleryAutoTimer) window.clearInterval(galleryAutoTimer);
  activeGalleryItems = gallery.filter((item) => item.image);
  let activeIndex = 0;
  const hero = els.page.querySelector("[data-gallery-hero]");
  const heroImage = els.page.querySelector("[data-gallery-hero-image]");
  const thumbs = els.page.querySelectorAll("[data-gallery-index]");
  const dots = els.page.querySelectorAll("[data-gallery-dot]");
  let swipeStartX = 0;
  let swipeStartY = 0;
  const setActive = (index) => {
    activeIndex = (index + gallery.length) % gallery.length;
    activeGalleryIndex = activeIndex;
    const item = gallery[activeIndex];
    hero.classList.toggle("has-admin-image", Boolean(item.image));
    hero.dataset.openGallery = String(activeIndex);
    if (item.image && heroImage) heroImage.src = item.image;
    thumbs.forEach((thumb) => thumb.classList.toggle("is-active", Number(thumb.dataset.galleryIndex) === activeIndex));
    dots.forEach((dot) => dot.classList.toggle("is-active", Number(dot.dataset.galleryDot) === activeIndex));
  };
  const restartAutoSlide = () => {
    if (galleryAutoTimer) window.clearInterval(galleryAutoTimer);
    if (gallery.length <= 1) return;
    galleryAutoTimer = window.setInterval(() => setActive(activeIndex + 1), 3000);
  };
  thumbs.forEach((thumb) => thumb.addEventListener("click", () => {
    setActive(Number(thumb.dataset.galleryIndex));
    restartAutoSlide();
  }));
  dots.forEach((dot) => dot.addEventListener("click", () => {
    setActive(Number(dot.dataset.galleryDot));
    restartAutoSlide();
  }));
  hero?.addEventListener("click", (event) => {
    if (event.target.closest(".gallery-nav")) return;
    openImageLightbox(activeIndex);
  });
  hero?.addEventListener("pointerdown", (event) => {
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
  });
  hero?.addEventListener("pointerup", (event) => {
    if (!swipeStartX) return;
    const deltaX = event.clientX - swipeStartX;
    const deltaY = event.clientY - swipeStartY;
    swipeStartX = 0;
    swipeStartY = 0;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    setActive(activeIndex + (deltaX < 0 ? 1 : -1));
    restartAutoSlide();
  });
  els.page.querySelector("[data-gallery-prev]")?.addEventListener("click", () => {
    setActive(activeIndex - 1);
    restartAutoSlide();
  });
  els.page.querySelector("[data-gallery-next]")?.addEventListener("click", () => {
    setActive(activeIndex + 1);
    restartAutoSlide();
  });
  restartAutoSlide();
}

function ensureImageLightbox() {
  let modal = document.querySelector("[data-image-lightbox]");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "image-lightbox";
  modal.dataset.imageLightbox = "";
  modal.innerHTML = `
    <div class="image-lightbox-panel">
      <button class="image-lightbox-close" type="button" data-close-image-lightbox aria-label="Close image">×</button>
      <button class="image-lightbox-nav image-lightbox-prev" type="button" data-lightbox-prev aria-label="Previous image">‹</button>
      <figure>
        <img alt="" data-lightbox-image />
        <figcaption data-lightbox-caption></figcaption>
      </figure>
      <button class="image-lightbox-nav image-lightbox-next" type="button" data-lightbox-next aria-label="Next image">›</button>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function renderImageLightbox() {
  const modal = ensureImageLightbox();
  const images = activeGalleryItems;
  const item = images[activeGalleryIndex] || images[0];
  if (!item) return;
  modal.querySelector("[data-lightbox-image]").src = item.image;
  modal.querySelector("[data-lightbox-image]").alt = item.label || currentProduct.name;
  modal.querySelector("[data-lightbox-caption]").textContent = item.label || currentProduct.name;
  modal.classList.toggle("has-single-image", images.length <= 1);
}

function openImageLightbox(index = 0) {
  const images = activeGalleryItems;
  if (!images.length) return;
  activeGalleryIndex = Math.max(0, Math.min(index, images.length - 1));
  renderImageLightbox();
  ensureImageLightbox().classList.add("is-open");
}

function closeImageLightbox() {
  document.querySelector("[data-image-lightbox]")?.classList.remove("is-open");
}

function moveImageLightbox(delta) {
  const images = activeGalleryItems;
  if (!images.length) return;
  activeGalleryIndex = (activeGalleryIndex + delta + images.length) % images.length;
  renderImageLightbox();
}

function flyToHeaderIcon(source, target) {
  if (!source || !target) return;
  const start = source.getBoundingClientRect();
  const end = target.getBoundingClientRect();
  const dot = document.createElement("span");
  dot.className = "fly-to-header";
  dot.style.setProperty("--fly-x", `${end.left + end.width / 2 - start.left - start.width / 2}px`);
  dot.style.setProperty("--fly-y", `${end.top + end.height / 2 - start.top - start.height / 2}px`);
  dot.style.left = `${start.left + start.width / 2}px`;
  dot.style.top = `${start.top + start.height / 2}px`;
  document.body.appendChild(dot);
  dot.addEventListener("animationend", () => dot.remove(), { once: true });
}

function revealHeaderConfirmation() {
  const header = els.header || document.querySelector("[data-header]");
  if (!header) return;
  window.clearTimeout(header._confirmTimer);
  header.classList.remove("is-header-hidden", "is-action-confirming");
  void header.offsetWidth;
  header.classList.add("is-action-confirming");
  header._confirmTimer = window.setTimeout(() => {
    header.classList.remove("is-action-confirming");
    if (window.scrollY > 12 && !header.matches(":focus-within") && !els.mobileMenu?.classList.contains("is-open")) {
      header.classList.add("is-header-hidden");
    }
  }, 1450);
}

function pulseHeaderAction(type, source) {
  const target = document.querySelector(type === "wishlist" ? "[data-open-wishlist]" : "[data-open-cart]");
  revealHeaderConfirmation();
  target?.classList.remove("is-count-bump");
  void target?.offsetWidth;
  target?.classList.add("is-count-bump");
  flyToHeaderIcon(source, target);
}

function addToCart(idToAdd, size = "", qty = 1, source, colorId = "") {
  const product = allProducts.find((candidate) => candidate.id === idToAdd);
  if (!product) return;
  const option = productSizeOption(product, size);
  const color = isBedProduct(product) ? (bedColorOptions(product).find((item) => item.id === colorId && item.available) || bedColorOptions(product).find((item) => item.available)) : null;
  if (isBedProduct(product) && !color) return;
  const item = state.cart.find((cartItem) => cartKey(cartItem.id, cartItem.size, cartItem.color) === cartKey(idToAdd, option.size, color?.id || ""));
  const quantity = Math.max(1, Number(qty || 1));
  if (item) item.qty += quantity;
  else state.cart.push({ id: idToAdd, size: option.size, color: color?.id || "", colorName: color?.name || "", unitPrice: option.salePrice, qty: quantity });
  saveCart();
  renderCart();
  pulseHeaderAction("cart", source);
}

function renderCart() {
  const items = state.cart
    .map((item) => ({ ...item, product: allProducts.find((candidate) => candidate.id === item.id) }))
    .filter((item) => item.product);

  els.cartItems.innerHTML = items.length
    ? items.map((item) => `
      <div class="drawer-item cart-line">
        <div class="cart-line-info">
          <strong>${item.product.name}</strong>
          <div class="meta">${[item.size || productSizeOption(item.product).size, colorNameForCartItem(item, item.product), formatKip(item.unitPrice || productSizeOption(item.product, item.size).salePrice)].filter(Boolean).join(" • ")}</div>
          <div class="cart-qty">
            <button type="button" data-cart-decrease="${cartKey(item.product.id, item.size, item.color)}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-increase="${cartKey(item.product.id, item.size, item.color)}">＋</button>
          </div>
        </div>
        <div class="cart-line-side">
          <strong>${formatKip((item.unitPrice || productSizeOption(item.product, item.size).salePrice) * item.qty)}</strong>
          <button type="button" data-remove-cart="${cartKey(item.product.id, item.size, item.color)}">×</button>
        </div>
      </div>
    `).join("")
    : `<p class="meta">ລົດເຂັນຍັງວ່າງຢູ່</p>`;
  const total = items.reduce((sum, item) => sum + (item.unitPrice || productSizeOption(item.product, item.size).salePrice) * item.qty, 0);
  els.cartTotal.textContent = formatKip(total);
  els.cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => cartKey(item.id, item.size, item.color) !== key);
  saveCart();
  renderCart();
}

function updateCartQty(key, delta) {
  const item = state.cart.find((cartItem) => cartKey(cartItem.id, cartItem.size, cartItem.color) === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(key);
    return;
  }
  saveCart();
  renderCart();
}

function renderWishlist() {
  const list = [...state.wishlist].map((itemId) => allProducts.find((product) => product.id === itemId)).filter(Boolean);
  els.wishlistItems.innerHTML = list.length
    ? list.map((product) => `<div class="drawer-item"><div><strong>${product.name}</strong><div class="meta">${formatKip(product.salePrice)}</div></div><button type="button" data-add-cart="${product.id}">＋</button></div>`).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
  els.wishlistCount.textContent = list.length;
}

function cartItemsWithProducts() {
  return state.cart
    .map((item) => {
      const product = allProducts.find((candidate) => candidate.id === item.id);
      if (!product) return null;
      const option = productSizeOption(product, item.size);
      return { ...item, size: item.size || option.size, colorName: colorNameForCartItem(item, product), unitPrice: item.unitPrice || option.salePrice, product };
    })
    .filter(Boolean);
}

function orderDateParts(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  return {
    display: `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`,
    key: `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
  };
}

function nextOrderCode() {
  const { key } = orderDateParts();
  const storageKey = `kinglike-order-sequence-${key}`;
  const next = Number(localStorage.getItem(storageKey) || 0) + 1;
  localStorage.setItem(storageKey, String(next));
  return `#KL${key}${String(next).padStart(3, "0")}`;
}

function orderItems(productId = "") {
  const focusedProduct = allProducts.find((product) => product.id === productId);
  const focusedOption = focusedProduct ? selectedDetailSize(focusedProduct) : null;
  const focusedColor = focusedProduct ? selectedDetailColor(focusedProduct) : null;
  return focusedProduct ? [{ product: focusedProduct, size: focusedOption.size, color: focusedColor?.id || "", colorName: focusedColor?.name || "", unitPrice: focusedOption.salePrice, qty: selectedDetailQty(els.page) }] : cartItemsWithProducts();
}

function customerFromChatModal({ validate = false } = {}) {
  const modal = document.querySelector("[data-chat-order-modal]");
  const getValue = (name) => modal?.querySelector(`[name="${name}"]`)?.value.trim() || "";
  const customer = {
    name: getValue("chatCustomerName"),
    phone: getValue("chatCustomerPhone"),
    address: getValue("chatCustomerAddress")
  };
  if (validate) {
    const missing = [];
    if (!customer.name) missing.push("ຊື່ລູກຄ້າ");
    if (!customer.phone) missing.push("ເບີໂທ");
    if (!customer.address) missing.push("ທີ່ຢູ່");
    if (missing.length) {
      const target = modal?.querySelector("[data-chat-error]");
      if (target) {
        target.classList.add("is-error");
        target.textContent = "ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບ.";
      }
      return null;
    }
  }
  return customer;
}

function buildOrderMessage(productId = "", customer = {}, orderCode = nextOrderCode()) {
  const items = orderItems(productId);
  const orderPrice = (value) => formatKip(value).replace("₭", "ກີບ");
  const { display: orderDate } = orderDateParts();
  const itemLines = items.map((item, index) => {
    const unitPrice = item.unitPrice || productSizeOption(item.product, item.size).salePrice;
    const subtotal = unitPrice * item.qty;
    return [
      `${index + 1}. ${item.product.name}`,
      item.size ? `   • ຂະໜາດ: ${item.size}` : "",
      item.colorName ? `   • ສີ: ${item.colorName}` : "",
      `   • ຈຳນວນ: ${item.qty}`,
      `   • ລາຄາ: ${orderPrice(subtotal)}`
    ].filter(Boolean).join("\n");
  });
  const total = items.reduce((sum, item) => sum + (item.unitPrice || productSizeOption(item.product, item.size).salePrice) * item.qty, 0);
  return [
    "🛏️ ໃບສັ່ງຊື້ສິນຄ້າຈາກເວບໄຊ KINGLIKE",
    "",
    `📋 ລະຫັດຄຳສັ່ງ: ${orderCode}`,
    `📅 ວັນທີ: ${orderDate}`,
    "",
    "━━━━━━━━━━━━━━",
    "",
    "🛒 ລາຍການສິນຄ້າ",
    "",
    itemLines.join("\n\n"),
    "",
    "━━━━━━━━━━━━━━",
    "",
    `💰 ຍອດລວມ: ${orderPrice(total)}`,
    "",
    "━━━━━━━━━━━━━━",
    "",
    `👤 ຊື່ລູກຄ້າ: ${customer.name || ""}`,
    "",
    `📞 ເບີໂທ: ${customer.phone || ""}`,
    "",
    `📍 ທີ່ຢູ່: ${customer.address || ""}`,
    "",
    "━━━━━━━━━━━━━━"
  ].filter(Boolean).join("\n");
}

function chatItems(productId = "") {
  return orderItems(productId);
}

function selectedDetailSize(product) {
  const selected = els.page?.querySelector("[data-size-option].is-active")?.dataset.sizeOption || "";
  return productSizeOption(product, selected);
}

function selectedDetailQty(container = document) {
  const qtyTarget = container.querySelector("[data-detail-qty]");
  const rawValue = qtyTarget && "value" in qtyTarget ? qtyTarget.value : qtyTarget?.textContent;
  return Math.max(1, Math.floor(Number(rawValue || 1) || 1));
}

let lastDetailQtyStepAt = 0;

function adjustDetailQtyFromEvent(event) {
  const qtyDecrease = event.target.closest("[data-detail-qty-decrease]");
  const qtyIncrease = event.target.closest("[data-detail-qty-increase]");
  if (!qtyDecrease && !qtyIncrease) return false;
  const now = Date.now();
  if (event.type === "click" && now - lastDetailQtyStepAt < 350) return true;
  const qtyTarget = event.target.closest(".qty-control")?.querySelector("[data-detail-qty]");
  const current = Math.max(1, Math.floor(Number(qtyTarget?.value || qtyTarget?.textContent || 1) || 1));
  const next = String(Math.max(1, current + (qtyIncrease ? 1 : -1)));
  if (qtyTarget && "value" in qtyTarget) qtyTarget.value = next;
  else if (qtyTarget) qtyTarget.textContent = next;
  lastDetailQtyStepAt = now;
  event.preventDefault();
  return true;
}

function channelIcon(channel) {
  if (channel === "messenger") {
    return `<span class="contact-icon messenger-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3C6.76 3 2.5 6.94 2.5 11.78c0 2.76 1.38 5.22 3.54 6.82v3.05l3.24-1.78c.86.24 1.77.37 2.72.37 5.24 0 9.5-3.94 9.5-8.78S17.24 3 12 3Zm.95 11.82-2.42-2.58-4.72 2.58 5.18-5.5 2.48 2.58 4.66-2.58-5.18 5.5Z"/></svg></span>`;
  }
  return `<span class="contact-icon whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12.04 3.5a8.45 8.45 0 0 0-7.27 12.75L3.8 20.5l4.36-.94a8.45 8.45 0 1 0 3.88-16.06Zm0 1.55a6.9 6.9 0 0 1 5.86 10.54 6.9 6.9 0 0 1-8.98 2.34l-.31-.18-2.44.53.54-2.38-.2-.32a6.9 6.9 0 0 1 5.53-10.53Zm-2.55 3.62c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.84s.79 2.13.9 2.28c.11.15 1.53 2.45 3.78 3.34 1.87.74 2.25.59 2.66.55.41-.04 1.32-.54 1.5-1.06.19-.52.19-.96.13-1.06-.06-.1-.2-.16-.43-.27-.23-.11-1.32-.65-1.53-.72-.2-.08-.35-.11-.5.11-.15.22-.57.72-.7.87-.13.15-.26.17-.48.06-.23-.11-.95-.35-1.81-1.12-.67-.6-1.12-1.33-1.25-1.55-.13-.22-.01-.34.1-.45.1-.1.23-.26.34-.39.11-.13.15-.22.23-.37.08-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.64-.18-.43-.36-.37-.5-.38h-.38Z"/></svg></span>`;
}

function channelButton(channel, label, extraAttributes = "") {
  return `<button type="button" data-chat-channel="${channel}" ${extraAttributes}>${channelIcon(channel)}<span>${label}</span></button>`;
}

function contactChannelButtons(productId = "") {
  const productAttr = productId ? ` data-line-product="${productId}"` : "";
  return `
    <div class="contact-channel-group">
      <button class="line-contact whatsapp-contact" type="button" data-line-contact data-line-channel="whatsapp"${productAttr}>${channelIcon("whatsapp")}<span>ປຶກສາ WhatsApp</span></button>
      <button class="line-contact messenger-contact" type="button" data-line-contact data-line-channel="messenger"${productAttr}>${channelIcon("messenger")}<span>ປຶກສາ Messenger</span></button>
    </div>
  `;
}

function ensureChatModal() {
  let modal = document.querySelector("[data-chat-order-modal]");
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "chat-order-modal";
  modal.dataset.chatOrderModal = "";
  modal.innerHTML = `
    <div class="chat-order-panel">
      <button class="close-btn" type="button" data-close-chat-order>×</button>
      <p class="eyebrow">ສັ່ງຜ່ານແຊັດ</p>
      <h2>ເລືອກຊ່ອງທາງຕິດຕໍ່</h2>
      <p class="meta">ກອກຂໍ້ມູນລູກຄ້າ ແລ້ວເລືອກ WhatsApp ຫຼື Messenger. ລະບົບຈະສ້າງໃບສັ່ງຊື້ໃຫ້ອັດຕະໂນມັດ.</p>
      <div class="chat-order-summary" data-chat-summary></div>
      <div class="chat-customer-form">
        <label>ຊື່ລູກຄ້າ<input name="chatCustomerName" autocomplete="name" placeholder="ຊື່ ແລະ ນາມສະກຸນ" /></label>
        <label>ເບີໂທ<input name="chatCustomerPhone" inputmode="tel" autocomplete="tel" placeholder="020XXXXXXXX" /></label>
        <label>ທີ່ຢູ່<textarea name="chatCustomerAddress" rows="3" placeholder="ບ້ານ, ເມືອງ, ແຂວງ, ຈຸດສັງເກດ"></textarea></label>
      </div>
      <p class="checkout-alert" data-chat-error></p>
      <div class="chat-channel-actions">
        ${channelButton("whatsapp", "WhatsApp")}
        ${channelButton("messenger", "Messenger")}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

function openChatOrder(productId = "") {
  const items = chatItems(productId);
  if (!items.length) {
    openDrawer(els.cartDrawer);
    return;
  }
  const modal = ensureChatModal();
  modal.dataset.productId = productId;
  modal.querySelector("[data-chat-summary]").innerHTML = items.map((item) => `
    <div><strong>${item.product.name}</strong><span>${[item.size || productSizeOption(item.product).size, item.colorName, formatKip(item.unitPrice || productSizeOption(item.product, item.size).salePrice)].filter(Boolean).join(" • ")} x ${item.qty}</span></div>
  `).join("");
  modal.classList.add("is-open");
}

function copyChatMessage(message) {
  const fallbackCopy = () => {
    const textarea = document.createElement("textarea");
    textarea.value = message;
    textarea.setAttribute("readonly", "");
    textarea.style.left = "-9999px";
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(message).catch(fallbackCopy);
  }
  fallbackCopy();
  return Promise.resolve();
}

function showMessengerCopyNotice(copied) {
  const modal = document.querySelector("[data-chat-order-modal]");
  const target = modal?.querySelector("[data-chat-error]");
  if (!target) return;
  target.classList.toggle("is-error", !copied);
  target.textContent = copied
    ? "ຄັດລອກລາຍການສັ່ງຊື້ແລ້ວ. ເປີດ Messenger ແລ້ວກົດວາງໃນແຊັດຮ້ານໄດ້ເລີຍ."
    : "Messenger ບໍ່ຮອງຮັບຂໍ້ຄວາມອັດຕະໂນມັດ. ກະລຸນາກັບມາຄັດລອກຂໍ້ຄວາມອີກຄັ້ງ.";
}

async function sendChatDraft(channel, productId = "") {
  const items = chatItems(productId);
  const customer = customerFromChatModal({ validate: items.length });
  if (!customer) return false;
  const orderCode = items.length ? nextOrderCode() : "";
  const message = items.length ? buildOrderMessage(productId, customer, orderCode) : "ສະບາຍດີ ຂໍສອບຖາມສິນຄ້າ KINGLIKE";
  const url = channel === "messenger" ? MESSENGER_URL : `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  const chatWindow = window.open(url, "_blank");
  if (!chatWindow) window.location.href = url;
  if (channel === "messenger") {
    copyChatMessage(message).then(() => showMessengerCopyNotice(true)).catch(() => showMessengerCopyNotice(false));
  }
  try {
    if (items.length) await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mode: "chat_draft",
        contactChannel: channel,
        orderCode,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerWhatsapp: customer.phone,
        customerAddress: customer.address,
        chatMessage: message,
        productLink: window.location.href,
        items: items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          size: item.size || productSizeOption(item.product).size,
          color: item.colorName || "",
          quantity: item.qty,
          unitPrice: item.unitPrice || productSizeOption(item.product, item.size).salePrice
        }))
      })
    });
  } catch (error) {
    // Let customer continue to chat even if the local draft API is unavailable.
  }
  return true;
}

async function submitChatDraft(channel) {
  const modal = ensureChatModal();
  const productId = modal.dataset.productId || "";
  const sent = await sendChatDraft(channel, productId);
  if (sent && channel !== "messenger") modal.classList.remove("is-open");
}

function checkout() {
  openChatOrder();
}

function buyNow(idToBuy) {
  openChatOrder(idToBuy);
}

function openDrawer(drawer) {
  window.kinglikeRevealHeader?.();
  drawer.classList.add("is-open");
}

function closeDrawer(drawer) {
  drawer.classList.remove("is-open");
}

function openMobileMenu() {
  els.mobileMenu.classList.add("is-open");
  els.menuBackdrop.classList.add("is-open");
}

function closeMobileMenu() {
  els.mobileMenu.classList.remove("is-open");
  els.menuBackdrop.classList.remove("is-open");
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-cart]");
  const addId = addButton?.dataset.addCart;
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  const increaseId = event.target.closest("[data-cart-increase]")?.dataset.cartIncrease;
  const decreaseId = event.target.closest("[data-cart-decrease]")?.dataset.cartDecrease;
  const lineTarget = event.target.closest("[data-line-contact]");
  const shouldCheckout = event.target.closest("[data-checkout]");
  const buyNowId = event.target.closest("[data-buy-now]")?.dataset.buyNow;
  const relatedDetailId = event.target.closest("[data-related-detail]")?.dataset.relatedDetail;
  if (lineTarget) {
    const lineProduct = lineTarget.dataset.lineProduct || "";
    if (lineProduct) openChatOrder(lineProduct);
    else sendChatDraft(lineTarget.dataset.lineChannel || "whatsapp", "");
    return;
  }
  if (buyNowId) {
    buyNow(buyNowId);
    return;
  }
  if (shouldCheckout) {
    checkout();
    return;
  }
  if (addId) {
    const product = allProducts.find((candidate) => candidate.id === addId);
    const isDetailAdd = Boolean(addButton.closest(".detail-buybox"));
    if (product && isBedProduct(product) && !isDetailAdd) {
      navigateToProductPage(product);
      return;
    }
    const selected = product && isDetailAdd ? selectedDetailSize(product).size : "";
    const selectedColor = product && isDetailAdd ? selectedDetailColor(product) : null;
    addToCart(addId, selected, isDetailAdd ? selectedDetailQty(els.page) : 1, addButton, selectedColor?.id || "");
    return;
  }
  if (relatedDetailId) {
    const product = allProducts.find((candidate) => candidate.id === relatedDetailId);
    navigateToProductPage(product);
    return;
  }
  if (removeId) {
    removeFromCart(removeId);
  }
  if (increaseId) {
    updateCartQty(increaseId, 1);
  }
  if (decreaseId) {
    updateCartQty(decreaseId, -1);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-image-lightbox]")) {
    closeImageLightbox();
    return;
  }
  if (event.target.closest("[data-lightbox-prev]")) {
    moveImageLightbox(-1);
    return;
  }
  if (event.target.closest("[data-lightbox-next]")) {
    moveImageLightbox(1);
    return;
  }
  if (event.target.matches("[data-image-lightbox]")) {
    closeImageLightbox();
    return;
  }
  if (event.target.closest("[data-close-chat-order]")) {
    ensureChatModal().classList.remove("is-open");
    return;
  }
  const channel = event.target.closest("[data-chat-channel]")?.dataset.chatChannel;
  if (channel) submitChatDraft(channel);
  if (adjustDetailQtyFromEvent(event)) return;
  const sizeButton = event.target.closest("[data-size-option]");
  if (sizeButton) {
    const group = sizeButton.closest(".size-options");
    group?.querySelectorAll("[data-size-option]").forEach((button) => button.classList.toggle("is-active", button === sizeButton));
    const panel = sizeButton.closest(".detail-buybox");
    const saleTarget = panel?.querySelector("[data-detail-sale-price]");
    const regularTarget = panel?.querySelector("[data-detail-regular-price]");
    if (saleTarget) saleTarget.textContent = formatKip(sizeButton.dataset.sizeSale);
    if (regularTarget) regularTarget.textContent = formatKip(sizeButton.dataset.sizeRegular);
  }
  const colorButton = event.target.closest("[data-bed-color]");
  if (colorButton && !colorButton.disabled) {
    const group = colorButton.closest(".bed-color-options");
    group?.querySelectorAll("[data-bed-color]").forEach((button) => button.classList.toggle("is-active", button === colorButton));
    const label = colorButton.closest(".bed-color-group")?.querySelector("[data-selected-bed-color]");
    if (label) label.textContent = colorButton.dataset.bedColorName || "";
  }
});

document.addEventListener("pointerup", (event) => {
  adjustDetailQtyFromEvent(event);
});

document.addEventListener("input", (event) => {
  const qtyTarget = event.target.closest("[data-detail-qty]");
  if (!qtyTarget) return;
  qtyTarget.value = qtyTarget.value.replace(/[^\d]/g, "");
});

document.addEventListener("change", (event) => {
  const qtyTarget = event.target.closest("[data-detail-qty]");
  if (!qtyTarget) return;
  qtyTarget.value = String(Math.max(1, Math.floor(Number(qtyTarget.value || 1) || 1)));
});

document.addEventListener("keydown", (event) => {
  const modal = document.querySelector("[data-image-lightbox]");
  if (!modal?.classList.contains("is-open")) return;
  if (event.key === "Escape") closeImageLightbox();
  if (event.key === "ArrowLeft") moveImageLightbox(-1);
  if (event.key === "ArrowRight") moveImageLightbox(1);
});

document.querySelector("[data-open-cart]").addEventListener("click", () => openDrawer(els.cartDrawer));
document.querySelector("[data-close-cart]").addEventListener("click", () => closeDrawer(els.cartDrawer));
document.querySelector("[data-open-wishlist]").addEventListener("click", () => openDrawer(els.wishlistDrawer));
document.querySelector("[data-close-wishlist]").addEventListener("click", () => closeDrawer(els.wishlistDrawer));
document.querySelector("[data-open-menu]").addEventListener("click", openMobileMenu);
document.querySelector("[data-close-menu]").addEventListener("click", closeMobileMenu);
els.menuBackdrop.addEventListener("click", closeMobileMenu);

function initHeaderReveal() {
  if (!els.header) return;
  const idleDelay = 2000;
  let lastY = window.scrollY;
  let hideTimer = 0;
  const canHide = () => !els.mobileMenu?.classList.contains("is-open") && !els.header.matches(":focus-within");
  const showHeader = () => {
    els.header.classList.remove("is-header-hidden");
    window.clearTimeout(hideTimer);
    if (canHide()) hideTimer = window.setTimeout(() => {
      if (canHide()) els.header.classList.add("is-header-hidden");
    }, idleDelay);
  };
  const hideHeader = () => {
    window.clearTimeout(hideTimer);
    if (canHide()) els.header.classList.add("is-header-hidden");
  };
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const delta = currentY - lastY;
    els.header.classList.toggle("is-scrolled", currentY > 24);
    if (Math.abs(delta) >= 4) {
      if (delta < 0) showHeader();
      else if (currentY > 12) hideHeader();
      lastY = Math.max(0, currentY);
    }
  }, { passive: true });
  window.addEventListener("mousemove", (event) => {
    if (event.clientY <= 22) showHeader();
  }, { passive: true });
  window.addEventListener("touchstart", (event) => {
    if (event.touches?.[0]?.clientY <= 36) showHeader();
  }, { passive: true });
  els.header.addEventListener("focusin", showHeader);
  els.header.addEventListener("mouseenter", showHeader);
  window.kinglikeRevealHeader = showHeader;
  showHeader();
}

window.addEventListener("popstate", () => {
  const nextParams = new URLSearchParams(window.location.search);
  const nextId = nextParams.get("id");
  const nextProduct = allProducts.find((item) => item.id === nextId);
  if (nextProduct) openProductPage(nextProduct, false);
});

initHeaderReveal();
renderProduct();
renderCart();
renderWishlist();
hydrateSyncedStore();
