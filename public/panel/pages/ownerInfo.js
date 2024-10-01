const submitButton = document.getElementById("submit-ownerInfos");

document.addEventListener("DOMContentLoaded", async () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  let isUpdate = false;
  document.getElementById("avatarURL").value = "";
  document.getElementById("mainCover").value = "";

  let initialData = {};

  try {
    const response = await fetch(`http://localhost:3002/api/ownerInfo`);
    if (response.ok) {
      const data = await response.json();
      fillFormWithUserData(data);
      initialData = data;
      isUpdate = true;
    }
  } catch (error) {
    console.log("User does not exist or error fetching data", error.message);
  }

  document.querySelector("form").addEventListener("submit", async (e) => {
    disableSubmitButton();
    e.preventDefault();
    clearErrors();
    hasError = false;

    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const bio = CKEDITOR.instances.bio.getData();
    const summary = document.getElementById("summary").value;

    const formDataValue = { fullName, phoneNumber, email, bio, summary };
    const errors = validateOwnerInfo(formDataValue, isUpdate);

    Object.keys(errors).forEach((field) => {
      setError(field, errors[field]);
      hasError = true;
    });

    const socialLinks = Array.from(document.querySelectorAll(".social-link"))
      .map((input) => input.value)
      .filter((value) => value !== "");

    const formData = new FormData();
    const currentData = {
      fullName: document.getElementById("fullName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      bio: CKEDITOR.instances.bio.getData(),
      summary: document.getElementById("summary").value,
      socialLinks: socialLinks,
    };

    for (const key in currentData) {
      if (JSON.stringify(initialData[key]) !== JSON.stringify(currentData[key])) {
        if (key === "socialLinks") {
          currentData[key].forEach((link, index) => {
            formData.append(`socialLinks[${index}]`, link);
          });
        } else {
          formData.append(key, currentData[key]);
        }
      }
    }

    const avatarFileInput = document.getElementById("avatarURL").files[0];
    const mainCoverFileInput = document.getElementById("mainCover").files[0];

    if (avatarFileInput) {
      if (avatarFileInput.size > 2 * 1024 * 1024) {
        hasError = true;
      } else if (avatarFileInput && !["image/jpeg", "image/jpg", "image/png"].includes(avatarFileInput.type)) {
        hasError = true;
      }
    }
    if (mainCoverFileInput) {
      if (mainCoverFileInput.size > 2 * 1024 * 1024) {
        hasError = true;
      } else if (mainCoverFileInput && !["image/jpeg", "image/jpg", "image/png"].includes(mainCoverFileInput.type)) {
        hasError = true;
      }
    }

    if (avatarFileInput) formData.append("avatar", avatarFileInput);
    if (mainCoverFileInput) formData.append("cover", mainCoverFileInput);

    if (hasError) {
      enableSubmitButton();
      return false;
    }

    const method = Object.keys(initialData).length > 0 ? "PUT" : "POST";
    const apiUrl = `http://localhost:3002/api/ownerInfo`;

    try {
      const res = await fetch(apiUrl, {
        method: method,
        body: formData,
      });

      const response = await res.json();

      if (res.status === 200) {
        showAlertWithReload("success", "موفق", response.message || "عملیات با موفقیت انجام شد");
      } else if (res.status === 201) {
        showAlertWithReload("success", "موفق", "اطلاعات مالک با موفقیت ثبت شد");
      } else if (res.status === 400) {
        const errorMessage = Object.values(response).find((value) => value) || "خطای ناشناخته";
        showAlert("error", "خطا", errorMessage);
      } else if (res.status >= 500 && res.status < 600) {
        showAlert("error", "خطای سرور", "مشکلی در سرور پیش آمده است. لطفاً بعداً مجدداً تلاش کنید.");
      } else {
        showAlert("error", "خطا شبکه", "خطایی از سمت سرور پیش آمده");
      }
    } catch (error) {
      showAlert("error", "خطای شبکه", "یک خطای ناشناخته رخ داده است: " + error.message);
    }
  });
});

function disableSubmitButton() {
  submitButton.innerText = "ارسال اطلاعات...";
  submitButton.disabled = true;
}
function enableSubmitButton() {
  submitButton.innerText = "ثبت تغییرات";
  submitButton.disabled = false;
}
document.getElementById("addSocialLink").addEventListener("click", () => {
  const container = document.getElementById("socialLinksContainer");

  const newInputGroup = document.createElement("div");
  newInputGroup.classList.add("social-link-group");

  newInputGroup.innerHTML = `
    <input type="url" class="form-control social-link" placeholder="لینک شبکه اجتماعی" />
    <button type="button" class="btn remove-social-link">حذف</button>
  `;

  container.appendChild(newInputGroup);

  newInputGroup.querySelector(".remove-social-link").addEventListener("click", function () {
    this.parentElement.remove();
  });
});

