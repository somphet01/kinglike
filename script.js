const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";
const CART_STORAGE_KEY = "kinglikeCart";
const WISHLIST_STORAGE_KEY = "kinglikeWishlist";
const STORE_UPDATED_KEY = "kinglikeStoreUpdatedAt";
const WHATSAPP_PHONE = "8562051777641";
const MESSENGER_ID = "kinglike";
const MESSENGER_URL = `https://m.me/${MESSENGER_ID}`;
const SYNC_STORE_URL = "/api/store";
const STATIC_STORE_URL = new URL("data/store.json", window.location.href).toString();
const IDB_NAME = "kinglikeAdminStore";
const IDB_STORE = "records";

const defaultProducts = [
  {
    id: "royal-cloud",
    name: "Kinglike Royal Cloud",
    category: "Hybrid",
    firmness: "ນຸ່ມ",
    thickness: "12 ນິ້ວ",
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"],
    price: 7800000,
    salePrice: 5290000,
    discountPercent: 32,
    badge: "Best Seller",
    rating: 4.9,
    popular: 99,
    sku: "KL-RC-1201",
    materials: ["Premium knitted fabric", "Natural latex comfort layer", "Pocket spring support", "Anti-dust mite finish"],
    freebies: ["2 pillows", "Premium bedsheet"],
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "ຮຸ່ນ Royal Cloud ເນັ້ນຄວາມນຸ່ມສະບາຍແບບຫ້ອງພັກຫຼູ ຊ່ວຍຮອງຮັບສະຣີລະໃຫ້ຜ່ອນຄາຍ ແລະລົດແຮງກົດທັບໃນຈຸດສຳຄັນ."
  },
  {
    id: "hotel-latex",
    name: "Kinglike Hotel Latex",
    category: "Latex",
    firmness: "ນຸ່ມແນ່ນ",
    thickness: "10 ນິ້ວ",
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"],
    price: 6900000,
    salePrice: 4690000,
    discountPercent: 32,
    badge: "ຫຼຸດ 32%",
    rating: 4.8,
    popular: 88,
    sku: "KL-HL-1002",
    materials: ["Latex comfort layer", "Breathable fabric", "High density foam", "Pocket spring base"],
    freebies: ["Latex pillow", "Aroma fabric spray"],
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "ທີ່ນອນ Latex ສຳລັບຄົນທີ່ຕ້ອງການຄວາມນຸ່ມແນ່ນ ນອນສະບາຍ ແລະຮອງຮັບຫຼັງໄດ້ດີ."
  },
  {
    id: "pocket-grand",
    name: "Kinglike Pocket Grand",
    category: "Pocket Spring",
    firmness: "ແນ່ນ",
    thickness: "11 ນິ້ວ",
    sizes: ["5 ຟຸດ", "6 ຟຸດ"],
    price: 5900000,
    salePrice: 3990000,
    discountPercent: 32,
    badge: "Promotion",
    rating: 4.7,
    popular: 75,
    sku: "KL-PG-1103",
    materials: ["Pocket spring", "Support foam", "Cool-touch fabric", "Edge support"],
    freebies: ["2 pillows"],
    warranty: "8 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "Pocket Grand ເຫມາະກັບຜູ້ທີ່ມັກຄວາມແນ່ນ ໂຄງສ້າງ spring ແຍກອິດສະຫຼະຊ່ວຍລົດການສັ່ນໄຫວ."
  },
  {
    id: "memory-luxe",
    name: "Kinglike Memory Luxe",
    category: "Memory Foam",
    firmness: "ນຸ່ມ",
    thickness: "8 ນິ້ວ",
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ"],
    price: 4500000,
    salePrice: 3290000,
    discountPercent: 27,
    badge: "New",
    rating: 4.6,
    popular: 64,
    sku: "KL-ML-0804",
    materials: ["Memory foam", "Soft knit cover", "Pressure relief layer", "Anti-bacterial finish"],
    warranty: "7 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "Memory Luxe ໂອບຮັບຮ່າງກາຍແບບນຸ່ມ ເໝາະກັບຫ້ອງນອນທີ່ຕ້ອງການຄວາມສະບາຍແລະຄຸ້ມຄ່າ."
  },
  {
    id: "gold-support",
    name: "Kinglike Gold Support",
    category: "Hybrid",
    firmness: "ນຸ່ມແນ່ນ",
    thickness: "12 ນິ້ວ",
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"],
    price: 8600000,
    salePrice: 6190000,
    discountPercent: 28,
    badge: "Hotel Grade",
    rating: 4.9,
    popular: 92,
    sku: "KL-GS-1205",
    materials: ["Hybrid support", "Natural latex", "Pocket spring", "Luxury quilted fabric"],
    warranty: "12 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "Gold Support ເປັນຮຸ່ນພຣີມຽມທີ່ຮອງຮັບແນ່ນ ແຕ່ຍັງນຸ່ມສະບາຍ ໃຫ້ຄວາມຮູ້ສຶກແບບໂຮງແຮມ."
  },
  {
    id: "classic-rest",
    name: "Kinglike Classic Rest",
    category: "Pocket Spring",
    firmness: "ແນ່ນ",
    thickness: "9 ນິ້ວ",
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"],
    price: 3900000,
    salePrice: 2790000,
    discountPercent: 28,
    badge: "Value",
    rating: 4.5,
    popular: 58,
    sku: "KL-CR-0906",
    materials: ["Pocket spring", "Comfort foam", "Knitted fabric", "Edge support"],
    warranty: "6 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "Classic Rest ເປັນຮຸ່ນເລີ່ມຕົ້ນທີ່ໃຊ້ງານງ່າຍ ລາຄາດີ ແລະຮອງຮັບການນອນປະຈຳວັນ."
  }
];

