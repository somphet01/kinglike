const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";
const CART_STORAGE_KEY = "kinglikeCart";
const WISHLIST_STORAGE_KEY = "kinglikeWishlist";
const STORE_UPDATED_KEY = "kinglikeStoreUpdatedAt";
const WHATSAPP_PHONE = "8562051777641";
const MESSENGER_ID = "Kinglikesikai";
const MESSENGER_URL = `https://www.messenger.com/t/${MESSENGER_ID}`;
const IDB_NAME = "kinglikeAdminStore";
const IDB_STORE = "records";

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

const collections = {
  mattresses: {
    title: "ທີ່ນອນ",
    kicker: "KINGLIKE MATTRESS TYPES",
    copy: "ເລືອກທີ່ນອນຕາມວັດສະດຸທີ່ຕ້ອງການ ໂຟມ ຢາງພາລາ ສະປຣິງ ຫຼື Hybrid.",
    art: "topper",
    products: [
      { ...product("foam-comfort", "Kinglike Foam Comfort", "Foam", "ນຸ່ມ", "10 ນິ້ວ", 5200000, 3590000, 31, "Foam"), type: "foam" },
      { ...product("latex-natural", "Kinglike Natural Latex", "Latex", "ນຸ່ມແນ່ນ", "10 ນິ້ວ", 6900000, 4690000, 32, "Latex"), type: "latex" },
      { ...product("spring-cloud", "Kinglike Foam Spring", "Hybrid", "ນຸ່ມແນ່ນ", "12 ນິ້ວ", 7800000, 5290000, 32, "Hybrid"), type: "foam-spring" },
      { ...product("foam-latex-luxe", "Kinglike Foam Latex Luxe", "Foam + Latex", "ນຸ່ມ", "11 ນິ້ວ", 7400000, 5190000, 30, "Premium"), type: "foam-latex" },
      { ...product("grand-hybrid", "Kinglike Grand Hybrid", "Foam + Spring + Latex", "ນຸ່ມແນ່ນ", "13 ນິ້ວ", 9200000, 6590000, 28, "Hotel Grade"), type: "foam-spring-latex" }
    ]
  },
  pillows: {
    title: "ໝອນ",
    kicker: "KINGLIKE PILLOWS",
    copy: "ໝອນພຣີມຽມ ນຸ່ມ ຮອງຮັບຄໍ ແລະຊ່ວຍໃຫ້ນອນສະບາຍຕະຫຼອດຄືນ.",
    art: "pillow",
    products: [
      product("pillow-cloud", "Kinglike Cloud Pillow", "Pillow", "ນຸ່ມ", "Premium microfiber", 890000, 590000, 34, "Best Seller"),
      product("pillow-latex", "Kinglike Latex Pillow", "Pillow", "ນຸ່ມແນ່ນ", "Natural latex", 1290000, 790000, 39, "Promotion"),
      product("pillow-cool", "Kinglike Cool Gel Pillow", "Pillow", "ນຸ່ມ", "Cooling gel foam", 1490000, 990000, 34, "New"),
      product("pillow-hotel", "Kinglike Hotel Pillow", "Pillow", "ນຸ່ມແນ່ນ", "Hotel fiber", 990000, 690000, 30, "Hotel Grade")
    ]
  },
  toppers: {
    title: "ທັອບເປີ",
    kicker: "KINGLIKE TOPPERS",
    copy: "ເພີ່ມຄວາມນຸ່ມສະບາຍໃຫ້ທີ່ນອນເດີມ ນອນຫຼັບງ່າຍ ແລະຮອງຮັບດີຂຶ້ນ.",
    art: "topper",
    products: [
      product("topper-luxe", "Kinglike Luxe Topper", "Topper", "ນຸ່ມ", "3 ນິ້ວ", 2490000, 1690000, 32, "Best Seller"),
      product("topper-latex", "Kinglike Latex Topper", "Topper", "ນຸ່ມແນ່ນ", "2 ນິ້ວ", 2890000, 1990000, 31, "Promotion"),
      product("topper-hotel", "Kinglike Hotel Topper", "Topper", "ນຸ່ມ", "4 ນິ້ວ", 3290000, 2390000, 27, "Hotel Grade"),
      product("topper-cool", "Kinglike Cool Topper", "Topper", "ນຸ່ມແນ່ນ", "Cooling fabric", 3590000, 2590000, 28, "New")
    ]
  },
  blankets: {
    title: "ຜ້າຫົ່ມ",
    kicker: "KINGLIKE BLANKETS",
    copy: "ຜ້າຫົ່ມນຸ່ມ ອົບອຸ່ນ ແລະເຂົ້າກັບຫ້ອງນອນພຣີມຽມ.",
    art: "bedding",
    products: [
      product("blanket-soft", "Kinglike Soft Blanket", "Blanket", "ນຸ່ມ", "Premium fiber", 1290000, 790000, 39, "New")
    ]
  },
  beds: {
    title: "ຕຽງນອນ",
    kicker: "KINGLIKE BEDS",
    copy: "ຕຽງນອນດີໄຊນ໌ຫຼູ ສຳລັບຈັດຫ້ອງນອນໃຫ້ສວຍແລະໃຊ້ງານງ່າຍ.",
    art: "topper",
    products: [
      product("bed-luxury", "Kinglike Luxury Bed", "Bed", "ແຂງແຮງ", "Queen / King", 6900000, 4990000, 28, "Hotel Grade")
    ]
  },
  bedding: {
    title: "ອຸປະກອນການນອນ",
    kicker: "KINGLIKE BEDDING",
    copy: "ຜ້າປູ ປອກໝອນ ແລະອຸປະກອນສຳລັບຫ້ອງນອນພຣີມຽມ.",
    art: "bedding",
    products: [
      product("sheet-gold", "Kinglike Gold Sheet Set", "Bedding", "ນຸ່ມ", "Cotton sateen", 1590000, 990000, 38, "Promotion"),
      product("protector-premium", "Kinglike Mattress Protector", "Bedding", "ນຸ່ມ", "Waterproof", 990000, 690000, 30, "New")
    ]
  }
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
    popular: Date.now()
  };
}

