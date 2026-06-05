const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5AD0t5ETqH3qM0P3f7EFRHH60e_snc9sUa-VbvFaywiK7xSFAY4pw-fwY-00O6ti2/exec";

/* ══ 갤러리 이미지 ══ */
const lbImages = [
  // 갤러리 (0~4)
  { src: "images/prugio/prugio_view_1.webp", caption: "용인푸르지오 원클러스터" },
  { src: "images/prugio/prugio_view_2.webp", caption: "용인푸르지오 원클러스터" },
  { src: "images/prugio/prugio_view_3.webp", caption: "용인푸르지오 원클러스터" },
  { src: "images/prugio/prugio_view_4.webp", caption: "용인푸르지오 원클러스터" },
  { src: "images/prugio/prugio_view_6.webp", caption: "용인푸르지오 원클러스터" },
  // 투자가치 (5~10)
  { src: "images/prugio/prugio_invest-photos_1.webp", caption: "투자가치 1" },
  { src: "images/prugio/prugio_invest-photos_2.webp", caption: "투자가치 2" },
  { src: "images/prugio/prugio_invest-photos_3.webp", caption: "투자가치 3" },
  { src: "images/prugio/prugio_invest-photos_4.webp", caption: "투자가치 4" },
  { src: "images/prugio/prugio_invest-photos_5.webp", caption: "투자가치 5" },
  { src: "images/prugio/prugio_invest-photos_6.webp", caption: "투자가치 6" },
  // 단지안내 (11~13)
  { src: "images/prugio/prugio_internal_1.webp", caption: "단지 안내 메인" },
  { src: "images/prugio/prugio_internal_2.webp", caption: "단지 안내 1" },
  { src: "images/prugio/prugio_internal_3.webp", caption: "단지 안내 2" },
  // 커뮤니티 (14~19)
  { src: "images/prugio/prugio_community_1.webp", caption: "커뮤니티 1" },
  { src: "images/prugio/prugio_community_2.webp", caption: "커뮤니티 2" },
  { src: "images/prugio/prugio_community_3.webp", caption: "커뮤니티 3" },
  { src: "images/prugio/prugio_community_4.webp", caption: "커뮤니티 4" },
  { src: "images/prugio/prugio_community_5.webp", caption: "커뮤니티 5" },
  { src: "images/prugio/prugio_community_6.webp", caption: "커뮤니티 6" },
  // 입지환경 (20~21)
  { src: "images/prugio/location_1.jpg", caption: "입지환경 1" },
  { src: "images/prugio/location_2.jpg", caption: "입지환경 2" },
];

let lbCurrent = 0;
let lbMode = "gallery";

/* ══ 타입별 이미지 ══ */
const typeImages = {
  "80A": [
    { src: "images/prugio/prugio_type_80a_1.png", caption: "80A 기본형" },
    { src: "images/prugio/prugio_type_80a_1.png", caption: "80A 기본형", label: "기본형" },
    { src: "images/prugio/prugio_type_80a_.webp", caption: "80A 확장기본형", label: "확장기본형" },
    { src: "images/prugio/prugio_type_80a_3.png", caption: "80A 유상옵션", label: "유상옵션" },
    { src: "images/prugio/prugio_type_80a_4.png", caption: "80A 라이프업 수납", label: "라이프업수납" },
    { src: "images/prugio/prugio_type_80a_5.png", caption: "80A 라이프업 수납", label: "라이프업수납" },
    { src: "images/prugio/prugio_type_80a_6.png", caption: "80A 라이프업 수납", label: "라이프업수납" },
    { src: "images/prugio/prugio_type_80a_7.png", caption: "80A 라이프업 수납", label: "라이프업수납" },


  ],
  "74A": [
    { src: "images/prugio/74a_plan.webp", caption: "74A 평면도" },
    { src: "images/prugio/74a_living.webp", caption: "74A 거실" },
    { src: "images/prugio/74a_kitchen.webp", caption: "74A 주방" },
    { src: "images/prugio/74a_room.webp", caption: "74A 방" },
  ],
  "74B": [
    { src: "images/prugio/74b_plan.webp", caption: "74B 평면도" },
    { src: "images/prugio/74b_living.webp", caption: "74B 거실" },
    { src: "images/prugio/74b_kitchen.webp", caption: "74B 주방" },
    { src: "images/prugio/74b_room.webp", caption: "74B 방" },
  ],
  "84A": [
    { src: "images/prugio/84a_plan.webp", caption: "84A 평면도" },
    { src: "images/prugio/84a_living.webp", caption: "84A 거실" },
    { src: "images/prugio/84a_kitchen.webp", caption: "84A 주방" },
    { src: "images/prugio/84a_room.webp", caption: "84A 방" },
  ],
  "84B": [
    { src: "images/prugio/84b_plan.webp", caption: "84B 평면도" },
    { src: "images/prugio/84b_living.webp", caption: "84B 거실" },
    { src: "images/prugio/84b_kitchen.webp", caption: "84B 주방" },
    { src: "images/prugio/84b_room.webp", caption: "84B 방" },
  ],
};
let currentTypeImgs = [];

