const CART_STORAGE_KEY = "kinglikeCart";
const PRODUCT_STORAGE_KEY = "kinglikeProducts";
const STORE_URLS = ["/api/store", new URL("data/store.json", window.location.href).toString()];
const ORDER_URL = "/api/orders";
const MAX_SLIP_SIZE = 5 * 1024 * 1024;
const ALLOWED_SLIPS = ["image/jpeg", "image/png", "application/pdf"];

const money = new Intl.NumberFormat("lo-LA").format;
const els = {
  form: document.querySelector("[data-checkout-form]"),
  items: document.querySelector("[data-checkout-items]"),
  totals: document.querySelectorAll("[data-checkout-total]"),
  message: document.querySelector("[data-checkout-message]")
};

let products = [];
let cart = loadCart();

function formatKip(value) {
  return `${money(Number(value || 0))} ₭`;
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function localProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

async function loadProducts() {
  const local = localProducts();
  if (local.length) return local;
  for (const url of STORE_URLS) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) continue;
      const store = await response.json();
      if (Array.isArray(store.products) && store.products.length) return store.products;
    } catch (error) {
      // Try the next source.
    }
  }
  return [];
}

function checkoutItems() {
  return cart
    .map((line) => {
      const product = products.find((item) => item.id === line.id);
      if (!product) return null;
      const quantity = Math.max(1, Number(line.qty || 1));
      const size = line.size || (Array.isArray(product.sizes) ? product.sizes[0] || "" : "");
      const unitPrice = Number(line.unitPrice || product.sizePrices?.[size] || product.salePrice || 0);
      return {
        productId: product.id,
        productName: product.name,
        size,
        quantity,
        unitPrice,
        subtotal: quantity * unitPrice
      };
    })
    .filter(Boolean);
}

function renderSummary() {
  const items = checkoutItems();
  els.items.innerHTML = items.length
    ? items.map((item) => `
      <div class="checkout-line">
        <div>
          <strong>${item.productName}</strong>
          <span>${item.size || "ມາດຕະຖານ"} x ${item.quantity}</span>
        </div>
        <b>${formatKip(item.subtotal)}</b>
      </div>
    `).join("")
    : `<p class="meta">ຍັງບໍ່ມີສິນຄ້າໃນລົດເຂັນ. ກັບໄປເລືອກສິນຄ້າກ່ອນ.</p>`;
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  els.totals.forEach((target) => {
    target.textContent = formatKip(total);
  });
}

function showMessage(text, isError = true) {
  els.message.textContent = text;
  els.message.classList.toggle("is-error", isError);
  if (isError) window.dispatchEvent(new Event("kinglike:error"));
}

function readSlip(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("ກະລຸນາອັບໂຫຼດສະລິບ"));
      return;
    }
    if (!ALLOWED_SLIPS.includes(file.type)) {
      reject(new Error("ສະລິບຕ້ອງເປັນ JPG, PNG ຫຼື PDF"));
      return;
    }
    if (file.size > MAX_SLIP_SIZE) {
      reject(new Error("ສະລິບຕ້ອງບໍ່ເກີນ 5MB"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("ອ່ານໄຟລ໌ສະລິບບໍ່ສຳເລັດ"));
    reader.onload = () => resolve({
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: reader.result
    });
    reader.readAsDataURL(file);
  });
}

async function submitOrder(event) {
  event.preventDefault();
  const items = checkoutItems();
  if (!items.length) {
    showMessage("ກະລຸນາເພີ່ມສິນຄ້າກ່ອນສັ່ງຊື້");
    return;
  }
  const formData = new FormData(els.form);
  try {
    showMessage("ກຳລັງສົ່ງອອເດີ...", false);
    const slip = await readSlip(formData.get("slip"));
    const payload = {
      customerName: formData.get("customerName").trim(),
      customerPhone: formData.get("customerPhone").trim(),
      customerWhatsapp: formData.get("customerPhone").trim(),
      customerAddress: formData.get("customerAddress").trim(),
      note: formData.get("note").trim(),
      items,
      slip
    };
    const response = await fetch(ORDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(await response.text());
    const order = await response.json();
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("kinglike:success"));
    setTimeout(() => {
      window.location.href = `order.html?code=${encodeURIComponent(order.orderCode)}`;
    }, 320);
  } catch (error) {
    showMessage(error.message || "ສົ່ງອອເດີບໍ່ສຳເລັດ. ກະລຸນາເປີດຜ່ານ http://127.0.0.1:4173/");
  }
}

els.form.addEventListener("submit", submitOrder);

loadProducts().then((loaded) => {
  products = loaded;
  renderSummary();
});