let products = loadProducts();

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

async function loadProductsAsync() {
  try {
    const saved = await idbGet(PRODUCT_STORAGE_KEY);
    if (Array.isArray(saved) && saved.length) return repairStoredData(saved);
  } catch (error) {
    // Keep local fallback.
  }
  return loadProducts();
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
  const idbProducts = await loadProductsAsync();
  if (idbProducts.length) {
    products = idbProducts;
    renderProducts();
    renderCart();
    renderWishlist();
  }
  const idbPromotion = await loadPromotionAsync();
  if (idbPromotion.title || idbPromotion.text || idbPromotion.coverImage || idbPromotion.events.length) {
    renderPromotionData(idbPromotion);
  }
  if (!shouldUseSyncedStore(store)) return;
  if (Array.isArray(store.products) && store.products.length) {
    products = repairStoredData(store.products);
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
    if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
    renderProducts();
    renderCart();
    renderWishlist();
  }
  if (store.promotion && typeof store.promotion === "object") {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(repairStoredData(store.promotion)));
    } catch (error) {
      // Promotion may be stored in IndexedDB by the admin when localStorage is full.
    }
    if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
    renderPromotion();
  }
}

function loadProducts() {
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [...defaultProducts];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? repairStoredData(parsed) : [...defaultProducts];
  } catch (error) {
    return [...defaultProducts];
  }
}

function loadPromotion() {
  try {
    const promotion = repairStoredData(JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || {});
    promotion.events = Array.isArray(promotion.events) ? promotion.events : [];
    return promotion;
  } catch (error) {
    return { events: [] };
  }
}

async function loadPromotionAsync() {
  const local = loadPromotion();
  if (local.title || local.text || local.coverImage || local.events.length) return local;
  try {
    const saved = await idbGet(PROMO_STORAGE_KEY);
    if (saved && typeof saved === "object") {
      const repaired = repairStoredData(saved);
      repaired.events = Array.isArray(repaired.events) ? repaired.events : [];
      return repaired;
    }
  } catch (error) {
    // Keep local fallback.
  }
  return local;
}

const state = {
  cart: loadCart(),
  wishlist: loadWishlist(),
  search: "",
  size: "",
  firmness: "",
  sort: "popular",
  page: 1,
  perPage: 8
};

const money = new Intl.NumberFormat("lo-LA").format;
let promoPopupDismissed = false;

