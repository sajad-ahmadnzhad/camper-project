function createOrUpdateCamperModal(camper = null) {
  const nameValue = camper ? camper.name : "";
  const priceValue = camper ? camper.price : "";
  const descriptionValue = camper ? camper.description : "";
  const mainImageSrc = camper ? camper.mainImage : "/assets/images/no-image.jpg";

  const confirmButtonText = camper ? "بروزرسانی کمپر" : "ثبت کمپر";
  // const images
  Swal.fire({
    html: `
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">${confirmButtonText}</h5>
      <form enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-12">
            <div class="mb-3">
              <input value="${nameValue}" type="text" class="form-control" id="name" placeholder="نام کمپر" />
            </div>
          </div>
          <div class="col-md-12">
            <div class="mb-3">
              <input value="${priceValue}" type="number" class="form-control" id="price" placeholder="قیمت به تومان" />
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
                        src="${mainImageSrc}"
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
            <textarea class="form-control" id="description" rows="5" placeholder="توضیحات کمپر">${
              descriptionValue ? descriptionValue : ""
            }</textarea>
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
      return submitCamperData((isUpdate = !!camper ? true : false), camper?.id, (originalCamper = !!camper ? camper : {}));
    },
    didOpen: () => scriptImageSelected(camper),
  });
}

function createCamperClickHandler() {
  createOrUpdateCamperModal();
}
function updateCamperClickHandler(camperEncode) {
  const camper = JSON.parse(decodeURIComponent(camperEncode));
  createOrUpdateCamperModal(camper);
}

async function scriptImageSelected(camper) {
  const resetImageBtn = document.getElementById("resetImageBtn");
  resetImageBtn.style.display = "none";

  const imagePreviewContainer = document.getElementById("imagePreviewContainer");

  if (camper && camper.images && camper.images.length > 0) {
    camper.images.forEach((imageUrl, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("position-relative", "m-2");

      const img = document.createElement("img");
      img.src = imageUrl;
      img.classList.add("img-thumbnail");
      img.style.width = "100px";
      img.style.height = "100px";

      const removeBtn = document.createElement("button");
      removeBtn.classList.add("btn", "btn-danger", "btn-sm", "position-absolute");
      removeBtn.style.top = "5px";
      removeBtn.style.right = "5px";
      removeBtn.innerHTML = "&times;";

      removeBtn.onclick = async function () {
        if (camper && camper.images[index]) {
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
              fetch(`http://localhost:3002/api/campers/remove-image/${camper.id}`, {
                method: "DELETE",
                body: JSON.stringify({ image: camper.images[index] }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  if (res.status == 200) {
                    Swal.fire({
                      title: "حذف شد!",
                      text: "عکس مورد نظر با موفقیت حذف شد",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                      timerProgressBar: true,
                    }).then(() => {
                      imgContainer.remove();
                      window.location.reload();
                    });
                  } else {
                    Swal.fire({
                      title: "خطا",
                      text: "حذف تصویر با خطا مواجه شد",
                      icon: "error",
                    });
                  }
                })
                .catch((err) => {
                  Swal.fire({
                    title: "خطا",
                    text: "از سمت سرور خطایی رخ داده است",
                    icon: "error",
                  });
                });
            }
          });
        }
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(removeBtn);
      imagePreviewContainer.appendChild(imgContainer);
    });
  }

  document.getElementById("formFiles").addEventListener("change", function (event) {
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const countChildImage = imagePreviewContainer.childElementCount;

    const files = event.target.files;
    clearErrors();

    console.log(files.length > 3, files.length + countChildImage > 3);

    if (files.length > 3 || files.length + countChildImage > 3) {
      setError("formFiles", "شما فقط می‌توانید ۳ تصویر انتخاب کنید.");
      event.target.value = "";
      return;
    }

    // imagePreviewContainer.innerHTML = "";
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

    clearErrors();

    if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("mainImage", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none";
      return;
    }

    if (file && file.size > 2 * 1024 * 1024) {
      setError("mainImage", "حجم فایل نباید بیشتر از ۲ مگابایت باشد.");
      event.target.value = "";
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none";
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImage1").src = e.target.result;
        resetImageBtn.style.display = "inline-block";
      };
      reader.readAsDataURL(file);
      fileChosen.textContent = file.name;
    } else {
      fileChosen.textContent = "فایلی انتخاب نشده";
      resetImageBtn.style.display = "none";
    }
  });

  document.getElementById("resetImageBtn").addEventListener("click", async function () {
    // if (camper && camper.mainImage) {
    //   await fetch(`http://localhost:3002/api/campers/delete-image/${camper.mainImage.id}`, {
    //     method: "DELETE",
    //   });
    // }
    document.getElementById("profileImage1").src = camper.mainImage;
    document.getElementById("mainImage").value = "";
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
    resetImageBtn.style.display = "none";
  });
}

async function submitCamperData(isUpdate = false, camperId = null, originalCamper = {}) {
  clearErrors();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const profileImage = document.getElementById("mainImage").files[0];
  const multipleImages = document.getElementById("formFiles").files;

  let hasError = false;

  // اعتبارسنجی ورودی‌ها
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

  if (hasError) {
    return false;
  }

  const formData = new FormData();

  // فقط فیلدهای تغییر کرده را ارسال کن
  if (!camperId || name !== originalCamper.name) {
    formData.append("name", name);
  }
  if (!camperId || price !== originalCamper.price) {
    formData.append("price", parseInt(price, 10));
  }
  if (!camperId || description !== originalCamper.description) {
    formData.append("description", description);
  }
  if (profileImage && profileImage.size > 2 * 1024 * 1024) {
    setError("mainImage", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
    hasError = true;
  }
  if (profileImage) {
    formData.append("camperMainImage", profileImage);
  }

  // بررسی و اضافه کردن تصاویر جدید
  if (multipleImages.length > 0) {
    for (let i = 0; i < multipleImages.length; i++) {
      if (multipleImages[i].size > 2 * 1024 * 1024) {
        setError("formFiles", `حجم فایل ${multipleImages[i].name} نباید بیشتر از ۲ مگابایت باشد.`);
        hasError = true;
      }
      formData.append("camperImages", multipleImages[i]);
    }
  }

  if (hasError) {
    return false;
  }

  try {
    const url = isUpdate ? `http://localhost:3002/api/campers/${camperId}` : "http://localhost:3002/api/campers";
    const method = isUpdate ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      body: formData,
    });
    const data = await res.json();

    if (res.status == 201 || res.status == 200) {
      Swal.fire({
        icon: "success",
        title: "موفقیت",
        text: isUpdate ? "کمپر با موفقیت به‌روزرسانی شد!" : "کمپر با موفقیت ثبت شد!",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        // پس از نمایش مودال، صفحه ریلود شود
        window.location.reload();
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

function removeCamperClickHandler(camperId) {
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
      fetch(`http://localhost:3002/api/campers/${camperId}`, { method: "DELETE" }).then((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: "حذف شد!",
            text: "کمپر با موفقیت حذف شد.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          }).then(() => {
            window.location.reload();
          });
        }
      });
    }
  });
}
