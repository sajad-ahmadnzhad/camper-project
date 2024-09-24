document.getElementById("addSocialLink").addEventListener("click", () => {
  const container = document.getElementById("socialLinksContainer");

  const newInputGroup = document.createElement("div");
  newInputGroup.classList.add("input-group", "mb-2");

  newInputGroup.innerHTML = `
    <input type="url" class="form-control social-link" placeholder="لینک شبکه اجتماعی" />
    <button type="button" class="btn btn-danger remove-social-link">حذف</button>
  `;

  container.appendChild(newInputGroup);

  newInputGroup.querySelector(".remove-social-link").addEventListener("click", function () {
    this.parentElement.remove();
  });
});

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
let hasError = false;

document.addEventListener("DOMContentLoaded", async () => {
  let initialData = {};

  try {
    const response = await fetch(`http://localhost:3002/api/ownerInfo`);
    if (response.ok) {
      const data = await response.json();
      fillFormWithUserData(data);
      initialData = data;
    }
  } catch (error) {
    console.log("User does not exist or error fetching data", error);
  }

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const socialLinks = Array.from(document.querySelectorAll(".social-link"))
      .map((input) => input.value)
      .filter((value) => value !== "");

    const formData = new FormData();
    const currentData = {
      fullName: document.getElementById("fullName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      bio: document.getElementById("bio").value,
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
      formData.append("avatar", avatarFileInput);
    }
    if (mainCoverFileInput) {
      formData.append("cover", mainCoverFileInput);
    }

    console.log(hasError);
    if (hasError) {
      return false;
    }

    const method = Object.keys(initialData).length > 0 ? "PUT" : "POST";
    const apiUrl = method === "PUT" ? `http://localhost:3002/api/ownerInfo` : "http://localhost:3002/api/ownerInfo";

    try {
      const res = await fetch(apiUrl, {
        method: method,
        body: formData,
      });
      console.log(res.status);
      const result = await res.json();
      console.log(result);
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "موفق",
          text: result.message,
          confirmButtonText: "باشه",
        });
      } else if (res.status == 201) {
        Swal.fire({
          icon: "success",
          title: "موفق",
          text: "اطلاعات مالک با موفقیت ثبت شد",
          confirmButtonText: "باشه",
        });
      } else if (res.status == 400) {
        let errorMessage = "";

        Object.keys(result).forEach((key) => {
          errorMessage += `${result[key]} \n`;
        });

        Swal.fire({
          icon: "error",
          title: "خطا",
          text: errorMessage,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "خطای ارتباطی",
        text: error.message,
      });

      return false;
    }
  });
});

function fillFormWithUserData(data = {}) {
  document.getElementById("fullName").value = data.fullName || "";
  document.getElementById("phoneNumber").value = data.phoneNumber || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("bio").value = data.bio || "";
  document.getElementById("summary").value = data.summary || "";
  document.getElementById("avatarImage").src = data.avatarURL || "";
  document.getElementById("mainImage").src = data.mainCover || "";

  const socialLinksContainer = document.getElementById("socialLinksContainer");
  socialLinksContainer.innerHTML = "";
  data.socialLinks.forEach((link) => {
    const newInputGroup = document.createElement("div");
    newInputGroup.classList.add("input-group", "mb-2");

    newInputGroup.innerHTML = `
      <input type="url" class="form-control social-link" value="${link}" />
      <button type="button" class="btn btn-danger remove-social-link">حذف</button>
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

function resetImage(imageId, defaultSrc, chosenTextId, resetButtonId) {
  document.getElementById(imageId).src = defaultSrc;
  document.getElementById(chosenTextId).textContent = "فایلی انتخاب نشده";
  document.getElementById(resetButtonId).style.display = "none";
}
// function resetImage(imageId, defaultSrc, chosenTextId, resetButtonId) {
//   document.getElementById(imageId).src = defaultSrc;
//   document.getElementById(chosenTextId).textContent = "فایلی انتخاب نشده";
//   document.getElementById(resetButtonId).style.display = "none";
// }
