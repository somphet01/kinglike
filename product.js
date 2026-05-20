const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const CART_STORAGE_KEY = "kinglikeCart";
const WISHLIST_STORAGE_KEY = "kinglikeWishlist";
const STORE_UPDATED_KEY = "kinglikeStoreUpdatedAt";
const WHATSAPP_PHONE = "8562051777641";
const MESSENGER_URL = "https://www.facebook.com/share/1GbHw9wGrM/?mibextid=wwXIfr";
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

const collectionProducts = {
  mattresses: [
    { ...product("foam-comfort", "Kinglike Foam Comfort", "Foam", "ນຸ່ມ", "10 ນິ້ວ", 5200000, 3590000, 31, "Foam"), type: "foam" },
    { ...product("latex-natural", "Kinglike Natural Latex", "Latex", "ນຸ່ມແນ່ນ", "10 ນິ້ວ", 6900000, 4690000, 32, "Latex"), type: "latex" },
    { ...product("spring-cloud", "Kinglike Foam Spring", "Hybrid", "ນຸ່ມແນ່ນ", "12 ນິ້ວ", 7800000, 5290000, 32, "Hybrid"), type: "foam-spring" },
    { ...product("foam-latex-luxe", "Kinglike Foam Latex Luxe", "Foam + Latex", "ນຸ່ມ", "11 ນິ້ວ", 7400000, 5190000, 30, "Premium"), type: "foam-latex" },
    { ...product("grand-hybrid", "Kinglike Grand Hybrid", "Foam + Spring + Latex", "ນຸ່ມແນ່ນ", "13 ນິ້ວ", 9200000, 6590000, 28, "Hotel Grade"), type: "foam-spring-latex" }
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

function loadAdminProducts() {
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
    { image: "", label: "ຮູບສິນຄ້າ" },
    { image: "", label: "Layer ວັດສະດຸ" },
    { image: "", label: "ຜ້ານຸ່ມ" },
    { image: "", label: "ຂະໜາດເຂົ້າມຸມ" }
  ];
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
  if (category.includes("pillow")) return "pillows";
  if (category.includes("topper")) return "toppers";
  if (category.includes("bedding") || category.includes("sheet") || category.includes("protector")) return "bedding";
  return "mattresses";
}

function getProductList(category) {
  const base = collectionProducts[category] || collectionProducts.pillows;
  const adminProducts = loadAdminProducts().filter((item) => collectionFromAdminProduct(item) === category);
  return [...adminProducts, ...base].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
}

const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "pillows";
const id = params.get("id");
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
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(idbProducts));
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
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(store.products));
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
  const saving = currentProduct.price - currentProduct.salePrice;
  const gallery = galleryItems(currentProduct);
  const heroImage = gallery[0]?.image || "";
  const imageClass = heroImage ? "has-admin-image" : "";
  els.page.innerHTML = `
    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="detail-hero-art ${categoryKey === "pillows" ? "pillow-detail-art" : ""} ${imageClass}" data-gallery-hero>
          ${heroImage ? `<img src="${heroImage}" alt="${currentProduct.name}" data-gallery-hero-image />` : ""}
          <span class="badge">${currentProduct.badge}</span>
          ${gallery.length > 1 ? `
            <button class="gallery-nav gallery-prev" type="button" data-gallery-prev aria-label="Previous image">‹</button>
            <button class="gallery-nav gallery-next" type="button" data-gallery-next aria-label="Next image">›</button>
          ` : ""}
        </div>
        <div class="detail-thumbs" data-gallery-thumbs>
          ${gallery.map((item, index) => `
            <button class="${index === 0 ? "is-active" : ""}" type="button" data-gallery-index="${index}">
              ${item.image ? `<img src="${item.image}" alt="${item.label}" />` : ""}
              <span>${item.label}</span>
            </button>
          `).join("")}
        </div>
      </div>
      <aside class="detail-buybox">
        <h2>${currentProduct.name}</h2>
        <div class="detail-code">SKU: ${currentProduct.sku} • ${currentProduct.stock}</div>
        <div class="meta">${currentProduct.category} • ${currentProduct.thickness} • ${currentProduct.firmness} • ★ ${currentProduct.rating}</div>
        <div class="detail-price">
          <strong>${formatKip(currentProduct.salePrice)}</strong>
          <span class="regular-price">${formatKip(currentProduct.price)}</span>
        </div>
        <div class="save-line">ປະຢັດ ${formatKip(saving)} (${currentProduct.discountPercent}%)</div>
        <div class="option-group">
          <label>ເລືອກຂະໜາດ</label>
          <div class="size-options">${currentProduct.sizes.map((size) => `<button type="button">${size}</button>`).join("")}</div>
        </div>
        <div class="detail-actions">
          <button class="add-cart" type="button" data-add-cart="${currentProduct.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="buy-now" type="button" data-buy-now="${currentProduct.id}">ຊື້ທັນທີ</button>
        </div>
      </aside>
    </div>
    <div class="detail-benefits">
      <div>ສົ່ງຟຣີທົ່ວປະເທດ</div>
      <div>ຮັບປະກັນ ${currentProduct.warranty}</div>
      <div>ກວດສອບສິນຄ້າກ່ອນຮັບ</div>
      <div>ມີທີມງານແນະນຳ</div>
      ${productFreebies(currentProduct).length ? `<div class="detail-gift-benefit">ຂອງແຖມ: ${productFreebies(currentProduct).join(", ")}</div>` : ""}
    </div>
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
  `;
  bindGallery(gallery);
}

