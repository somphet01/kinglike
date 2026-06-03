const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";
const STORE_UPDATED_KEY = "kinglikeStoreUpdatedAt";
const SYNC_STORE_URL = "/api/store";
const STATIC_STORE_URL = new URL("data/store.json", window.location.href).toString();
const STACKED_ADMIN_QUERY = "(max-width: 1180px)";
const IDB_NAME = "kinglikeAdminStore";
const IDB_STORE = "records";
const ADMIN_COLLECTIONS = [
  { key: "pillows", label: "ໝອນ", category: "Pillow", sample: "Kinglike Cloud Pillow" },
  { key: "mattresses", label: "ທີ່ນອນ", category: "Mattress", sample: "Kinglike Royal Mattress" },
  { key: "blankets", label: "ຜ້າຫົ່ມ", category: "Blanket", sample: "Kinglike Soft Blanket" },
  { key: "beds", label: "ຕຽງນອນ", category: "Bed", sample: "Kinglike Luxury Bed" },
  { key: "toppers", label: "ທັອບເປີ", category: "Topper", sample: "Kinglike Comfort Topper" }
];
const BED_COLOR_PALETTE = [
  ["fabric-01", "01 Cream", "#f4ead2"],
  ["fabric-02", "02 Ivory", "#fff3cf"],
  ["fabric-03", "03 Sand", "#d9c89a"],
  ["fabric-04", "04 Wheat", "#c7ae72"],
  ["fabric-05", "05 Honey", "#d6a85a"],
  ["fabric-06", "06 Camel", "#b98a55"],
  ["fabric-07", "07 Taupe", "#a98d70"],
  ["fabric-08", "08 Mocha", "#7a5d45"],
  ["fabric-09", "09 Walnut", "#5b4134"],
  ["fabric-10", "10 Chocolate", "#3f2b24"],
  ["fabric-11", "11 Charcoal", "#252b2d"],
  ["fabric-12", "12 Navy", "#182837"],
  ["fabric-13", "13 Slate", "#3f4a4a"],
  ["fabric-14", "14 Smoke", "#686f67"],
  ["fabric-15", "15 Olive", "#7f8a62"],
  ["fabric-16", "16 Lime", "#9ac13f"],
  ["fabric-17", "17 Sage", "#b6bd93"],
  ["fabric-18", "18 Khaki", "#b2a77c"],
  ["fabric-19", "19 Beige", "#d4c19a"],
  ["fabric-20", "20 Champagne", "#e4d6b3"],
  ["fabric-21", "21 Gold", "#d4ad55"],
  ["fabric-22", "22 Mustard", "#c99738"],
  ["fabric-23", "23 Orange", "#d77b35"],
  ["fabric-24", "24 Terracotta", "#a95b3e"],
  ["fabric-25", "25 Brick", "#8f4638"],
  ["fabric-26", "26 Coral", "#d95e5f"],
  ["fabric-27", "27 Rose", "#c9495b"],
  ["fabric-28", "28 Wine", "#7d3446"],
  ["fabric-29", "29 Plum", "#5a4159"],
  ["fabric-30", "30 Mauve", "#8b6678"],
  ["fabric-31", "31 Gray Beige", "#a5a093"],
  ["fabric-32", "32 Linen Gray", "#c8c7b8"]
].map(([id, name, hex]) => ({ id, name, hex, available: true }));

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

function productSeed(id, name, category, firmness, thickness, price, salePrice, badge) {
  const sizes = ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"];
  return {
    id,
    name,
    category,
    firmness,
    thickness,
    sizes,
    sizePrices: Object.fromEntries(sizes.map((size, index) => [size, Math.round(salePrice + (salePrice * index * 0.12))])),
    price,
    salePrice,
    discountPercent: discountPercent(price, salePrice),
    badge,
    rating: 4.8,
    popular: Date.now(),
    sku: id.toUpperCase(),
    materials: ["Premium fabric", "Comfort support", "Hotel grade"],
    freebies: ["2 pillows", "Premium bedsheet"],
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: `${name} ສິນຄ້າພຣີມຽມສຳລັບຫ້ອງນອນ Kinglike.`
  };
}

const els = {
  tabs: document.querySelectorAll("[data-admin-tab]"),
  panels: document.querySelectorAll("[data-admin-panel]"),
  categoryTabs: document.querySelector("[data-admin-categories]"),
  categoryCoverForm: document.querySelector("[data-category-cover-form]"),
  categoryCoverKey: document.querySelector("[data-category-cover-key]"),
  categoryCoverValue: document.querySelector("[data-category-cover-value]"),
  categoryCoverUpload: document.querySelector("[data-category-cover-upload]"),
  categoryCoverTitle: document.querySelector("[data-category-cover-title]"),
  categoryCoverHelp: document.querySelector("[data-category-cover-help]"),
  categoryCoverPreview: document.querySelector("[data-category-cover-preview]"),
  form: document.querySelector("[data-product-form]"),
  formTitle: document.querySelector("[data-form-title]"),
  list: document.querySelector("[data-admin-products]"),
  productCount: document.querySelector("[data-product-count]"),
  saleCount: document.querySelector("[data-sale-count]"),
  clearForm: document.querySelector("[data-clear-form]"),
  resetDemo: document.querySelector("[data-reset-demo]"),
  newProduct: document.querySelector("[data-new-product]"),
  search: document.querySelector("[data-admin-search]"),
  preview: document.querySelector("[data-product-preview]"),
  productImageUpload: document.querySelector("[data-product-image-upload]"),
  productImageValue: document.querySelector("[data-product-image-value]"),
  productImagesValue: document.querySelector("[data-product-images-value]"),
  productImagePreview: document.querySelector("[data-product-image-preview]"),
  bedColorAdmin: document.querySelector("[data-bed-color-admin]"),
  bedColorValue: document.querySelector("[data-bed-color-value]"),
  bedColorGrid: document.querySelector("[data-bed-color-grid]"),
  bedColorCount: document.querySelector("[data-bed-color-count]"),
  adminMode: document.querySelector("[data-admin-mode]"),
  adminPlacement: document.querySelector("[data-admin-placement]"),
  viewProduct: document.querySelector("[data-view-product]"),
  promoForm: document.querySelector("[data-promo-form]"),
  promoEventForm: document.querySelector("[data-promo-event-form]"),
  promoEventList: document.querySelector("[data-promo-event-list]"),
  newPromoEvent: document.querySelector("[data-new-promo-event]"),
  promoEventImageUpload: document.querySelector("[data-promo-event-image-upload]"),
  promoEventImageValue: document.querySelector("[data-promo-event-image-value]"),
  heroSlideForm: document.querySelector("[data-hero-slide-form]"),
  heroDesktopUpload: document.querySelector("[data-hero-desktop-upload]"),
  heroMobileUpload: document.querySelector("[data-hero-mobile-upload]"),
  heroSlideList: document.querySelector("[data-hero-slide-list]"),
  videoForm: document.querySelector("[data-video-form]"),
  videoUpload: document.querySelector("[data-video-upload]"),
  videoList: document.querySelector("[data-video-list]"),
  coverUpload: document.querySelector("[data-cover-image-upload]"),
  coverValue: document.querySelector("[data-cover-image-value]"),
  promoPreview: document.querySelector("[data-promo-preview]"),
  exportData: document.querySelector("[data-export-data]"),
  exportPublish: document.querySelector("[data-export-publish]"),
  importData: document.querySelector("[data-import-data]"),
  backupProductCount: document.querySelector("[data-backup-product-count]"),
  backupPromoStatus: document.querySelector("[data-backup-promo-status]"),
  confirmModal: document.querySelector("[data-confirm-modal]"),
  confirmTitle: document.querySelector("[data-confirm-title]"),
  confirmMessage: document.querySelector("[data-confirm-message]"),
  confirmOk: document.querySelector("[data-confirm-ok]"),
  confirmCancel: document.querySelector("[data-confirm-cancel]"),
  resultModal: document.querySelector("[data-result-modal]"),
  resultIcon: document.querySelector("[data-result-icon]"),
  resultKicker: document.querySelector("[data-result-kicker]"),
  resultTitle: document.querySelector("[data-result-title]"),
  resultMessage: document.querySelector("[data-result-message]"),
  resultOk: document.querySelector("[data-result-ok]"),
  toast: document.querySelector("[data-toast]")
};