let adminProductsOverride = null;
let promotionOverride = null;

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
    freebies: Array.isArray(item.freebies) ? item.freebies.filter(Boolean) : [],
    popular: item.popular || Date.now(),
    type: item.type || productTypeFromCategory(item.category)
  };
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

function discountPercent(price, salePrice) {
  if (!price || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

function productTypeFromCategory(category = "") {
  const value = category.toLowerCase();
  if (value.includes("latex")) return "latex";
  if (value.includes("memory") || value.includes("foam")) return "foam";
  if (value.includes("spring") || value.includes("hybrid")) return "foam-spring";
  return "";
}

function collectionFromAdminProduct(product) {
  const category = (product.category || "").toLowerCase();
  if (category.includes("blanket") || category.includes("duvet") || category.includes("comforter")) return "blankets";
  if (category === "bed" || category.includes("bed frame") || category.includes("bedframe")) return "beds";
  if (category.includes("pillow")) return "pillows";
  if (category.includes("topper")) return "toppers";
  if (category.includes("bedding") || category.includes("sheet") || category.includes("protector")) return "bedding";
  return "mattresses";
}

function loadPromotion() {
  if (promotionOverride && typeof promotionOverride === "object") return promotionOverride;
  try {
    const promotion = JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY) || "{}");
    return promotion && typeof promotion === "object" ? promotion : {};
  } catch (error) {
    return {};
  }
}

async function loadPromotionAsync() {
  const local = loadPromotion();
  if (local.title || local.text || local.coverImage || local.categoryCovers || (Array.isArray(local.events) && local.events.length)) return local;
  try {
    const saved = await idbGet(PROMO_STORAGE_KEY);
    if (saved && typeof saved === "object") {
      promotionOverride = saved;
      return saved;
    }
    return local;
  } catch (error) {
    return local;
  }
}