function fillFormWithUserData(data = {}) {
  document.getElementById("fullName").value = data.fullName || "";
  document.getElementById("phoneNumber").value = data.phoneNumber || "";
  document.getElementById("email").value = data.email || "";
  const bio = (document.getElementById("bio").value = data.bio || "");
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("avatarImage").src = data.avatarURL || "";
  document.getElementById("mainImage").src = data.mainCover || "";

  document.getElementById("bio").value = bio;

  CKEDITOR.replace("bio", {
    contentsLangDirection: "rtl",
    language: "fa",
    toolbar: [
      { name: "basicstyles", items: ["Bold", "Italic", "Underline"] },
      { name: "paragraph", items: ["BulletedList", "NumberedList"] },
      { name: "styles", items: ["Format", "FontSize"] },
      { name: "clipboard", items: ["Undo", "Redo"] },
    ],
  });

  document.getElementById("loader").style.display = "none";
  document.getElementById("bio").style.display = "block";

  const socialLinksContainer = document.getElementById("socialLinksContainer");

  socialLinksContainer.innerHTML = "";
  data.socialLinks.forEach((link) => {
    const newInputGroup = document.createElement("div");
    newInputGroup.classList.add("social-link-group");

    newInputGroup.innerHTML = `
      <input type="url" class="form-control social-link" value="${link}" />
      <button type="button" class=" remove-social-link">حذف</button>
    `;

    newInputGroup.querySelector(".remove-social-link").addEventListener("click", function () {
      this.parentElement.remove();
    });

    socialLinksContainer.appendChild(newInputGroup);
  });
}

document.getElementById("avatarURL").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      setError("avatarURL", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
      return (hasError = true);
    } else if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("avatarURL", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
      return (hasError = true);
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("avatarImage").src = e.target.result;
      document.getElementById("file-chosen1").textContent = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
  }
});

document.getElementById("mainCover").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      setError("mainCover", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
      return (hasError = true);
    } else if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("avatarURL", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      document.getElementById("file-chosen2").textContent = file.name;
      return (hasError = true);
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("mainImage").src = e.target.result;
      document.getElementById("file-chosen2").textContent = file.name;
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById("file-chosen2").textContent = "فایلی انتخاب نشده";
  }
});

function validateOwnerInfo({ fullName, phoneNumber, email, bio, summary, avatarImage, mainCoverImage }, isUpdate) {
  let errors = {};

  //* Trim input fields
  fullName = fullName ? fullName.trim() : "";
  phoneNumber = phoneNumber ? phoneNumber.trim() : "";
  email = email ? email.trim() : "";
  bio = bio ? bio.trim() : "";
  summary = summary ? summary.trim() : "";

  //* Full Name validation
  if (!fullName) {
    errors.fullName = "نام نمی تواند خالی باشد.";
  } else if (fullName.length < 5) {
    errors.fullName = "نام حداقل باید 5 حرف داشته باشد.";
  } else if (fullName.length > 100) {
    errors.fullName = "نام حداکثر باید 100 حرف داشته باشد.";
  }

  const strippedBio = bio.replace(/<[^>]*>/g, "");

  if (!strippedBio) {
    errors.bio = "بیوگرافی نمی تواند خالی باشد.";
  } else if (strippedBio.length < 10) {
    errors.bio = "بیوگرافی حداقل باید 10 حرف داشته باشد.";
  } else if (strippedBio.length > 1000) {
    errors.bio = "بیوگرافی حداکثر باید 1000 حرف داشته باشد.";
  }

  //* Phone Number validation
  const phoneRegex = /^09\d{9}$/;
  if (!phoneNumber) {
    errors.phoneNumber = "شماره تلفن اجباری می باشد.";
  } else if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = "شماره موبایل وارد شده نادرست می باشد.";
  }

  //* Email validation
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "ایمیل نادرست می باشد.";
  }

  //* Summary validation
  if (!summary) {
    errors.summary = "خلاصه نمی تواند خالی باشد.";
  } else if (summary.length < 5) {
    errors.summary = "خلاصه حداقل باید 5 حرف داشته باشد.";
  } else if (summary.length > 30) {
    errors.summary = "خلاصه حداکثر باید 30 حرف داشته باشد.";
  }

  return errors;
}
