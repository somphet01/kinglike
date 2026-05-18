const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";

const defaultProducts = [
  productSeed("royal-cloud", "Kinglike Royal Cloud", "Hybrid", "ນຸ່ມ", "12 ນິ້ວ", 7800000, 5290000, "Best Seller"),
  productSeed("hotel-latex", "Kinglike Hotel Latex", "Latex", "ນຸ່ມແນ່ນ", "10 ນິ້ວ", 6900000, 4690000, "Promotion"),
  productSeed("pocket-grand", "Kinglike Pocket Grand", "Pocket Spring", "ແນ່ນ", "11 ນິ້ວ", 5900000, 3990000, "Promotion"),
  productSeed("memory-luxe", "Kinglike Memory Luxe", "Memory Foam", "ນຸ່ມ", "8 ນິ້ວ", 4500000, 3290000, "New"),
  productSeed("gold-support", "Kinglike Gold Support", "Hybrid", "ນຸ່ມແນ່ນ", "12 ນິ້ວ", 8600000, 6190000, "Hotel Grade"),
  productSeed("classic-rest", "Kinglike Classic Rest", "Pocket Spring", "ແນ່ນ", "9 ນິ້ວ", 3900000, 2790000, "Value")
];

function productSeed(id, name, category, firmness, thickness, price, salePrice, badge) {
  return {
    id,
    name,
    category,
    firmness,
    thickness,
    sizes: ["3.5 ຟຸດ", "5 ຟຸດ", "6 ຟຸດ"],
    price,
    salePrice,
    discountPercent: discountPercent(price, salePrice),
    badge,
    rating: 4.8,
    popular: Date.now(),
    sku: id.toUpperCase(),
    materials: ["Premium fabric", "Comfort support", "Hotel grade"],
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: `${name} ສິນຄ້າພຣີມຽມສຳລັບຫ້ອງນອນ Kinglike.`
  };
}

const els = {
  tabs: document.querySelectorAll("[data-admin-tab]"),
  panels: document.querySelectorAll("[data-admin-panel]"),
  form: document.querySelector("[data-product-form]"),
  formTitle: document.querySelector("[data-form-title]"),
  list: document.querySelector("[data-admin-products]"),
  productCount: document.querySelector("[data-product-count]"),
  saleCount: document.querySelector("[data-sale-count]"),
  clearForm: document.querySelector("[data-clear-form]"),
  resetDemo: document.querySelector("[data-reset-demo]"),
  newProduct: document.querySelector("[data-new-product]"),
  addSample: document.querySelector("[data-add-sample]"),
  search: document.querySelector("[data-admin-search]"),
  preview: document.querySelector("[data-product-preview]"),
  productImageUpload: document.querySelector("[data-product-image-upload]"),
  productImageValue: document.querySelector("[data-product-image-value]"),
  promoForm: document.querySelector("[data-promo-form]"),
  coverUpload: document.querySelector("[data-cover-image-upload]"),
  coverValue: document.querySelector("[data-cover-image-value]"),
  promoPreview: document.querySelector("[data-promo-preview]"),
  toast: document.querySelector("[data-toast]")
};

let products = loadProducts();
let activeProductId = products[0]?.id || "";

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

function saveProducts() {
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
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

function discountPercent(price, salePrice) {
  const regular = Number(price || 0);
  const sale = Number(salePrice || 0);
  if (!regular || sale >= regular) return 0;
  return Math.round(((regular - sale) / regular) * 100);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

function setTab(tabName) {
  els.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.adminTab === tabName));
  els.panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.adminPanel === tabName));
}

function productImageMarkup(product) {
  return product?.image
    ? `<img src="${product.image}" alt="${product.name}" />`
    : "";
}