function collectionCoverImage(key) {
  const covers = loadPromotion().categoryCovers;
  return covers && typeof covers === "object" ? covers[key]?.image || "" : "";
}

function getCollectionProducts(category, type) {
  const base = collections[category] || collections.pillows;
  const adminProducts = loadAdminProducts().filter((item) => collectionFromAdminProduct(item) === category);
  const merged = [...adminProducts, ...base.products].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
  return type ? merged.filter((item) => item.type === type) : merged;
}

const params = new URLSearchParams(window.location.search);
const collectionKey = params.get("category") || "pillows";
const typeKey = params.get("type") || "";
const collection = collections[collectionKey] || collections.pillows;
let products = getCollectionProducts(collectionKey, typeKey);
let allProducts = mergedAllProducts();

function mergedAllProducts() {
  return [...loadAdminProducts(), ...Object.values(collections).flatMap((item) => item.products)]
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
        // The in-memory list below is still usable for this page load.
      }
      products = getCollectionProducts(collectionKey, typeKey);
      allProducts = mergedAllProducts();
      renderCollectionMeta();
      renderProducts();
      renderCart();
      renderWishlist();
    }
  } catch (error) {
    // Keep local/static fallback.
  }

  const idbPromotion = await loadPromotionAsync();
  if (idbPromotion.categoryCovers || idbPromotion.coverImage || idbPromotion.title || (Array.isArray(idbPromotion.events) && idbPromotion.events.length)) {
    try {
      localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(idbPromotion));
    } catch (error) {
      // Keep reading promotion from IndexedDB when localStorage is full.
    }
    promotionOverride = idbPromotion;
    renderCollectionMeta();
  }

  if (shouldUseSyncedStore(store)) {
    if (Array.isArray(store.products) && store.products.length) {
      adminProductsOverride = store.products;
      try {
        localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(store.products));
      } catch (error) {
        // The admin can still export if browser storage is full.
      }
      products = getCollectionProducts(collectionKey, typeKey);
      allProducts = mergedAllProducts();
    }
    if (store.promotion && typeof store.promotion === "object") {
      promotionOverride = store.promotion;
      try {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(store.promotion));
      } catch (error) {
        // Keep current promotion fallback if localStorage is full.
      }
    }
    if (store.updatedAt) localStorage.setItem(STORE_UPDATED_KEY, store.updatedAt);
  }
  renderCollectionMeta();
  renderProducts();
  renderCart();
  renderWishlist();
}

const state = {
  cart: loadCart(),
  wishlist: loadWishlist(),
  search: "",
  sort: "popular",
  page: 1,
  perPage: 8
};

