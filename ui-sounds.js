(() => {
  const Sound = {
    ctx: null,
    lastClickAt: 0
  };

  function context() {
    if (!window.AudioContext && !window.webkitAudioContext) return null;
    if (!Sound.ctx) Sound.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (Sound.ctx.state === "suspended") Sound.ctx.resume();
    return Sound.ctx;
  }

  function tone(frequency, start, duration, gain = 0.045, type = "sine") {
    const ctx = context();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + start);
    amp.gain.setValueAtTime(0.0001, ctx.currentTime + start);
    amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.012);
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
    osc.connect(amp).connect(ctx.destination);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + duration + 0.02);
  }

  function click() {
    const now = Date.now();
    if (now - Sound.lastClickAt < 55) return;
    Sound.lastClickAt = now;
    tone(520, 0, 0.045, 0.025, "triangle");
    tone(760, 0.028, 0.05, 0.018, "triangle");
  }

  function success() {
    tone(540, 0, 0.085, 0.04);
    tone(720, 0.085, 0.095, 0.045);
    tone(940, 0.18, 0.14, 0.038);
  }

  function error() {
    tone(220, 0, 0.11, 0.05, "sawtooth");
    tone(170, 0.12, 0.16, 0.04, "sawtooth");
  }

  window.kinglikeSound = { click, success, error };

  window.addEventListener("kinglike:success", success);
  window.addEventListener("kinglike:error", error);

  const seenText = new WeakMap();
  const messageSelector = "[data-chat-error], [data-admin-message], .admin-message";
  const observer = new MutationObserver(() => {
    document.querySelectorAll(messageSelector).forEach((node) => {
      const text = (node.textContent || "").trim();
      if (!text || seenText.get(node) === text) return;
      seenText.set(node, text);
      const isError = node.classList.contains("is-error") || /not found|error|failed|reject|ບໍ່|ຜິດ|ປະຕິເສດ/i.test(text);
      (isError ? error : success)();
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
})();
