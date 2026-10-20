// Replace with the T+0 inbox before going live.
const CONTACT_EMAIL = "hello@tplus0.example";

/* ---------- Mobile nav ---------- */
(() => {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "CLOSE" : "MENU";
  });
})();

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
document.querySelectorAll("[data-email]").forEach((el) => {
  el.textContent = CONTACT_EMAIL;
  if (el.tagName === "A") el.href = "mailto:" + CONTACT_EMAIL;
});

/* ---------- Architecture infographic ---------- */
// Isometric exploded stack: bank systems on top, T+0 in between, digital markets below,
// blockchain as the foundation. Coins (cash leg) fall, tokens (asset leg) rise, blocks settle on-chain.
const LAYERS = [
  { id: "bank", name: "Bank & institutional systems", tag: "YOUR ESTATE · KEEPS RUNNING", color: "var(--bank)",
    items: ["Core banking & ledger", "Payments · ISO 20022", "Treasury & liquidity", "Custody & fund admin", "Risk, KYC & AML", "Regulatory reporting"] },
  { id: "t0", name: "T+0 orchestration", tag: "MAPS ELEMENTS & SERVICES ACROSS BOTH WORLDS", color: "var(--gold-bright)",
    items: ["Tokenization strategy", "Regulatory design", "Architecture & platform", "Systems integration", "Delivery to production", "Managed operations"] },
  { id: "dig", name: "Digital asset markets", tag: "THE NEW FINANCIAL WORLD", color: "var(--digital)",
    items: ["Tokenized funds & MMFs", "Treasuries & bonds", "Private credit & RWAs", "Stablecoins & deposit tokens", "Tokenized collateral", "Digital venues & custody"] },
  { id: "chain", name: "Blockchain infrastructure", tag: "SETTLEMENT FOUNDATION", color: "var(--chain)",
    items: ["Public chains & L2s", "Permissioned networks", "ERC-3643 · ERC-20", "Smart contracts · DvP", "On-chain identity", "MPC wallets · oracles"] },
];