let promotionCache = null;
let productsCache = null;
let products = loadProducts();
let activeCollectionKey = "mattresses";
let activeProductId = products.find((product) => collectionKeyForProduct(product) === activeCollectionKey)?.id || products[0]?.id || "";
let recentlyAddedProductId = "";
let activePromoEventId = "";
let confirmAction = null;

function openLocalDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(IDB_STORE);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbSet(key, value) {
  const db = await openLocalDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(IDB_STORE, "readwrite");
    transaction.objectStore(IDB_STORE).put(value, key);
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
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

async function publishSyncedStore(promotionOverride = null) {
  try {
    const promotion = promotionOverride || loadPromotionData();
    const response = await fetch(SYNC_STORE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products, promotion, updatedAt: localStorage.getItem(STORE_UPDATED_KEY) })
    });
    if (!response.ok) throw new Error("Sync server unavailable");
  } catch (error) {
    showToast("Saved locally. Export for GitHub Pages to update phone.");
  }
}

function loadProducts() {
  if (productsCache) return productsCache;
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [...defaultProducts];
    const parsed = JSON.parse(saved);
    productsCache = Array.isArray(parsed) && parsed.length ? repairStoredData(parsed) : [...defaultProducts];
    return productsCache;
  } catch (error) {
    return [...defaultProducts];
  }
}

async function loadProductsAsync() {
  if (productsCache) return productsCache;
  try {
    const saved = await idbGet(PRODUCT_STORAGE_KEY);
    if (Array.isArray(saved) && saved.length) {
      productsCache = repairStoredData(saved);
      return productsCache;
    }
  } catch (error) {
    // Keep local fallback.
  }
  return loadProducts();
}

function saveProducts() {
  const productsToSave = products.filter((product) => !product._draft);
  productsCache = productsToSave;
  try {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(productsToSave));
    localStorage.setItem(STORE_UPDATED_KEY, new Date().toISOString());
    renderBackupSummary();
    publishSyncedStore();
    return true;
  } catch (error) {
        idbSet(PRODUCT_STORAGE_KEY, productsToSave)
      .then(() => {
        try {
          localStorage.setItem(STORE_UPDATED_KEY, new Date().toISOString());
        } catch (timestampError) {
          // IndexedDB already saved the products; localStorage may be full.
        }
        renderBackupSummary();
        publishSyncedStore();
        showResult({
          title: "ບັນທຶກສຳເລັດ",
          message: "ບັນທຶກສິນຄ້າແລ້ວ ຮູບຖືກເກັບໃນ IndexedDB."
        });
      })
      .catch(() => showResult({
        type: "error",
        title: "ບັນທຶກບໍ່ສຳເລັດ",
        message: "ບັນທຶກສິນຄ້າບໍ່ໄດ້: browser storage ເຕັມ."
      }));
    return true;
  }
}

function money(value) {
  return new Intl.NumberFormat("lo-LA").format(Number(value || 0)) + " ₭";
}

function slugify(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `product-${Date.now()}`;
}

function toList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function parseSizePrices(value) {
  return toList(value || "").reduce((prices, item) => {
    const [size, price] = item.split("=").map((part) => part.trim());
    if (size && Number(price || 0) > 0) prices[size] = Number(price);
    return prices;
  }, {});
}

function formatSizePrices(product) {
  const prices = product?.sizePrices || {};
  const entries = Object.entries(prices);
  if (entries.length) return entries.map(([size, price]) => `${size}=${price}`).join(", ");
  return productSizeOptions(product).map((option) => `${option.size}=${option.salePrice}`).join(", ");
}

function productSizeOptions(product) {
  const sizes = Array.isArray(product?.sizes) && product.sizes.length ? product.sizes.filter(Boolean) : ["ມາດຕະຖານ"];
  const baseSale = Number(product?.salePrice || 0);
  return sizes.map((size, index) => ({
    size,
    salePrice: Number(product?.sizePrices?.[size] || 0) || Math.round(baseSale + (baseSale * index * 0.12))
  }));
}

function productPriceLabel(product) {
  const prices = productSizeOptions(product).map((option) => option.salePrice).filter((value) => value > 0);
  if (!prices.length) return money(product?.salePrice || 0);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? money(min) : `${money(min)} - ${money(max)}`;
}

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

function discountPercent(price, salePrice) {
  const regular = Number(price || 0);
  const sale = Number(salePrice || 0);
  if (!regular || sale >= regular) return 0;
  return Math.round(((regular - sale) / regular) * 100);
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

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  window.dispatchEvent(new Event("kinglike:success"));
  setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

function openConfirm({ title, message, onConfirm }) {
  confirmAction = onConfirm;
  if (els.confirmTitle) els.confirmTitle.textContent = title || "ຢືນຢັນການລຶບ";
  if (els.confirmMessage) els.confirmMessage.textContent = message || "ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ບໍ?";
  els.confirmModal?.classList.add("is-open");
  els.confirmModal?.setAttribute("aria-hidden", "false");
}

function closeConfirm() {
  confirmAction = null;
  els.confirmModal?.classList.remove("is-open");
  els.confirmModal?.setAttribute("aria-hidden", "true");
}

function showResult({ type = "success", title, message }) {
  const isError = type === "error";
  if (els.resultIcon) els.resultIcon.textContent = isError ? "!" : "✓";
  if (els.resultKicker) els.resultKicker.textContent = isError ? "NOT SAVED" : "SUCCESS";
  if (els.resultTitle) els.resultTitle.textContent = title || (isError ? "ບັນທຶກບໍ່ສຳເລັດ" : "ບັນທຶກສຳເລັດ");
  if (els.resultMessage) els.resultMessage.textContent = message || (isError ? "ກະລຸນາລອງໃໝ່." : "ຂໍ້ມູນຖືກບັນທຶກແລ້ວ.");
  els.resultModal?.classList.toggle("is-error", isError);
  els.resultModal?.classList.add("is-open");
  els.resultModal?.setAttribute("aria-hidden", "false");
  window.dispatchEvent(new Event(isError ? "kinglike:error" : "kinglike:success"));
}

function closeResult() {
  els.resultModal?.classList.remove("is-open");
  els.resultModal?.setAttribute("aria-hidden", "true");
}

function setTab(tabName) {
  els.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.adminTab === tabName));
  els.panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.adminPanel === tabName));
}

function productImageMarkup(product) {
  const image = primaryImage(product);
  return image
    ? `<img src="${image}" alt="${product.name}" />`
    : "";
}

function productImages(product) {
  if (Array.isArray(product?.images) && product.images.length) return product.images.filter(Boolean);
  return product?.image ? [product.image] : [];
}

function currentFormImages() {
  return parseImages(field("images")?.value || "");
}

