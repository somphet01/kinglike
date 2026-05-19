const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const CART_STORAGE_KEY = "kinglikeCart";
const WISHLIST_STORAGE_KEY = "kinglikeWishlist";
const LINE_CONTACT_URL = "https://line.me/R/ti/p/@kinglike";

const collections = {
  mattresses: {
    title: "ທີ່ນອນ",
    kicker: "KINGLIKE MATTRESS TYPES",
    copy: "ເລືອກທີ່ນອນຕາມວັດສະດຸທີ່ຕ້ອງການ ໂຟມ ຢາງພາລາ ສະປຣິງ ຫຼື hybrid.",
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
    copy: "ໝອນພຣີມຽມ ນຸ່ມ ຮອງຮັບຄໍ ແລະຊ່ວຍໃຫ້ຫຼັບສະບາຍຕະຫຼອດຄືນ.",
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
  if (category.includes("pillow")) return "pillows";
  if (category.includes("topper")) return "toppers";
  if (category.includes("bedding") || category.includes("sheet") || category.includes("protector")) return "bedding";
  return "mattresses";
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
const allProducts = [...loadAdminProducts(), ...Object.values(collections).flatMap((item) => item.products)].filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);

const state = {
  cart: loadCart(),
  wishlist: loadWishlist(),
  search: "",
  sort: "popular"
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
  return `${money(value)} ₭`;
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
}

function filteredProducts() {
  const term = state.search.trim().toLowerCase();
  const list = products.filter((item) => !term || `${item.name} ${item.category} ${item.firmness}`.toLowerCase().includes(term));
  return list.sort((a, b) => {
    if (state.sort === "low") return a.salePrice - b.salePrice;
    if (state.sort === "high") return b.salePrice - a.salePrice;
    if (state.sort === "discount") return b.discountPercent - a.discountPercent;
    return b.popular - a.popular;
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
        <span class="badge">${product.badge}</span>
        <button class="wishlist-toggle ${isWishlisted ? "is-active" : ""}" type="button" data-toggle-wishlist="${product.id}" aria-label="Wishlist">♡</button>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="meta">${product.category} • ${product.thickness} • ${product.firmness} • ★ ${product.rating}</div>
        <div class="sizes">${product.sizes.map((size) => `<span>${size}</span>`).join("")}</div>
        <div class="prices">
          <strong class="sale-price">${formatKip(product.salePrice)}</strong>
          <span class="regular-price">${formatKip(product.price)}</span>
        </div>
        <div class="card-actions">
          <button class="add-cart" type="button" data-add-cart="${product.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="view-btn" type="button">ລາຍລະອຽດ</button>
        </div>
      </div>
    </article>
  `;
}

function renderProducts() {
  const list = filteredProducts();
  els.products.innerHTML = list.length ? list.map(productCard).join("") : `<p class="meta">ບໍ່ພົບສິນຄ້າ</p>`;
}

function addToCart(id) {
  const item = state.cart.find((cartItem) => cartItem.id === id);
  if (item) item.qty += 1;
  else state.cart.push({ id, qty: 1 });
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
    .map((item) => ({ ...item, product: allProducts.find((candidate) => candidate.id === item.id) }))
    .filter((item) => item.product);

  els.cartItems.innerHTML = items.length
    ? items.map((item) => {
      const product = item.product;
      return `
        <div class="drawer-item cart-line">
          <div class="cart-line-info">
            <strong>${product.name}</strong>
            <div class="meta">${formatKip(product.salePrice)}</div>
            <div class="cart-qty">
              <button type="button" data-cart-decrease="${product.id}">−</button>
              <span>${item.qty}</span>
              <button type="button" data-cart-increase="${product.id}">＋</button>
            </div>
          </div>
          <div class="cart-line-side">
            <strong>${formatKip(product.salePrice * item.qty)}</strong>
            <button type="button" data-remove-cart="${product.id}">×</button>
          </div>
        </div>
      `;
    }).join("")
    : `<p class="meta">ລົດເຂັນຍັງວ່າງຢູ່</p>`;
  const total = items.reduce((sum, item) => sum + item.product.salePrice * item.qty, 0);
  els.cartTotal.textContent = formatKip(total);
  els.cartCount.textContent = items.reduce((sum, item) => sum + item.qty, 0);
}

function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

function updateCartQty(id, delta) {
  const item = state.cart.find((cartItem) => cartItem.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCart();
}

function renderWishlist() {
  const list = [...state.wishlist].map((id) => allProducts.find((product) => product.id === id)).filter(Boolean);
  els.wishlistItems.innerHTML = list.length
    ? list.map((product) => `<div class="drawer-item"><div><strong>${product.name}</strong><div class="meta">${formatKip(product.salePrice)}</div></div><button type="button" data-add-cart="${product.id}">＋</button></div>`).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
  els.wishlistCount.textContent = state.wishlist.size;
}

function cartItemsWithProducts() {
  return state.cart
    .map((item) => ({ ...item, product: allProducts.find((candidate) => candidate.id === item.id) }))
    .filter((item) => item.product);
}

function buildOrderMessage() {
  const items = cartItemsWithProducts();
  const lines = items.map((item, index) => `${index + 1}. ${item.product.name} x${item.qty} - ${formatKip(item.product.salePrice * item.qty)}`);
  const total = items.reduce((sum, item) => sum + item.product.salePrice * item.qty, 0);
  return [
    "Kinglike order inquiry",
    ...lines,
    total ? `Total: ${formatKip(total)}` : "",
    "Please confirm stock, delivery, and payment options."
  ].filter(Boolean).join("\n");
}

async function copyOrderMessage(message) {
  try {
    await navigator.clipboard.writeText(message);
  } catch (error) {
    window.prompt("Copy this order message for LINE:", message);
  }
}

function openLineContact() {
  copyOrderMessage(buildOrderMessage());
  window.open(LINE_CONTACT_URL, "_blank", "noopener");
}

function checkout() {
  if (!cartItemsWithProducts().length) {
    openDrawer(els.cartDrawer);
    return;
  }
  openLineContact();
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
  if (lineTarget) {
    openLineContact();
    return;
  }
  if (shouldCheckout) {
    checkout();
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
  renderProducts();
});

els.sort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});

window.addEventListener("scroll", () => {
  els.header.classList.toggle("is-scrolled", window.scrollY > 24);
});

renderCollectionMeta();
renderProducts();
renderCart();
renderWishlist();
