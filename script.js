const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";
const CART_STORAGE_KEY = "kinglikeCart";

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
    badge: "ลด 32%",
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

function loadProducts() {
  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!saved) return [...defaultProducts];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultProducts];
  } catch (error) {
    return [...defaultProducts];
  }
}

function loadPromotion() {
  try {
    return JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || {};
  } catch (error) {
    return {};
  }
}

const state = {
  cart: loadCart(),
  wishlist: new Set(),
  search: "",
  size: "",
  firmness: "",
  sort: "popular"
};

const money = new Intl.NumberFormat("lo-LA").format;

const els = {
  header: document.querySelector("[data-header]"),
  products: document.querySelector("[data-products]"),
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

function filteredProducts() {
  const term = state.search.trim().toLowerCase();
  const list = products.filter((product) => {
    const matchesTerm = !term || `${product.name} ${product.category} ${product.firmness}`.toLowerCase().includes(term);
    const matchesSize = !state.size || product.sizes.includes(state.size);
    const matchesFirmness = !state.firmness || product.firmness === state.firmness;
    return matchesTerm && matchesSize && matchesFirmness;
  });

  return list.sort((a, b) => {
    if (state.sort === "low") return a.salePrice - b.salePrice;
    if (state.sort === "high") return b.salePrice - a.salePrice;
    if (state.sort === "discount") return b.discountPercent - a.discountPercent;
    return b.popular - a.popular;
  });
}

function renderProducts() {
  const list = filteredProducts();
  els.products.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p class="meta">ບໍ່ພົບສິນຄ້າຕາມການຄົ້ນຫາ</p>`;
}

function renderPromotion() {
  const promotion = loadPromotion();
  const promoSection = document.querySelector(".promo");
  const title = document.querySelector("[data-promo-title]");
  const text = document.querySelector("[data-promo-text]");
  const button = document.querySelector("[data-promo-button]");

  if (promotion.title && title) title.textContent = promotion.title;
  if (promotion.text && text) text.textContent = promotion.text;
  if (promotion.button && button) button.textContent = promotion.button;
  if (promotion.coverImage && promoSection) {
    promoSection.classList.add("has-cover");
    promoSection.style.backgroundImage = `linear-gradient(90deg, rgba(5, 5, 5, 0.9), rgba(5, 5, 5, 0.42)), url("${promotion.coverImage}")`;
  }
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
          <button class="view-btn" type="button" data-open-detail="${product.id}">ລາຍລະອຽດ</button>
        </div>
      </div>
    </article>
  `;
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
  renderProducts();
  renderWishlist();
}

function openProductDetail(id) {
  const product = products.find((candidate) => candidate.id === id);
  if (!product) return;

  const saving = product.price - product.salePrice;
  const gallery = galleryItems(product);
  const heroImage = gallery[0]?.image || "";
  const imageClass = heroImage ? "has-admin-image" : "";
  els.productDetail.innerHTML = `
    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="detail-hero-art ${imageClass}" data-gallery-hero>
          ${heroImage ? `<img src="${heroImage}" alt="${product.name}" data-gallery-hero-image />` : ""}
          <span class="badge">${product.badge}</span>
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
          <span>ຮູບດ້ານໜ້າ</span>
          <span>Layer ວັດສະດຸ</span>
          <span>ຜ້າຫຸ້ມ</span>
          <span>ຂະໜາດຫ້ອງນອນ</span>
        </div>
      </div>

      <aside class="detail-buybox">
        <h2>${product.name}</h2>
        <div class="detail-code">SKU: ${product.sku} • ${product.stock}</div>
        <div class="meta">${product.category} • ${product.thickness} • ${product.firmness} • ★ ${product.rating}</div>
        <div class="detail-price">
          <strong>${formatKip(product.salePrice)}</strong>
          <span class="regular-price">${formatKip(product.price)}</span>
        </div>
        <div class="save-line">ປະຢັດ ${formatKip(saving)} (${product.discountPercent}%) • ຮອງຮັບຜ່ອນ 0%</div>

        <div class="option-group">
          <label>ເລືອກຂະໜາດ</label>
          <div class="size-options">${product.sizes.map((size) => `<button type="button">${size}</button>`).join("")}</div>
        </div>

        <div class="option-group">
          <label>ຈຳນວນ</label>
          <div class="qty-control">
            <button type="button">−</button>
            <span>1</span>
            <button type="button">＋</button>
          </div>
        </div>

        <div class="detail-actions">
          <button class="add-cart" type="button" data-add-cart="${product.id}">ເພີ່ມລົດເຂັນ</button>
          <button class="buy-now" type="button" data-add-cart="${product.id}">ຊື້ທັນທີ</button>
        </div>
        <button class="line-contact" type="button">ປຶກສາຜ່ານ LINE</button>
      </aside>
    </div>

    <div class="detail-benefits">
      <div>ສົ່ງຟຣີທົ່ວປະເທດ</div>
      <div>ຮັບປະກັນ ${product.warranty}</div>
      <div>ກວດສອບສິນຄ້າກ່ອນຮັບ</div>
      <div>ມີທີມງານແນະນຳ</div>
      ${productFreebies(product).length ? `<div class="detail-gift-benefit">ຂອງແຖມ: ${productFreebies(product).join(", ")}</div>` : ""}
    </div>

    <div class="detail-info">
      <section>
        <h3>ລາຍລະອຽດສິນຄ້າ</h3>
        <p>${product.description}</p>
      </section>
      <section>
        <h3>ຄຸນສົມບັດຫຼັກ</h3>
        <ul>
          ${product.materials.map((item) => `<li>${item}</li>`).join("")}
          <li>ອອກແບບໃຫ້ລະບາຍອາກາດໄດ້ດີ ແລະຊ່ວຍລົດການສະສົມຄວາມຮ້ອນ.</li>
        </ul>
      </section>
      <section>
        <h3>ຂໍ້ມູນສະເປກ</h3>
        <div class="spec-grid">
          <div><span>ຄວາມໜາ</span><strong>${product.thickness}</strong></div>
          <div><span>ຄວາມນຸ່ມ</span><strong>${product.firmness}</strong></div>
          <div><span>ປະເພດ</span><strong>${product.category}</strong></div>
          <div><span>ຂະໜາດ</span><strong>${product.sizes.join(", ")}</strong></div>
          <div><span>ຮັບປະກັນ</span><strong>${product.warranty}</strong></div>
          <div><span>ສະຖານະ</span><strong>${product.stock}</strong></div>
        </div>
      </section>
      <section>
        <h3>ການຈັດສົ່ງ ແລະການຮັບປະກັນ</h3>
        <p>ຈັດສົ່ງຟຣີສຳລັບພື້ນທີ່ທີ່ກຳນົດ ພ້ອມໃຫ້ຄຳແນະນຳການໃຊ້ງານ. ເງື່ອນໄຂຈິງສາມາດປັບໄດ້ເມື່ອມີນະໂຍບາຍຮ້ານສຸດທ້າຍ.</p>
      </section>
    </div>
  `;

  els.detailOverlay.classList.add("is-open");
  bindDetailGallery(els.productDetail, gallery);
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

function renderWishlist() {
  const list = [...state.wishlist].map((id) => products.find((product) => product.id === id));
  els.wishlistItems.innerHTML = list.length
    ? list.map((product) => `
      <div class="drawer-item">
        <div>
          <strong>${product.name}</strong>
          <div class="meta">${formatKip(product.salePrice)}</div>
        </div>
        <button type="button" data-add-cart="${product.id}">＋</button>
      </div>
    `).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າທີ່ຖືກໃຈ</p>`;
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
  const wishlistId = event.target.closest("[data-toggle-wishlist]")?.dataset.toggleWishlist;
  const removeId = event.target.closest("[data-remove-cart]")?.dataset.removeCart;
  const increaseId = event.target.closest("[data-cart-increase]")?.dataset.cartIncrease;
  const decreaseId = event.target.closest("[data-cart-decrease]")?.dataset.cartDecrease;
  const detailId = event.target.closest("[data-open-detail]")?.dataset.openDetail;

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
document.querySelector("[data-close-detail]").addEventListener("click", () => els.detailOverlay.classList.remove("is-open"));
document.querySelector("[data-open-menu]").addEventListener("click", openMobileMenu);
document.querySelector("[data-close-menu]").addEventListener("click", closeMobileMenu);
els.menuBackdrop.addEventListener("click", closeMobileMenu);
els.mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

els.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderProducts();
});
els.sizeFilter.addEventListener("change", (event) => {
  state.size = event.target.value;
  renderProducts();
});
els.firmnessFilter.addEventListener("change", (event) => {
  state.firmness = event.target.value;
  renderProducts();
});
els.sort.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderProducts();
});
window.addEventListener("scroll", () => {
  els.header.classList.toggle("is-scrolled", window.scrollY > 24);
});

renderProducts();
renderPromotion();
renderCart();
renderWishlist();
