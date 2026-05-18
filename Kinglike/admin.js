const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const PROMO_STORAGE_KEY = "kinglikePromotion";

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
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "ຮຸ່ນ Royal Cloud ເນັ້ນຄວາມນຸ່ມສະບາຍແບບຫ້ອງພັກຫຼູ ຊ່ວຍຮອງຮັບສະຣີລະໃຫ້ຜ່ອນຄາຍ."
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
    badge: "Promotion",
    rating: 4.8,
    popular: 88,
    sku: "KL-HL-1002",
    materials: ["Latex comfort layer", "Breathable fabric", "High density foam", "Pocket spring base"],
    warranty: "10 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "ທີ່ນອນ Latex ສຳລັບຄົນທີ່ຕ້ອງການຄວາມນຸ່ມແນ່ນ ແລະຮອງຮັບຫຼັງໄດ້ດີ."
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
    warranty: "8 ປີ",
    stock: "ມີສິນຄ້າ",
    description: "Pocket Grand ເຫມາະກັບຜູ້ທີ່ມັກຄວາມແນ່ນ ຊ່ວຍລົດການສັ່ນໄຫວ."
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
    description: "Memory Luxe ໂອບຮັບຮ່າງກາຍແບບນຸ່ມ ເໝາະກັບຫ້ອງນອນທີ່ຕ້ອງການຄວາມສະບາຍ."
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
    description: "Gold Support ເປັນຮຸ່ນພຣີມຽມທີ່ຮອງຮັບແນ່ນ ແຕ່ຍັງນຸ່ມສະບາຍ."
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
    description: "Classic Rest ເປັນຮຸ່ນເລີ່ມຕົ້ນທີ່ໃຊ້ງານງ່າຍ ລາຄາດີ."
  }
];

const els = {
  form: document.querySelector("[data-product-form]"),
  formTitle: document.querySelector("[data-form-title]"),
  list: document.querySelector("[data-admin-products]"),
  count: document.querySelector("[data-product-count]"),
  clearForm: document.querySelector("[data-clear-form]"),
  resetDemo: document.querySelector("[data-reset-demo]"),
  promoForm: document.querySelector("[data-promo-form]"),
  toast: document.querySelector("[data-toast]")
};

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
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
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

function renderProducts() {
  els.count.textContent = products.length;
  els.list.innerHTML = products.map((product) => `
    <article class="admin-product">
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

  return {
    id,
    name,
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
    popular: Date.now(),
    stock: data.get("stock").trim() || "ມີສິນຄ້າ",
    warranty: data.get("warranty").trim() || "10 ປີ",
    materials: toList(data.get("materials") || "Premium fabric, Pocket spring"),
    description: data.get("description").trim() || "ລາຍລະອຽດສິນຄ້າ Kinglike."
  };
}

function fillForm(product) {
  els.form.elements.id.value = product.id;
  els.form.elements.name.value = product.name || "";
  els.form.elements.sku.value = product.sku || "";
  els.form.elements.badge.value = product.badge || "";
  els.form.elements.category.value = product.category || "Hybrid";
  els.form.elements.firmness.value = product.firmness || "ນຸ່ມ";
  els.form.elements.thickness.value = product.thickness || "";
  els.form.elements.sizes.value = product.sizes?.join(", ") || "";
  els.form.elements.price.value = product.price || "";
  els.form.elements.salePrice.value = product.salePrice || "";
  els.form.elements.rating.value = product.rating || "";
  els.form.elements.stock.value = product.stock || "";
  els.form.elements.warranty.value = product.warranty || "";
  els.form.elements.materials.value = product.materials?.join(", ") || "";
  els.form.elements.description.value = product.description || "";
  els.formTitle.textContent = "ແກ້ໄຂສິນຄ້າ";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearForm() {
  els.form.reset();
  els.form.elements.id.value = "";
  els.formTitle.textContent = "ເພີ່ມສິນຄ້າໃໝ່";
}

function loadPromoForm() {
  try {
    const promo = JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY)) || {};
    els.promoForm.elements.title.value = promo.title || "";
    els.promoForm.elements.text.value = promo.text || "";
    els.promoForm.elements.button.value = promo.button || "";
  } catch (error) {
    els.promoForm.reset();
  }
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const product = formToProduct();
  const index = products.findIndex((item) => item.id === product.id);
  if (index >= 0) products[index] = product;
  else products.unshift(product);
  saveProducts();
  renderProducts();
  clearForm();
  showToast("ບັນທຶກສິນຄ້າແລ້ວ");
});

els.list.addEventListener("click", (event) => {
  const editId = event.target.closest("[data-edit-product]")?.dataset.editProduct;
  const deleteId = event.target.closest("[data-delete-product]")?.dataset.deleteProduct;

  if (editId) {
    const product = products.find((item) => item.id === editId);
    if (product) fillForm(product);
  }

  if (deleteId) {
    products = products.filter((item) => item.id !== deleteId);
    saveProducts();
    renderProducts();
    showToast("ລຶບສິນຄ້າແລ້ວ");
  }
});

els.clearForm.addEventListener("click", clearForm);

els.resetDemo.addEventListener("click", () => {
  products = [...defaultProducts];
  saveProducts();
  renderProducts();
  clearForm();
  showToast("Reset demo ແລ້ວ");
});

els.promoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(els.promoForm);
  localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify({
    title: data.get("title").trim(),
    text: data.get("text").trim(),
    button: data.get("button").trim()
  }));
  showToast("ບັນທຶກໂປຣໂມຊັນແລ້ວ");
});

renderProducts();
loadPromoForm();
