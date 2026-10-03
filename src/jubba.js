import LAYOUT from "./jubba-layout.json";

const STYLES = [
  { name: "Saudi", id: 7, img: "saudi.png" },
  { name: "Kowaity", id: 5, img: "kowaity.png" },
  { name: "Qutari", id: 8, img: "qutari.png" },
  { name: "Emaraty", id: 4, img: "emaraty.png" },
  { name: "Noom", id: 6, img: "noom.png" },
  { name: "Saideria", id: 3, img: "saideria.png" },
  { name: "Dagla", id: 2, img: "dagla.png" },
  { name: "Code", id: 1, img: "code.png" },
];

const FOLDERS = {
  Colar: [
    { sub: "Gallab", files: ["s_n2.png", "s_n4.png", "s_n5.png"] },
    {
      sub: "Ragba",
      files: ["s_10.png", "s_11.png", "s_12.png", "s_14.png", "s_15.png", "s_4.png", "s_5.png", "s_7.png", "s_8.png", "s_9.png"],
    },
  ],
  POCKET: [{ sub: "_", files: ["s_2.png", "s_4.png", "s_5.png", "s_6.png", "s_7.png", "s_8.png", "s_n8.png"] }],
  YAT: [
    {
      sub: "_",
      files: ["s_10.png", "s_11.png", "s_12.png", "s_13.png", "s_16.png", "s_17.png", "s_19.png", "s_22.png", "s_4.png", "s_5.png", "s_6.png", "s_7.png", "s_8.png", "s_9.png"],
    },
  ],
  ZIPER: [{ sub: "_", files: ["s_1.png", "s_2.png", "s_3.png", "s_4.png", "s_5.png", "s_6.png", "s_7 (2).png", "s_8.png"] }],
};

const SCALE = { 1: 1.35, 2: 0.95, 3: 1.35, 4: 0.95, 5: 0.95, 6: 0.95, 7: 0.95, 8: 0.95 };

const FOLDER_DEFAULTS = {
  Colar: { x: 50, y: 8, width: 18, height: 30 },
  POCKET: { x: 78, y: 45, width: 14, height: 20 },
  YAT: { x: 22, y: 42, width: 12, height: 18 },
  ZIPER: { x: 50, y: 55, width: 8, height: 25 },
};

let style = "Saudi";
let selected = {};
let openFolder = null;

let strip;
let stage;
let garmentBoxEl;
let garmentImg;
let ghost;
let rail;
let picker;
let pickerTitle;
let pickerBody;
let styleLabel;

const num = (v, d) => {
  const n = parseFloat(v);
  return isNaN(n) ? d : n;
};

const styleData = (name) => STYLES.find((s) => s.name === name) || STYLES[0];

// Garment front layout from blueprint
function getGarmentLayout(sName) {
  const g = (LAYOUT.styles[sName] && LAYOUT.styles[sName].garments && LAYOUT.styles[sName].garments.front) || { x: 76.6, y: 55.9, width: 45, height: 100 };
  const baseX = parseFloat(g.x);
  return {
    x: 100 - (isNaN(baseX) ? 76.6 : baseX),
    y: num(g.y, 55.9),
    width: num(g.width, 45),
    height: num(g.height, 100),
  };
}

// Exact frontShift formula from blueprint-standalone: 2 * x - 100
function frontShift(sName) {
  const g = LAYOUT.styles[sName] && LAYOUT.styles[sName].garments && LAYOUT.styles[sName].garments.front;
  const x = parseFloat(g && g.x);
  if (isNaN(x)) return 45;
  return 2 * x - 100;
}

function shiftX(x, shift) {
  if (!shift) return x;
  let nx = parseFloat(x) - shift;
  if (nx < 4) nx += 100;
  if (nx > 96) nx = 96;
  return nx;
}

