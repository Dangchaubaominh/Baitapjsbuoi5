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
// ─── Bài 1: Quản lý tuyển sinh ───────────────────────────────────────────────
function tinhKetQuaTuyenSinh() {
  // 1. Lấy dữ liệu từ các ô input và parse về dạng số thực
  const diemChuan = parseFloat(document.getElementById("diemChuan").value);
  const m1 = parseFloat(document.getElementById("diemMon1").value);
  const m2 = parseFloat(document.getElementById("diemMon2").value);
  const m3 = parseFloat(document.getElementById("diemMon3").value);
  const khuVuc = document.getElementById("khuVuc").value;
  const doiTuong = document.getElementById("doiTuong").value;
  const resultDiv = document.getElementById("resultTuyenSinh");

  // Kiểm tra nếu người dùng chưa nhập đủ số liệu hoặc nhập điểm âm
  if (
    isNaN(diemChuan) ||
    isNaN(m1) ||
    isNaN(m2) ||
    isNaN(m3) ||
    diemChuan < 0 ||
    m1 < 0 ||
    m2 < 0 ||
    m3 < 0
  ) {
    resultDiv.style.display = "block";
    resultDiv.className = "error";
    resultDiv.innerHTML =
      "Vui lòng nhập đầy đủ và chính xác điểm số (điểm >= 0)!";
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
    ketQua = `Bạn đã rớt do có môn bị điểm liệt (điểm 0).`;
  } else if (tongDiem < diemChuan) {
    laDau = false;
    ketQua = `Bạn đã rớt do không đạt điểm chuẩn.`;
  } else {
    laDau = true;
    ketQua = `Chúc mừng! Bạn đã ĐẬU.`;
  }

  // 6. Hiển thị kết quả ra màn hình
  resultDiv.style.display = "block";
  resultDiv.className = laDau ? "success" : "error";
  resultDiv.innerHTML = `${ketQua} <br> Tổng điểm của bạn là: <strong>${tongDiem}</strong>`;
}
// ─── Bài 2: Tính tiền điện ────────────────────────────────────────────────────
// Yêu cầu: Tính tiền điện dựa trên số Kw tiêu thụ theo các mốc lũy tiến[cite: 65, 66, 67, 68, 69, 70].
function tinhTienDien() {
  const tenKhachHang = document.getElementById("tenKhachHang").value;
  const kw = parseFloat(document.getElementById("soKw").value);
  const resultDiv = document.getElementById("resultTienDien");

  if (!tenKhachHang || isNaN(kw) || kw < 0) {
    resultDiv.style.display = "block";
    resultDiv.className = "error";
    resultDiv.innerHTML = "Vui lòng nhập tên và số Kw tiêu thụ hợp lệ!";
    return;
  }

  let tienDien = 0;
  // Tính toán theo từng mốc giá quy định
  if (kw <= 50) {
    tienDien = kw * 500;
  } else if (kw <= 100) {
    tienDien = 50 * 500 + (kw - 50) * 650;
  } else if (kw <= 200) {
    tienDien = 50 * 500 + 50 * 650 + (kw - 100) * 850;
  } else if (kw <= 350) {
    tienDien = 50 * 500 + 50 * 650 + 100 * 850 + (kw - 200) * 1100;
  } else {
    tienDien = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kw - 350) * 1300;
  }

  resultDiv.style.display = "block";
  resultDiv.className = "success";
  // Format tiền tệ VNĐ cho đẹp
  const tienDienFormatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(tienDien);
  resultDiv.innerHTML = `Khách hàng: ${tenKhachHang} <br> Tiền điện: ${tienDienFormatted}`;
}

