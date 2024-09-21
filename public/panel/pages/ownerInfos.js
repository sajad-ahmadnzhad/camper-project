document.getElementById("avatarURL").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profileImage1").src = e.target.result;
      document.getElementById("resetImageBtn1").style.display = "inline-block"; // نمایش دکمه حذف
      document.getElementById("file-chosen1").textContent = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("resetImageBtn1").style.display = "none"; // مخفی کردن دکمه حذف
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
  }
});

document.getElementById("mainCover").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profileImage2").src = e.target.result;
      document.getElementById("resetImageBtn2").style.display = "inline-block"; // نمایش دکمه حذف
      document.getElementById("file-chosen2").textContent = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("resetImageBtn2").style.display = "none"; // مخفی کردن دکمه حذف
    document.getElementById("file-chosen2").textContent = "فایلی انتخاب نشده";
  }
});

// تابع بازنشانی تصویر
function resetImage(imageId, defaultSrc, chosenTextId, resetButtonId) {
  document.getElementById(imageId).src = defaultSrc;
  document.getElementById(chosenTextId).textContent = "فایلی انتخاب نشده";
  document.getElementById(resetButtonId).style.display = "none"; // مخفی کردن دکمه حذف بعد از حذف تصویر
}