// Exact getOverlayPosition from blueprint-standalone
function getOverlayPosition(key, data, sName) {
  const folder = key.includes("/") ? key.split("/")[0] : key;
  let pos = null;
  const cat = LAYOUT.styles[sName] && LAYOUT.styles[sName].categories && LAYOUT.styles[sName].categories[folder];
  if (cat) {
    const g = cat.global || { x: 50, y: 50, width: 15, height: 25, zIndex: 20, rotate: 0 };
    let offset = (cat.items && cat.items[key]) || {};
    if (Object.keys(offset).length === 0 && cat.items) {
      const fn = key.split("/").pop();
      const matched = Object.keys(cat.items).find((k) => k.endsWith("/" + fn));
      if (matched) offset = cat.items[matched];
    }
    const safeGX = parseFloat(g.x);
    const safeGY = parseFloat(g.y);
    const safeGW = parseFloat(g.width);
    const safeGH = parseFloat(g.height);

    pos = {
      x: (!isNaN(safeGX) ? safeGX : 50) + (parseFloat(offset.offsetX) || 0),
      y: (!isNaN(safeGY) ? safeGY : 50) + (parseFloat(offset.offsetY) || 0),
      width: (!isNaN(safeGW) ? safeGW : 15) * (parseFloat(offset.scaleX) || 1),
      height: (!isNaN(safeGH) ? safeGH : 25) * (parseFloat(offset.scaleY) || 1),
      zIndex: g.zIndex || 20,
      rotate: (parseFloat(g.rotate) || 0) + (parseFloat(offset.rotateOffset) || 0),
    };
  }
  if (!pos) {
    const saved = data && data.pos;
    const def = FOLDER_DEFAULTS[folder] || { x: 50, y: 50, width: 15, height: 25 };
    pos = saved || { ...def, zIndex: 20, rotate: 0 };
  }
  return { ...pos, x: shiftX(pos.x, frontShift(sName)) };
}

function placeGarment() {
  const G = getGarmentLayout(style);
  // Aspect ratio in blueprint: (G.width% * 297) / (G.height% * 210)
  const ar = (G.width * 297) / (G.height * 210);
  garmentBoxEl.style.aspectRatio = String(ar);
  garmentBoxEl.style.height = "94%";
  garmentBoxEl.style.width = "auto";
  garmentBoxEl.style.left = "50%";
  garmentBoxEl.style.top = "50%";
  garmentBoxEl.style.transform = "translate(-50%, -50%)";
  garmentImg.style.transform = `scale(${SCALE[styleData(style).id] || 0.95})`;
}

function renderOverlays() {
  garmentBoxEl.querySelectorAll(".studio__ov").forEach((node) => node.remove());
  if (style === "Dagla") return;
  const G = getGarmentLayout(style);
  Object.keys(selected).forEach((folder) => {
    const sel = selected[folder];
    const pos = getOverlayPosition(sel.key, sel, style);

    // Compute exact position and dimensions relative to the garment frame
    const relX = 50 + ((pos.x - G.x) / G.width) * 100;
    const relY = 50 + ((pos.y - G.y) / G.height) * 100;
    const relW = (pos.width / G.width) * 100;
    const relH = (pos.height / G.height) * 100;

    const wrap = document.createElement("div");
    wrap.className = "studio__ov";
    wrap.style.position = "absolute";
    wrap.style.left = relX + "%";
    wrap.style.top = relY + "%";
    wrap.style.width = relW + "%";
    wrap.style.height = relH + "%";
    wrap.style.zIndex = pos.zIndex || 20;
    wrap.style.transform = `translate(-50%, -50%) rotate(${pos.rotate || 0}deg)`;
    wrap.style.filter = "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))";

    const img = document.createElement("img");
    img.src = sel.path;
    img.alt = "";
    wrap.appendChild(img);
    garmentBoxEl.appendChild(wrap);
  });
}

function updateCounts() {
  rail.querySelectorAll(".cat-tile").forEach((tile) => {
    const on = selected[tile.dataset.folder] ? 1 : 0;
    const badge = tile.querySelector(".cat-tile__count");
    badge.textContent = on;
    badge.hidden = on === 0;
    tile.classList.toggle("has-on", on > 0);
  });
}

