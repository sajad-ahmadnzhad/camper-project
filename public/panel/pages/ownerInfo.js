const submitButton = document.getElementById("submit-ownerInfos");

document.addEventListener("DOMContentLoaded", async () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  let isUpdate = false;
  let initialData = {};

  document.getElementById("avatarURL").value = "";
  document.getElementById("mainCover").value = "";

  try {
    const response = await fetch(`http://localhost:3002/api/ownerInfo`);
    const data = (await response.json()) || {};

    if (response.ok) {
      if (data) {
        fillFormWithUserData(data);
        initialData = data;
        isUpdate = true;
      }
    }
  } catch (error) {
    console.log("User does not exist or error fetching data", error.message);
  }

  document.querySelector("form").addEventListener("submit", async (e) => {
    disableSubmitButton();
    e.preventDefault();
    clearErrors();
    hasError = false;

    const fullName = document.getElementById("fullName").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const bio = CKEDITOR.instances.bio.getData();
    const summary = document.getElementById("summary").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const instagram = document.getElementById("instagram").value.trim();

    const avatarInputElement = document.getElementById("avatarURL");
    const mainCoverInputElement = document.getElementById("mainCover");

    const avatarFileInput = avatarInputElement.files[0];
    const mainCoverFileInput = mainCoverInputElement.files[0];

    const formDataValue = {
      fullName,
      phoneNumber,
      email,
      bio,
      summary,
      telegram,
      instagram,
      avatarFileInput,
      mainCoverFileInput,
    };
    const errors = validateOwnerInfo(formDataValue, isUpdate);

    Object.keys(errors).forEach((field) => {
      setError(field, errors[field]);
      hasError = true;
    });

    const formData = new FormData();
    const currentData = {
      fullName: document.getElementById("fullName").value.trim(),
      phoneNumber: document.getElementById("phoneNumber").value.trim(),
      email: document.getElementById("email").value.trim(),
      bio: CKEDITOR.instances.bio.getData(),
      summary: document.getElementById("summary").value.trim(),
      telegram: document.getElementById("telegram").value.trim(),
      instagram: document.getElementById("instagram").value.trim(),
    };

    for (const key in currentData) {
      if (JSON.stringify(initialData[key]) !== JSON.stringify(currentData[key])) {
        formData.append(key, currentData[key]);
      }
    }

    if (avatarFileInput) {
    }

    if (mainCoverFileInput) {
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
        enableSubmitButton();
        showAlert("error", "خطا", errorMessage);
      } else if (res.status >= 500 && res.status < 600) {
        enableSubmitButton();
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

function fillFormWithUserData(data = {}) {
  const bio = (document.getElementById("bio").value = data?.bio || "");

  document.getElementById("fullName").value = data?.fullName || "";
  document.getElementById("phoneNumber").value = data?.phoneNumber || "";
  document.getElementById("email").value = data?.email || "";
  document.getElementById("summary").value = data?.summary || "";
  document.getElementById("telegram").value = data?.telegram || "";
  document.getElementById("instagram").value = data?.instagram || "";
  document.getElementById("avatarImage").src = data?.avatarURL || "/assets/images/no-image.jpg";
  document.getElementById("mainImage").src = data?.mainCover || "/assets/images/no-image.jpg";

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
}

document.getElementById("avatarURL").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    clearError("avatarURL");

    if (file.size > 2 * 1024 * 1024) {
      setError("avatarURL", "حجم تصویر پروفایل نباید بیشتر از ۲ مگابایت باشد.");
      return (hasError = true);
    } else if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("avatarURL", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      document.getElementById("file-chosen1").textContent = "فایلی انتخاب نشده";
      return (hasError = true);
    } else {
      setError("avatarURL", "");
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
    clearError("mainCover");

    if (file.size > 2 * 1024 * 1024) {
      setError("mainCover", "حجم فایل پروفایل نباید بیشتر از ۲ مگابایت باشد.");
      return (hasError = true);
    } else if (file && !["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setError("avatarURL", "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.");
      event.target.value = "";
      document.getElementById("file-chosen2").textContent = file.name;
      return (hasError = true);
    } else {
      setError("avatarURL", "");
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

const socialLinksContainer = document.getElementById("socialLinksContainer");

function validateOwnerInfo({
  fullName,
  phoneNumber,
  email,
  bio,
  summary,
  telegram,
  instagram,
  avatarFileInput,
  mainCoverFileInput,
}) {
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

  //* bio validation
  const strippedBio = bio.replace(/<[^>]*>/g, "");

  if (!strippedBio) {
    errors.bio = "بیوگرافی نمی تواند خالی باشد.";
  } else if (strippedBio.length < 10) {
    errors.bio = "بیوگرافی حداقل باید 10 حرف داشته باشد.";
  } else if (strippedBio.length > 10000) {
    errors.bio = "بیوگرافی حداکثر باید 10000 حرف داشته باشد.";
  }

  //* Phone Number validation
  const phoneRegex = /^09\d{9}$/;
  if (!phoneNumber) {
    errors.phoneNumber = "شماره تلفن اجباری می باشد.";
  } else if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = "شماره موبایل وارد شده نادرست می باشد.";
  }

  //* Email validation
  if (!email) {
    errors.email = "ایمیل نمی تواند خالی باشد.";
  } else if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.email = "ایمیل نادرست می باشد.";
  }

  //* telegram validation
  if (telegram.length > 30) {
    errors.telegram = "آیدی تلگرام حداکثر باید 30 حرف داشته باشد.";
  }

  //* instagram validation
  if (instagram.length > 100) {
    errors.instagram = "آیدی اینستاگرام حداکثر باید 100 حرف داشته باشد.";
  }

  //* Summary validation
  if (!summary) {
    errors.summary = "خلاصه نمی تواند خالی باشد.";
  } else if (summary.length < 5) {
    errors.summary = "خلاصه حداقل باید 5 حرف داشته باشد.";
  } else if (summary.length > 30) {
    errors.summary = "خلاصه حداکثر باید 30 حرف داشته باشد.";
  }

  //* Avatar File
  if (!avatarFileInput) {
    errors.avatarURL = "تصویر پروفایل نمی تواند خالی باشد.";
  } else {
    if (avatarFileInput.size > 2 * 1024 * 1024) {
      errors.avatarURL = "حجم تصویر پروفایل نباید بیشتر از ۲ مگابایت باشد.";
    } else if (!["image/jpeg", "image/jpg", "image/png"].includes(avatarFileInput.type)) {
      errors.avatarURL = "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.";
    }
  }

  //* Main Cover File
  if (!mainCoverFileInput) {
    errors.mainCover = "تصویر زمینه نمی تواند خالی باشد.";
  } else if (mainCoverFileInput.size > 2 * 1024 * 1024) {
    errors.avatarURL = "حجم تصویر زمینه نباید بیشتر از ۲ مگابایت باشد.";
  } else if (!["image/jpeg", "image/jpg", "image/png"].includes(mainCoverFileInput.type)) {
    errors.mainCover = "فقط فایل‌های تصویری (JPG, JPEG, PNG) مجاز هستند.";
  }

  return errors;
}