/* ── 라이트박스 ── */
let touchStartX = 0;

function renderLightbox(item, current, total) {
  if (!item) return;
  document.getElementById("lbImg").innerHTML =
    `<img src="${item.src}" alt="${item.caption}"
      style="max-width:95vw;max-height:85vh;border-radius:10px;object-fit:contain;display:block;">`;
  document.getElementById("lbCaption").textContent =
    `${current + 1} / ${total}  ${item.caption}`;
}

function openLightbox(idx) {
  lbCurrent = idx;
  lbMode = "gallery";
  renderLightbox(lbImages[idx], idx, lbImages.length);
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function openTypeLightbox(idx) {
  lbCurrent = idx;
  lbMode = "type";
  renderLightbox(currentTypeImgs[idx], idx, currentTypeImgs.length);
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

function moveLb(dir) {
  const arr = lbMode === "type" ? currentTypeImgs : lbImages;
  lbCurrent = (lbCurrent + dir + arr.length) % arr.length;
  renderLightbox(arr[lbCurrent], lbCurrent, arr.length);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") moveLb(-1);
  if (e.key === "ArrowRight") moveLb(1);
});

/* ══ 타입 데이터 ══ */
const typeData = {
  "80A": { name: "80㎡ A타입", area: "공급 105.97㎡ / 전용 80.26㎡", rooms: "방3 / 욕실2", units: "218세대", price: "4.8억 ~ 5.5억", badge: "인기 타입" },
  "74A": { name: "74㎡ A타입", area: "공급 98.10㎡ / 전용 74.33㎡", rooms: "방3 / 욕실2", units: "192세대", price: "5.9억 ~ 6.8억" },
  "74B": { name: "74㎡ B타입", area: "공급 97.42㎡ / 전용 74.12㎡", rooms: "방3 / 욕실2", units: "155세대", price: "5.9억 ~ 6.5억" },
  "84A": { name: "84㎡ A타입", area: "공급 110.77㎡ / 전용 84.89㎡", rooms: "방4 / 욕실2", units: "148세대", price: "6.8억 ~ 9.2억", badge: "조망 우수" },
  "84B": { name: "84㎡ B타입", area: "공급 110.22㎡ / 전용 84.45㎡", rooms: "방4 / 욕실2", units: "100세대", price: "6.8억 ~ 8.5억" },
};

/* ── 타입 카드 클릭 ── */
function pick(card, typeKey) {
  card.closest(".type-grid").querySelectorAll(".type-card")
    .forEach(c => c.classList.remove("on"));
  card.classList.add("on");

  const d = typeData[typeKey];
  if (!d) return;

  currentTypeImgs = typeImages[typeKey] || [];

  // 메인 이미지 세팅
  const mainEl = document.getElementById("tdpImgMain");
  if (mainEl) {
    const first = currentTypeImgs[0];
    mainEl.innerHTML = first
      ? `<img src="${first.src}" alt="${first.caption}" style="width:100%;height:100%;object-fit:cover;display:block;">`
      : `<i class="ti ti-layout-2"></i>`;
    mainEl.onclick = () => openTypeLightbox(0);
  }

  // 서브 이미지 동적 생성 (typeImages 배열만 수정하면 자동 반영)
  const row = document.getElementById("tdpSubRow");
  if (row) {
    row.innerHTML = "";
    currentTypeImgs.slice(1).forEach((img, i) => {
      const div = document.createElement("div");
      div.className = "tdp-img-sm";
      div.dataset.label = img.label || img.caption || "";
      div.innerHTML = `<img src="${img.src}" alt="${img.caption}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
      div.addEventListener("click", () => {
        // 메인 교체
        mainEl.innerHTML = `<img src="${img.src}" alt="${img.caption}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
        mainEl.onclick = () => openTypeLightbox(i + 1);
        // 선택 표시
        row.querySelectorAll(".tdp-img-sm").forEach(s => s.classList.remove("selected"));
        div.classList.add("selected");
      });
      row.appendChild(div);
    });
  }

  document.getElementById("tdpInfo").innerHTML = `
    <div class="tdp-name">${d.name}</div>
    <div class="tdp-area">${d.area}</div>
    <div class="tdp-price-lbl">분양가</div>
    <div class="tdp-price">${d.price}</div>
    <div class="tdp-rows">
      <div class="tdp-row"><span class="tdp-k">방 구조</span><span class="tdp-v">${d.rooms}</span></div>
      <div class="tdp-row"><span class="tdp-k">해당 세대수</span><span class="tdp-v">${d.units}</span></div>
      <div class="tdp-row"><span class="tdp-k">공급 면적</span><span class="tdp-v">${d.area.split("/")[0].trim()}</span></div>
      <div class="tdp-row"><span class="tdp-k">전용 면적</span><span class="tdp-v">${d.area.split("/")[1].trim()}</span></div>
      ${d.badge ? `<div class="tdp-row"><span class="tdp-k">특이사항</span><span class="tdp-v" style="color:var(--gold)">${d.badge}</span></div>` : ""}
    </div>
    <button class="tdp-btn" onclick="scrollToContact()">
      <i class="ti ti-send"></i> 이 타입 상담 신청
    </button>
  `;

  const panel = document.getElementById("typePanel");
  subImgCurrent = 0;
  updateSubSlider();
  panel.classList.add("open");
  setTimeout(() => panel.scrollIntoView({ behavior: "smooth", block: "nearest" }), 50);
}