function setProductImages(images) {
  const clean = images.filter(Boolean);
  setField("images", JSON.stringify(clean));
  setField("image", clean[0] || "");
  updateImagePreview(clean);
  renderPreview();
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

function parseImages(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch (error) {
    return [];
  }
}

function collectionKeyForProduct(product) {
  const category = (product?.category || "").toLowerCase();
  if (category.includes("blanket") || category.includes("duvet") || category.includes("comforter")) return "blankets";
  if (category === "bed" || category.includes("bed frame") || category.includes("bedframe")) return "beds";
  if (category.includes("pillow")) return "pillows";
  if (category.includes("topper")) return "toppers";
  if (category.includes("bedding") || category.includes("sheet") || category.includes("protector")) return "bedding";
  return "mattresses";
}

function activeCollection() {
  return ADMIN_COLLECTIONS.find((item) => item.key === activeCollectionKey) || ADMIN_COLLECTIONS[1];
}

function productCollectionLabel(product) {
  return ADMIN_COLLECTIONS.find((item) => item.key === collectionKeyForProduct(product))?.label || "ທີ່ນອນ";
}

function isMattressCategory(category = "") {
  const value = category.toLowerCase();
  return ["mattress", "hybrid", "latex", "memory foam", "pocket spring"].some((item) => value.includes(item));
}

function isBedCategory(category = "") {
  const value = category.toLowerCase();
  return value === "bed" || value.includes("bed frame") || value.includes("bedframe");
}

function normalizeFirmness(value = "") {
  const map = {
    "ນຸ່ມ": "ນຸ້ມສະບາຍ",
    "ນຸ່ມແນ່ນ": "ນຸ້ມແຫນ້ນ",
    "ແນ່ນ": "ແຫນ້ນ"
  };
  return map[value] || value;
}

function parseBedColorsValue(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function normalizeBedColors(colors = []) {
  const saved = new Map((Array.isArray(colors) ? colors : []).map((item) => [item?.id, item]));
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

function currentBedColors() {
  return normalizeBedColors(parseBedColorsValue(els.bedColorValue?.value || ""));
}

function setBedColors(colors) {
  if (els.bedColorValue) els.bedColorValue.value = JSON.stringify(normalizeBedColors(colors));
  renderBedColorAdmin();
  renderPreview();
}

function renderBedColorAdmin() {
  if (!els.bedColorAdmin || !els.bedColorGrid) return;
  const category = field("category")?.value || "";
  const enabled = isBedCategory(category);
  const colors = currentBedColors();
  const availableCount = colors.filter((color) => color.available).length;
  els.bedColorAdmin.classList.toggle("is-disabled", !enabled);
  if (els.bedColorCount) els.bedColorCount.textContent = enabled ? `${availableCount}/${colors.length} available` : "Bed only";
  els.bedColorGrid.innerHTML = colors.map((color) => `
    <button class="admin-bed-color-toggle ${color.available ? "is-available" : "is-sold-out"}" type="button" data-admin-bed-color="${color.id}" style="--swatch:${color.hex}" ${enabled ? "" : "disabled"}>
      <span class="admin-bed-swatch"></span>
      <strong>${color.name}</strong>
      <small>${color.available ? "Available" : "Sold out"}</small>
    </button>
  `).join("");
}

function updateBedColorField() {
  if (!els.bedColorValue) return;
  const enabled = isBedCategory(field("category")?.value || "");
  if (!els.bedColorValue.value) els.bedColorValue.value = JSON.stringify(normalizeBedColors());
  els.bedColorAdmin?.classList.toggle("is-disabled", !enabled);
  renderBedColorAdmin();
}

function collectionProducts(key = activeCollectionKey) {
  return products.filter((product) => collectionKeyForProduct(product) === key);
}

function collectionCoverData() {
  const promo = loadPromotionData();
  return promo.categoryCovers && typeof promo.categoryCovers === "object" ? promo.categoryCovers : {};
}

function activeCategoryCover() {
  return collectionCoverData()[activeCollectionKey] || {};
}

function categoryCoverImages(cover = {}) {
  if (Array.isArray(cover.images) && cover.images.length) return cover.images.filter(Boolean);
  return cover.image ? [cover.image] : [];
}

function normalizeHeroSlide(slide, index = 0) {
  if (typeof slide === "string") {
    return {
      id: `hero-${index + 1}`,
      src: slide,
      mobileSrc: "",
      active: true
    };
  }
  if (!slide || typeof slide !== "object") {
    return {
      id: `hero-${index + 1}`,
      src: "",
      mobileSrc: "",
      active: true
    };
  }
  return {
    ...slide,
    id: slide.id || `hero-${index + 1}`,
    src: slide.src || slide.desktopSrc || slide.image || "",
    mobileSrc: slide.mobileSrc || slide.mobileImage || slide.mobile || "",
    active: slide.active !== false
  };
}

function heroSlidesFromPromotion(promotion = loadPromotionData()) {
  return (Array.isArray(promotion.heroSlides) ? promotion.heroSlides : [])
    .map(normalizeHeroSlide)
    .filter((slide) => slide.src || slide.mobileSrc);
}

function parseCategoryCoverValue(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter(Boolean);
  } catch (error) {
    // Fall back to the legacy single-image value below.
  }
  return value ? [value] : [];
}

function placementLabel(product) {
  if (!product?.name) return "Home / Category / Detail";
  const labels = {
    mattresses: "Home + Mattress category + Detail",
    pillows: "Pillow category + Detail",
    toppers: "Topper category + Detail",
    blankets: "Blanket category + Detail",
    beds: "Bed category + Detail",
    bedding: "Bedding category + Detail"
  };
  return labels[collectionKeyForProduct(product)] || labels.mattresses;
}

function productDetailUrl(product) {
  if (!product?.id) return "index.html#products";
  return `product.html?id=${encodeURIComponent(product.id)}&category=${encodeURIComponent(collectionKeyForProduct(product))}`;
}

function updateImagePreview(src) {
  if (!els.productImagePreview) return;
  const images = Array.isArray(src) ? src : src ? [src] : [];
  els.productImagePreview.classList.toggle("has-image", Boolean(images.length));
  els.productImagePreview.innerHTML = images.length
    ? `<div class="admin-upload-grid">${images.map((image, index) => `<span><img src="${image}" alt="Product preview ${index + 1}" />${index === 0 ? "<b>Main</b>" : ""}<button type="button" data-remove-image="${index}" aria-label="Remove image">×</button></span>`).join("")}</div>`
    : "ຍັງບໍ່ມີຮູບສິນຄ້າ";
}

function updateAdminStatus(product) {
  if (els.adminMode) els.adminMode.textContent = activeProductId && !product?._draft ? "ກຳລັງແກ້ໄຂ" : "ສິນຄ້າໃໝ່";
  if (els.adminPlacement) els.adminPlacement.textContent = placementLabel(product);
  if (els.viewProduct) {
    const canView = Boolean(product?.name && activeProductId && !product?._draft);
    els.viewProduct.href = canView ? productDetailUrl(product) : "index.html#products";
    els.viewProduct.classList.toggle("is-disabled", !canView);
  }
}

function renderCollectionTabs() {
  if (!els.categoryTabs) return;
  els.categoryTabs.innerHTML = ADMIN_COLLECTIONS.map((item) => {
    const count = collectionProducts(item.key).length;
    return `<button class="${item.key === activeCollectionKey ? "is-active" : ""}" type="button" data-admin-category="${item.key}"><span>${item.label}</span><small>${count} ລາຍການ</small></button>`;
  }).join("");
}

function renderCategoryCoverEditor() {
  if (!els.categoryCoverForm) return;
  const collection = activeCollection();
  const cover = activeCategoryCover();
  const coverImages = categoryCoverImages(cover);
  els.categoryCoverKey.value = collection.key;
  els.categoryCoverValue.value = JSON.stringify(coverImages);
  els.categoryCoverTitle.textContent = `ແກ້ໄຂໜ້າປົກ: ${collection.label}`;
  els.categoryCoverHelp.textContent = `ຮູບນີ້ຈະໄປສະແດງໜ້າ collection ຂອງ ${collection.label}. ອັບໄດ້ຫຼາຍຮູບ, ຖ້າມີຫຼາຍຮູບຈະເລື່ອນອັດຕະໂນມັດ. ຂະໜາດແນະນຳ 1920 × 520 px, ຫຼື 2400 × 650 px ສຳລັບຈໍໃຫຍ່.`;
  els.categoryCoverPreview.classList.toggle("has-image", Boolean(coverImages.length));
  els.categoryCoverPreview.classList.toggle("has-multiple", coverImages.length > 1);
  els.categoryCoverPreview.innerHTML = coverImages.length
    ? `<div class="admin-cover-slide-grid">${coverImages.map((image, index) => `<span><img src="${image}" alt="${collection.label} cover ${index + 1}" />${index === 0 ? "<b>Main</b>" : ""}<button type="button" data-remove-category-cover="${index}" aria-label="Remove cover image">×</button></span>`).join("")}</div>`
    : `<span>${collection.label} cover preview</span>`;
}

function renderProducts() {
  const term = els.search.value.trim().toLowerCase();
  const visible = collectionProducts().filter((product) => !term || `${product.name} ${product.category} ${product.badge}`.toLowerCase().includes(term));
  const savedProducts = products.filter((product) => !product._draft);
  els.productCount.textContent = savedProducts.length;
  els.saleCount.textContent = savedProducts.filter((product) => product.discountPercent > 0).length;
  renderCollectionTabs();
  renderCategoryCoverEditor();
  els.list.innerHTML = visible.map((product) => `
    <article class="admin-product ${product.id === activeProductId ? "is-active" : ""} ${product.id === recentlyAddedProductId ? "is-new" : ""} ${product._draft ? "is-draft" : ""}" data-select-product="${product.id}">
      <div class="admin-thumb">${productImageMarkup(product)}</div>
      <div>
        <h3>${product.name || "ສິນຄ້າໃໝ່"}</h3>
        <p>${product._draft ? "ລາຍການໃໝ່ • ຍັງບໍ່ໄດ້ບັນທຶກ" : `${productCollectionLabel(product)} • ${product.category} • ${productPriceLabel(product)}`}</p>
        <p>${product._draft ? "ກອກຂໍ້ມູນດ້ານຂວາແລ້ວກົດບັນທຶກ" : `${product.badge || "No badge"} • ${product.sizes?.join(", ") || "-"}`}</p>
      </div>
      <div class="admin-actions">
        <button type="button" data-edit-product="${product.id}">ແກ້ໄຂ</button>
        <button type="button" data-delete-product="${product.id}">ລຶບ</button>
      </div>
    </article>
  `).join("") || `<div class="admin-preview-empty">ຍັງບໍ່ມີສິນຄ້າໃນໝວດນີ້. ກົດ + ເພີ່ມ ເພື່ອສ້າງລາຍການໃໝ່.</div>`;
}

function createBlankProductDraft() {
  const collection = activeCollection();
  const id = `draft-${collection.key}-${Date.now()}`;
  return {
    id,
    name: "",
    image: "",
    images: [],
    sku: "",
    category: collection.category,
    firmness: "",
    thickness: "",
    sizes: [],
    sizePrices: {},
    price: 0,
    salePrice: 0,
    discountPercent: 0,
    badge: "",
    rating: "",
    popular: Date.now(),
    stock: "",
    bedColors: [],
    warranty: "",
    freebies: [],
    materials: [],
    description: "",
    _draft: true
  };
}

function addBlankProductDraft() {
  const draft = createBlankProductDraft();
  products = products.filter((product) => !(product._draft && collectionKeyForProduct(product) === activeCollectionKey));
  products.unshift(draft);
  activeProductId = draft.id;
  recentlyAddedProductId = draft.id;
  els.search.value = "";
  fillForm(draft);
  requestAnimationFrame(() => {
    const added = els.list.querySelector(`[data-select-product="${draft.id}"]`);
    added?.classList.add("is-new");
  });
  scrollToProductForm();
  setTimeout(() => {
    if (recentlyAddedProductId === draft.id) {
      recentlyAddedProductId = "";
      renderProducts();
    }
  }, 1200);
}

function formToProduct() {
  const data = new FormData(els.form);
  const name = data.get("name").trim();
  const price = Number(data.get("price") || 0);
  const salePrice = Number(data.get("salePrice") || 0);
  const manualDiscount = Number(data.get("discountPercent") || 0);
  const finalDiscount = manualDiscount > 0 ? Math.min(100, Math.round(manualDiscount)) : discountPercent(price, salePrice);
  const sizePrices = parseSizePrices(data.get("sizePrices") || "");
  const id = data.get("id") || slugify(name);
  const previous = products.find((item) => item.id === id);
  const images = parseImages(data.get("images")).length
    ? parseImages(data.get("images"))
    : productImages(previous);
  const image = images[0] || data.get("image") || previous?.image || "";

  return {
    id,
    name,
    image,
    images: images.length ? images : image ? [image] : [],
    sku: data.get("sku").trim() || id.toUpperCase(),
    category: data.get("category"),
    firmness: isMattressCategory(data.get("category")) ? normalizeFirmness(data.get("firmness")) : "",
    thickness: data.get("thickness").trim(),
    sizes: toList(data.get("sizes") || "3.5 ຟຸດ, 5 ຟຸດ, 6 ຟຸດ"),
    sizePrices,
    price,
    salePrice,
    discountPercent: finalDiscount,
    badge: data.get("badge").trim() || (finalDiscount > 0 ? `ຫຼຸດ ${finalDiscount}%` : "New"),
    rating: Number(data.get("rating") || 4.8),
    popular: previous?.popular || Date.now(),
    stock: data.get("stock").trim() || "ມີສິນຄ້າ",
    bedColors: isBedCategory(data.get("category")) ? normalizeBedColors(parseBedColorsValue(data.get("bedColors"))) : [],
    warranty: data.get("warranty").trim() || "10 ປີ",
    freebies: toList(data.get("freebies") || "2 pillows, Premium bedsheet"),
    materials: toList(data.get("materials") || "Premium fabric, Pocket spring"),
    description: data.get("description").trim() || "ລາຍລະອຽດສິນຄ້າ Kinglike."
  };
}

function fillForm(product) {
  const images = productImages(product);
  setField("id", product.id);
  setField("image", images[0] || "");
  setField("images", JSON.stringify(images));
  setField("name", product.name || "");
  setField("sku", product.sku || "");
  setField("badge", product.badge || "");
  setField("category", product.category || "Hybrid");
  setField("firmness", normalizeFirmness(product.firmness) || "ນຸ້ມສະບາຍ");
  setField("thickness", product.thickness || "");
  setField("sizes", product.sizes?.join(", ") || "");
  setField("sizePrices", product._draft ? "" : formatSizePrices(product));
  setField("price", product.price || "");
  setField("salePrice", product.salePrice || "");
  setField("discountPercent", product.discountPercent || "");
  setField("rating", product.rating || "");
  setField("stock", product.stock || "");
  setField("bedColors", JSON.stringify(normalizeBedColors(product.bedColors)));
  setField("warranty", product.warranty || "");
  setField("freebies", product.freebies?.join(", ") || "");
  setField("materials", product.materials?.join(", ") || "");
  setField("description", product.description || "");
  els.formTitle.textContent = product._draft ? "ເພີ່ມສິນຄ້າໃໝ່" : "ແກ້ໄຂສິນຄ້າ";
  activeProductId = product.id;
  updateFirmnessField();
  updateBedColorField();
  updateImagePreview(images);
  updateAdminStatus(product);
  renderProducts();
  renderPreview();
}

function field(name) {
  return els.form.querySelector(`[name="${name}"]`);
}

function setField(name, value) {
  const input = field(name);
  if (input) input.value = value;
}

function updateFirmnessField() {
  const categoryInput = field("category");
  const firmnessInput = field("firmness");
  if (!categoryInput || !firmnessInput) return;
  const enabled = isMattressCategory(categoryInput.value);
  firmnessInput.disabled = !enabled;
  firmnessInput.closest("label")?.classList.toggle("is-disabled", !enabled);
  if (!enabled) firmnessInput.value = "";
  else if (!firmnessInput.value) firmnessInput.value = "ນຸ້ມສະບາຍ";
}

function clearForm() {
  els.form.reset();
  setField("id", "");
  setField("image", "");
  setField("images", "");
  setField("bedColors", JSON.stringify(normalizeBedColors()));
  setField("category", activeCollection().category);
  updateFirmnessField();
  updateBedColorField();
  els.formTitle.textContent = "ເພີ່ມສິນຄ້າໃໝ່";
  activeProductId = "";
  updateImagePreview("");
  updateAdminStatus(null);
  renderProducts();
  renderPreview();
}

function currentPreviewProduct() {
  const data = new FormData(els.form);
  if (!data.get("name")) {
    if (!activeProductId) return null;
    return products.find((product) => product.id === activeProductId) || products[0];
  }
  return formToProduct();
}

function renderPreview() {
  const product = currentPreviewProduct();
  if (!product) {
    els.preview.innerHTML = `<div class="admin-preview-empty">ເລືອກສິນຄ້າ ຫຼືເພີ່ມສິນຄ້າໃໝ່</div>`;
    updateAdminStatus(null);
    return;
  }

  updateAdminStatus(product);
  const previewImage = primaryImage(product);
  const imageClass = previewImage ? "has-admin-image" : "";
  const previewMeta = [product.category, product.thickness, product.firmness, `★ ${product.rating || 4.8}`].filter(Boolean).join(" • ");
  const previewColors = isBedCategory(product.category)
    ? normalizeBedColors(product.bedColors).filter((color) => color.available).slice(0, 8)
    : [];
  els.preview.innerHTML = `
    <article class="product-card">
      <div class="product-art ${imageClass}">
        ${previewImage ? `<img src="${previewImage}" alt="${product.name}" />` : ""}
        <span class="${productBadgeClass(product)}">${productBadgeText(product)}</span>
        <button class="wishlist-toggle" type="button">♡</button>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="meta">${previewMeta}</div>
        ${previewColors.length ? `<div class="bed-color-mini-row">${previewColors.map((color) => `<span style="--swatch:${color.hex}" title="${color.name}"></span>`).join("")}</div>` : ""}
        <div class="sizes">${(product.sizes || []).map((size) => `<span>${size}</span>`).join("")}</div>
        <div class="prices">
          <strong class="sale-price">${productPriceLabel(product)}</strong>
          <span class="regular-price">${money(product.price)}</span>
        </div>
        <div class="card-actions">
          <button class="add-cart" type="button">ເພີ່ມລົດເຂັນ</button>
          <button class="view-btn" type="button">ລາຍລະອຽດ</button>
        </div>
      </div>
    </article>
  `;
}

function compressImageSource(source, maxSize = 900, quality = 0.72, maxBytes = 220000) {
  if (!source) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onerror = reject;
    image.onload = () => {
      let targetSize = maxSize;
      let targetQuality = quality;
      let bestDataUrl = "";

      for (let attempt = 0; attempt < 10; attempt += 1) {
        const scale = Math.min(1, targetSize / Math.max(image.width, image.height));
        const width = Math.max(1, Math.round(image.width * scale));
        const height = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        bestDataUrl = canvas.toDataURL("image/jpeg", targetQuality);

        if (bestDataUrl.length * 0.75 <= maxBytes || targetSize <= 320) break;
        targetSize = Math.max(320, Math.round(targetSize * 0.72));
        targetQuality = Math.max(0.36, targetQuality - 0.08);
      }

      resolve(bestDataUrl);
    };
    image.src = source;
  });
}