// ─── Bài 3: Tính thuế thu nhập cá nhân ─────────────────────────────────────────
// Yêu cầu: Tính thuế lũy tiến dựa trên thu nhập chịu thuế[cite: 74, 75, 76, 77].
function tinhThueThuNhap() {
  const ten = document.getElementById("tenNguoiNopThue").value;
  const tongThuNhap = parseFloat(document.getElementById("tongThuNhap").value);
  const soNguoiPhuThuoc = parseInt(
    document.getElementById("soNguoiPhuThuoc").value,
  );
  const resultDiv = document.getElementById("resultThue");

  if (
    !ten ||
    isNaN(tongThuNhap) ||
    isNaN(soNguoiPhuThuoc) ||
    tongThuNhap <= 0 ||
    soNguoiPhuThuoc < 0
  ) {
    resultDiv.style.display = "block";
    resultDiv.className = "error";
    resultDiv.innerHTML =
      "Vui lòng nhập đầy đủ và chính xác thông tin tính thuế!";
    return;
  }

  // Thu nhập chịu thuế = Tổng thu nhập năm - 4tr - Số người phụ thuộc * 1.6tr [cite: 76]
  const thuNhapChiuThue = tongThuNhap - 4000000 - soNguoiPhuThuoc * 1600000;
  let thue = 0;

  // Xử lý biểu thuế lũy tiến theo bảng % [cite: 77]
  if (thuNhapChiuThue <= 0) {
    thue = 0;
  } else if (thuNhapChiuThue <= 60000000) {
    thue = thuNhapChiuThue * 0.05;
  } else if (thuNhapChiuThue <= 120000000) {
    thue = 60000000 * 0.05 + (thuNhapChiuThue - 60000000) * 0.1;
  } else if (thuNhapChiuThue <= 210000000) {
    thue =
      60000000 * 0.05 + 60000000 * 0.1 + (thuNhapChiuThue - 120000000) * 0.15;
  } else if (thuNhapChiuThue <= 384000000) {
    thue =
      60000000 * 0.05 +
      60000000 * 0.1 +
      90000000 * 0.15 +
      (thuNhapChiuThue - 210000000) * 0.2;
  } else if (thuNhapChiuThue <= 624000000) {
    thue =
      60000000 * 0.05 +
      60000000 * 0.1 +
      90000000 * 0.15 +
      174000000 * 0.2 +
      (thuNhapChiuThue - 384000000) * 0.25;
  } else if (thuNhapChiuThue <= 960000000) {
    thue =
      60000000 * 0.05 +
      60000000 * 0.1 +
      90000000 * 0.15 +
      174000000 * 0.2 +
      240000000 * 0.25 +
      (thuNhapChiuThue - 624000000) * 0.3;
  } else {
    thue =
      60000000 * 0.05 +
      60000000 * 0.1 +
      90000000 * 0.15 +
      174000000 * 0.2 +
      240000000 * 0.25 +
      336000000 * 0.3 +
      (thuNhapChiuThue - 960000000) * 0.35;
  }

  resultDiv.style.display = "block";
  resultDiv.className = "success";
  resultDiv.innerHTML = `Họ tên: ${ten} <br> Tiền thuế thu nhập cá nhân: ${new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(thue)}`;
}

// ─── Bài 4: Tính tiền cáp ─────────────────────────────────────────────────────
// Sự kiện: Nếu là Doanh nghiệp thì hiện ô nhập số kết nối, Nhà dân thì ẩn/disabled[cite: 93].
const loaiKhachHangSelect = document.getElementById("loaiKhachHang");
const soKetNoiInput = document.getElementById("soKetNoi");

if (loaiKhachHangSelect) {
  loaiKhachHangSelect.addEventListener("change", (e) => {
    if (e.target.value === "doanhNghiep") {
      soKetNoiInput.style.display = "block";
      soKetNoiInput.disabled = false;
    } else {
      soKetNoiInput.style.display = "none";
      soKetNoiInput.disabled = true;
      soKetNoiInput.value = ""; // Clear giá trị cũ nếu có
    }
  });
}

function tinhTienCap() {
  const maKH = document.getElementById("maKhachHang").value;
  const loaiKH = loaiKhachHangSelect.value;
  const soKenh = parseInt(document.getElementById("soKenhCaoCap").value);
  const resultDiv = document.getElementById("resultTienCap");

  if (!maKH || !loaiKH || isNaN(soKenh) || soKenh < 0) {
    resultDiv.style.display = "block";
    resultDiv.className = "error";
    resultDiv.innerHTML = "Vui lòng nhập đầy đủ thông tin hợp lệ!";
    return;
  }

  let tongTien = 0;

  // Tính toán theo từng loại đối tượng khách hàng [cite: 82]
  if (loaiKH === "nhaDan") {
    // Phí xử lý 4.5$, cơ bản 20.5$, thuê kênh cao cấp 7.5$/kênh [cite: 84, 85, 86]
    tongTien = 4.5 + 20.5 + soKenh * 7.5;
  } else if (loaiKH === "doanhNghiep") {
    const soKetNoi = parseInt(soKetNoiInput.value);
    if (isNaN(soKetNoi) || soKetNoi < 0) {
      resultDiv.style.display = "block";
      resultDiv.className = "error";
      resultDiv.innerHTML = "Vui lòng nhập số kết nối hợp lệ cho doanh nghiệp!";
      return;
    }

    // Phí dịch vụ cơ bản 75$ cho 10 kết nối đầu, kết nối thêm giá 5$/kết nối [cite: 90]
    let phiDichVuCoBan = 75;
    if (soKetNoi > 10) {
      phiDichVuCoBan += (soKetNoi - 10) * 5;
    }
    // Tổng = Xử lý (15$) + Cơ bản + Kênh cao cấp (50$/kênh) [cite: 88, 91]
    tongTien = 15 + phiDichVuCoBan + soKenh * 50;
  }

  resultDiv.style.display = "block";
  resultDiv.className = "success";
  resultDiv.innerHTML = `Mã khách hàng: ${maKH} <br> Tổng tiền cáp: $${tongTien.toFixed(2)}`;
}