const CP1252_BYTES = { "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86, "‡": 0x87, "ˆ": 0x88, "‰": 0x89, "Š": 0x8A, "‹": 0x8B, "Œ": 0x8C, "Ž": 0x8E, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97, "˜": 0x98, "™": 0x99, "š": 0x9A, "›": 0x9B, "œ": 0x9C, "ž": 0x9E, "Ÿ": 0x9F };
const MOJIBAKE_RUN = /[\u0080-\u009F\u00A0-\u00FF\u0192\u20AC\u201A-\u201E\u2020-\u2026\u02C6\u2030\u0160\u2039\u0152\u017D\u2018-\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178]+/g;

function repairText(value) {
  if (typeof value !== "string" || !/[àâÃðÂ\u0080-\u009F\u0192]/.test(value)) return value;
  return value.replace(MOJIBAKE_RUN, (part) => {
    if (!/[àâÃðÂ\u0080-\u009F\u0192]/.test(part)) return part;
    const bytes = [];
    for (const char of part) {
      const code = char.charCodeAt(0);
      if (CP1252_BYTES[char] !== undefined) bytes.push(CP1252_BYTES[char]);
      else if (code <= 255) bytes.push(code);
      else return part;
    }
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    } catch (error) {
      return part;
    }
  });
}

function repairStoredData(value) {
  if (Array.isArray(value)) return value.map(repairStoredData);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairStoredData(item)]));
  return repairText(value);
}

const els = {
  header: document.querySelector("[data-header]"),
  products: document.querySelector("[data-products]"),
  pagination: document.querySelector("[data-products-pagination]"),
  cartDrawer: document.querySelector("[data-cart-drawer]"),
  wishlistDrawer: document.querySelector("[data-wishlist-drawer]"),
  cartItems: document.querySelector("[data-cart-items]"),
  wishlistItems: document.querySelector("[data-wishlist-items]"),
  cartCount: document.querySelector("[data-cart-count]"),
  wishlistCount: document.querySelector("[data-wishlist-count]"),
  cartTotal: document.querySelector("[data-cart-total]"),
  searchInput: document.querySelector("[data-search-input]"),
  sizeFilter: document.querySelector("[data-size-filter]"),
  firmnessFilter: document.querySelector("[data-firmness-filter]"),
  sort: document.querySelector("[data-sort]"),
  detailOverlay: document.querySelector("[data-detail-overlay]"),
  productDetail: document.querySelector("[data-product-detail]"),
  mobileMenu: document.querySelector("[data-mobile-menu]"),
  menuBackdrop: document.querySelector("[data-menu-backdrop]")
};

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

function cartKey(id, size = "") {
  return `${id}__${size || ""}`;
}

function productMaterials(product) {
  return Array.isArray(product?.materials) && product.materials.length ? product.materials.filter(Boolean) : ["Premium fabric", "Comfort support"];
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

function saveWishlist() {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([...state.wishlist]));
}

function filteredProducts() {
  const term = state.search.trim().toLowerCase();
  const list = products.filter((product) => {
    const matchesTerm = !term || `${product.name} ${product.category} ${product.firmness}`.toLowerCase().includes(term);
    const matchesSize = !state.size || productSizes(product).includes(state.size);
    const matchesFirmness = !state.firmness || product.firmness === state.firmness;
    return matchesTerm && matchesSize && matchesFirmness;
  });

  return list.sort((a, b) => {
    if (state.sort === "low") return productPrice(a, "salePrice") - productPrice(b, "salePrice");
    if (state.sort === "high") return productPrice(b, "salePrice") - productPrice(a, "salePrice");
    if (state.sort === "discount") return productPrice(b, "discountPercent") - productPrice(a, "discountPercent");
    return productPrice(b, "popular") - productPrice(a, "popular");
  });
}