(() => {
  const host = document.getElementById("isoArch");
  if (!host) return;

  const CX = 340, A = 230, B = 115, T = 16, GAP = 190, TOP = 140;
  const cys = LAYERS.map((_, i) => TOP + i * GAP);
  const pts = (arr) => arr.map((p) => p.join(",")).join(" ");
  // (u, v) in [0,1] on a slab's top face -> screen point
  const P = (cy, u, v, lift = 0) => [CX + (u - v) * A, cy - B + (u + v) * B - lift];

  function slab(cy) {
    const top = [[CX, cy - B], [CX + A, cy], [CX, cy + B], [CX - A, cy]];
    const left = [[CX - A, cy], [CX, cy + B], [CX, cy + B + T], [CX - A, cy + T]];
    const right = [[CX, cy + B], [CX + A, cy], [CX + A, cy + T], [CX, cy + B + T]];
    let grid = "";
    for (const k of [0.25, 0.5, 0.75]) {
      grid += `<line class="f-grid" x1="${P(cy, k, 0)[0]}" y1="${P(cy, k, 0)[1]}" x2="${P(cy, k, 1)[0]}" y2="${P(cy, k, 1)[1]}"/>`;
      grid += `<line class="f-grid" x1="${P(cy, 0, k)[0]}" y1="${P(cy, 0, k)[1]}" x2="${P(cy, 1, k)[0]}" y2="${P(cy, 1, k)[1]}"/>`;
    }
    return `<polygon class="f-left" points="${pts(left)}"/><polygon class="f-right" points="${pts(right)}"/><polygon class="f-top" points="${pts(top)}"/>${grid}`;
  }

  function cube(cy, u, v, s, h, cls = "") {
    const b = [P(cy, u, v), P(cy, u + s, v), P(cy, u + s, v + s), P(cy, u, v + s)];
    const up = b.map(([x, y]) => [x, y - h]);
    const fl = [b[3], b[2], up[2], up[3]];
    const fr = [b[1], b[2], up[2], up[1]];
    return `<g class="cube ${cls}"><polygon class="c-l" points="${pts(fl)}"/><polygon class="c-r" points="${pts(fr)}"/><polygon class="c-t" points="${pts(up)}"/></g>`;
  }

  function coinStack(cy, u, v, n) {
    const [x, y] = P(cy, u, v);
    let s = "";
    for (let i = 0; i < n; i++) {
      const yy = y - i * 6;
      s += `<path class="stk-side" d="M${x - 15},${yy} v-6 a15,7 0 0 0 30,0 v6 a15,7 0 0 1 -30,0z"/>`;
    }
    s += `<ellipse class="stk-top" cx="${x}" cy="${y - n * 6}" rx="15" ry="7"/>`;
    return s;
  }

  const deco = {
    bank: (cy) =>
      [[0.12, 0.14, 0.17, 54], [0.42, 0.1, 0.15, 38], [0.1, 0.44, 0.15, 32], [0.5, 0.4, 0.12, 22], [0.68, 0.12, 0.12, 28]]
        .sort((p, q) => p[0] + p[1] - (q[0] + q[1]))
        .map(([u, v, s, h]) => cube(cy, u, v, s, h)).join(""),
    t0: (cy) => {
      const [x, y] = P(cy, 0.5, 0.5);
      const l = P(cy, 0.348, 0.826), r = P(cy, 0.826, 0.348);
      return `<line class="t0-link" x1="${x}" y1="${y}" x2="${l[0]}" y2="${l[1]}"/><line class="t0-link" x1="${x}" y1="${y}" x2="${r[0]}" y2="${r[1]}"/>
        <ellipse class="t0-ring" cx="${x}" cy="${y}" rx="64" ry="32"><animate attributeName="rx" values="54;74;54" dur="2.4s" repeatCount="indefinite"/><animate attributeName="ry" values="27;37;27" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;.25;.9" dur="2.4s" repeatCount="indefinite"/></ellipse>
        <ellipse class="t0-core" cx="${x}" cy="${y}" rx="44" ry="22"/>
        <text class="t0-mark" transform="matrix(1 0.5 -1 0.5 ${x} ${y})" text-anchor="middle" dy="7">T+0</text>`;
    },
    dig: (cy) => coinStack(cy, 0.16, 0.6, 3) + coinStack(cy, 0.62, 0.16, 4) + coinStack(cy, 0.95, 0.7, 2),
    chain: (cy) => {
      const us = [0.06, 0.24, 0.42, 0.6, 0.78];
      let links = "";
      for (let i = 0; i < us.length - 1; i++) {
        const a = P(cy, us[i] + 0.12, 0.78, 8), b = P(cy, us[i + 1], 0.78, 8);
        links += `<line class="chain-link" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}"/>`;
      }
      const cubes = us.map((u, i) => {
        const top = [P(cy, u, 0.72, 16), P(cy, u + 0.12, 0.72, 16), P(cy, u + 0.12, 0.84, 16), P(cy, u, 0.84, 16)];
        return cube(cy, u, 0.72, 0.12, 16, "blk") +
          `<polygon class="blk-glow" points="${pts(top)}" opacity="0"><animate attributeName="opacity" values="0;1;0" dur="2.5s" begin="${(i * 0.3).toFixed(1)}s" repeatCount="indefinite"/></polygon>`;
      }).join("");
      return links + cubes;
    },
  };

  function callout(L, cy) {
    const x0 = 680;
    const items = L.items.map((t, i) => {
      const x = x0 + (i % 2) * 262, y = cy - 4 + Math.floor(i / 2) * 24;
      return `<rect class="co-dot" x="${x}" y="${y - 7}" width="6" height="6"/><text class="co-item" x="${x + 14}" y="${y}">${t}</text>`;
    }).join("");
    return `<g class="co">
      <line class="co-lead" x1="${CX + A + 6}" y1="${cy}" x2="${x0 - 16}" y2="${cy}"/>
      <circle class="co-end" cx="${CX + A + 6}" cy="${cy}" r="3"/>
      <rect class="co-bar" x="${x0 - 16}" y="${cy - 74}" width="3" height="136"/>
      <text class="co-name" x="${x0}" y="${cy - 46}">${L.name}</text>
      <text class="co-tag" x="${x0}" y="${cy - 24}">${L.tag}</text>
      ${items}</g>`;
  }

  // Layers drawn bottom-up so upper slabs sit in front of lower ones.
  const layersSvg = LAYERS.map((L, i) => ({ L, cy: cys[i] })).reverse().map(({ L, cy }) =>
    `<g class="iso-layer" data-layer="${L.id}" style="--lc:${L.color}">${slab(cy)}${deco[L.id](cy)}${callout(L, cy)}</g>`
  ).join("");

  // Flows
  const [yBank, yT0, yDig, yChain] = cys.map((c) => c + 20);
  const xCash = CX - 110, xAsset = CX + 110;
  const port = (x, y) => `<ellipse class="port" cx="${x}" cy="${y}" rx="11" ry="5.5"/>`;
  const pipe = (x, y1, y2, cls) => `<line class="pipe-bed ${cls}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/><line class="pipe ${cls}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}"/>`;
  const fade = (dur, begin) => `<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.88;1" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>`;
  const mover = (shape, path, dur, n) =>
    Array.from({ length: n }, (_, i) => {
      const begin = ((dur / n) * i).toFixed(2);
      return `<g opacity="0">${shape}<animateMotion path="${path}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>${fade(dur, begin)}</g>`;
    }).join("");

  const coin = `<circle class="coin" r="10"/><text class="coin-t" text-anchor="middle" dy="4">$</text>`;
  const token = `<polygon class="token" points="0,-11 10,0 0,11 -10,0"/><polygon class="token-in" points="0,-5 5,0 0,5 -5,0"/>`;
  const block = `<rect class="settle" x="-7" y="-7" width="14" height="14" transform="rotate(45) scale(1 1)"/>`;

  const flows = `
    ${pipe(xCash, yBank, yDig, "cash")}${pipe(xAsset, yDig, yBank, "asset")}${pipe(CX, yDig, yChain, "chainp")}
    ${[yBank, yT0, yDig].map((y) => port(xCash, y) + port(xAsset, y)).join("")}${port(CX, yDig)}${port(CX, yChain)}
    ${mover(coin, `M${xCash},${yBank} L${xCash},${yDig}`, 3.6, 4)}
    ${mover(token, `M${xAsset},${yDig} L${xAsset},${yBank}`, 3.6, 4)}
    ${mover(block, `M${CX},${yDig} L${CX},${yChain}`, 2.4, 3)}
    <g class="flow-lbl"><text x="${xCash - 18}" y="${(yBank + yT0) / 2 + 2}" text-anchor="end" class="fl-h">CASH LEG ↓</text>
      <text x="${xCash - 18}" y="${(yBank + yT0) / 2 + 18}" text-anchor="end" class="fl-s">stablecoins · deposit tokens</text></g>
    <g class="flow-lbl"><text x="${xAsset + 18}" y="${(yT0 + yDig) / 2 + 26}" class="fl-h a">ASSET LEG ↑</text>
      <text x="${xAsset + 18}" y="${(yT0 + yDig) / 2 + 42}" class="fl-s">tokenized fund units</text></g>`;

  const H = TOP + 3 * GAP + B + T + 30;
  host.innerHTML = `<svg class="iso" viewBox="0 0 1220 ${H}" role="img" aria-labelledby="isoTitle isoDesc">
    <title id="isoTitle">T+0 solution architecture</title>
    <desc id="isoDesc">Four stacked layers. Bank and institutional systems on top, T+0 orchestration in the middle, digital asset markets below, and blockchain infrastructure as the foundation. Cash flows down from the bank through T+0 into digital markets while tokenized assets flow back up, and both legs settle on-chain.</desc>
    ${layersSvg}${flows}</svg>`;

  const svg = host.querySelector("svg");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) svg.pauseAnimations();

  // Hover a layer (slab or callout) to focus it.
  svg.querySelectorAll(".iso-layer").forEach((g) => {
    g.addEventListener("mouseenter", () => { svg.classList.add("focus"); g.classList.add("hot"); });
    g.addEventListener("mouseleave", () => { svg.classList.remove("focus"); g.classList.remove("hot"); });
  });
})();

/* ---------- Contact form ---------- */
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const body = [
      `Name: ${d.get("name")}`,
      `Organisation: ${d.get("org")}`,
      `Role: ${d.get("role")}`,
      `Email: ${d.get("email")}`,
      `Interested in: ${d.get("topic")}`,
      "",
      d.get("message"),
    ].join("\n");
    const subject = `Discovery call request: ${d.get("org")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Your email app should open with the request filled in. If it doesn't, write to ${CONTACT_EMAIL}.`;
  });
})();
