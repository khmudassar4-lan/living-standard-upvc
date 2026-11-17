// Preloader
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader").classList.add("hide"), 800);
});

// Sticky header, active link, back-to-top
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a:not(.btn)");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  header.classList.toggle("scrolled", y > 60);
  toTop.classList.toggle("show-btn", y > 500);

  let current = "home";
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    nav.classList.remove("open");
  })
);

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), (i % 3) * 120);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => revealObserver.observe(el));

/* ---------- Window configurator ---------- */
const WA_NUMBER = "923345101118";
const winSvg = document.getElementById("winSvg");
const winLayer = document.getElementById("winLayer");

const styleInfo = {
  casement: { label: "Casement", desc: "Side-hinged sashes that open wide for fresh air." },
  sliding: { label: "Sliding", desc: "Smooth-gliding panels that save space." },
  tilt: { label: "Tilt & Turn", desc: "Opens inward fully, or tilts for gentle ventilation." },
  fixed: { label: "Fixed", desc: "One large pane for maximum light and view." },
};

function pane(x, y, w, h) {
  return (
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="var(--frame)" stroke="rgba(0,0,0,.22)" stroke-width="2"/>' +
    '<rect x="' + (x + 10) + '" y="' + (y + 10) + '" width="' + (w - 20) + '" height="' + (h - 20) + '" fill="url(#glass)" stroke="rgba(0,0,0,.15)"/>' +
    '<polygon points="' + (x + 14) + "," + (y + 14) + " " + (x + 14 + w * 0.38) + "," + (y + 14) + " " + (x + 14) + "," + (y + 14 + h * 0.34) + '" fill="#fff" opacity=".28"/>'
  );
}
function handle(x, y) {
  return '<rect x="' + x + '" y="' + y + '" width="7" height="28" rx="3" fill="#d5dbe1" stroke="#8a949e"/>';
}

function buildWindow(style) {
  let inner = "";
  if (style === "casement") {
    inner = pane(40, 40, 105, 260) + pane(155, 40, 105, 260) + handle(131, 156) + handle(162, 156);
  } else if (style === "sliding") {
    inner =
      pane(40, 40, 125, 260) + pane(135, 40, 125, 260) +
      '<path d="M96 170 h46 m-9 -9 l9 9 l-9 9" stroke="#fff" fill="none" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>' +
      handle(141, 160);
  } else if (style === "tilt") {
    inner =
      pane(40, 40, 220, 260) +
      '<path d="M54 54 L246 170 L54 286" stroke="#fff" fill="none" stroke-width="2.5" stroke-dasharray="7 6" opacity=".85"/>' +
      handle(243, 156);
  } else {
    inner = pane(40, 40, 220, 260);
  }
  return (
    '<rect x="20" y="20" width="260" height="300" rx="8" fill="var(--frame)" stroke="rgba(0,0,0,.25)" stroke-width="2"/>' +
    inner +
    '<rect x="8" y="318" width="284" height="14" rx="5" fill="var(--frame)" stroke="rgba(0,0,0,.25)" stroke-width="2"/>'
  );
}

let currentStyle = "casement";
let currentColor = "White";
winSvg.style.setProperty("--frame", "#f4f4f0");

const selStyle = document.getElementById("selStyle");
const selColor = document.getElementById("selColor");
const styleDesc = document.getElementById("styleDesc");
const designWa = document.getElementById("designWa");

function renderWindow() {
  winLayer.style.animation = "none";
  void winLayer.getBoundingClientRect();
  winLayer.style.animation = "";
  winLayer.innerHTML = buildWindow(currentStyle);

  selStyle.textContent = styleInfo[currentStyle].label;
  selColor.textContent = currentColor;
  styleDesc.textContent = styleInfo[currentStyle].desc;

  const msg =
    "Hello, I would like a quote for a " + styleInfo[currentStyle].label +
    " uPVC window in " + currentColor + " finish.";
  designWa.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
}

document.querySelectorAll("#styleBtns .opt").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#styleBtns .opt").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentStyle = btn.dataset.style;
    renderWindow();
  });
});

document.querySelectorAll("#swatches .sw").forEach((sw) => {
  sw.addEventListener("click", () => {
    document.querySelectorAll("#swatches .sw").forEach((s) => s.classList.remove("active"));
    sw.classList.add("active");
    currentColor = sw.dataset.name;
    winSvg.style.setProperty("--frame", sw.dataset.color);
    renderWindow();
  });
});

renderWindow();

/* ---------- Contact form -> WhatsApp ---------- */
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const phone = document.getElementById("cPhone").value.trim();
  const type = document.getElementById("cType").value;
  const size = document.getElementById("cSize").value.trim();
  const msg = document.getElementById("cMsg").value.trim();
  const text =
    "Hello,\nName: " + name +
    "\nPhone: " + phone +
    "\nProduct: " + type +
    (size ? "\nSize/Qty: " + size : "") +
    (msg ? "\nMessage: " + msg : "");
  window.open("https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text), "_blank");
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();