function renderProducts() {
  const list = filteredProducts();
  const pageCount = Math.max(1, Math.ceil(list.length / state.perPage));
  state.page = Math.min(Math.max(1, state.page), pageCount);
  const start = (state.page - 1) * state.perPage;
  const pageItems = list.slice(start, start + state.perPage);
  els.products.innerHTML = list.length
    ? pageItems.map(productCard).join("")
    : `<p class="meta">ບໍ່ພົບສິນຄ້າຕາມການຄົ້ນຫາ</p>`;
  renderPagination(pageCount, list.length);
}

function renderPagination(pageCount, totalItems) {
  if (!els.pagination) return;
  if (pageCount <= 1) {
    els.pagination.innerHTML = "";
    return;
  }
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  els.pagination.innerHTML = `
    <button type="button" data-product-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""}>ກ່ອນ</button>
    ${pages.map((page) => `<button class="${page === state.page ? "is-active" : ""}" type="button" data-product-page="${page}" aria-label="ໜ້າ ${page}">${page}</button>`).join("")}
    <button type="button" data-product-page="${state.page + 1}" ${state.page === pageCount ? "disabled" : ""}>ຕໍ່ໄປ</button>
    <span>${totalItems} ລາຍການ</span>
  `;
}

function renderPromotion() {
  const promotion = loadPromotion();
  renderPromotionData(promotion);
}

