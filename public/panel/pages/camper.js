function createCamperClickHandler() {
  Swal.fire({
    html: `
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">ثبت کمپر جدید</h5>
      <form enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-12">
            <div class="mb-3">
              <input type="text" class="form-control" id="name" placeholder="نام کمپر" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-3">
              <input type="number" class="form-control" id="price" placeholder="قیمت به تومان" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="mb-3 w-100">
              <div class="profile-cards">
                <label for="images" class="form-label">تصاویر</label>
                <div class="custom-file-upload">
                  <label for="formFiles" class="btn btn-primary">انتخاب تصاویر</label>
                  <input class="form-control" type="file" accept=".jpg, .png, .jpeg" id="formFiles" multiple style="display: none" />
                </div>
                <div id="imagePreviewContainer" class="d-flex flex-wrap mt-3"></div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mx-auto">
            <div class="container">
              <div class="mb-3 text-center">
                <div class="profile-card mx-auto">
                  <div class="text-center mb-3">
                    <img
                      id="profileImage1"
                      src="/assets/images/no-image.jpg"
                      alt="Profile Image"
                      class="profile-image img-thumbnail"
                      style="width: 150px; height: 150px"
                    />
                    <button
                      type="button"
                      class="btn btn-danger w-60 m-auto mt-2"
                      id="resetImageBtn"
                    >
                      حذف تصویر
                    </button>
                  </div>
                  <label for="mainImage" class="form-label">تصویر پروفایل</label>
                  <div class="custom-file-upload text-center">
                    <label for="mainImage" class="btn btn-primary">انتخاب فایل</label>
                    <br />
                    <span id="file-chosen1">فایلی انتخاب نشده</span>
                    <input class="form-control" type="file" accept=".jpg, .png, .jpeg" id="mainImage" style="display: none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-12">
            <label for="description" class="form-label">توضیحات</label>
            <textarea class="form-control" id="description" rows="5" placeholder="توضیحات کمپر"></textarea>
          </div>
        </div>
      </form>
    </div>
    `,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ثبت کمپر",
    cancelButtonText: "منصرف شدم",
    preConfirm: () => {
      submitCamperData();
    },
    didOpen: scriptImageSelected,
  });
}

function scriptImageSelected() {
  // برای انتخاب 3 تصویر حداکثر
  document.getElementById("formFiles").addEventListener("change", function (event) {
    const files = event.target.files;
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");

    // بررسی تعداد فایل‌های انتخاب شده
    if (files.length > 3) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "شما فقط می‌توانید ۳ تصویر انتخاب کنید.",
      });
      event.target.value = "";
      return;
    }

    // بررسی نوع و حجم هر فایل
    for (let i = 0; i < files.length; i++) {
      // بررسی نوع فایل
      if (!["image/jpeg", "image/jpg", "image/png"].includes(files[i].type)) {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.",
        });
        event.target.value = "";
        return;
      }

      // بررسی حجم فایل (بیشتر از 2 مگابایت)
      if (files[i].size > 2 * 1024 * 1024) {
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: `حجم فایل ${files[i].name} نباید بیشتر از ۲ مگابایت باشد.`,
        });
        event.target.value = "";
        return;
      }
    }

    // اگر همه بررسی‌ها تایید شد، پیش‌نمایش تصاویر را نمایش بده
    imagePreviewContainer.innerHTML = ""; // پاک کردن پیش‌نمایش قبلی
    if (files.length > 0) {
      Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("position-relative", "m-2");

          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("img-thumbnail");
          img.style.width = "100px";
          img.style.height = "100px";

          const removeBtn = document.createElement("button");
          removeBtn.classList.add("btn", "btn-danger", "btn-sm", "position-absolute");
          removeBtn.style.top = "5px";
          removeBtn.style.right = "5px";
          removeBtn.innerHTML = "&times;";
          removeBtn.onclick = function () {
            imgContainer.remove(); // حذف تصویر از لیست
          };

          imgContainer.appendChild(img);
          imgContainer.appendChild(removeBtn);
          imagePreviewContainer.appendChild(imgContainer);
        };
        reader.readAsDataURL(file);
      });
    }
  });

  document.getElementById("mainImage").addEventListener("change", function (event) {
    const file = event.target.files[0];
    const fileChosen = document.getElementById("file-chosen1");

    // بررسی نوع فایل
    if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.",
      });
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      return;
    }

    // بررسی حجم فایل (بیشتر از 2 مگابایت)
    if (file && file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "حجم فایل نباید بیشتر از ۲ مگابایت باشد.",
      });
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      return;
    }

    // نمایش پیش‌نمایش تصویر در صورت تایید
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImage1").src = e.target.result;
      };
      reader.readAsDataURL(file);
      fileChosen.textContent = file.name;
    } else {
      fileChosen.textContent = "فایلی انتخاب نشده";
    }
  });

  document.getElementById("resetImageBtn").addEventListener("click", function () {
    document.getElementById("profileImage1").src = "/assets/images/no-image.jpg";
    document.getElementById("mainImage").value = ""; // ریست کردن input
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده"; // متن پیش فرض
  });
}

async function submitCamperData() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const profileImage = document.getElementById("mainImage").files[0];
  const multipleImages = document.getElementById("formFiles").files;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);

  if (profileImage) {
    formData.append("camperMainImage", profileImage);
  }

  if (multipleImages.length > 0) {
    for (let i = 0; i < multipleImages.length; i++) {
      formData.append("camperImages", multipleImages[i]);
    }
  }

  try {
    const res = await fetch("http://localhost:3002/api/campers", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.status == 201) {
      Swal.fire("موفق", "کمپر با موفقیت ثبت شد!", "success");
    } else if (res.status == 400) {
      if (typeof data === "object") {
        let errorMessages = "";

        Object.entries(data).forEach(([field, message]) => {
          errorMessages += `${field}: ${message}\n`;
        });

        Swal.fire("خطا", errorMessages, "error");
      } else {
        Swal.fire("خطا", "مشکلی رخ داده است", "error");
      }
    }
  } catch (error) {
    Swal.fire("خطا", "ثبت کمپر با خطا مواجه شد", "error");
  }
}

function updateCamperClickHandler() {
  Swal.fire({
    html: `
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">بروزرسانی کمپر</h5>
      <form>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="name" class="form-label">نام کمپر</label>
              <input type="text" class="form-control" id="name" placeholder="نام کمپر" />
            </div>
            <div class="mb-3">
              <label for="images" class="form-label">تصاویر</label>
              <input type="text" class="form-control" id="images" placeholder="لینک تصاویر" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="price" class="form-label">قیمت</label>
              <input type="number" class="form-control" id="price" placeholder="قیمت به تومان" />
            </div>
            <div class="mb-3">
              <label for="mainImage" class="form-label">تصویر اصلی</label>
              <input type="url" class="form-control" id="mainImage" placeholder="لینک تصویر اصلی کمپر" />
            </div>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">توضیحات</label>
            <textarea class="form-control" id="description" rows="5" placeholder="توضیحات کمپر"></textarea>
          </div>
        </div>
      </form>
    </div>
    `,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ثبت کمپر",
    cancelButtonText: "منصرف شدم",
  });
}

function removeCamperClickHandler() {
  Swal.fire({
    title: "آیا مطمئن هستید؟",
    text: "شما قادر به بازگرداندن این عملیات نخواهید بود!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله، حذف شود!",
    cancelButtonText: "لغو",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "حذف شد!",
        text: "کمپر با موفقیت حذف شد.",
        icon: "success",
      });
    }
  });
}