function readImageAsCompressedDataUrl(file, maxSize = 900, quality = 0.72, maxBytes = 220000) {
  if (!file || !file.type.startsWith("image/")) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => compressImageSource(reader.result, maxSize, quality, maxBytes).then(resolve).catch(reject);
    reader.readAsDataURL(file);
  });
}

function compactExistingImage(dataUrl, maxSize = 620, quality = 0.58, maxBytes = 90000) {
  if (!dataUrl || !dataUrl.startsWith("data:image/")) return Promise.resolve(dataUrl || "");
  if (dataUrl.length * 0.75 <= maxBytes) return Promise.resolve(dataUrl);
  return compressImageSource(dataUrl, maxSize, quality, maxBytes);
}

async function compactPromotionForStorage(promotion) {
  const compacted = { ...promotion, events: Array.isArray(promotion.events) ? [...promotion.events] : [] };
  compacted.coverImage = await compactExistingImage(compacted.coverImage, 760, 0.58, 130000);
  compacted.heroSlides = (await Promise.all((Array.isArray(compacted.heroSlides) ? compacted.heroSlides : [])
    .map(normalizeHeroSlide)
    .filter((slide) => slide.src || slide.mobileSrc)
    .map(async (slide) => ({
      ...slide,
      src: await compactExistingImage(slide.src, 1920, 0.74, 420000),
      mobileSrc: await compactExistingImage(slide.mobileSrc, 1600, 0.74, 360000)
    })))).filter((slide) => slide.src || slide.mobileSrc);
  if (compacted.categoryCovers && typeof compacted.categoryCovers === "object") {
    const categoryCovers = {};
    for (const [key, cover] of Object.entries(compacted.categoryCovers)) {
      const images = categoryCoverImages(cover);
      const compactedImages = await Promise.all(images.map((image) => compactExistingImage(image, 1920, 0.76, 420000)));
      categoryCovers[key] = {
        ...cover,
        image: compactedImages[0] || "",
        images: compactedImages.filter(Boolean)
      };
    }
    compacted.categoryCovers = categoryCovers;
  }
  compacted.events = await Promise.all(compacted.events.map(async (item) => ({
    ...item,
    image: await compactExistingImage(item.image, 560, 0.54, 80000)
  })));
  compacted.verticalVideos = (Array.isArray(compacted.verticalVideos) ? compacted.verticalVideos : []).filter((item) => item && item.src);
  return compacted;
}

