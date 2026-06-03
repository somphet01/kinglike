const PROMO_STORAGE_KEY = "kinglikePromotion";
const STORE_DB_NAME = "kinglikeAdminStore";
const STORE_DB_VERSION = 1;
const STORE_OBJECT = "records";
const WHATSAPP_PHONE = "8562051777641";
const MESSENGER_URL = "https://www.messenger.com/t/Kinglikesikai";

const defaultPromotion = {
  badge: "HOT PROMOTION",
  title: "ໂປຣໂມຊັນພິເສດ Kinglike",
  text: "ເລືອກຊຸດທີ່ນອນພຣີມຽມ ພ້ອມຂອງແຖມ ແລະລາຄາພິເສດກ່ອນໝົດເວລາ.",
  button: "ເລືອກຊື້ສິນຄ້າ",
  link: "index.html#products",
  events: []
};

const els = {
  header: document.querySelector("[data-header]"),
  menu: document.querySelector("[data-mobile-menu]"),
  menuBackdrop: document.querySelector("[data-menu-backdrop]"),
  openMenu: document.querySelector("[data-open-menu]"),
  closeMenu: document.querySelector("[data-close-menu]"),
  hero: document.querySelector("[data-promotion-hero]"),
  badge: document.querySelector("[data-promotion-badge]"),
  title: document.querySelector("[data-promotion-title]"),
  text: document.querySelector("[data-promotion-text]"),
  button: document.querySelector("[data-promotion-button]"),
  art: document.querySelector("[data-promotion-art]"),
  countdown: document.querySelector("[data-promotion-countdown]"),
  endLabel: document.querySelector("[data-promotion-end-label]"),
  events: document.querySelector("[data-promotion-events]"),
  empty: document.querySelector("[data-promotion-empty]"),
  popup: document.querySelector("[data-promo-popup]"),
  popupContent: document.querySelector("[data-promo-popup-content]")
};

function initHeaderReveal() {
  if (!els.header) return;
  const idleDelay = 2000;
  let lastY = window.scrollY;
  let hideTimer = 0;
  const canHide = () => !els.menu?.classList.contains("is-open") && !els.header.matches(":focus-within");
  const showHeader = () => {
    els.header.classList.remove("is-header-hidden");
    window.clearTimeout(hideTimer);
    if (canHide()) hideTimer = window.setTimeout(() => {
      if (canHide()) els.header.classList.add("is-header-hidden");
    }, idleDelay);
  };
  const hideHeader = () => {
    window.clearTimeout(hideTimer);
    if (canHide()) els.header.classList.add("is-header-hidden");
  };
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const delta = currentY - lastY;
    els.header.classList.toggle("is-scrolled", currentY > 24);
    if (Math.abs(delta) >= 4) {
      if (delta < 0) showHeader();
      else if (currentY > 12) hideHeader();
      lastY = Math.max(0, currentY);
    }
  }, { passive: true });
  window.addEventListener("mousemove", (event) => {
    if (event.clientY <= 22) showHeader();
  }, { passive: true });
  window.addEventListener("touchstart", (event) => {
    if (event.touches?.[0]?.clientY <= 36) showHeader();
  }, { passive: true });
  els.header.addEventListener("focusin", showHeader);
  els.header.addEventListener("mouseenter", showHeader);
  showHeader();
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

const CP1252_BYTES = { "€": 0x80, "‚": 0x82, "ƒ": 0x83, "„": 0x84, "…": 0x85, "†": 0x86, "‡": 0x87, "ˆ": 0x88, "‰": 0x89, "Š": 0x8A, "‹": 0x8B, "Œ": 0x8C, "Ž": 0x8E, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97, "˜": 0x98, "™": 0x99, "š": 0x9A, "›": 0x9B, "œ": 0x9C, "ž": 0x9E, "Ÿ": 0x9F };
const MOJIBAKE_RUN = /[\u0080-\u009F\u00A0-\u00FF\u0192\u20AC\u201A-\u201E\u2020-\u2026\u02C6\u2030\u0160\u2039\u0152\u017D\u2018-\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178]+/g;

function repairText(value) {
  if (typeof value !== "string" || !/[àâÃðÂ\u0080-\u009F\u0192]/.test(value)) return value;
  return value.replace(MOJIBAKE_RUN, (part) => {
    if (!/[àâÃðÂ\u0080-\u009F\u0192]/.test(part)) return part;
    const bytes = [];
    for (const char of part) {
      const code = char.charCodeAt(0);
      if (CP1252_BYTES[char] !== undefined) bytes.push(CP1252_BYTES[char]);
      else if (code <= 255) bytes.push(code);
      else return part;
    }
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    } catch {
      return part;
    }
  });
}

function repairStoredData(value) {
  if (Array.isArray(value)) return value.map(repairStoredData);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, repairStoredData(item)]));
  return repairText(value);
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(STORE_DB_NAME, STORE_DB_VERSION);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_OBJECT);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(key) {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_OBJECT, "readonly");
    const request = tx.objectStore(STORE_OBJECT).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function loadPromotion() {
  const sources = [];
  try {
    sources.push(JSON.parse(localStorage.getItem(PROMO_STORAGE_KEY) || "null"));
  } catch {
    sources.push(null);
  }
  sources.push(await idbGet(PROMO_STORAGE_KEY));
  const apiStore = await fetchJson("/api/store");
  sources.push(apiStore?.promotion || null);
  const fileStore = await fetchJson("data/store.json");
  sources.push(fileStore?.promotion || null);

  const promo = repairStoredData(sources.find((item) => item && typeof item === "object") || {});
  const defaults = repairStoredData(defaultPromotion);
  return {
    ...defaults,
    ...promo,
    events: Array.isArray(promo.events) ? promo.events : []
  };
}