function closePicker() {
  if (picker) picker.hidden = true;
  openFolder = null;
  rail.querySelectorAll(".cat-tile").forEach((tile) => {
    tile.classList.remove("is-open");
    tile.setAttribute("aria-expanded", "false");
  });
}

function openPicker(folder) {
  openFolder = folder;
  rail.querySelectorAll(".cat-tile").forEach((tile) => {
    const on = tile.dataset.folder === folder;
    tile.classList.toggle("is-open", on);
    tile.setAttribute("aria-expanded", on ? "true" : "false");
  });
  const tile = rail.querySelector(`.cat-tile[data-folder="${folder}"]`);
  pickerTitle.textContent = tile ? tile.querySelector(".cat-tile__name").textContent : folder;
  pickerBody.innerHTML = FOLDERS[folder]
    .map((group) => {
      const head = group.sub === "_" ? "" : `<h4 class="picker__sub">${group.sub}</h4>`;
      const cells = group.files
        .map((file) => {
          const key = `${folder}/${file}`;
          const path = group.sub === "_" ? `/jubba/${folder}/${file}` : `/jubba/${folder}/${group.sub}/${file}`;
          const on = selected[folder] && selected[folder].key === key ? " is-on" : "";
          return `<button type="button" class="pick${on}" data-key="${key}" data-path="${path}">
            <span class="pick__thumb"><img src="${path}" alt="" loading="lazy"></span>
            <span class="pick__ok" aria-hidden="true">&#10003;</span>
          </button>`;
        })
        .join("");
      return `${head}<div class="picker__grid">${cells}</div>`;
    })
    .join("");
  picker.hidden = false;
}

function selectStyle(name) {
  style = name;
  selected = {};
  closePicker();
  strip.querySelectorAll(".style-chip").forEach((chip) => chip.classList.toggle("is-on", chip.dataset.style === name));
  styleLabel.textContent = name;
  ghost.textContent = name;
  rail.classList.toggle("is-hidden", name === "Saideria" || name === "Code");
  updateCounts();
  placeGarment();
  renderOverlays();
  const src = `/jubba/Image/${styleData(name).img}`;
  if (garmentImg.getAttribute("src") === src) {
    garmentImg.style.opacity = "1";
    return;
  }
  garmentImg.style.opacity = "0";
  window.setTimeout(() => {
    garmentImg.src = src;
  }, 150);
}

export function initStudio() {
  strip = document.getElementById("styleStrip");
  stage = document.getElementById("studioStage");
  if (!strip || !stage) return;
  garmentBoxEl = document.getElementById("garmentBox");
  garmentImg = document.getElementById("garmentImg");
  ghost = document.getElementById("studioGhost");
  rail = document.getElementById("catRail");
  picker = document.getElementById("picker");
  pickerTitle = document.getElementById("pickerTitle");
  pickerBody = document.getElementById("pickerBody");
  styleLabel = document.getElementById("studioStyle");

  strip.addEventListener("click", (e) => {
    const chip = e.target.closest(".style-chip");
    if (chip) selectStyle(chip.dataset.style);
  });

  rail.addEventListener("click", (e) => {
    const tile = e.target.closest(".cat-tile");
    if (!tile) return;
    const folder = tile.dataset.folder;
    if (openFolder === folder) closePicker();
    else openPicker(folder);
  });

  picker.addEventListener("click", (e) => {
    if (e.target.closest("[data-picker-close]")) {
      closePicker();
      return;
    }
    const pick = e.target.closest(".pick");
    if (!pick || !openFolder) return;
    const folder = openFolder;
    const key = pick.dataset.key;
    if (selected[folder] && selected[folder].key === key) delete selected[folder];
    else selected[folder] = { key, path: pick.dataset.path };
    updateCounts();
    renderOverlays();
    closePicker();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && openFolder) closePicker();
  });

  garmentImg.addEventListener("load", () => {
    garmentImg.style.opacity = "1";
  });

  placeGarment();
  updateCounts();
  if (garmentImg.complete) garmentImg.style.opacity = "1";
}
