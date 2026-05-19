const money = new Intl.NumberFormat("lo-LA").format;
const statusLabels = {
  draft: "Draft",
  checking: "Checking",
  paid: "Paid",
  rejected: "Rejected",
  shipping: "Shipping",
  completed: "Completed",
  cancelled: "Cancelled"
};

const els = {
  list: document.querySelector("[data-orders-list]"),
  detail: document.querySelector("[data-order-detail]"),
  search: document.querySelector("[data-order-search]"),
  filter: document.querySelector("[data-order-filter]"),
  count: document.querySelector("[data-order-count]"),
  checkingCount: document.querySelector("[data-checking-count]"),
  toast: document.querySelector("[data-toast]")
};

let orders = [];
let logs = [];
let selectedId = "";

function formatKip(value) {
  return `${money(Number(value || 0))} ₭`;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
}

async function loadOrders() {
  try {
    const response = await fetch("/api/orders", { cache: "no-store" });
    if (!response.ok) throw new Error("Orders unavailable");
    const data = await response.json();
    orders = data.orders || [];
    logs = data.logs || [];
    if (!selectedId && orders[0]) selectedId = orders[0].id;
    renderOrders();
    renderDetail();
  } catch (error) {
    els.list.innerHTML = `<p class="checkout-alert is-error">ໂຫຼດອອເດີບໍ່ໄດ້. ກະລຸນາເປີດຜ່ານ http://127.0.0.1:4173/</p>`;
  }
}

function filteredOrders() {
  const term = els.search.value.trim().toLowerCase();
  const status = els.filter.value;
  return orders.filter((order) => {
    const matchesStatus = !status || order.status === status;
    const matchesTerm = !term || `${order.orderCode} ${order.customerPhone} ${order.customerName}`.toLowerCase().includes(term);
    return matchesStatus && matchesTerm;
  });
}

function renderOrders() {
  const list = filteredOrders();
  els.count.textContent = orders.length;
  els.checkingCount.textContent = orders.filter((order) => order.status === "draft" || order.status === "checking").length;
  els.list.innerHTML = list.length ? list.map((order) => `
    <button class="order-row ${order.id === selectedId ? "is-active" : ""}" type="button" data-select-order="${order.id}">
      <span>
        <strong>${order.orderCode}</strong>
        <small>${order.customerName} • ${order.customerPhone}</small>
      </span>
      <b>${formatKip(order.totalAmount)}</b>
      <em class="status-pill status-${order.status}">${statusLabels[order.status] || order.status}</em>
    </button>
  `).join("") : `<p class="meta">ບໍ່ພົບອອເດີ</p>`;
}

function renderDetail() {
  const order = orders.find((item) => item.id === selectedId);
  if (!order) {
    els.detail.innerHTML = `<p class="meta">ເລືອກອອເດີເພື່ອເບິ່ງລາຍລະອຽດ</p>`;
    return;
  }
  const orderLogs = logs.filter((log) => log.orderId === order.id);
  const isPdf = order.slip?.type === "application/pdf";
  const chatUrl = order.contactChannel === "messenger"
    ? "https://m.me/kinglike"
    : `https://wa.me/8562059379231?text=${encodeURIComponent(order.chatMessage || "")}`;
  els.detail.innerHTML = `
    <div class="order-detail-head">
      <div>
        <p class="eyebrow">ORDER DETAIL</p>
        <h2>${order.orderCode}</h2>
      </div>
      <span class="status-pill status-${order.status}">${statusLabels[order.status] || order.status}</span>
    </div>
    <div class="order-customer">
      <p><strong>ລູກຄ້າ:</strong> ${order.customerName}</p>
      <p><strong>Phone:</strong> ${order.customerWhatsapp || order.customerPhone}</p>
      <p><strong>Channel:</strong> ${order.contactChannel || "whatsapp"}</p>
      ${order.customerAddress ? `<p><strong>ທີ່ຢູ່:</strong> ${order.customerAddress}</p>` : ""}
      ${order.note ? `<p><strong>Note:</strong> ${order.note}</p>` : ""}
    </div>
    <div class="checkout-items">
      ${order.items.map((item) => `
        <div class="checkout-line">
          <div><strong>${item.productName}</strong><span>${item.size || "ມາດຕະຖານ"} x ${item.quantity}</span></div>
          <b>${formatKip(item.subtotal)}</b>
        </div>
      `).join("")}
    </div>
    <div class="checkout-total-row"><span>ຍອດຊຳລະ</span><strong>${formatKip(order.totalAmount)}</strong></div>
    ${order.slip ? `<div class="slip-preview">
      ${isPdf ? `<a class="secondary-btn" href="${order.slip.dataUrl}" target="_blank" rel="noreferrer">Open PDF slip</a>` : `<img src="${order.slip?.dataUrl || ""}" alt="Payment slip" />`}
    </div>` : `<div class="chat-draft-box"><strong>Chat message</strong><pre>${order.chatMessage || "-"}</pre><a class="primary-btn" href="${chatUrl}" target="_blank" rel="noreferrer">ติดต่อเร็ว</a></div>`}
    <label class="admin-note-field">
      Admin note / Reject reason
      <textarea data-admin-note rows="3">${order.adminNote || ""}</textarea>
    </label>
    <div class="status-actions">
      <button type="button" data-status="paid">Approve / Paid</button>
      <button type="button" data-status="rejected">Reject</button>
      <button type="button" data-status="shipping">Shipping</button>
      <button type="button" data-status="completed">Completed</button>
      <button type="button" data-status="cancelled">Cancelled</button>
    </div>
    <div class="status-log">
      <h3>Status log</h3>
      ${orderLogs.map((log) => `<p>${log.oldStatus || "-"} → ${log.newStatus} <small>${new Date(log.createdAt).toLocaleString()}</small></p>`).join("")}
    </div>
  `;
}

async function updateStatus(status) {
  const note = els.detail.querySelector("[data-admin-note]")?.value || "";
  const response = await fetch(`/api/orders/${encodeURIComponent(selectedId)}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, adminNote: note })
  });
  if (!response.ok) {
    showToast(await response.text());
    return;
  }
  showToast("Updated order status");
  await loadOrders();
}

els.search.addEventListener("input", renderOrders);
els.filter.addEventListener("change", renderOrders);
els.list.addEventListener("click", (event) => {
  const id = event.target.closest("[data-select-order]")?.dataset.selectOrder;
  if (!id) return;
  selectedId = id;
  renderOrders();
  renderDetail();
});
els.detail.addEventListener("click", (event) => {
  const status = event.target.closest("[data-status]")?.dataset.status;
  if (status) updateStatus(status);
});

loadOrders();
