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
      return submitCamperData();
    },
    didOpen: scriptImageSelected,
  });
}

function scriptImageSelected() {
  const resetImageBtn = document.getElementById("resetImageBtn");
  resetImageBtn.style.display = "none"; // مخفی کردن دکمه حذف در ابتدا

  document.getElementById("formFiles").addEventListener("change", function (event) {
    const files = event.target.files;
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");

    clearErrors();

    if (files.length > 3) {
      setError("formFiles", "شما فقط می‌توانید ۳ تصویر انتخاب کنید.");
      event.target.value = "";
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (!["image/jpeg", "image/jpg", "image/png"].includes(files[i].type)) {
        setError("formFiles", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
        event.target.value = "";
        return;
      }

      if (files[i].size > 2 * 1024 * 1024) {
        setError("formFiles", `حجم فایل ${files[i].name} نباید بیشتر از ۲ مگابایت باشد.`);
        event.target.value = "";
        return;
      }
    }

    imagePreviewContainer.innerHTML = "";
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
            imgContainer.remove();
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

    clearErrors(); // پاکسازی خطاهای قبلی

    if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("mainImage", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none"; // مخفی کردن دکمه حذف
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      setError("mainImage", "حجم فایل نباید بیشتر از ۲ مگابایت باشد.");
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none"; // مخفی کردن دکمه حذف
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImage1").src = e.target.result;
        resetImageBtn.style.display = "inline-block"; // نمایش دکمه حذف
      };
      reader.readAsDataURL(file);
      fileChosen.textContent = file.name;
    } else {
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none"; // مخفی کردن دکمه حذف
    }
  });

  document.getElementById("resetImageBtn").addEventListener("click", function () {
    document.getElementById("profileImage1").src = "/assets/images/no-image.jpg";
    document.getElementById("mainImage").value = "";
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
    resetImageBtn.style.display = "none"; // مخفی کردن دکمه حذف بعد از حذف تصویر
  });
}

async function submitCamperData() {
  clearErrors();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const profileImage = document.getElementById("mainImage").files[0];
  const multipleImages = document.getElementById("formFiles").files;

  let hasError = false;

  if (!name) {
    setError("name", "نام کمپر الزامی است.");
    hasError = true;
  }

  if (!price || isNaN(price) || price <= 0) {
    setError("price", "قیمت معتبر نیست.");
    hasError = true;
  }

  if (!description) {
    setError("description", "توضیحات الزامی است.");
    hasError = true;
  }

  // چک کردن اینکه آیا تصویری انتخاب شده است یا خیر
  if (!profileImage) {
    setError("mainImage", "تصویر پروفایل الزامی است.");
    hasError = true;
  }

  if (multipleImages.length === 0) {
    setError("formFiles", "حداقل یک تصویر برای گالری الزامی است.");
    hasError = true;
  }

  if (profileImage && profileImage.size > 2 * 1024 * 1024) {
    setError("mainImage", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
    hasError = true;
  }

  for (let i = 0; i < multipleImages.length; i++) {
    if (multipleImages[i].size > 2 * 1024 * 1024) {
      setError("formFiles", `حجم فایل ${multipleImages[i].name} نباید بیشتر از ۲ مگابایت باشد.`);
      hasError = true;
    }
  }

  if (hasError) {
    return false;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", parseInt(price, 10));
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
      Swal.fire({
        icon: "success",
        title: "موفقیت",
        text: "کمپر با موفقیت ثبت شد!",
      });
      return true;
    } else if (res.status == 400) {
      let errorMessage = "";

      Object.keys(data).forEach((key) => {
        errorMessage += `${data[key]} \n`;
      });

      Swal.fire({
        icon: "error",
        title: "خطا",
        text: errorMessage,
      });

      return false;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "خطای ارتباطی",
      text: "ثبت کمپر با خطا مواجه شد. لطفاً مجدداً تلاش کنید.",
    });

    return false;
  }
}

function setError(fieldId, errorMessage) {
  const field = document.getElementById(fieldId);

  if (field.parentNode.querySelector(".text-danger")) {
    return;
  }

  const errorSpan = document.createElement("span");
  errorSpan.className = "text-danger";
  errorSpan.textContent = errorMessage;

  errorSpan.style.display = "block";
  errorSpan.style.marginTop = "5px";
  errorSpan.style.fontSize = "16px";

  field.parentNode.appendChild(errorSpan);
}

function clearErrors() {
  const errorSpans = document.querySelectorAll(".text-danger");
  errorSpans.forEach((span) => span.remove());
}

function handleFormErrors(errors) {
  Object.entries(errors).forEach(([field, message]) => {
    setError(field, message);
  });
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