async function compactProductForStorage(product) {
  const images = productImages(product);
  const compactedImages = await Promise.all(images.map((image) => compactExistingImage(image, 560, 0.54, 80000)));
  return {
    ...product,
    image: compactedImages[0] || "",
    images: compactedImages.filter(Boolean)
  };
}

function readFileAsDataUrl(file, callback, options = {}) {
  if (!file) return;
  readImageAsCompressedDataUrl(file, options.maxSize || 900, options.quality || 0.72, options.maxBytes || 220000)
    .then((dataUrl) => {
      if (dataUrl) callback(dataUrl);
      showToast("ບີບອັດຮູບແລ້ວ ພ້ອມບັນທຶກ");
    })
    .catch(() => showToast("ອ່ານຮູບບໍ່ສຳເລັດ"));
}

function readFilesAsDataUrls(files, callback) {
  const list = [...files].filter((file) => file.type.startsWith("image/"));
  if (!list.length) return;
  Promise.all(list.map((file) => readImageAsCompressedDataUrl(file, 820, 0.7, 180000)))
    .then((dataUrls) => {
      callback(dataUrls.filter(Boolean));
      showToast("ບີບອັດຮູບແລ້ວ ພ້ອມບັນທຶກ");
    })
    .catch(() => showToast("ອ່ານຮູບບໍ່ສຳເລັດ"));
}

function readVideoAsDataUrl(file, callback) {
  if (!file || !file.type.startsWith("video/")) return;
  if (file.size > 8 * 1024 * 1024) {
    showToast("ຄລິບໃຫຍ່ເກີນ 8MB");
    return;
  }
  const reader = new FileReader();
  reader.onerror = () => showToast("ອ່ານຄລິບບໍ່ສຳເລັດ");
  reader.onload = () => {
    callback(reader.result);
    showToast("ອັບຄລິບແລ້ວ ພ້ອມບັນທຶກ");
  };
  reader.readAsDataURL(file);
}

function loadPromoForm() {
  try {
    const promo = loadPromotionData();
    els.promoForm.elements.title.value = promo.title || "";
    els.promoForm.elements.text.value = promo.text || "";
    els.promoForm.elements.button.value = promo.button || "";
    els.promoForm.elements.coverImage.value = promo.coverImage || "";
  } catch (error) {
    els.promoForm.reset();
  }
  renderPromoPreview();
  renderHeroSlideList();
  renderVideoList();
  renderPromoEventList();
}

function renderPromoPreview() {
  const data = new FormData(els.promoForm);
  const title = data.get("title") || "ຊຸດນອນຫຼູ ປະຢັດກວ່າ";
  const text = data.get("text") || "ຊື້ທີ່ນອນພ້ອມໝອນ ຮັບສ່ວນຫຼຸດພິເສດ";
  const coverImage = data.get("coverImage");
  els.promoPreview.classList.toggle("has-cover", Boolean(coverImage));
  els.promoPreview.innerHTML = coverImage
    ? `<img src="${coverImage}" alt="${title}" />`
    : `<div class="promo-preview-copy"><p class="eyebrow">HOT DEAL</p><h3>${title}</h3><p>${text}</p><small>ຝັ່ງລູກຄ້າ: countdown + ກະດາດສີທອງຕອນເປີດໂປຣ</small></div>`;
}

function renderHeroSlideList() {
  if (!els.heroSlideList) return;
  const slides = heroSlidesFromPromotion();
  els.heroSlideList.innerHTML = slides.length ? `
    <div class="admin-upload-grid hero-slide-admin-grid">
      ${slides.map((slide, index) => `
        <span class="hero-slide-admin-pair">
          <img src="${slide.src || slide.mobileSrc}" alt="Hero desktop slide ${index + 1}" />
          ${slide.mobileSrc ? `<img src="${slide.mobileSrc}" alt="Hero mobile slide ${index + 1}" />` : ""}
          <b>Slide ${index + 1}</b>
          <em>${slide.src ? "PC ready" : "PC missing"} / ${slide.mobileSrc ? "Mobile ready" : "Mobile missing"}</em>
          <button type="button" data-remove-hero-slide="${index}" aria-label="Remove slide">×</button>
        </span>
      `).join("")}
    </div>
  ` : `<p class="meta">ຍັງບໍ່ມີຮູບສະໄລດ໌. ໜ້າຫຼັກຈະໃຊ້ຮູບປົກພື້ນຖານ.</p>`;
}

function renderVideoList() {
  if (!els.videoList) return;
  const videos = Array.isArray(loadPromotionData().verticalVideos) ? loadPromotionData().verticalVideos : [];
  els.videoList.innerHTML = videos.length ? videos.map((item) => `
    <article class="video-admin-item ${item.active === false ? "is-paused" : ""}">
      <video src="${item.src}" muted playsinline controls preload="metadata"></video>
      <div>
        <strong>${item.title || "Kinglike video"}</strong>
        <span>${item.active === false ? "ປິດຢູ່" : "ສະແດງໜ້າຫຼັກ"}</span>
        <div class="admin-mini-actions">
          <button type="button" data-toggle-video="${item.id}">${item.active === false ? "ເປີດ" : "ປິດ"}</button>
          <button type="button" data-delete-video="${item.id}">ລຶບ</button>
        </div>
      </div>
    </article>
  `).join("") : `<p class="meta">ຍັງບໍ່ມີຄລິບແນວຕັ້ງ.</p>`;
}