/* ── 타입 탭 전환 ── */
function switchType(size, btn) {
  document.querySelectorAll(".type-tab").forEach(t => t.classList.remove("on"));
  btn.classList.add("on");
  ["80", "74", "84"].forEach(s => {
    const el = document.getElementById("t" + s);
    if (el) el.style.display = s === size ? "grid" : "none";
  });
  document.getElementById("typePanel").classList.remove("open");
  const firstCard = document.querySelector("#t" + size + " .type-card");
  if (firstCard) {
    firstCard.classList.add("on");
    const key = size + firstCard.querySelector(".type-name").textContent.match(/[A-C]/)?.[0];
    if (key && typeData[key]) pick(firstCard, key);
  }
}

/* ── 타입 서브 이미지 슬라이더 ── */
let subImgCurrent = 0;

function updateSubSlider() {
  const row = document.getElementById("tdpSubRow");
  if (!row) return;
  // 고정 너비 120px + gap 4px
  const itemW = 124;
  row.style.transform = `translateX(-${subImgCurrent * itemW}px)`;
}

function moveSubImg(dir) {
  const row = document.getElementById("tdpSubRow");
  if (!row) return;
  const items = row.querySelectorAll(".tdp-img-sm");
  const max = Math.max(0, items.length - 3);
  subImgCurrent = Math.max(0, Math.min(subImgCurrent + dir, max));
  updateSubSlider();
}

/* ── 투자가치 슬라이더 ── */
let investCurrent = 0;
let investTimer = null;
const investTotal = 4; // 슬라이드 총 개수

function initInvestSlider() {
  const dots = document.getElementById("investDots");
  const slider = document.getElementById("investSlider");
  if (!dots || !slider) return;

  // 초기화
  investCurrent = 0;
  slider.style.transform = "translateX(0%)";

  // 점 생성
  for (let i = 0; i < investTotal; i++) {
    const d = document.createElement("button");
    d.className = "invest-dot" + (i === 0 ? " on" : "");
    d.addEventListener("click", () => goInvest(i));
    dots.appendChild(d);
  }

  // 숫자 카운터
  const counter = document.createElement("span");
  counter.id = "investCounter";
  counter.className = "invest-counter";
  counter.textContent = "1 / " + investTotal;
  dots.appendChild(counter);

  // 자동재생
  investTimer = setInterval(() => moveInvest(1), 4000);

  // 터치 슬라이드
  let startX = 0;
  slider.addEventListener("touchstart", e => { startX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) moveInvest(diff > 0 ? 1 : -1);
  }, { passive: true });

  // 라이트박스 터치
  const lb = document.getElementById("lightbox");
  if (lb) {
    lb.addEventListener("touchstart", e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    lb.addEventListener("touchend", e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) moveLb(diff > 0 ? 1 : -1);
    }, { passive: true });
  }
}

function goInvest(idx) {
  investCurrent = Math.max(0, Math.min(idx, investTotal - 1));
  document.getElementById("investSlider").style.transform =
    `translateX(-${investCurrent * 100}%)`;
  document.querySelectorAll(".invest-dot").forEach((d, i) =>
    d.classList.toggle("on", i === investCurrent)
  );
  const counter = document.getElementById("investCounter");
  if (counter) counter.textContent = (investCurrent + 1) + " / " + investTotal;
}

