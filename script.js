/* ============================================================
   这个脚本负责把 data.js 里的内容「渲染」到页面上，
   并处理滚动动画、手机菜单。一般情况下你不需要改这个文件。
   ============================================================ */

// 把 "2026-10-07" 这种日期转成 "2026年10月7日"
function formatDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[0]}年${Number(parts[1])}月${Number(parts[2])}日`;
}

// 阅读/影单的类型标签
const READING_TAGS = {
  book: { label: "书", cls: "book" },
  movie: { label: "影视", cls: "movie" },
  music: { label: "音乐", cls: "music" },
};

// ---------- 首屏 Hero ----------
function renderHero() {
  const nameEl = document.getElementById("heroName");
  const taglineEl = document.getElementById("heroTagline");
  if (nameEl) nameEl.textContent = about.name || "你好，我是 ——";
  if (taglineEl) taglineEl.textContent = about.tagline || "";
}

// ---------- 关于我 ----------
function renderAbout() {
  const container = document.getElementById("about-content");
  if (!container) return;
  const paras = (about.paragraphs || []).map((p) => `<p>${p}</p>`).join("");
  container.innerHTML = paras;
}

// ---------- 人生时间线 ----------
function renderTimeline() {
  const container = document.getElementById("timeline-list");
  if (!container) return;
  const sorted = [...timeline].sort((a, b) => b.date.localeCompare(a.date));
  if (sorted.length === 0) {
    container.innerHTML = '<p class="empty">这里还空着，等待你的第一段经历。</p>';
    return;
  }
  container.innerHTML = sorted
    .map(
      (item) => `
      <div class="timeline-item reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-date">${formatDate(item.date)}</div>
        <div class="timeline-card">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </div>`
    )
    .join("");
}

// ---------- 随笔 ----------
function renderEssays() {
  const container = document.getElementById("essay-list");
  if (!container) return;
  const sorted = [...essays].sort((a, b) => b.date.localeCompare(a.date));
  if (sorted.length === 0) {
    container.innerHTML = '<p class="empty">还没有随笔，写下你的第一个想法吧。</p>';
    return;
  }
  container.innerHTML = sorted
    .map(
      (item) => `
      <article class="essay-card reveal">
        <div class="essay-date">${formatDate(item.date)}</div>
        <h3>${item.title}</h3>
        <p>${item.content}</p>
      </article>`
    )
    .join("");
}

// ---------- 相册 ----------
function renderGallery() {
  const container = document.getElementById("gallery-grid");
  if (!container) return;
  if (gallery.length === 0) {
    container.innerHTML = '<p class="empty">相册还空着，放上你的第一张照片吧。</p>';
    return;
  }
  container.innerHTML = gallery
    .map(
      (item) => `
      <figure class="gallery-card reveal">
        <img src="${item.url}" alt="${item.title}" loading="lazy" />
        <figcaption class="gallery-caption">
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </figcaption>
      </figure>`
    )
    .join("");
}

// ---------- 阅读 / 影单 ----------
function renderReading() {
  const container = document.getElementById("reading-list");
  if (!container) return;
  if (reading.length === 0) {
    container.innerHTML = '<p class="empty">记录下你读过的书、看过的电影吧。</p>';
    return;
  }
  container.innerHTML = reading
    .map((item) => {
      const tag = READING_TAGS[item.type] || READING_TAGS.book;
      return `
      <div class="reading-card reveal">
        <span class="reading-tag ${tag.cls}">${tag.label}</span>
        <div class="reading-body">
          <h3>${item.title}</h3>
          <div class="reading-author">${item.author}</div>
          <p class="reading-note">${item.note}</p>
        </div>
      </div>`;
    })
    .join("");
}

// ---------- 足迹 / 旅行 ----------
function renderTravels() {
  const container = document.getElementById("travels-list");
  if (!container) return;
  if (travels.length === 0) {
    container.innerHTML = '<p class="empty">记录你去过或想去的地方吧。</p>';
    return;
  }
  container.innerHTML = travels
    .map(
      (item) => `
      <div class="travel-card reveal">
        <div class="travel-emoji">${item.emoji || "📍"}</div>
        <div class="travel-body">
          <h3>${item.place}</h3>
          <div class="travel-date">${item.date}</div>
          <p class="travel-note">${item.note}</p>
        </div>
      </div>`
    )
    .join("");
}

// ---------- 收藏夹 ----------
function renderFavorites() {
  const container = document.getElementById("favorites-list");
  if (!container) return;
  if (favorites.length === 0) {
    container.innerHTML = '<p class="empty">把你喜欢的东西收藏到这里吧。</p>';
    return;
  }
  container.innerHTML = favorites
    .map(
      (item) => `
      <a class="favorite-card reveal" href="${item.url}" target="_blank" rel="noopener">
        <div class="favorite-body">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
        <span class="favorite-arrow">↗</span>
      </a>`
    )
    .join("");
}

// ---------- 滚动进入动画 ----------
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ---------- 手机菜单 ----------
function initNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
  // 点击任意菜单项后收起菜单
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

// ---------- 启动 ----------
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderAbout();
  renderTimeline();
  renderEssays();
  renderGallery();
  renderReading();
  renderTravels();
  renderFavorites();
  initReveal();
  initNav();
});