function loadPromotionData() {
  if (promotionCache) return promotionCache;
  try {
    const promo = repairStoredData(JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || {});
    promo.events = Array.isArray(promo.events) ? promo.events : [];
    promotionCache = promo;
    return promo;
  } catch (error) {
    promotionCache = { events: [] };
    return promotionCache;
  }
}

async function loadPromotionDataAsync() {
  const local = loadPromotionData();
  if (local.title || local.text || local.coverImage || local.events.length) return local;
  try {
    const saved = await idbGet(PROMO_STORAGE_KEY);
    if (saved && typeof saved === "object") {
      const repaired = repairStoredData(saved);
      repaired.events = Array.isArray(repaired.events) ? repaired.events : [];
      promotionCache = repaired;
      return repaired;
    }
  } catch (error) {
    // Use local fallback.
  }
  return local;
}

function savePromotionDraft(patch) {
  const current = loadPromotionData();
  return savePromotionData({ ...current, ...patch });
}

function clearPromoEventForm() {
  if (!els.promoEventForm) return;
  activePromoEventId = "";
  els.promoEventForm.reset();
  els.promoEventForm.elements.id.value = "";
  els.promoEventImageValue.value = "";
  els.promoEventForm.elements.active.checked = true;
}

function promoEventFromForm() {
  const data = new FormData(els.promoEventForm);
  const id = data.get("id") || `promo-${Date.now()}`;
  return {
    id,
    badge: (data.get("badge") || "PROMOTION").trim(),
    date: (data.get("date") || "").trim(),
    endsAt: (data.get("endsAt") || "").trim(),
    title: (data.get("title") || "").trim(),
    text: (data.get("text") || "").trim(),
    button: (data.get("button") || "ເບິ່ງສິນຄ້າ").trim(),
    link: (data.get("link") || "#products").trim(),
    image: data.get("image") || "",
    active: Boolean(data.get("active"))
  };
}

function fillPromoEventForm(eventItem) {
  activePromoEventId = eventItem.id;
  els.promoEventForm.elements.id.value = eventItem.id;
  els.promoEventForm.elements.badge.value = eventItem.badge || "";
  els.promoEventForm.elements.date.value = eventItem.date || "";
  if (els.promoEventForm.elements.endsAt) els.promoEventForm.elements.endsAt.value = eventItem.endsAt || "";
  els.promoEventForm.elements.title.value = eventItem.title || "";
  els.promoEventForm.elements.text.value = eventItem.text || "";
  els.promoEventForm.elements.button.value = eventItem.button || "";
  els.promoEventForm.elements.link.value = eventItem.link || "";
  els.promoEventImageValue.value = eventItem.image || "";
  els.promoEventForm.elements.active.checked = eventItem.active !== false;
  els.promoEventForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPromoEventList() {
  if (!els.promoEventList) return;
  const events = loadPromotionData().events;
  els.promoEventList.innerHTML = events.length ? events.map((item) => `
    <article class="promo-event-admin-item ${item.active === false ? "is-paused" : ""}">
      <div class="promo-event-admin-thumb">${item.image ? `<img src="${item.image}" alt="${item.title}" />` : ""}</div>
      <div>
        <strong>${item.title || "Untitled promotion"}</strong>
        <span>${item.badge || "PROMOTION"}${item.date ? ` • ${item.date}` : ""}${item.active === false ? " • ປິດຢູ່" : ""}</span>
        <div class="admin-mini-actions">
          <button type="button" data-edit-promo-event="${item.id}">ແກ້ໄຂ</button>
          <button type="button" data-toggle-promo-event="${item.id}">${item.active === false ? "ເປີດ" : "ປິດ"}</button>
          <button type="button" data-delete-promo-event="${item.id}">ລຶບ</button>
        </div>
      </div>
    </article>
  `).join("") : `<p class="meta">ຍັງບໍ່ມີ Promotion / Event</p>`;
}

function savePromotionData(promotion) {
  promotion.events = Array.isArray(promotion.events) ? promotion.events : [];
  promotionCache = promotion;
  try {
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(promotion));
    localStorage.setItem(STORE_UPDATED_KEY, new Date().toISOString());
    renderBackupSummary();
    publishSyncedStore(promotion);
    return true;
  } catch (error) {
    idbSet(PROMO_STORAGE_KEY, promotion)
      .then(() => {
        try {
          localStorage.setItem(STORE_UPDATED_KEY, new Date().toISOString());
        } catch (timestampError) {
          // IndexedDB already saved the promotion; localStorage may be full.
        }
        renderBackupSummary();
        publishSyncedStore(promotion);
        showResult({
          title: "ບັນທຶກສຳເລັດ",
          message: "ບັນທຶກແລ້ວ ຮູບຖືກເກັບໃນ IndexedDB."
        });
      })
      .catch(() => showResult({
        type: "error",
        title: "ບັນທຶກບໍ່ສຳເລັດ",
        message: "ບັນທຶກບໍ່ໄດ້: browser storage ເຕັມ."
      }));
    return true;
  }
}

function shouldUseSyncedStore(store) {
  if (!store) return false;
  if (store.__source !== "static") return true;
  const localTime = Date.parse(localStorage.getItem(STORE_UPDATED_KEY) || "");
  const remoteTime = Date.parse(store.updatedAt || "");
  return !localTime || (remoteTime && remoteTime > localTime);
}

function renderBackupSummary() {
  if (els.backupProductCount) els.backupProductCount.textContent = products.length;
  if (els.backupPromoStatus) {
    const promo = loadPromotionData();
    els.backupPromoStatus.textContent = promo.title || promo.text || promo.coverImage || promo.events.length ? "ບັນທຶກແລ້ວ" : "ຍັງບໍ່ມີ";
  }
}

