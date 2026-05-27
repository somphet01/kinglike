const els = {
  form: document.querySelector("[data-tracking-form]"),
  result: document.querySelector("[data-order-status]")
};
const money = new Intl.NumberFormat("lo-LA").format;

const statusLabels = {
  checking: "ກຳລັງກວດສອບສະລິບ",
  paid: "ຊຳລະເງິນແລ້ວ",
  rejected: "ສະລິບຖືກປະຕິເສດ",
  shipping: "ກຳລັງຈັດສົ່ງ",
  completed: "ສຳເລັດ",
  cancelled: "ຍົກເລີກ"
};

function formatKip(value) {
  return `${money(Number(value || 0))} ₭`;
}

function renderOrder(data) {
  const order = data.order;
  els.result.innerHTML = `
    <article class="order-status-card">
      <div class="order-status-head">
        <div>
          <p class="eyebrow">ORDER ID</p>
          <h2>${order.orderCode}</h2>
        </div>
        <span class="status-pill status-${order.status}">${statusLabels[order.status] || order.status}</span>
      </div>
      <p>ແອດມິນຈະກວດສອບການຊຳລະເງິນແລະຕິດຕໍ່ກັບທາງ WhatsApp.</p>
      <div class="checkout-total-row"><span>ຍອດລວມ</span><strong>${formatKip(order.totalAmount)}</strong></div>
      <div class="checkout-items">
        ${order.items.map((item) => `
          <div class="checkout-line">
            <div><strong>${item.productName}</strong><span>${item.size || "ມາດຕະຖານ"} x ${item.quantity}</span></div>
            <b>${formatKip(item.subtotal)}</b>
          </div>
        `).join("")}
      </div>
      ${order.adminNote ? `<p class="admin-note">ໝາຍເຫດ Admin: ${order.adminNote}</p>` : ""}
    </article>
  `;
  window.dispatchEvent(new Event("kinglike:success"));
}

async function loadOrder(code) {
  if (!code) return;
  els.form.elements.code.value = code;
  els.result.innerHTML = `<p class="meta">ກຳລັງຄົ້ນຫາອອເດີ...</p>`;
  try {
    const response = await fetch(`/api/orders/${encodeURIComponent(code)}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Order not found");
    renderOrder(await response.json());
  } catch (error) {
    els.result.innerHTML = `<p class="checkout-alert is-error">ບໍ່ພົບອອເດີນີ້ ຫຼືຕ້ອງເປີດຜ່ານ local server.</p>`;
    window.dispatchEvent(new Event("kinglike:error"));
  }
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  loadOrder(els.form.elements.code.value.trim());
});

loadOrder(new URLSearchParams(window.location.search).get("code") || "");