function renderProducts() {
  const term = els.search.value.trim().toLowerCase();
  const visible = products.filter((product) => !term || `${product.name} ${product.category} ${product.badge}`.toLowerCase().includes(term));
  els.productCount.textContent = products.length;
  els.saleCount.textContent = products.filter((product) => product.discountPercent > 0).length;
  els.list.innerHTML = visible.map((product) => `
    <article class="admin-product ${product.id === activeProductId ? "is-active" : ""}" data-select-product="${product.id}">
      <div class="admin-thumb">${productImageMarkup(product)}</div>
      <div>
        <h3>${product.name}</h3>
        <p>${product.category} • ${product.thickness || "-"} • ${product.firmness || "-"} • ${money(product.salePrice)}</p>
        <p>${product.badge || "No badge"} • ${product.sizes?.join(", ") || "-"}</p>
      </div>
      <div class="admin-actions">
        <button type="button" data-edit-product="${product.id}">ແກ້ໄຂ</button>
        <button type="button" data-delete-product="${product.id}">ລຶບ</button>
      </div>
    </article>
  `).join("");
}

function formToProduct() {
  const data = new FormData(els.form);
  const name = data.get("name").trim();
  const price = Number(data.get("price") || 0);
  const salePrice = Number(data.get("salePrice") || 0);
  const id = data.get("id") || slugify(name);
  const previous = products.find((item) => item.id === id);

  return {
    id,
    name,
    image: data.get("image") || previous?.image || "",
    sku: data.get("sku").trim() || id.toUpperCase(),
    category: data.get("category"),
    firmness: data.get("firmness"),
    thickness: data.get("thickness").trim(),
    sizes: toList(data.get("sizes") || "3.5 ຟຸດ, 5 ຟຸດ, 6 ຟຸດ"),
    price,
    salePrice,
    discountPercent: discountPercent(price, salePrice),
    badge: data.get("badge").trim() || "New",
    rating: Number(data.get("rating") || 4.8),
    popular: previous?.popular || Date.now(),
    stock: data.get("stock").trim() || "ມີສິນຄ້າ",
    warranty: data.get("warranty").trim() || "10 ປີ",
    materials: toList(data.get("materials") || "Premium fabric, Pocket spring"),
    description: data.get("description").trim() || "ລາຍລະອຽດສິນຄ້າ Kinglike."
  };
}