function exportBackup() {
  const backup = {
    app: "Kinglike",
    version: 1,
    exportedAt: new Date().toISOString(),
    products,
    promotion: loadPromotionData()
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `kinglike-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast("Export backup file ແລ້ວ");
}

function exportPublishStore() {
  const store = {
    products,
    promotion: loadPromotionData(),
    updatedAt: localStorage.getItem(STORE_UPDATED_KEY) || new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "store.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showToast("Export store.json ສຳລັບ GitHub Pages ແລ້ວ");
}

function importBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const backup = JSON.parse(reader.result);
      if (!Array.isArray(backup.products)) throw new Error("Missing products");
      products = backup.products;
      activeProductId = products[0]?.id || "";
      saveProducts();
      if (backup.promotion && typeof backup.promotion === "object") {
        savePromotionData(backup.promotion);
      }
      renderProducts();
      if (products[0]) fillForm(products[0]);
      else clearForm();
      loadPromoForm();
      renderBackupSummary();
      showToast("Import backup file ສຳເລັດ");
    } catch (error) {
      showToast("Import ບໍ່ສຳເລັດ: file ບໍ່ຖືກຕ້ອງ");
    } finally {
      els.importData.value = "";
    }
  };
  reader.readAsText(file);
}

function scrollToProductForm() {
  if (!window.matchMedia(STACKED_ADMIN_QUERY).matches) return;
  requestAnimationFrame(() => {
    els.form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

async function addHeroSlideImages(files, target) {
  const list = [...(files || [])].filter((file) => file.type.startsWith("image/"));
  if (!list.length) return;
  try {
    const options = target === "mobile"
      ? { maxSize: 1600, quality: 0.74, maxBytes: 360000 }
      : { maxSize: 1920, quality: 0.74, maxBytes: 420000 };
    const dataUrls = (await Promise.all(list.map((file) => readImageAsCompressedDataUrl(file, options.maxSize, options.quality, options.maxBytes)))).filter(Boolean);
    const promo = loadPromotionData();
    const slides = heroSlidesFromPromotion(promo);

    if (target === "mobile") {
      dataUrls.forEach((dataUrl) => {
        const openIndex = slides.findIndex((slide) => !slide.mobileSrc);
        if (openIndex >= 0) slides[openIndex] = { ...slides[openIndex], mobileSrc: dataUrl };
        else slides.push({ id: `hero-${Date.now()}-${slides.length}`, src: "", mobileSrc: dataUrl, active: true });
      });
    } else {
      dataUrls.forEach((dataUrl) => {
        slides.push({ id: `hero-${Date.now()}-${slides.length}`, src: dataUrl, mobileSrc: "", active: true });
      });
    }

    const compactedPromo = await compactPromotionForStorage({ ...promo, heroSlides: slides });
    savePromotionData(compactedPromo);
    renderHeroSlideList();
    showToast(target === "mobile" ? "ອັບຮູບ Mobile cover ແລ້ວ" : "ອັບຮູບ PC cover ແລ້ວ");
  } catch (error) {
    showResult({
      type: "error",
      title: "ອັບຮູບບໍ່ສຳເລັດ",
      message: "ຮູບໃຫຍ່ເກີນໄປ ຫຼື browser ບີບອັດບໍ່ໄດ້."
    });
  }
}

els.tabs.forEach((tab) => tab.addEventListener("click", () => setTab(tab.dataset.adminTab)));
els.categoryTabs?.addEventListener("click", (event) => {
  const key = event.target.closest("[data-admin-category]")?.dataset.adminCategory;
  if (!key) return;
  activeCollectionKey = key;
  activeProductId = collectionProducts()[0]?.id || "";
  els.search.value = "";
  renderProducts();
  const product = products.find((item) => item.id === activeProductId);
  if (product) fillForm(product);
  else clearForm();
});
els.search.addEventListener("input", renderProducts);
els.clearForm.addEventListener("click", clearForm);
els.newProduct.addEventListener("click", addBlankProductDraft);

els.form.addEventListener("input", (event) => {
  if (event.target?.name === "category") {
    updateFirmnessField();
    updateBedColorField();
  }
  renderPreview();
});

els.bedColorGrid?.addEventListener("click", (event) => {
  const target = event.target.closest("[data-admin-bed-color]");
  if (!target || target.disabled) return;
  const colors = currentBedColors().map((color) => (
    color.id === target.dataset.adminBedColor ? { ...color, available: !color.available } : color
  ));
  setBedColors(colors);
});

els.productImageUpload.addEventListener("change", (event) => {
  readFilesAsDataUrls(event.target.files, (dataUrls) => {
    setProductImages([...currentFormImages(), ...dataUrls]);
    event.target.value = "";
  });
});

els.productImagePreview.addEventListener("click", (event) => {
  const removeIndex = event.target.closest("[data-remove-image]")?.dataset.removeImage;
  if (removeIndex === undefined) return;
  const images = currentFormImages();
  images.splice(Number(removeIndex), 1);
  setProductImages(images);
});

els.coverUpload.addEventListener("change", (event) => {
  readFileAsDataUrl(event.target.files[0], (dataUrl) => {
    els.coverValue.value = dataUrl;
    renderPromoPreview();
  }, { maxSize: 1100, quality: 0.72, maxBytes: 260000 });
});

els.promoEventImageUpload?.addEventListener("change", (event) => {
  readFileAsDataUrl(event.target.files[0], (dataUrl) => {
    els.promoEventImageValue.value = dataUrl;
  }, { maxSize: 820, quality: 0.7, maxBytes: 180000 });
});

els.heroDesktopUpload?.addEventListener("change", async (event) => {
  await addHeroSlideImages(event.target.files, "desktop");
  event.target.value = "";
});

els.heroMobileUpload?.addEventListener("change", async (event) => {
  await addHeroSlideImages(event.target.files, "mobile");
  event.target.value = "";
});

els.heroSlideList?.addEventListener("click", (event) => {
  const removeIndex = event.target.closest("[data-remove-hero-slide]")?.dataset.removeHeroSlide;
  if (removeIndex === undefined) return;
  const promo = loadPromotionData();
  const slides = heroSlidesFromPromotion(promo);
  slides.splice(Number(removeIndex), 1);
  savePromotionData({ ...promo, heroSlides: slides });
  renderHeroSlideList();
});

els.videoUpload?.addEventListener("change", (event) => {
  readVideoAsDataUrl(event.target.files[0], (dataUrl) => {
    els.videoForm.dataset.videoSrc = dataUrl;
  });
});

els.exportData.addEventListener("click", exportBackup);
els.exportPublish?.addEventListener("click", exportPublishStore);
els.importData.addEventListener("change", (event) => importBackup(event.target.files[0]));

els.promoForm.addEventListener("input", renderPromoPreview);
els.newPromoEvent?.addEventListener("click", clearPromoEventForm);
els.confirmCancel?.addEventListener("click", closeConfirm);
els.confirmModal?.addEventListener("click", (event) => {
  if (event.target === els.confirmModal) closeConfirm();
});
els.confirmOk?.addEventListener("click", () => {
  const action = confirmAction;
  closeConfirm();
  if (typeof action === "function") action();
});
els.resultOk?.addEventListener("click", closeResult);
els.resultModal?.addEventListener("click", (event) => {
  if (event.target === els.resultModal) closeResult();
});

els.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const product = await compactProductForStorage(formToProduct());
  const index = products.findIndex((item) => item.id === product.id);
  const previousProducts = [...products];
  if (index >= 0) products[index] = product;
  else products.unshift(product);
  activeCollectionKey = collectionKeyForProduct(product);
  activeProductId = product.id;
  if (!saveProducts()) {
    products = previousProducts;
    showResult({
      type: "error",
      title: "ບັນທຶກບໍ່ສຳເລັດ",
      message: "ບໍ່ສາມາດບັນທຶກສິນຄ້າໄດ້. ກະລຸນາລອງໃໝ່."
    });
    return;
  }
  renderProducts();
  fillForm(product);
  showResult({
    title: "ບັນທຶກສຳເລັດ",
    message: `ສິນຄ້າ "${product.name}" ຖືກບັນທຶກແລ້ວ.`
  });
});

els.list.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit-product]")?.dataset.editProduct;
  const deleteId = event.target.closest("[data-delete-product]")?.dataset.deleteProduct;
  const selectId = event.target.closest("[data-select-product]")?.dataset.selectProduct;

  if (deleteId) {
    const product = products.find((item) => item.id === deleteId);
    openConfirm({
      title: "ລຶບສິນຄ້ານີ້ບໍ?",
      message: product ? `ທ່ານຕ້ອງການລຶບ "${product.name}" ອອກຈາກຮ້ານບໍ?` : "ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ບໍ?",
      onConfirm: () => {
        products = products.filter((item) => item.id !== deleteId);
        if (activeProductId === deleteId) activeProductId = collectionProducts()[0]?.id || "";
        saveProducts();
        renderProducts();
        const next = products.find((item) => item.id === activeProductId);
        if (next) fillForm(next);
        else clearForm();
        showToast("ລຶບສິນຄ້າແລ້ວ");
      }
    });
    return;
  }

  const targetId = editId || selectId;
  if (targetId) {
    const product = products.find((item) => item.id === targetId);
    if (product) {
      fillForm(product);
      if (editId) scrollToProductForm();
    }
  }
});

els.resetDemo.addEventListener("click", () => {
  products = [...defaultProducts];
  activeCollectionKey = "mattresses";
  activeProductId = collectionProducts()[0]?.id || products[0]?.id || "";
  saveProducts();
  renderProducts();
  fillForm(products.find((item) => item.id === activeProductId) || products[0]);
  showToast("Reset demo ແລ້ວ");
});

els.promoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(els.promoForm);
  const draft = await compactPromotionForStorage({
    ...loadPromotionData(),
    title: data.get("title").trim(),
    text: data.get("text").trim(),
    button: data.get("button").trim(),
    coverImage: data.get("coverImage")
  });
  if (savePromotionData(draft)) {
    showResult({
      title: "ບັນທຶກສຳເລັດ",
      message: "ບັນທຶກ Cover / Promotion ແລ້ວ."
    });
  } else {
    showResult({
      type: "error",
      title: "ບັນທຶກບໍ່ສຳເລັດ",
      message: "ບໍ່ສາມາດບັນທຶກ Cover / Promotion ໄດ້."
    });
  }
});

els.videoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const src = els.videoForm.dataset.videoSrc || "";
  const title = (els.videoForm.elements.videoTitle?.value || "Kinglike video").trim();
  if (!src) {
    showResult({
      type: "error",
      title: "ຍັງບໍ່ມີຄລິບ",
      message: "ກະລຸນາອັບຄລິບແນວຕັ້ງກ່ອນບັນທຶກ."
    });
    return;
  }
  const promo = loadPromotionData();
  const videos = Array.isArray(promo.verticalVideos) ? [...promo.verticalVideos] : [];
  videos.unshift({
    id: `video-${Date.now()}`,
    title,
    src,
    active: true
  });
  const compactedPromo = await compactPromotionForStorage({ ...promo, verticalVideos: videos });
  if (savePromotionData(compactedPromo)) {
    els.videoForm.reset();
    delete els.videoForm.dataset.videoSrc;
    renderVideoList();
    showResult({
      title: "ບັນທຶກສຳເລັດ",
      message: "ຄລິບແນວຕັ້ງຈະສະແດງໃນໜ້າຫຼັກແລ້ວ."
    });
  }
});

els.videoList?.addEventListener("click", (event) => {
  const toggleId = event.target.closest("[data-toggle-video]")?.dataset.toggleVideo;
  const deleteId = event.target.closest("[data-delete-video]")?.dataset.deleteVideo;
  if (!toggleId && !deleteId) return;
  const promo = loadPromotionData();
  let videos = Array.isArray(promo.verticalVideos) ? [...promo.verticalVideos] : [];
  if (toggleId) {
    videos = videos.map((item) => item.id === toggleId ? { ...item, active: item.active === false } : item);
  }
  if (deleteId) {
    videos = videos.filter((item) => item.id !== deleteId);
  }
  savePromotionData({ ...promo, verticalVideos: videos });
  renderVideoList();
});

els.categoryCoverUpload?.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  try {
    const existing = parseCategoryCoverValue(els.categoryCoverValue.value);
    const dataUrls = await Promise.all(files.map((file) => readImageAsCompressedDataUrl(file, 2400, 0.78, 520000)));
    const images = [...existing, ...dataUrls].filter(Boolean);
    els.categoryCoverValue.value = JSON.stringify(images);
    els.categoryCoverPreview.classList.add("has-image");
    els.categoryCoverPreview.classList.toggle("has-multiple", images.length > 1);
    els.categoryCoverPreview.innerHTML = `<div class="admin-cover-slide-grid">${images.map((image, index) => `<span><img src="${image}" alt="${activeCollection().label} cover ${index + 1}" />${index === 0 ? "<b>Main</b>" : ""}<button type="button" data-remove-category-cover="${index}" aria-label="Remove cover image">×</button></span>`).join("")}</div>`;
  } catch (error) {
    showResult({
      type: "error",
      title: "ອັບຮູບບໍ່ສຳເລັດ",
      message: "ຮູບປົກໃຫຍ່ເກີນໄປ ຫຼື browser ບີບອັດບໍ່ໄດ້."
    });
  } finally {
    event.target.value = "";
  }
});

els.categoryCoverPreview?.addEventListener("click", (event) => {
  const removeIndex = event.target.closest("[data-remove-category-cover]")?.dataset.removeCategoryCover;
  if (removeIndex === undefined) return;
  const images = parseCategoryCoverValue(els.categoryCoverValue.value).filter((_, index) => index !== Number(removeIndex));
  els.categoryCoverValue.value = JSON.stringify(images);
  els.categoryCoverPreview.classList.toggle("has-image", Boolean(images.length));
  els.categoryCoverPreview.classList.toggle("has-multiple", images.length > 1);
  els.categoryCoverPreview.innerHTML = images.length
    ? `<div class="admin-cover-slide-grid">${images.map((image, index) => `<span><img src="${image}" alt="${activeCollection().label} cover ${index + 1}" />${index === 0 ? "<b>Main</b>" : ""}<button type="button" data-remove-category-cover="${index}" aria-label="Remove cover image">×</button></span>`).join("")}</div>`
    : `<span>${activeCollection().label} cover preview</span>`;
});

els.categoryCoverForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const promo = loadPromotionData();
  const categoryCovers = promo.categoryCovers && typeof promo.categoryCovers === "object" ? { ...promo.categoryCovers } : {};
  const images = parseCategoryCoverValue(els.categoryCoverValue.value);
  const compactedImages = await Promise.all(images.map((image) => compactExistingImage(image, 1920, 0.76, 420000)));
  categoryCovers[activeCollectionKey] = {
    label: activeCollection().label,
    image: compactedImages[0] || "",
    images: compactedImages.filter(Boolean)
  };
  if (savePromotionData({ ...promo, categoryCovers })) {
    renderCategoryCoverEditor();
    showResult({
      title: "ບັນທຶກສຳເລັດ",
      message: `ບັນທຶກໜ້າປົກ ${activeCollection().label} ແລ້ວ.`
    });
  } else {
    showResult({
      type: "error",
      title: "ບັນທຶກບໍ່ສຳເລັດ",
      message: `ບໍ່ສາມາດບັນທຶກໜ້າປົກ ${activeCollection().label} ໄດ້.`
    });
  }
});

els.promoEventForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const promo = loadPromotionData();
  const formItem = promoEventFromForm();
  const item = {
    ...formItem,
    image: await compactExistingImage(formItem.image, 560, 0.54, 80000)
  };
  if (!item.title) {
    showResult({
      type: "error",
      title: "ບັນທຶກບໍ່ສຳເລັດ",
      message: "ກະລຸນາໃສ່ຫົວຂໍ້ Promotion / Event."
    });
    return;
  }
  const index = promo.events.findIndex((eventItem) => eventItem.id === item.id);
  if (index >= 0) promo.events[index] = item;
  else promo.events.unshift(item);
  activePromoEventId = item.id;
  const compactedPromo = await compactPromotionForStorage(promo);
  if (savePromotionData(compactedPromo)) {
    renderPromoEventList();
    fillPromoEventForm(item);
    showResult({
      title: "ບັນທຶກສຳເລັດ",
      message: "ບັນທຶກ Promotion / Event ແລ້ວ."
    });
  } else {
    showResult({
      type: "error",
      title: "ບັນທຶກບໍ່ສຳເລັດ",
      message: "ບໍ່ສາມາດບັນທຶກ Promotion / Event ໄດ້."
    });
  }
});

els.promoEventList?.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit-promo-event]")?.dataset.editPromoEvent;
  const toggleId = event.target.closest("[data-toggle-promo-event]")?.dataset.togglePromoEvent;
  const deleteId = event.target.closest("[data-delete-promo-event]")?.dataset.deletePromoEvent;
  const promo = loadPromotionData();

  if (editId) {
    const item = promo.events.find((eventItem) => eventItem.id === editId);
    if (item) fillPromoEventForm(item);
    return;
  }

  if (toggleId) {
    promo.events = promo.events.map((item) => item.id === toggleId ? { ...item, active: item.active === false } : item);
    savePromotionData(promo);
    renderPromoEventList();
    return;
  }

  if (deleteId) {
    const item = promo.events.find((eventItem) => eventItem.id === deleteId);
    openConfirm({
      title: "ລຶບ Promotion / Event ນີ້ບໍ?",
      message: item ? `ທ່ານຕ້ອງການລຶບ "${item.title}" ບໍ?` : "ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ບໍ?",
      onConfirm: () => {
        promo.events = promo.events.filter((eventItem) => eventItem.id !== deleteId);
        savePromotionData(promo);
        renderPromoEventList();
        if (activePromoEventId === deleteId) clearPromoEventForm();
        showToast("ລຶບ Promotion / Event ແລ້ວ");
      }
    });
  }
});

async function initAdmin() {
  const store = await loadSyncedStore();
  if (store) {
    if (shouldUseSyncedStore(store) && Array.isArray(store.products) && store.products.length) {
      products = repairStoredData(store.products);
      productsCache = products;
      activeProductId = collectionProducts()[0]?.id || products[0]?.id || "";
      try {
        localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
      } catch (error) {
        idbSet(PRODUCT_STORAGE_KEY, products);
      }
      if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
    } else if (products.length) {
      publishSyncedStore();
    }
    if (shouldUseSyncedStore(store) && store.promotion && typeof store.promotion === "object") {
      promotionCache = repairStoredData(store.promotion);
      try {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(store.promotion));
      } catch (error) {
        idbSet(PROMO_STORAGE_KEY, store.promotion);
      }
      if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
    }
  }
  products = await loadProductsAsync();
  activeProductId = collectionProducts()[0]?.id || products[0]?.id || activeProductId;
  await loadPromotionDataAsync();
  renderProducts();
  if (activeProductId) fillForm(products.find((item) => item.id === activeProductId) || products[0]);
  else clearForm();
  loadPromoForm();
  renderBackupSummary();
}

initAdmin();