function renderPromotionData(promotion) {
  const promoSection = document.querySelector(".promo");
  const title = document.querySelector("[data-promo-title]");
  const text = document.querySelector("[data-promo-text]");
  const button = document.querySelector("[data-promo-button]");
  const eventSection = document.querySelector("[data-promo-events-section]");
  const eventGrid = document.querySelector("[data-promo-events]");

  if (promotion.title && title) title.textContent = promotion.title;
  if (promotion.text && text) text.textContent = promotion.text;
  if (promotion.button && button) button.textContent = promotion.button;
  if (promotion.coverImage && promoSection) {
    promoSection.classList.add("has-cover");
    promoSection.style.backgroundImage = `linear-gradient(90deg, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.42)), url("${promotion.coverImage}")`;
  }

  const activeEvents = (promotion.events || []).filter((item) => item.active !== false && item.title);
  if (eventSection && eventGrid) {
    eventSection.hidden = !activeEvents.length;
    eventGrid.innerHTML = activeEvents.map((item) => `
      <article class="promo-event-card ${item.image ? "has-image" : ""}">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" />` : ""}
        <div class="promo-event-copy">
          <span>${item.badge || "PROMOTION"}</span>
          <h3>${item.title}</h3>
          ${item.text ? `<p>${item.text}</p>` : ""}
          <div class="promo-event-foot">
            ${item.date ? `<small>${item.date}</small>` : "<small>Kinglike</small>"}
            <a href="${item.link || "#products"}">${item.button || "ເບິ່ງສິນຄ້າ"}</a>
          </div>
        </div>
      </article>
    `).join("");
  }

  renderPromoPopup(promotion, activeEvents);
}

function renderPromoPopup(promotion, activeEvents) {
  const popup = document.querySelector("[data-promo-popup]");
  const content = document.querySelector("[data-promo-popup-content]");
  if (promoPopupDismissed) return;
  if (!popup || !content) return;
  const popupItem = activeEvents[0] || (promotion.title ? {
    badge: "HOT DEAL",
    title: promotion.title,
    text: promotion.text || "",
    button: promotion.button || "ເບິ່ງສິນຄ້າ",
    link: "#products",
    image: promotion.coverImage || "",
    date: ""
  } : null);
  if (!popupItem) return;

  content.innerHTML = `
    <div class="promo-popup-art ${popupItem.image ? "has-image" : ""}">
      ${popupItem.image ? `<img src="${popupItem.image}" alt="${popupItem.title}" />` : ""}
    </div>
    <div class="promo-popup-copy">
      <span>${popupItem.badge || "PROMOTION"}</span>
      <h2>${popupItem.title}</h2>
      ${popupItem.text ? `<p>${popupItem.text}</p>` : ""}
      ${popupItem.date ? `<small>${popupItem.date}</small>` : ""}
      <a class="primary-btn" href="${popupItem.link || "#products"}" data-close-promo-popup>${popupItem.button || "ເບິ່ງສິນຄ້າ"}</a>
    </div>
  `;
  requestAnimationFrame(() => {
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
  });
}

function closePromoPopup() {
  const popup = document.querySelector("[data-promo-popup]");
  promoPopupDismissed = true;
  if (!popup) return;
  popup.classList.remove("is-open");
  popup.setAttribute("aria-hidden", "true");
}

function productImages(product) {
  if (Array.isArray(product?.images) && product.images.length) return product.images.filter(Boolean);
  return product?.image ? [product.image] : [];
}

function primaryImage(product) {
  return productImages(product)[0] || "";
}

function productFreebies(product) {
  const saved = Array.isArray(product?.freebies) ? product.freebies.filter(Boolean) : [];
  if (saved.length) return saved;
  const category = (product?.category || "").toLowerCase();
  if (category.includes("pillow")) return ["Pillow cover"];
  if (category.includes("topper")) return ["Aroma fabric spray"];
  return ["2 pillows", "Premium bedsheet"];
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
    { image: "", label: "ຮູບດ້ານໜ້າ" },
    { image: "", label: "Layer ວັດສະດຸ" },
    { image: "", label: "ຜ້າຫຸ້ມ" },
    { image: "", label: "ຂະໜາດຫ້ອງນອນ" }
  ];
}

function bindDetailGallery(container, gallery) {
  if (!gallery.length) return;
  let activeIndex = 0;
  const hero = container.querySelector("[data-gallery-hero]");
  const heroImage = container.querySelector("[data-gallery-hero-image]");
  const thumbs = container.querySelectorAll("[data-gallery-index]");
  const setActive = (index) => {
    activeIndex = (index + gallery.length) % gallery.length;
    const item = gallery[activeIndex];
    hero.classList.toggle("has-admin-image", Boolean(item.image));
    if (item.image && heroImage) heroImage.src = item.image;
    thumbs.forEach((thumb) => thumb.classList.toggle("is-active", Number(thumb.dataset.galleryIndex) === activeIndex));
  };
  thumbs.forEach((thumb) => thumb.addEventListener("click", () => setActive(Number(thumb.dataset.galleryIndex))));
  container.querySelector("[data-gallery-prev]")?.addEventListener("click", () => setActive(activeIndex - 1));
  container.querySelector("[data-gallery-next]")?.addEventListener("click", () => setActive(activeIndex + 1));
}

function productCard(product) {
  const isWishlisted = state.wishlist.has(product.id);
  const image = primaryImage(product);
  const imageClass = image ? "has-admin-image" : "";
  return `
    <article class="product-card clickable-card" data-open-detail="${product.id}">
      <div class="product-art ${imageClass}">
        ${image ? `<img src="${image}" alt="${product.name}" />` : ""}
        <span class="${productBadgeClass(product)}">${productBadgeText(product)}</span>
        <button class="wishlist-toggle ${isWishlisted ? "is-active" : ""}" type="button" data-toggle-wishlist="${product.id}" aria-label="ສິນຄ້າທີ່ຖືກໃຈ">♡</button>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="meta">${product.category} • ${product.thickness} • ${product.firmness} • ★ ${product.rating}</div>
        <div class="sizes">${productSizes(product).map((size) => `<span>${size}</span>`).join("")}</div>
        <div class="prices">
          <strong class="sale-price">${productDisplayPrice(product, "salePrice")}</strong>
          <span class="regular-price">${productDisplayPrice(product, "regularPrice")}</span>
        </div>
        <div class="card-actions">
          <button class="add-cart" type="button" data-add-cart="${product.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="view-btn" type="button" data-open-detail="${product.id}">ລາຍລະອຽດ</button>
        </div>
      </div>
    </article>
  `;
}

function addToCart(id, size = "", qty = 1) {
  const product = products.find((candidate) => candidate.id === id);
  if (!product) return;
  const option = productSizeOption(product, size);
  const item = state.cart.find((cartItem) => cartKey(cartItem.id, cartItem.size) === cartKey(id, option.size));
  const quantity = Math.max(1, Number(qty || 1));
  if (item) item.qty += quantity;
  else state.cart.push({ id, size: option.size, unitPrice: option.salePrice, qty: quantity });
  saveCart();
  renderCart();
  openDrawer(els.cartDrawer);
}

function toggleWishlist(id) {
  if (state.wishlist.has(id)) state.wishlist.delete(id);
  else state.wishlist.add(id);
  saveWishlist();
  renderProducts();
  renderWishlist();
}

function openProductDetail(id) {
  const product = products.find((candidate) => candidate.id === id);
  if (!product) return;
  window.location.href = `product.html?id=${encodeURIComponent(product.id)}&category=mattresses`;
}

function removeFromCart(key) {
  state.cart = state.cart.filter((item) => cartKey(item.id, item.size) !== key);
  saveCart();
  renderCart();
}

function updateCartQty(key, delta) {
  const item = state.cart.find((cartItem) => cartKey(cartItem.id, cartItem.size) === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(key);
    return;
  }
  saveCart();
  renderCart();
}

function renderCart() {
  const items = state.cart
    .map((item) => ({ ...item, product: products.find((candidate) => candidate.id === item.id) }))
    .filter((item) => item.product);

  els.cartItems.innerHTML = items.length
    ? items.map((item) => {
        const product = item.product;
        return `
          <div class="drawer-item cart-line">
            <div class="cart-line-info">
              <strong>${product.name}</strong>
              <div class="meta">${item.size || productSizeOption(product).size} • ${formatKip(item.unitPrice || productSizeOption(product, item.size).salePrice)}</div>
              <div class="cart-qty">
                <button type="button" data-cart-decrease="${cartKey(product.id, item.size)}">−</button>
                <span>${item.qty}</span>
                <button type="button" data-cart-increase="${cartKey(product.id, item.size)}">＋</button>
              </div>
            </div>
            <div class="cart-line-side">
              <strong>${formatKip((item.unitPrice || productSizeOption(product, item.size).salePrice) * item.qty)}</strong>
              <button type="button" data-remove-cart="${cartKey(product.id, item.size)}">×</button>
            </div>
          </div>
        `;
      }).join("")
    : `<p class="meta">ລົດເຂັນຍັງວ່າງຢູ່</p>`;

  const total = items.reduce((sum, item) => sum + productPrice(item.product, "salePrice") * item.qty, 0);
  els.cartTotal.textContent = formatKip(total);
  els.cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);
}

function renderWishlist() {
  const list = [...state.wishlist].map((id) => products.find((product) => product.id === id)).filter(Boolean);
  els.wishlistItems.innerHTML = list.length
    ? list.map((product) => `
      <div class="drawer-item">
        <div>
          <strong>${product.name}</strong>
          <div class="meta">${formatKip(productPrice(product, "salePrice"))}</div>
        </div>
        <button type="button" data-add-cart="${product.id}">＋</button>
      </div>
    `).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
  els.wishlistCount.textContent = list.length;
}

function cartItemsWithProducts() {
  return state.cart
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.id);
      if (!product) return null;
      const option = productSizeOption(product, item.size);
      return { ...item, size: item.size || option.size, unitPrice: item.unitPrice || option.salePrice, product };
    })
    .filter(Boolean);
}

function buildOrderMessage(productId = "") {
  const focusedProduct = products.find((product) => product.id === productId);
  const focusedOption = focusedProduct ? selectedDetailSize(focusedProduct) : null;
  const items = focusedProduct ? [{ product: focusedProduct, size: focusedOption.size, unitPrice: focusedOption.salePrice, qty: selectedDetailQty(els.productDetail) }] : cartItemsWithProducts();
  const itemLines = items.map((item, index) => {
    const unitPrice = item.unitPrice || productSizeOption(item.product, item.size).salePrice;
    const subtotal = unitPrice * item.qty;
    return [
      `${index + 1}. ${item.product.name}`,
      `   ລະຫັດສິນຄ້າ: ${item.product.sku || item.product.id || "-"}`,
      `   ຂະໜາດ: ${item.size || productSizeOption(item.product).size}`,
      `   ຈຳນວນ: ${item.qty}`,
      `   ລາຄາ/ໜ່ວຍ: ${formatKip(unitPrice)}`,
      `   ລວມ: ${formatKip(subtotal)}`
    ].join("\n");
  });
  const total = items.reduce((sum, item) => sum + (item.unitPrice || productSizeOption(item.product, item.size).salePrice) * item.qty, 0);
  const productLink = focusedProduct
    ? new URL(`product.html?id=${encodeURIComponent(focusedProduct.id)}&category=mattresses`, window.location.href).toString()
    : window.location.href;
  return [
    "ສະບາຍດີ ຂ້ອຍສົນໃຈສັ່ງຊື້ສິນຄ້າ Kinglike",
    "",
    "ໃບແຈ້ງລາຄາ / ໃບຈອງສິນຄ້າ",
    "ຮ້ານ: Kinglike Product",
    "",
    "ລາຍການສິນຄ້າ:",
    itemLines.join("\n\n"),
    "",
    `ຍອດລວມທີ່ຕ້ອງຊຳລະ: ${formatKip(total)}`,
    "",
    "ລິ້ງສິນຄ້າ:",
    productLink,
    "",
    "ກະລຸນາຢືນຢັນສິນຄ້າ, ຂະໜາດ, ຈຳນວນ ແລະ ທີ່ຢູ່ຈັດສົ່ງ. ແອດມິນຈະແຈ້ງຄ່າຈັດສົ່ງ ແລະ ຂັ້ນຕອນຊຳລະເງິນອີກຄັ້ງ."
  ].filter(Boolean).join("\n");
}

function chatItems(productId = "") {
  const focusedProduct = products.find((product) => product.id === productId);
  const option = focusedProduct ? selectedDetailSize(focusedProduct) : null;
  return focusedProduct ? [{ product: focusedProduct, size: option.size, unitPrice: option.salePrice, qty: selectedDetailQty(els.productDetail) }] : cartItemsWithProducts();
}

function selectedDetailSize(product) {
  const selected = els.productDetail?.querySelector("[data-size-option].is-active")?.dataset.sizeOption || "";
  return productSizeOption(product, selected);
}

function selectedDetailQty(container = document) {
  return Math.max(1, Number(container.querySelector("[data-detail-qty]")?.textContent || 1));
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
      <p class="meta">ເລືອກ WhatsApp ຫຼື Messenger ລະບົບຈະສ້າງຂໍ້ຄວາມສິນຄ້າໃຫ້ອັດຕະໂນມັດ</p>
      <div class="chat-order-summary" data-chat-summary></div>
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
    <div><strong>${item.product.name}</strong><span>${item.size || productSizeOption(item.product).size} • ${formatKip(item.unitPrice || productSizeOption(item.product, item.size).salePrice)} x ${item.qty}</span></div>
  `).join("");
  modal.classList.add("is-open");
}

