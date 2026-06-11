const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby5AD0t5ETqH3qM0P3f7EFRHH60e_snc9sUa-VbvFaywiK7xSFAY4pw-fwY-00O6ti2/exec";
const PER_PAGE = 5;
let currentPage = 1;
let currentFilter = "all";

/* ── 필터 탭 ── */
function filterApt(type, el) {
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
  el.classList.add("on");
  currentFilter = type;
  currentPage = 1;
  renderList();
}

/* ── 리스트 렌더 + 페이지네이션 ── */
function getDisplayMode() {
  return window.innerWidth <= 768 ? "block" : "grid";
}

function renderList() {
  const allRows = Array.from(document.querySelectorAll("#aptList .apt-row"));
  const filtered = allRows.filter(
    (r) => currentFilter === "all" || r.dataset.status === currentFilter,
  );

  // 전체 숨기기
  allRows.forEach((r) => {
    r.style.display = "none";
  });

  // 현재 페이지 항목만 표시
  const start = (currentPage - 1) * PER_PAGE;
  filtered.slice(start, start + PER_PAGE).forEach((r) => {
    r.style.display = getDisplayMode();
  });

  // 카운트
  const countEl = document.getElementById("aptCount");
  if (countEl) countEl.textContent = filtered.length + "개 단지";

  // 빈 상태
  const emptyEl = document.getElementById("emptyMsg");
  if (emptyEl) emptyEl.style.display = filtered.length === 0 ? "block" : "none";

  // 페이지네이션
  buildPagination(Math.ceil(filtered.length / PER_PAGE));
}

function buildPagination(total) {
  const wrap = document.getElementById("pagination");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (total <= 1) return;

  const prev = makeBtn("&#8592;", () => goPage(currentPage - 1));
  if (currentPage === 1) prev.disabled = true;
  wrap.appendChild(prev);

  for (let i = 1; i <= total; i++) {
    const b = makeBtn(i, () => goPage(i));
    if (i === currentPage) b.classList.add("on");
    wrap.appendChild(b);
  }

  const next = makeBtn("&#8594;", () => goPage(currentPage + 1));
  if (currentPage === total) next.disabled = true;
  wrap.appendChild(next);
}

function makeBtn(label, onClick) {
  const b = document.createElement("button");
  b.className = "page-btn";
  b.innerHTML = label;
  b.addEventListener("click", onClick);
  return b;
}

function goPage(p) {
  currentPage = p;
  renderList();
  const listEl = document.getElementById("apt-list-section");
  if (listEl) listEl.scrollIntoView({ behavior: "smooth" });
}

/* ── 회사소개 스크롤 ── */
function scrollToCompany() {
  const el = document.getElementById("company-section");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ── 후기 슬라이더 ── */
function initSlider() {
  const track = document.getElementById("proofTrack");
  const dotsWrap = document.getElementById("proofDots");
  if (!track || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll(".proof-card"));
  let cur = 0;

  function perView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function totalPages() {
    return Math.ceil(cards.length / perView());
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < totalPages(); i++) {
      const d = document.createElement("button");
      d.className = "proof-dot-btn" + (i === cur ? " on" : "");
      d.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, totalPages() - 1));
    const p = perView();
    const outer = track.parentElement;
    const gap = 16;
    const cardW = (outer.offsetWidth - (p - 1) * gap) / p;

    cards.forEach((c) => {
      c.style.flex = "0 0 " + cardW + "px";
      c.style.marginRight = gap + "px";
    });

    track.style.transform = "translateX(-" + cur * (cardW + gap) * p + "px)";
    buildDots();
  }

  // 화살표 버튼 연결
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(cur - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(cur + 1));

  window.addEventListener("resize", () => goTo(0));
  goTo(0);
}

/* ── 전화번호 자동 포맷 ── */
function initPhoneFormat(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 11);
    if (v.length >= 8)
      v = v.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3").replace(/-$/, "");
    else if (v.length >= 4)
      v = v.replace(/(\d{3})(\d{0,4})/, "$1-$2").replace(/-$/, "");
    this.value = v;
  });
}

/* ── 상담 신청 ── */
async function mainSubmit() {
  const name = document.getElementById("m-name").value.trim();
  const phone = document.getElementById("m-phone").value.trim();
  if (!name) {
    alert("성함을 입력해 주세요.");
    return;
  }
  if (phone.replace(/\D/g, "").length < 10) {
    alert("연락처를 입력해 주세요.");
    return;
  }
  const now = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        time: now,
        page: "메인페이지",
      }),
    });
  } catch (e) { }
  alert(
    "접수 완료!\n담당자가 곧 연락드리겠습니다.\n\n성함: " +
    name +
    "\n연락처: " +
    phone,
  );
  document.getElementById("m-name").value = "";
  document.getElementById("m-phone").value = "";
}

/* ── DOM 준비 후 실행 ── */
document.addEventListener("DOMContentLoaded", function () {
  renderList();
  initSlider();
  initPhoneFormat("m-phone");
  initFadeIn();

  // 반응형 전환 시 카드 display 재적용
  window.addEventListener("resize", function () {
    const mode = getDisplayMode();
    document.querySelectorAll("#aptList .apt-row").forEach((r) => {
      if (r.style.display !== "none") r.style.display = mode;
    });
  });
});

function initFadeIn() {
  const els = document.querySelectorAll(".fade-in");

  const initiallyVisible = new Set();
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      initiallyVisible.add(el);
    }
  });

  function checkVisible() {
    els.forEach(el => {
      if (el.classList.contains("visible")) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        if (initiallyVisible.has(el)) {
          if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
          }
        } else {
          el.classList.add("visible");
        }
      }
    });
  }

  window.addEventListener("scroll", checkVisible, { passive: true });
  setTimeout(checkVisible, 500);

  // ✅ 함수 안에 있어야 함
  const appealSection = document.getElementById("appealSection");
  if (appealSection) {
    const appealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".appeal-ani");
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * 100);
          });
          appealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    appealObserver.observe(appealSection);
  }
}

async function logClick(type) {
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const page = '메인페이지';
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '(클릭)',
        phone: type,
        time: now,
        page: page
      })
    });
  } catch (e) { }
}