function getPromoEnd(item) {
  const value = item?.endsAt || item?.endAt || item?.deadline;
  if (value) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime()) && date.getTime() > Date.now()) return date.toISOString();
  }
  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 3);
  fallback.setHours(23, 59, 59, 0);
  return fallback.toISOString();
}

function countdownParts(endsAt) {
  const end = new Date(endsAt);
  if (Number.isNaN(end.getTime())) return null;
  const diff = Math.max(0, end.getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

function countdownMarkup(item, large = false) {
  const end = getPromoEnd(item);
  return `
    <div class="promo-countdown ${large ? "promo-countdown-large" : ""}" data-promo-countdown="${end}">
      <b data-count-days>0</b><small>ມື້</small>
      <b data-count-hours>00</b><small>ຊົ່ວໂມງ</small>
      <b data-count-minutes>00</b><small>ນາທີ</small>
      <b data-count-seconds>00</b><small>ວິ</small>
    </div>
  `;
}

function updateCountdowns() {
  document.querySelectorAll("[data-promo-countdown]").forEach((node) => {
    const parts = countdownParts(node.dataset.promoCountdown);
    if (!parts) return;
    node.querySelector("[data-count-days]").textContent = String(parts.days);
    node.querySelector("[data-count-hours]").textContent = String(parts.hours).padStart(2, "0");
    node.querySelector("[data-count-minutes]").textContent = String(parts.minutes).padStart(2, "0");
    node.querySelector("[data-count-seconds]").textContent = String(parts.seconds).padStart(2, "0");
  });
}

function endLabel(item) {
  const date = new Date(getPromoEnd(item));
  return `ໝົດເວລາ: ${date.toLocaleDateString("lo-LA", { day: "2-digit", month: "long", year: "numeric" })} ${date.toLocaleTimeString("lo-LA", { hour: "2-digit", minute: "2-digit" })}`;
}

function renderHero(promotion, lead) {
  const item = lead || {
    badge: promotion.badge || "HOT PROMOTION",
    title: promotion.title,
    text: promotion.text,
    button: promotion.button,
    link: promotion.link || "index.html#products",
    image: promotion.coverImage || ""
  };
  els.badge.textContent = item.badge || "HOT PROMOTION";
  els.title.textContent = item.title || defaultPromotion.title;
  els.text.textContent = item.text || defaultPromotion.text;
  els.button.textContent = item.button || defaultPromotion.button;
  els.button.href = item.link || "index.html#products";
  els.endLabel.textContent = endLabel(item);
  els.countdown.dataset.promoCountdown = getPromoEnd(item);
  if (item.image) {
    els.art.innerHTML = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />`;
    els.hero.classList.add("has-promotion-image");
  }
}

function renderEvents(events) {
  els.empty.hidden = events.length > 0;
  els.events.innerHTML = events.map((item) => `
    <article class="promotion-special-card ${item.image ? "has-image" : ""}">
      <div class="promotion-special-media">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />` : `<span>${escapeHtml(item.badge || "SALE")}</span>`}
      </div>
      <div class="promotion-special-copy">
        <span>${escapeHtml(item.badge || "PROMOTION")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        ${item.text ? `<p>${escapeHtml(item.text)}</p>` : ""}
        ${countdownMarkup(item)}
        <small>${escapeHtml(item.date || endLabel(item))}</small>
        <a class="primary-btn" href="${escapeHtml(item.link || "index.html#products")}">${escapeHtml(item.button || "ເລືອກຊື້ສິນຄ້າ")}</a>
      </div>
    </article>
  `).join("");
}

function showPopup(item) {
  if (!els.popup || !els.popupContent || !item) return;
  els.popupContent.innerHTML = `
    <div class="promo-popup-simple">
      <div class="promo-popup-art ${item.image ? "has-image" : ""}">
        ${item.image ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" />` : `<span>${escapeHtml(item.badge || "PROMOTION")}</span>`}
      </div>
      <div class="promo-popup-bottom">
        ${countdownMarkup(item)}
        <a class="primary-btn" href="promotion.html" data-close-promo-popup>ເບິ່ງໂປຣໂມຊັນ</a>
      </div>
    </div>
  `;
  setTimeout(() => {
    els.popup.classList.add("is-open");
    els.popup.setAttribute("aria-hidden", "false");
    updateCountdowns();
  }, 600);
}

function closePopup() {
  els.popup?.classList.remove("is-open");
  els.popup?.setAttribute("aria-hidden", "true");
}

function bindUi() {
  const closeMenu = () => {
    els.menu?.classList.remove("is-open");
    els.menuBackdrop?.classList.remove("is-open");
  };
  els.openMenu?.addEventListener("click", () => {
    els.menu?.classList.add("is-open");
    els.menuBackdrop?.classList.add("is-open");
  });
  els.closeMenu?.addEventListener("click", closeMenu);
  els.menuBackdrop?.addEventListener("click", closeMenu);
  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-promo-popup]") || event.target === els.popup) closePopup();
    const lineTarget = event.target.closest("[data-line-contact]");
    if (lineTarget) {
      const channel = lineTarget.dataset.lineChannel;
      const message = "ສະບາຍດີ ສົນໃຈໂປຣໂມຊັນ Kinglike";
      const url = channel === "messenger" ? MESSENGER_URL : `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener");
    }
  });
}

async function init() {
  bindUi();
  initHeaderReveal();
  const promotion = await loadPromotion();
  const events = promotion.events.filter((item) => item && item.active !== false && item.title);
  const lead = events[0] || null;
  renderHero(promotion, lead);
  renderEvents(events);
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

init();