function bindGallery(gallery) {
  if (!gallery.length) return;
  let activeIndex = 0;
  const hero = els.page.querySelector("[data-gallery-hero]");
  const heroImage = els.page.querySelector("[data-gallery-hero-image]");
  const thumbs = els.page.querySelectorAll("[data-gallery-index]");
  const setActive = (index) => {
    activeIndex = (index + gallery.length) % gallery.length;
    const item = gallery[activeIndex];
    hero.classList.toggle("has-admin-image", Boolean(item.image));
    if (item.image && heroImage) heroImage.src = item.image;
    thumbs.forEach((thumb) => thumb.classList.toggle("is-active", Number(thumb.dataset.galleryIndex) === activeIndex));
  };
  thumbs.forEach((thumb) => thumb.addEventListener("click", () => setActive(Number(thumb.dataset.galleryIndex))));
  els.page.querySelector("[data-gallery-prev]")?.addEventListener("click", () => setActive(activeIndex - 1));
  els.page.querySelector("[data-gallery-next]")?.addEventListener("click", () => setActive(activeIndex + 1));
}

function addToCart(idToAdd) {
  const item = state.cart.find((cartItem) => cartItem.id === idToAdd);
  if (item) item.qty += 1;
  else state.cart.push({ id: idToAdd, qty: 1 });
  saveCart();
  renderCart();
  openDrawer(els.cartDrawer);
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
          <div class="meta">${formatKip(item.product.salePrice)}</div>
          <div class="cart-qty">
            <button type="button" data-cart-decrease="${item.product.id}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-cart-increase="${item.product.id}">＋</button>
          </div>
        </div>
        <div class="cart-line-side">
          <strong>${formatKip(productPrice(item.product, "salePrice") * item.qty)}</strong>
          <button type="button" data-remove-cart="${item.product.id}">×</button>
        </div>
      </div>
    `).join("")
    : `<p class="meta">ລົດເຂັນຍັງວ່າງຢູ່</p>`;
  const total = items.reduce((sum, item) => sum + productPrice(item.product, "salePrice") * item.qty, 0);
  els.cartTotal.textContent = formatKip(total);
  els.cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);
}

function removeFromCart(idToRemove) {
  state.cart = state.cart.filter((item) => item.id !== idToRemove);
  saveCart();
  renderCart();
}

function updateCartQty(idToUpdate, delta) {
  const item = state.cart.find((cartItem) => cartItem.id === idToUpdate);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(idToUpdate);
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
    .map((item) => ({ ...item, product: allProducts.find((candidate) => candidate.id === item.id) }))
    .filter((item) => item.product);
}

function buildOrderMessage(productId = "") {
  const focusedProduct = allProducts.find((product) => product.id === productId);
  const items = focusedProduct ? [{ product: focusedProduct, qty: 1 }] : cartItemsWithProducts();
  const product = items[0]?.product;
  return [
    "\u0e2a\u0e27\u0e31\u0e2a\u0e14\u0e35 \u0e2a\u0e19\u0e43\u0e08\u0e2a\u0e31\u0e48\u0e07\u0e0b\u0e37\u0e49\u0e2d\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32",
    "",
    `\u0e0a\u0e37\u0e48\u0e2d\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32: ${product?.name || "-"}`,
    `\u0e23\u0e2b\u0e31\u0e2a\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32: ${product?.sku || product?.id || "-"}`,
    `\u0e02\u0e19\u0e32\u0e14: ${(product?.sizes || ["ມາດຕະຖານ"]).join(", ")}`,
    `\u0e23\u0e32\u0e04\u0e32: ${formatKip(productPrice(product, "salePrice"))}`,
    `\u0e25\u0e34\u0e07\u0e01\u0e4c\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32: ${new URL(`product.html?id=${encodeURIComponent(product?.id || "")}&category=${encodeURIComponent(categoryKey)}`, window.location.href).toString()}`
  ].filter(Boolean).join("\n");
}

function chatItems(productId = "") {
  const focusedProduct = allProducts.find((product) => product.id === productId);
  return focusedProduct ? [{ product: focusedProduct, qty: 1 }] : cartItemsWithProducts();
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
    <div><strong>${item.product.name}</strong><span>${formatKip(productPrice(item.product, "salePrice"))} x ${item.qty}</span></div>
  `).join("");
  modal.classList.add("is-open");
}

async function sendChatDraft(channel, productId = "") {
  const items = chatItems(productId);
  const message = items.length ? buildOrderMessage(productId) : "\u0e2a\u0e27\u0e31\u0e2a\u0e14\u0e35 \u0e2a\u0e19\u0e43\u0e08\u0e2a\u0e2d\u0e1a\u0e16\u0e32\u0e21\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 Kinglike";
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
          size: (item.product.sizes || [""])[0],
          quantity: item.qty,
          unitPrice: productPrice(item.product, "salePrice")
        }))
      })
    });
  } catch (error) {
    // Let customer continue to chat even if the local draft API is unavailable.
  }
  const url = channel === "messenger" ? MESSENGER_URL : `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
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

function buyNow(idToBuy) {
  openChatOrder(idToBuy);
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
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  const increaseId = event.target.closest("[data-cart-increase]")?.dataset.cartIncrease;
  const decreaseId = event.target.closest("[data-cart-decrease]")?.dataset.cartDecrease;
  const lineTarget = event.target.closest("[data-line-contact]");
  const shouldCheckout = event.target.closest("[data-checkout]");
  const buyNowId = event.target.closest("[data-buy-now]")?.dataset.buyNow;
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
  if (addId) addToCart(addId);
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

window.addEventListener("scroll", () => {
  els.header.classList.toggle("is-scrolled", window.scrollY > 24);
});

renderProduct();
renderCart();
renderWishlist();
hydrateSyncedStore();