function moveInvest(dir) {
  goInvest((investCurrent + dir + investTotal) % investTotal);
  // 자동재생 리셋
  clearInterval(investTimer);
  investTimer = setInterval(() => moveInvest(1), 4000);
}

/* ── 옵션 슬라이더 (자동재생) ── */
let optionCurrent = 0;
let optionTimer = null;

function initOptionSlider() {
  const slider = document.getElementById("optionSlider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".option-slide");
  const total = slides.length;

  // 초기화
  optionCurrent = 0;
  slider.style.transform = "translateX(0%)";

  function perView() {
    return window.innerWidth <= 768 ? 2 : 4;
  }

  function goOption(idx) {
    const pv = perView();
    const maxIdx = Math.max(0, total - pv);
    optionCurrent = Math.max(0, Math.min(idx, maxIdx));
    const slideW = 100 / pv;
    slider.style.transform = `translateX(-${optionCurrent * slideW}%)`;
  }

  window.moveOption = function (dir) {
    const pv = perView();
    const maxIdx = Math.max(0, total - pv);
    let next = optionCurrent + dir;
    if (next > maxIdx) next = 0;
    if (next < 0) next = maxIdx;
    goOption(next);
    clearInterval(optionTimer);
    optionTimer = setInterval(() => moveOption(1), 3000);
  };

  // 자동재생
  optionTimer = setInterval(() => moveOption(1), 3000);

  // 터치
  let startX = 0;
  slider.addEventListener("touchstart", e => { startX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) moveOption(diff > 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener("resize", () => goOption(optionCurrent));
}

/* ── 커뮤니티 슬라이더 (자동재생) ── */
let communityCurrent = 0;
let communityTimer = null;
const communityTotal = 6; // 이미지 개수

function initCommunitySlider() {
  const slider = document.getElementById("communitySlider");
  if (!slider) return;

  // 초기화
  communityCurrent = 0;
  slider.style.transform = "translateX(0%)";
  const counter = document.getElementById("communityCounter");
  if (counter) counter.textContent = "1 / " + communityTotal;

  // 자동재생 4초
  communityTimer = setInterval(() => moveCommunity(1), 4000);

  // 터치
  let startX = 0;
  slider.addEventListener("touchstart", e => { startX = e.changedTouches[0].screenX; }, { passive: true });
  slider.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) moveCommunity(diff > 0 ? 1 : -1);
  }, { passive: true });
}

function moveCommunity(dir) {
  communityCurrent = (communityCurrent + dir + communityTotal) % communityTotal;
  document.getElementById("communitySlider").style.transform =
    `translateX(-${communityCurrent * 100}%)`;
  const counter = document.getElementById("communityCounter");
  if (counter) counter.textContent = (communityCurrent + 1) + " / " + communityTotal;
  clearInterval(communityTimer);
  communityTimer = setInterval(() => moveCommunity(1), 4000);
}

/* ── 전화번호 포맷 ── */
["inp-phone", "v-phone"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 11);
    if (v.length >= 8) v = v.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3").replace(/-$/, "");
    else if (v.length >= 4) v = v.replace(/(\d{3})(\d{0,4})/, "$1-$2").replace(/-$/, "");
    this.value = v;
  });
});

/* ── 폼 제출 ── */
async function doSubmit() {
  const name = document.getElementById("inp-name");
  const phone = document.getElementById("inp-phone");
  const priv = document.getElementById("inp-priv");
  name.classList.remove("err"); phone.classList.remove("err");
  if (!name.value.trim()) { name.classList.add("err"); name.focus(); return; }
  if (phone.value.replace(/\D/g, "").length < 10) { phone.classList.add("err"); phone.focus(); return; }
  if (!priv.checked) { alert("개인정보 수집·이용에 동의해 주세요."); return; }
  const btn = document.getElementById("submitBtn");
  btn.classList.add("loading"); btn.disabled = true;
  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  try {
    await fetch(SCRIPT_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.value.trim(), phone: phone.value.trim(), time: now, page: "상세페이지" })
    });
  } catch (e) { }
  document.getElementById("formWrap").style.display = "none";
  document.getElementById("doneBox").style.display = "flex";
}

