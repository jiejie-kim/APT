/* ══════════════════════════════════════════════
   방문예약 (예약 인원 알림 + 아래에서 올라오는 예약 창)
   index.html, starhills.html 공통
   ══════════════════════════════════════════════ */

/* ▼▼ 예약 인원: 실제 숫자로 직접 바꿔주세요 (두 페이지에 같이 적용) ▼▼ */
const BOOKING_COUNT = 87;
/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

const BK_SCRIPT_URL =
  typeof SCRIPT_URL !== "undefined"
    ? SCRIPT_URL
    : "https://script.google.com/macros/s/AKfycby5AD0t5ETqH3qM0P3f7EFRHH60e_snc9sUa-VbvFaywiK7xSFAY4pw-fwY-00O6ti2/exec";

function bkPageName() {
  const sheet = document.getElementById("bkSheet");
  return (sheet && sheet.dataset.page) || "메인페이지";
}

function bkLog(type) {
  if (typeof logClick === "function") logClick(type);
}

/* ── 예약 인원 알림 ── */
function showBkToast() {
  const toast = document.getElementById("bkToast");
  if (!toast) return;

  // 다른 팝업(스타힐스 계약금 팝업 등)이 떠 있으면 닫힌 뒤에 표시
  const popup = document.getElementById("imgPopup") || document.getElementById("contractPopup");
  if (popup && popup.classList.contains("open")) {
    setTimeout(showBkToast, 1500);
    return;
  }
  aimToastTail();
  toast.classList.add("show");
}

/* 말풍선 꼬리가 하단 바의 '방문예약' 아이콘을 가리키도록 */
function aimToastTail() {
  const toast = document.getElementById("bkToast");
  const ico = document.querySelector(".floating-bar .fl-ico--visit");
  if (!toast || !ico) return;
  const t = toast.getBoundingClientRect();
  const i = ico.getBoundingClientRect();
  const x = i.left + i.width / 2 - t.left - 6; // 6 = 꼬리 절반 너비
  toast.style.setProperty("--tail-x", Math.max(14, Math.min(x, t.width - 26)) + "px");
}
window.addEventListener("resize", aimToastTail);

function closeBkToast() {
  const toast = document.getElementById("bkToast");
  if (toast) toast.classList.remove("show");
  // ✕는 지금 보고 있는 화면에서만 닫힘 → 새로고침하거나 다시 들어오면 다시 뜸
}

/* ── 예약 창 열기/닫기 ── */
function openBooking(from) {
  const sheet = document.getElementById("bkSheet");
  const overlay = document.getElementById("bkOverlay");
  if (!sheet || !overlay) return;
  overlay.classList.add("open");
  sheet.classList.add("open");
  document.body.classList.add("bk-lock");
  const toast = document.getElementById("bkToast");
  if (toast) toast.classList.remove("show");
  bkLog("방문예약 열기" + (from ? " - " + from : ""));
}

function closeBooking() {
  const sheet = document.getElementById("bkSheet");
  const overlay = document.getElementById("bkOverlay");
  if (sheet) sheet.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  document.body.classList.remove("bk-lock");
}

function toggleBkTerms() {
  const t = document.getElementById("bkTerms");
  if (t) t.hidden = !t.hidden;
}

/* ── 예약 접수 ── */
async function submitBooking() {
  const $ = (id) => document.getElementById(id);
  const name = $("bk-name").value.trim();
  const phone = $("bk-phone").value.trim();
  const date = $("bk-date").value;
  const time = $("bk-time").value;
  const memo = $("bk-memo").value.trim();

  if (!name) { alert("성함을 입력해 주세요."); $("bk-name").focus(); return; }
  if (phone.replace(/\D/g, "").length < 10) { alert("연락처를 정확히 입력해 주세요."); $("bk-phone").focus(); return; }
  if (!date) { alert("방문 날짜를 선택해 주세요."); $("bk-date").focus(); return; }
  if (!time) { alert("방문 시간을 선택해 주세요."); $("bk-time").focus(); return; }
  if (!$("bk-agree").checked) { alert("개인정보 수집·이용에 동의해 주세요."); return; }

  const btn = $("bk-submit");
  btn.disabled = true; // 중복 접수 방지

  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const page = bkPageName();

  try {
    await fetch(BK_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name, phone, time: now,
        page: page + " 방문예약",
        visitDate: date, visitTime: time, memo, // 시트의 방문희망일·방문시간·문의내용 칸
      }),
    });
  } catch (e) { }

  btn.disabled = false;
  alert(
    "방문 예약 신청이 접수되었습니다!\n담당자가 확인 후 연락드리겠습니다.\n\n" +
    "성함: " + name + "\n연락처: " + phone + "\n방문 희망: " + date + " " + time,
  );
  ["bk-name", "bk-phone", "bk-date", "bk-time", "bk-memo"].forEach((id) => ($(id).value = ""));
  $("bk-agree").checked = false;
  closeBooking();
}

/* ── 시작 ── */
document.addEventListener("DOMContentLoaded", function () {
  const countEl = document.getElementById("bkCount");
  if (countEl) countEl.textContent = BOOKING_COUNT.toLocaleString("ko-KR");

  // 날짜: 오늘 이전은 선택 불가
  const dateEl = document.getElementById("bk-date");
  if (dateEl) {
    const t = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    dateEl.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
  }

  // 연락처 자동 하이픈
  const phoneEl = document.getElementById("bk-phone");
  if (phoneEl) {
    phoneEl.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "").slice(0, 11);
      if (v.length >= 8) v = v.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3").replace(/-$/, "");
      else if (v.length >= 4) v = v.replace(/(\d{3})(\d{0,4})/, "$1-$2").replace(/-$/, "");
      this.value = v;
    });
  }

  // ESC로 닫기 (PC)
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBooking(); });

  // 알림은 페이지 열고 4초 뒤에 표시
  setTimeout(showBkToast, 4000);
});

/* ══════════════════════════════════════════════
   첫 화면 이미지 팝업 (+ 오늘 하루 보지 않기)
   페이지에 #imgPopup 이 있을 때만 동작
   ══════════════════════════════════════════════ */
function ipToday() {
  const d = new Date();
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
}

function openImgPopup() {
  const popup = document.getElementById("imgPopup");
  const overlay = document.getElementById("imgPopupOverlay");
  if (!popup || !overlay) return;
  try { if (localStorage.getItem("ipHideDate") === ipToday()) return; } catch (e) { }

  const img = popup.querySelector("img");
  const show = () => {
    overlay.classList.add("open");
    popup.classList.add("open");
    document.body.classList.add("bk-lock");
  };
  if (!img) return show();
  if (img.complete) {
    if (img.naturalWidth > 0) show();   // 이미지가 없으면 팝업을 띄우지 않음
  } else {
    img.addEventListener("load", show, { once: true });
  }
}

function closeImgPopup() {
  const popup = document.getElementById("imgPopup");
  const overlay = document.getElementById("imgPopupOverlay");
  const today = document.getElementById("ipToday");
  if (today && today.checked) {
    try { localStorage.setItem("ipHideDate", ipToday()); } catch (e) { }
  }
  if (popup) popup.classList.remove("open");
  if (overlay) overlay.classList.remove("open");
  document.body.classList.remove("bk-lock");
}