const money = new Intl.NumberFormat("lo-LA").format;
const els = {
  header: document.querySelector("[data-header]"),
  title: document.querySelector("[data-collection-title]"),
  kicker: document.querySelector("[data-collection-kicker]"),
  copy: document.querySelector("[data-collection-copy]"),
  art: document.querySelector("[data-collection-art]"),
  listTitle: document.querySelector("[data-list-title]"),
  products: document.querySelector("[data-products]"),
  pagination: document.querySelector("[data-products-pagination]"),
  searchInput: document.querySelector("[data-search-input]"),
  sort: document.querySelector("[data-sort]"),
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

function renderCollectionMeta() {
  const typeLabels = {
    foam: "ໂຟມ",
    latex: "ຢາງພາລາ",
    "foam-spring": "ໂຟມ + ສະປຣິງ",
    "foam-latex": "ໂຟມ + ຢາງພາລາ",
    "foam-spring-latex": "ໂຟມ + ສະປຣິງ + ຢາງພາລາ"
  };
  const title = typeLabels[typeKey] || collection.title;
  document.title = `Kinglike - ${collection.title}`;
  els.title.textContent = title;
  els.kicker.textContent = collection.kicker;
  els.copy.textContent = typeKey ? `ລວມສິນຄ້າປະເພດ ${title} ເພື່ອໃຫ້ເລືອກຮຸ່ນທີ່ເໝາະກັບການນອນຂອງທ່ານ.` : collection.copy;
  els.listTitle.textContent = title;
  els.art.className = `collection-art ${collection.art}-cover-art`;
  const coverImage = collectionCoverImage(collectionKey);
  const cover = document.querySelector("[data-collection-cover]");
  if (coverImage && cover) {
    cover.classList.add("has-admin-cover");
    cover.style.backgroundImage = `linear-gradient(90deg, rgba(5, 5, 5, 0.72), rgba(5, 5, 5, 0.18)), url("${coverImage}")`;
    els.art.style.display = "none";
  }
}

function filteredProducts() {
  const term = state.search.trim().toLowerCase();
  const list = products.filter((item) => !term || `${item.name} ${item.category} ${item.firmness}`.toLowerCase().includes(term));
  return list.sort((a, b) => {
    if (state.sort === "low") return productPrice(a, "salePrice") - productPrice(b, "salePrice");
    if (state.sort === "high") return productPrice(b, "salePrice") - productPrice(a, "salePrice");
    if (state.sort === "discount") return productPrice(b, "discountPercent") - productPrice(a, "discountPercent");
    return productPrice(b, "popular") - productPrice(a, "popular");
  });
}

function productCard(product) {
  const isWishlisted = state.wishlist.has(product.id);
  const image = primaryImage(product);
  const imageClass = image ? "has-admin-image" : "";
  return `
    <article class="product-card collection-card clickable-card" data-open-detail="${product.id}">
      <div class="product-art ${collection.art}-product-art ${imageClass}">
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

function renderProducts() {
  const list = filteredProducts();
  const pageCount = Math.max(1, Math.ceil(list.length / state.perPage));
  state.page = Math.min(Math.max(1, state.page), pageCount);
  const start = (state.page - 1) * state.perPage;
  const pageItems = list.slice(start, start + state.perPage);
  els.products.innerHTML = list.length ? pageItems.map(productCard).join("") : `<p class="meta">ບໍ່ພົບສິນຄ້າ</p>`;
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

function addToCart(id, size = "") {
  const product = allProducts.find((candidate) => candidate.id === id);
  if (!product) return;
  const option = productSizeOption(product, size);
  const item = state.cart.find((cartItem) => cartKey(cartItem.id, cartItem.size) === cartKey(id, option.size));
  if (item) item.qty += 1;
  else state.cart.push({ id, size: option.size, unitPrice: option.salePrice, qty: 1 });
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

function renderCart() {
  const items = state.cart
    .map((item) => {
      const product = allProducts.find((candidate) => candidate.id === item.id);
      if (!product) return null;
      const option = productSizeOption(product, item.size);
      return { ...item, size: item.size || option.size, unitPrice: item.unitPrice || option.salePrice, product };
    })
    .filter(Boolean);

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
              <button type="button" data-cart-increase="${cartKey(product.id, item.size)}">+</button>
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
  const total = items.reduce((sum, item) => sum + (item.unitPrice || productSizeOption(item.product, item.size).salePrice) * item.qty, 0);
  els.cartTotal.textContent = formatKip(total);
  els.cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);
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

function renderWishlist() {
  const list = [...state.wishlist].map((id) => allProducts.find((product) => product.id === id)).filter(Boolean);
  els.wishlistItems.innerHTML = list.length
    ? list.map((product) => `<div class="drawer-item"><div><strong>${product.name}</strong><div class="meta">${formatKip(product.salePrice)}</div></div><button type="button" data-add-cart="${product.id}">+</button></div>`).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
  els.wishlistCount.textContent = list.length;
}

function cartItemsWithProducts() {
  return state.cart
    .map((item) => {
      const product = allProducts.find((candidate) => candidate.id === item.id);
      if (!product) return null;
      const option = productSizeOption(product, item.size);
      return { ...item, size: item.size || option.size, unitPrice: item.unitPrice || option.salePrice, product };
    })
    .filter(Boolean);
}

function buildOrderMessage() {
  const items = cartItemsWithProducts();
  const fallbackMessage = "ສະບາຍດີ ຂ້ອຍສົນໃຈສອບຖາມສິນຄ້າ Kinglike";
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
    "ລິ້ງໜ້າສິນຄ້າ:",
    window.location.href,
    "",
    "ກະລຸນາຢືນຢັນສິນຄ້າ, ຂະໜາດ, ຈຳນວນ ແລະ ທີ່ຢູ່ຈັດສົ່ງ. ແອດມິນຈະແຈ້ງຄ່າຈັດສົ່ງ ແລະ ຂັ້ນຕອນຊຳລະເງິນອີກຄັ້ງ."
  ].filter(Boolean).join("\n");
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

function openChatOrder() {
  const items = cartItemsWithProducts();
  if (!items.length) {
    openDrawer(els.cartDrawer);
    return;
  }
  const modal = ensureChatModal();
  modal.querySelector("[data-chat-summary]").innerHTML = items.map((item) => `
    <div><strong>${item.product.name}</strong><span>${item.size || productSizeOption(item.product).size} • ${formatKip(item.unitPrice || productSizeOption(item.product, item.size).salePrice)} x ${item.qty}</span></div>
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

async function sendChatDraft(channel) {
  const items = cartItemsWithProducts();
  const message = items.length ? buildOrderMessage() : "ສະບາຍດີ ຂ້ອຍສົນໃຈສອບຖາມສິນຄ້າ Kinglike";
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
      })
    });
  } catch (error) {
    // Let customer continue to chat even if local API is unavailable.
  }
}
async function submitChatDraft(channel) {
  const modal = ensureChatModal();
  await sendChatDraft(channel);
  if (channel !== "messenger") modal.classList.remove("is-open");
}