async function visitSubmit() {
  const name = document.getElementById("v-name").value.trim();
  const phone = document.getElementById("v-phone").value.trim();
  if (!name) { alert("성함을 입력해 주세요."); return; }
  if (phone.replace(/\D/g, "").length < 10) { alert("연락처를 입력해 주세요."); return; }
  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  try {
    await fetch(SCRIPT_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, time: now, page: "방문상담예약" })
    });
  } catch (e) { }
  alert("방문 상담 예약이 완료되었습니다!\n담당자가 곧 연락드리겠습니다.");
  document.getElementById("v-name").value = "";
  document.getElementById("v-phone").value = "";
}

/* ── 스크롤 ── */
function scrollToContact() {
  const el = document.getElementById("contact");
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
  setTimeout(() => document.getElementById("inp-name").focus(), 600);
}

let scrollTimer = null;
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112, behavior: "smooth" });
  subBtns.forEach((b, i) => b.classList.toggle("on", secIds[i] === id));
  scrollTimer = setTimeout(() => { scrollTimer = null; }, 500);
}

const secIds = ["pricebox", "gallery", "invest", "overview", "complex", "features", "location", "types", "modelhouse", "contact"];
const subBtns = document.querySelectorAll(".sub-btn");

window.addEventListener("scroll", () => {
  if (scrollTimer) return;
  const offset = 112;
  let cur = "";
  secIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= offset) cur = id;
  });
  subBtns.forEach((b, i) => b.classList.toggle("on", secIds[i] === cur || (!cur && i === 0)));
}, { passive: true });

async function logClick(type) {
  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  try {
    await fetch(SCRIPT_URL, {
      method: "POST", mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "(클릭)", phone: type, time: now, page: "상세페이지" })
    });
  } catch (e) { }
}

/* ── DOMContentLoaded ── */
document.addEventListener("DOMContentLoaded", () => {
  initInvestSlider();
  initOptionSlider();
  initCommunitySlider();
  window.scrollTo(0, 0);
});

/* ── 모바일 바텀시트 모달 ── */
/* ── 상세보기 버튼 클릭 → 모달 열기 ── */
function pickModal(typeKey) {
  const d = typeData[typeKey];
  const imgs = typeImages[typeKey] || [];
  if (!d) return;
  openTypeModal(d, imgs);
}

function openTypeModal(d, imgs) {
  const overlay = document.getElementById("typeModalOverlay");
  const modal   = document.getElementById("typeModal");
  if (!overlay || !modal) return;

  // 타이틀
  document.getElementById("typeModalTitle").innerHTML =
    d.name + (d.badge
      ? ` <span style="font-size:11px;color:var(--gold);font-weight:400">${d.badge}</span>`
      : "");

  // 메인 이미지
  const imgEl = document.getElementById("typeModalImg");
  imgEl.innerHTML = imgs[0]
    ? `<img src="${imgs[0].src}" alt="${imgs[0].caption}">`
    : `<i class="ti ti-layout-2"></i>`;

  // 서브 이미지 (JS로 동적 생성 - 이미지 추가/삭제 시 JS만 수정)
  const subEl = document.getElementById("typeModalSub");
  subEl.innerHTML = "";
  imgs.forEach((img, i) => {
    const div = document.createElement("div");
    div.className = "tms" + (i === 0 ? " on" : "");
    div.innerHTML = img.src
      ? `<img src="${img.src}" alt="${img.caption}">`
      : `<i class="ti ti-layout-2"></i>`;
    div.addEventListener("click", () => {
      imgEl.innerHTML = `<img src="${img.src}" alt="${img.caption}">`;
      subEl.querySelectorAll(".tms").forEach(s => s.classList.remove("on"));
      div.classList.add("on");
    });
    subEl.appendChild(div);
  });

  // 스펙 정보
  document.getElementById("typeModalPrice").textContent = d.price;
  document.getElementById("typeModalRows").innerHTML = [
    { k: "방 구조",   v: d.rooms },
    { k: "세대수",    v: d.units },
    { k: "공급 면적", v: d.area.split("/")[0].trim() },
    { k: "전용 면적", v: d.area.split("/")[1].trim() },
  ].map(r => `
    <div class="type-modal-row">
      <span class="type-modal-k">${r.k}</span>
      <span class="type-modal-v">${r.v}</span>
    </div>`).join("");

  // 모달 열기
  overlay.classList.add("open");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  // 스크롤 맨 위로
  modal.scrollTop = 0;
}

function closeTypeModal() {
  const overlay = document.getElementById("typeModalOverlay");
  const modal   = document.getElementById("typeModal");
  if (overlay) overlay.classList.remove("open");
  if (modal)   modal.classList.remove("open");
  document.body.style.overflow = "";
}
