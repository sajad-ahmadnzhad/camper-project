let selectedFiles = [];

function createOrUpdateCamperModal(camper = null) {
  const nameValue = camper ? camper.name : "";
  const priceValue = camper ? camper.price : "";
  const descriptionValue = camper ? camper.description : "";
  const mainImageSrc = camper ? camper.mainImage : "/assets/images/no-image.jpg";

  const confirmButtonText = camper ? "بروزرسانی کمپر" : "ثبت کمپر";

  Swal.fire({
    width: "550px",
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
            <input value="${priceValue}" type="text" class="form-control" id="price" placeholder="قیمت به تومان" maxlength="9"/> 
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
                <div id="imagePreviewContainer" class="d-flex flex-wrap mt-3 justify-content-center align-items-center"></div>
              </div>
            </div>
          </div>
          <div class="col-md-12 mx-auto">
            <div class="container">
              <div class="mb-3 text-center">
                <div class="profile-card mx-auto">
                  <div class="text-center mb-3">
                       <img
                        id="avatarImage"
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
                  <label for="mainImage" class="form-label">تصویر اصلی</label>
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
    confirmButtonText: camper ? "بروزرسانی کمپر" : "ثبت کمپر",
    cancelButtonText: "منصرف شدم",
    preConfirm: () => {
      return submitCamperData(
        (isUpdate = !!camper ? true : false),
        camper?.id,
        (originalCamper = !!camper ? camper : {})
      );
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
function showInfoCamperClickHandler(camperEncode) {
  const camper = JSON.parse(decodeURIComponent(camperEncode));
  const nameValue = camper ? camper.name : "";
  const priceValue = camper ? camper.price : "";
  const descriptionValue = camper ? camper.description : "";
  const mainImageSrc = camper ? camper.mainImage : "/assets/images/no-image.jpg";
  const camperImages = camper ? convertToArrayIfString(camper.images) : "";

  Swal.fire({
    width: "550px",
    html: `
  <div class="card-body p-4">
    <h5 class="card-title fw-bold mb-4 text-center">جزئیات کمپر</h5>
    
    <div class="row">
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label fw-bold">نام کمپر</label>
          <p class="form-control-static">${nameValue}</p>
        </div>
      </div>
      
      <div class="col-md-12">
        <div class="mb-3">
          <label class="form-label fw-bold">قیمت</label>
          <p class="form-control-static">${priceValue.toLocaleString("fa-IR")} تومان</p>
        </div>
      </div>
    </div>
  
    <div class="row">
      <div class="col-md-12">
        <div class="mb-3 w-100">
          <div class="profile-cards">
            <label class="form-label fw-bold">تصاویر</label>
              <div id="imagePreviewContainer" class="d-flex flex-wrap mt-3 justify-content-center align-items-center">
                ${camperImages
                  .map(
                    (image) =>
                      `<div class="position-relative m-2">
                        <img src="${image}" class="img-thumbnail camper-image" style="width: 100px; height: 100px; object-fit: cover;">
                      </div>`
                  )
                  .join("")}
              </div>

          </div>
        </div>
      </div>
      
      <div class="col-md-12 mx-auto">
        <div class="container">
          <div class="mb-3 text-center">
            <div class="profile-card mx-auto">
              <div class="text-center mb-3">
                <img
                  id="avatarImage"
                  src="${mainImageSrc}"
                  alt="Profile Image"
                  class="profile-image img-thumbnail"
                  style="width: 150px; height: 150px; object-fit: cover;"
                />
              </div>
              <label class="form-label fw-bold">تصویر اصلی</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div class="row g-3">
      <div class="col-12">
        <label class="form-label fw-bold">توضیحات</label>
        <p class="form-control-static">${descriptionValue ? descriptionValue : "بدون توضیحات"}</p>
      </div>
    </div>
  </div>
      `,
    showCancelButton: false,
    showCloseButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بازگشت به لیست",
  });
}

async function scriptImageSelected(camper) {
  CKEDITOR.replace("description", {
    contentsLangDirection: "rtl",
    language: "fa",
    toolbar: [
      { name: "basicstyles", items: ["Bold", "Italic", "Underline"] },
      { name: "paragraph", items: ["BulletedList", "NumberedList"] },
      { name: "styles", items: ["Format", "FontSize"] },
      { name: "clipboard", items: ["Undo", "Redo"] },
    ],
  });

  const resetImageBtn = document.getElementById("resetImageBtn");
  resetImageBtn.style.display = "none";

  const imagePreviewContainer = document.getElementById("imagePreviewContainer");

  if (camper && camper.images && camper.images.length > 0) {
    const camperImages = camper ? convertToArrayIfString(camper.images) : "";

    camperImages.forEach((imageUrl, index) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("position-relative", "m-2");

      const img = document.createElement("img");
      img.src = imageUrl;
      img.classList.add("img-thumbnail", "camper-image");
      img.style.width = "100px";
      img.style.height = "100px";

      const removeBtn = document.createElement("a");
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
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const res = await fetch(`${apiKey}/api/campers/remove-image/${camper.id}`, {
                  method: "DELETE",
                  body: JSON.stringify({ image: camper.images[index] }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });

                const response = await res.json();

                if (res.status === 200) {
                  showAlertWithReload("success", "حذف شد!", "عکس مورد نظر با موفقیت حذف شد");
                } else if (res.status === 400) {
                  const errorMessage = Object.values(response).find((value) => value) || "خطای ناشناخته";
                  showAlert("error", "خطا", errorMessage);
                } else if (res.status >= 500 && res.status < 600) {
                  showAlert("error", "خطای سرور", "مشکلی در سرور پیش آمده است. لطفاً بعداً دوباره امتحان کنید.");
                } else {
                  showAlert("error", "خطا", "حذف کمپر با خطا مواجه شد");
                }
              } catch (error) {
                showAlert("error", "خطا", "یک خطای غیرمنتظره رخ داده است: " + error.message);
              }
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
    const countChildImage = imagePreviewContainer.querySelectorAll(".camper-image").length;
    selectedFiles = [];

    const files = Array.from(event.target.files);
    clearErrors();

    Array.from(imagePreviewContainer.children).forEach((child) => {
      if (!child.querySelector("img").classList.contains("camper-image")) {
        child.remove();
      }
    });

    if (files.length > 3 || files.length + countChildImage > 3) {
      setError("formFiles", "شما فقط می‌توانید ۳ تصویر انتخاب کنید.");
      event.target.value = "";
      selectedFiles = [];
      return false;
    }

    if (files.length > 0) {
      files.forEach((file, index) => {
        if (file.size > 2 * 1024 * 1024) {
          setError("formFiles", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
          return;
        }
        if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          setError("formFiles", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
          return;
        }

        selectedFiles.push(file);

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
            selectedFiles.splice(index, 1);
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
        document.getElementById("avatarImage").src = e.target.result;
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
    document.getElementById("avatarImage").src = camper?.mainImage || "/assets/images/no-image.jpg";
    document.getElementById("mainImage").value = "";
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
    resetImageBtn.style.display = "none";
  });
}

async function submitCamperData(isUpdate = false, camperId = null, originalCamper = {}) {
  clearErrors();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = CKEDITOR.instances.description.getData();
  const camperMainImage = document.getElementById("mainImage").files[0];

  //* Validate form data using the external validation function
  const formData = { name, price, description, camperMainImage, multipleImages: selectedFiles };
  const errors = validateCamperData(formData, isUpdate);

  let hasError = false;
  Object.keys(errors).forEach((field) => {
    setError(field, errors[field]);
    hasError = true;
  });

  if (hasError) {
    return false;
  }

  const formDataToSend = new FormData();

  if (!camperId || name !== originalCamper.name) {
    formDataToSend.append("name", name);
  }
  if (!camperId || price !== originalCamper.price) {
    formDataToSend.append("price", parseInt(price, 10));
  }
  if (!camperId || description !== originalCamper.description) {
    formDataToSend.append("description", description);
  }

  if (camperMainImage) {
    formDataToSend.append("camperMainImage", camperMainImage);
  }

  for (let i = 0; i < selectedFiles.length; i++) {
    formDataToSend.append("camperImages", selectedFiles[i]);
  }

  Swal.getConfirmButton().textContent = "ارسال اطلاعات ...";
  const url = isUpdate ? `${apiKey}/api/campers/${camperId}` : `${apiKey}/api/campers`;
  const method = isUpdate ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      body: formDataToSend,
    });
    const response = await res.json();

    if (res.status === 201 || res.status === 200) {
      Swal.getConfirmButton().textContent = isUpdate ? "بروزرسانی کمپر" : "ثبت کمپر";
      showAlertWithReload("success", "موفق", isUpdate ? "کمپر با موفقیت به‌روزرسانی شد!" : "کمپر با موفقیت ثبت شد!");
      return true;
    } else if (res.status === 400) {
      const errorMessage = Object.values(response).find((value) => value) || "خطای ناشناخته";
      Swal.getConfirmButton().textContent = isUpdate ? "بروزرسانی کمپر" : "ثبت کمپر";
      showAlert("error", "خطا", errorMessage);
      return false;
    } else if (res.status >= 500 && res.status < 600) {
      Swal.getConfirmButton().textContent = isUpdate ? "بروزرسانی کمپر" : "ثبت کمپر";
      showAlert("error", "خطای سرور", "مشکلی در سرور پیش آمده است. لطفاً بعداً دوباره امتحان کنید.");
      return false;
    } else {
      Swal.getConfirmButton().textContent = isUpdate ? "بروزرسانی کمپر" : "ثبت کمپر";
      showAlert("error", "خطای ارتباطی", "ثبت کمپر با خطا مواجه شد. لطفاً مجدداً تلاش کنید.");
      return false;
    }
  } catch (error) {
    Swal.getConfirmButton().textContent = isUpdate ? "بروزرسانی کمپر" : "ثبت کمپر";
    showAlert("error", "خطای ناشناخته", "یک خطای غیرمنتظره رخ داده است. لطفاً مجدداً تلاش کنید.");
    return false;
  }
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
      try {
        fetch(`${apiKey}/api/campers/${camperId}`, { method: "DELETE" })
          .then(async (res) => {
            const response = await res.json();

            if (res.status === 200) {
              showAlertWithReload("success", "موفق", "کمپر با موفقیت حذف شد");
            } else if (res.status === 400) {
              const errorMessage = Object.values(response).find((value) => value) || "خطای ناشناخته";
              showAlert("error", "خطا", errorMessage);
            } else if (res.status >= 500 && res.status < 600) {
              showAlert("error", "خطای سرور", "مشکلی در سرور پیش آمده است. لطفاً بعداً دوباره امتحان کنید.");
            } else {
              showAlert("error", "خطای ارتباطی", "عملیات حذف با خطا مواجه شد. لطفاً مجدداً تلاش کنید.");
            }
          })
          .catch((error) => {
            showAlert("error", "خطای ناشناخته", "یک خطای غیرمنتظره رخ داده است. لطفاً مجدداً تلاش کنید.");
          });
      } catch (error) {
        showAlert("error", "خطای ناشناخته", "یک خطای غیرمنتظره رخ داده است. لطفاً مجدداً تلاش کنید.");
      }
    }
  });
}

function validateCamperData({ name, price, description, camperMainImage, multipleImages }, isUpdate = false) {
  let errors = {};

  //* Trim input fields
  name = name ? name.trim() : "";
  price = price ? price.trim() : "";
  description = description ? description.trim() : "";

  //* Validate name
  if (!name) {
    errors.name = "نام کمپر الزامی است.";
  } else if (name.length < 5) {
    errors.name = "نام کمپر حداقل باید 5 حرف داشته باشد.";
  } else if (name.length > 100) {
    errors.name = "نام کمپر حداکثر باید 100 حرف داشته باشد.";
  }

  //* Validate price
  if (!price) {
    errors.price = "قیمت الزامی است.";
  } else if (isNaN(price) || price <= 0) {
    errors.price = "قیمت معتبر نیست.";
  } else if (parseInt(price, 10) < 90) {
    errors.price = "قیمت کمپر باید حداقل 100 باشد.";
  }
  const strippeddescription = description.replace(/<[^>]*>/g, "");
  //* Validate description
  if (!strippeddescription) {
    errors.description = "توضیحات الزامی است.";
  } else if (strippeddescription.length < 5) {
    errors.description = "توضیحات حداقل باید 5 حرف داشته باشد.";
  } else if (strippeddescription.length > 10000) {
    errors.description = "توضیحات حداکثر باید 10000 حرف داشته باشد.";
  }

  //* Validate main image
  if (camperMainImage && camperMainImage.size > 2 * 1024 * 1024) {
    errors.mainImage = "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.";
  }

  if (!isUpdate && !camperMainImage) {
    errors.mainImage = "عکس کمپر الزامی است.";
  }

  //* Validate multiple images
  if (!isUpdate && (!multipleImages || multipleImages.length === 0)) {
    errors.formFiles = "تصاویر کمپر الزامی است.";
  }

  //* Validate each file size
  if (multipleImages && multipleImages.length > 0) {
    for (let i = 0; i < multipleImages.length; i++) {
      if (multipleImages[i].size > 2 * 1024 * 1024) {
        errors.formFiles = `حجم فایل ${multipleImages[i].name} نباید بیشتر از ۲ مگابایت باشد.`;
      }
    }
  }

  return errors;
}