async function sendChatDraft(channel, productId = "") {
  const items = chatItems(productId);
  const message = items.length ? buildOrderMessage(productId) : "ສະບາຍດີ ຂ້ອຍສົນໃຈສອບຖາມສິນຄ້າ Kinglike";
  const payload = {
    mode: "chat_draft",
    contactChannel: channel,
    customerName: "Website chat customer",
    customerPhone: "",
    customerWhatsapp: "",
    chatMessage: message,
    productLink: window.location.href,
    items: items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      size: item.size || productSizeOption(item.product).size,
      quantity: item.qty,
      unitPrice: item.unitPrice || productSizeOption(item.product, item.size).salePrice
    }))
  };
  try {
    if (items.length) await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch (draftError) {
    // Still let the customer continue to chat if local API is unavailable.
  }
  const url = channel === "messenger"
    ? MESSENGER_URL
    : `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener");
}

async function submitChatDraft(channel) {
  const modal = ensureChatModal();
  const productId = modal.dataset.productId || "";
  await sendChatDraft(channel, productId);
  modal.classList.remove("is-open");
}

function checkout() {
  openChatOrder();
}

function buyNow(id) {
  sendChatDraft("messenger", id);
}

function openDrawer(drawer) {
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
  const wishlistId = event.target.closest("[data-toggle-wishlist]")?.dataset.toggleWishlist;
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  const increaseId = event.target.closest("[data-cart-increase]")?.dataset.cartIncrease;
  const decreaseId = event.target.closest("[data-cart-decrease]")?.dataset.cartDecrease;
  const detailId = event.target.closest("[data-open-detail]")?.dataset.openDetail;
  const lineTarget = event.target.closest("[data-line-contact]");
  const shouldCheckout = event.target.closest("[data-checkout]");
  const buyNowId = event.target.closest("[data-buy-now]")?.dataset.buyNow;
  const shouldClosePromoPopup = event.target.closest("[data-close-promo-popup]");
  const pageTarget = event.target.closest("[data-product-page]")?.dataset.productPage;

  if (shouldClosePromoPopup) {
    closePromoPopup();
  }

  if (lineTarget) {
    sendChatDraft(lineTarget.dataset.lineChannel || "whatsapp", lineTarget.dataset.lineProduct || "");
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
  if (pageTarget) {
    state.page = Number(pageTarget);
    renderProducts();
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (addId) {
    const product = products.find((candidate) => candidate.id === addId);
    const isDetailAdd = Boolean(addButton.closest(".detail-buybox"));
    const selected = product && isDetailAdd ? selectedDetailSize(product).size : "";
    addToCart(addId, selected, isDetailAdd ? selectedDetailQty(els.productDetail) : 1);
    return;
  }
  if (wishlistId) {
    toggleWishlist(wishlistId);
    return;
  }
  if (removeId) {
    removeFromCart(removeId);
    return;
  }
  if (increaseId) {
    updateCartQty(increaseId, 1);
    return;
  }
  if (decreaseId) {
    updateCartQty(decreaseId, -1);
    return;
  }
  if (detailId) openProductDetail(detailId);
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-chat-order]")) {
    ensureChatModal().classList.remove("is-open");
    return;
  }
  const channel = event.target.closest("[data-chat-channel]")?.dataset.chatChannel;
  if (channel) submitChatDraft(channel);
  const qtyDecrease = event.target.closest("[data-detail-qty-decrease]");
  const qtyIncrease = event.target.closest("[data-detail-qty-increase]");
  if (qtyDecrease || qtyIncrease) {
    const qtyTarget = event.target.closest(".qty-control")?.querySelector("[data-detail-qty]");
    const current = Math.max(1, Number(qtyTarget?.textContent || 1));
    if (qtyTarget) qtyTarget.textContent = String(Math.max(1, current + (qtyIncrease ? 1 : -1)));
  }
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
});

document.querySelector("[data-open-cart]").addEventListener("click", () => openDrawer(els.cartDrawer));
document.querySelector("[data-close-cart]").addEventListener("click", () => closeDrawer(els.cartDrawer));
document.querySelector("[data-open-wishlist]").addEventListener("click", () => openDrawer(els.wishlistDrawer));
document.querySelector("[data-close-wishlist]").addEventListener("click", () => closeDrawer(els.wishlistDrawer));
document.querySelector("[data-close-detail]").addEventListener("click", () => els.detailOverlay.classList.remove("is-open"));
document.querySelector("[data-open-menu]").addEventListener("click", openMobileMenu);
document.querySelector("[data-close-menu]").addEventListener("click", closeMobileMenu);
els.menuBackdrop.addEventListener("click", closeMobileMenu);
els.mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  state.page = 1;
  renderProducts();
});
els.sizeFilter.addEventListener("change", (event) => {
  state.size = event.target.value;
  state.page = 1;
  renderProducts();
});
els.firmnessFilter.addEventListener("change", (event) => {
  state.firmness = event.target.value;
  state.page = 1;
  renderProducts();
});
els.sort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.page = 1;
  renderProducts();
});
window.addEventListener("scroll", () => {
  els.header.classList.toggle("is-scrolled", window.scrollY > 24);
});

renderProducts();
renderPromotion();
renderCart();
renderWishlist();
hydrateSyncedStore();