function checkout() {
  openChatOrder();
}

function openProductDetail(id) {
  const product = products.find((candidate) => candidate.id === id);
  if (!product) return;
  const url = `product.html?id=${encodeURIComponent(product.id)}&category=${encodeURIComponent(collectionKey)}`;
  window.location.href = url;
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
  const addId = event.target.closest("[data-add-cart]")?.dataset.addCart;
  const wishlistId = event.target.closest("[data-toggle-wishlist]")?.dataset.toggleWishlist;
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  const increaseId = event.target.closest("[data-cart-increase]")?.dataset.cartIncrease;
  const decreaseId = event.target.closest("[data-cart-decrease]")?.dataset.cartDecrease;
  const detailId = event.target.closest("[data-open-detail]")?.dataset.openDetail;
  const lineTarget = event.target.closest("[data-line-contact]");
  const shouldCheckout = event.target.closest("[data-checkout]");
  const pageTarget = event.target.closest("[data-product-page]")?.dataset.productPage;
  if (lineTarget) {
    sendChatDraft(lineTarget.dataset.lineChannel || "whatsapp");
    return;
  }
  if (shouldCheckout) {
    checkout();
    return;
  }
  if (pageTarget) {
    state.page = Number(pageTarget);
    renderProducts();
    document.querySelector(".collection-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (addId) {
    addToCart(addId);
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
});

document.querySelector("[data-open-cart]").addEventListener("click", () => openDrawer(els.cartDrawer));
document.querySelector("[data-close-cart]").addEventListener("click", () => closeDrawer(els.cartDrawer));
document.querySelector("[data-open-wishlist]").addEventListener("click", () => openDrawer(els.wishlistDrawer));
document.querySelector("[data-close-wishlist]").addEventListener("click", () => closeDrawer(els.wishlistDrawer));
document.querySelector("[data-open-menu]").addEventListener("click", openMobileMenu);
document.querySelector("[data-close-menu]").addEventListener("click", closeMobileMenu);
els.menuBackdrop.addEventListener("click", closeMobileMenu);
els.mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMobileMenu));

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
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

renderCollectionMeta();
renderProducts();
renderCart();
renderWishlist();
hydrateSyncedStore();
