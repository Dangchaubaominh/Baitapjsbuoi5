// ─── Alert helpers ────────────────────────────────────────────────────────
function showWarning(msg) {
  document.getElementById("alert-area").innerHTML = `
        <div class="alert-warning">
          <span>⚠️</span>
          <span>${msg}</span>
        </div>`;
}

function showResult(resultAreaId, label, value) {
  document.getElementById("alert-area").innerHTML = "";
  document.getElementById(resultAreaId).innerHTML = `
        <div class="result-box">
          <span class="font-semibold text-blue-700 text-sm">${label}</span>
          <span class="font-bold text-blue-800 text-lg">${value}</span>
        </div>`;
}

function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