function fillForm(product) {
  setField("id", product.id);
  setField("image", product.image || "");
  setField("name", product.name || "");
  setField("sku", product.sku || "");
  setField("badge", product.badge || "");
  setField("category", product.category || "Hybrid");
  setField("firmness", product.firmness || "ນຸ່ມ");
  setField("thickness", product.thickness || "");
  setField("sizes", product.sizes?.join(", ") || "");
  setField("price", product.price || "");
  setField("salePrice", product.salePrice || "");
  setField("rating", product.rating || "");
  setField("stock", product.stock || "");
  setField("warranty", product.warranty || "");
  setField("materials", product.materials?.join(", ") || "");
  setField("description", product.description || "");
  els.formTitle.textContent = "ແກ້ໄຂສິນຄ້າ";
  activeProductId = product.id;
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

function clearForm() {
  els.form.reset();
  setField("id", "");
  setField("image", "");
  els.formTitle.textContent = "ເພີ່ມສິນຄ້າໃໝ່";
  activeProductId = "";
  renderProducts();
  renderPreview();
}

function currentPreviewProduct() {
  const data = new FormData(els.form);
  if (!data.get("name")) {
    return products.find((product) => product.id === activeProductId) || products[0];
  }
  return formToProduct();
}

function renderPreview() {
  const product = currentPreviewProduct();
  if (!product) {
    els.preview.innerHTML = `<div class="admin-preview-empty">ເລືອກສິນຄ້າ ຫຼືເພີ່ມສິນຄ້າໃໝ່</div>`;
    return;
  }

  const imageClass = product.image ? "has-admin-image" : "";
  els.preview.innerHTML = `
    <article class="product-card">
      <div class="product-art ${imageClass}">
        ${product.image ? `<img src="${product.image}" alt="${product.name}" />` : ""}
        <span class="badge">${product.badge}</span>
        <button class="wishlist-toggle" type="button">♡</button>
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <div class="meta">${product.category} • ${product.thickness} • ${product.firmness} • ★ ${product.rating || 4.8}</div>
        <div class="sizes">${(product.sizes || []).map((size) => `<span>${size}</span>`).join("")}</div>
        <div class="prices">
          <strong class="sale-price">${money(product.salePrice)}</strong>
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

function readFileAsDataUrl(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

function loadPromoForm() {
  try {
    const promo = JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || {};
    els.promoForm.elements.title.value = promo.title || "";
    els.promoForm.elements.text.value = promo.text || "";
    els.promoForm.elements.button.value = promo.button || "";
    els.promoForm.elements.coverImage.value = promo.coverImage || "";
  } catch (error) {
    els.promoForm.reset();
  }
  renderPromoPreview();
}

function renderPromoPreview() {
  const data = new FormData(els.promoForm);
  const title = data.get("title") || "ຊຸດນອນຫຼູ ປະຢັດກວ່າ";
  const text = data.get("text") || "ຊື້ທີ່ນອນພ້ອມໝອນ ຮັບສ່ວນຫຼຸດພິເສດ";
  const coverImage = data.get("coverImage");
  els.promoPreview.classList.toggle("has-cover", Boolean(coverImage));
  els.promoPreview.innerHTML = coverImage
    ? `<img src="${coverImage}" alt="${title}" />`
    : `<div class="promo-preview-copy"><p class="eyebrow">HOT DEAL</p><h3>${title}</h3><p>${text}</p></div>`;
}

els.tabs.forEach((tab) => tab.addEventListener("click", () => setTab(tab.dataset.adminTab)));
els.search.addEventListener("input", renderProducts);
els.clearForm.addEventListener("click", clearForm);
els.newProduct.addEventListener("click", clearForm);
els.addSample.addEventListener("click", () => {
  const sample = productSeed(`sample-${Date.now()}`, "Kinglike Sample Product", "Hybrid", "ນຸ່ມແນ່ນ", "12 ນິ້ວ", 7500000, 4990000, "Sample");
  products.unshift(sample);
  activeProductId = sample.id;
  saveProducts();
  renderProducts();
  fillForm(sample);
  showToast("ເພີ່ມສິນຄ້າຕົວຢ່າງແລ້ວ");
});

els.form.addEventListener("input", renderPreview);

els.productImageUpload.addEventListener("change", (event) => {
  readFileAsDataUrl(event.target.files[0], (dataUrl) => {
    els.productImageValue.value = dataUrl;
    renderPreview();
  });
});

els.coverUpload.addEventListener("change", (event) => {
  readFileAsDataUrl(event.target.files[0], (dataUrl) => {
    els.coverValue.value = dataUrl;
    renderPromoPreview();
  });
});

els.promoForm.addEventListener("input", renderPromoPreview);

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const product = formToProduct();
  const index = products.findIndex((item) => item.id === product.id);
  if (index >= 0) products[index] = product;
  else products.unshift(product);
  activeProductId = product.id;
  saveProducts();
  renderProducts();
  fillForm(product);
  showToast("ບັນທຶກສິນຄ້າແລ້ວ");
});

els.list.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit-product]")?.dataset.editProduct;
  const deleteId = event.target.closest("[data-delete-product]")?.dataset.deleteProduct;
  const selectId = event.target.closest("[data-select-product]")?.dataset.selectProduct;

  if (deleteId) {
    products = products.filter((item) => item.id !== deleteId);
    if (activeProductId === deleteId) activeProductId = products[0]?.id || "";
    saveProducts();
    renderProducts();
    const next = products.find((item) => item.id === activeProductId);
    if (next) fillForm(next);
    else clearForm();
    showToast("ລຶບສິນຄ້າແລ້ວ");
    return;
  }

  const targetId = editId || selectId;
  if (targetId) {
    const product = products.find((item) => item.id === targetId);
    if (product) fillForm(product);
  }
});

els.resetDemo.addEventListener("click", () => {
  products = [...defaultProducts];
  activeProductId = products[0]?.id || "";
  saveProducts();
  renderProducts();
  fillForm(products[0]);
  showToast("Reset demo ແລ້ວ");
});

els.promoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(els.promoForm);
  localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({
    title: data.get("title").trim(),
    text: data.get("text").trim(),
    button: data.get("button").trim(),
    coverImage: data.get("coverImage")
  }));
  showToast("ບັນທຶກ Cover / Promotion ແລ້ວ");
});

renderProducts();
if (products[0]) fillForm(products[0]);
loadPromoForm();
