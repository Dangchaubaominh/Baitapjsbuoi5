// ─── Sidebar navigation ───────────────────────────────────────────────────
const sidebarItems = document.querySelectorAll(".sidebar-item");
const exerciseContents = document.querySelectorAll(".exercise-content");

sidebarItems.forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.dataset.exercise;

    sidebarItems.forEach((s) => s.classList.remove("active"));
    exerciseContents.forEach((e) => e.classList.remove("active"));

    item.classList.add("active");
    document.getElementById("exercise-" + target).classList.add("active");

    // Clear alert on switch
    document.getElementById("alert-area").innerHTML = "";
  });
});
// ─── Bài 1: Kết quả tuyển sinh ────────────────────────────────────────────────────
function ketQuaTuyensinh() {
  // 1. Lấy dữ liệu từ các ô input
  const diemChuan = parseFloat(document.getElementById("diemChuan").value);
  const m1 = parseFloat(document.getElementById("mon1").value);
  const m2 = parseFloat(document.getElementById("mon2").value);
  const m3 = parseFloat(document.getElementById("mon3").value);
  const khuVuc = document.getElementById("khuVuc").value;
  const doiTuong = document.getElementById("doiTuong").value;

  const resultDiv = document.getElementById("result");

  // Kiểm tra nếu người dùng chưa nhập đủ số liệu
  if (isNaN(diemChuan) || isNaN(m1) || isNaN(m2) || isNaN(m3)) {
    resultDiv.style.display = "block";
    resultDiv.className = "error";
    resultDiv.innerHTML = "Vui lòng nhập đầy đủ điểm số!";
    return;
  }

  // 2. Tính điểm ưu tiên khu vực
  let diemKV = 0;
  switch (khuVuc) {
    case "A":
      diemKV = 2;
      break;
    case "B":
      diemKV = 1;
      break;
    case "C":
      diemKV = 0.5;
      break;
    default:
      diemKV = 0;
  }

  // 3. Tính điểm ưu tiên đối tượng
  let diemDT = 0;
  switch (doiTuong) {
    case "1":
      diemDT = 2.5;
      break;
    case "2":
      diemDT = 1.5;
      break;
    case "3":
      diemDT = 1;
      break;
    default:
      diemDT = 0;
  }

  // 4. Tính tổng điểm
  const tongDiem = m1 + m2 + m3 + diemKV + diemDT;

  // 5. Xét điều kiện đậu/rớt
  let ketQua = "";
  let laDau = true;

  if (m1 === 0 || m2 === 0 || m3 === 0) {
    laDau = false;
    ketQua = `Bạn đã rớt do có môn bị điểm 0.`;
  } else if (tongDiem < diemChuan) {
    laDau = false;
    ketQua = `Bạn đã rớt do thiếu điểm.`;
  } else {
    laDau = true;
    ketQua = `Bạn đã ĐẬU!`;
  }

  // 6. Hiển thị kết quả ra màn hình
  resultDiv.style.display = "block";
  resultDiv.className = laDau ? "success" : "error";
  resultDiv.innerHTML = `${ketQua} <br> Tổng điểm của bạn là: ${tongDiem}`;
}
// ─── Bài 2: Tính giá trị trung bình ───────────────────────────────────────
function tinhTrungBinh() {
  let num1 = document.getElementById("num1");
  let num2 = document.getElementById("num2");
  let num3 = document.getElementById("num3");
  let num4 = document.getElementById("num4");
  let num5 = document.getElementById("num5");

  let numbers = [num1, num2, num3, num4, num5];

  if (numbers.some((n) => !n.value || isNaN(n.value))) {
    showWarning(
      "Hãy nhập đầy đủ và đúng định dạng số trước khi tính trung bình.",
    );
    document.getElementById("result-area-2").innerHTML = "";
    return;
  }

  let sum = numbers.reduce((acc, n) => acc + parseFloat(n.value), 0);
  let average = sum / numbers.length;
  showResult("result-area-2", "Giá trị trung bình:", average.toFixed(2));
}
// ─── Bài 3: Quy đổi tiền tệ ───────────────────────────────────────────────
function quyDoiTienTe() {
  let usd = document.getElementById("usd");

  if (!usd.value || isNaN(usd.value) || usd.value <= 0) {
    showWarning("Hãy nhập số tiền USD hợp lệ trước khi thực hiện quy đổi.");
    document.getElementById("result-area-3").innerHTML = "";
    return;
  }
  let vnd = usd.value * 23500;
  showResult("result-area-3", "Số tiền (VNĐ):", formatVND(vnd));
}
// ─── Bài 4: Tính diện tích và chu vi hình chữ nhật ─────────────────────────
function tinhDienTichChuVi() {
  let length = parseFloat(document.getElementById("length").value);
  let width = parseFloat(document.getElementById("width").value);

  if (
    isNaN(length) ||
    isNaN(width) ||
    length <= 0 ||
    width <= 0 ||
    length < width
  ) {
    showWarning("Hãy nhập chiều dài và chiều rộng hợp lệ trước khi tính.");
    document.getElementById("result-area-4").innerHTML = "";
    return;
  }

  let area = length * width;
  let perimeter = 2 * (length + width);

  showResult("result-area-4", "Diện tích:", area.toFixed(2) + " m²");
  showResult("result-area-5", "Chu vi:", perimeter.toFixed(2) + " m");
}
// ─── Bài 5: Tính tổng 2 ký số ───────────────────────────────────────────────
const tinhTongKySo = () => {
  let number = document.getElementById("numberInput").value;
  if (!number || isNaN(number) || number < 10 || number > 99) {
    showWarning("Hãy nhập một số có 2 chữ số hợp lệ.");
    document.getElementById("result-area-6").innerHTML = "";
    return;
  }
  let tens = Math.floor(number / 10);
  let units = number % 10;
  let sum = tens + units;
  showResult("result-area-6", "Tổng 2 ký số:", sum);
};
