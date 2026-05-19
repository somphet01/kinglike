const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const CART_STORAGE_KEY = "kinglikeCart";

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
const products = getProductList(categoryKey);
const currentProduct = products.find((item) => item.id === id) || products[0];
const state = { cart: loadCart(), wishlist: new Set() };
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
          <span>ຮູບສິນຄ້າ</span>
          <span>ວັດສະດຸ</span>
          <span>ການໃຊ້ງານ</span>
          <span>ຂະໜາດ</span>
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
          <button class="buy-now" type="button" data-add-cart="${currentProduct.id}">ຊື້ທັນທີ</button>
        </div>
        <button class="line-contact" type="button">ປຶກສາຜ່ານ LINE</button>
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
    .filter((item) => item.id === currentProduct.id)
    .map((item) => ({ ...item, product: currentProduct }));

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
          <strong>${formatKip(item.product.salePrice * item.qty)}</strong>
          <button type="button" data-remove-cart="${item.product.id}">×</button>
        </div>
      </div>
    `).join("")
    : `<p class="meta">ລົດເຂັນຍັງວ່າງຢູ່</p>`;
  const total = items.reduce((sum, item) => sum + item.product.salePrice * item.qty, 0);
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
  els.wishlistItems.innerHTML = `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
  els.wishlistCount.textContent = state.wishlist.size;
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
