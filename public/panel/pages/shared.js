let hasError = false;
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

function resetImage(imageId, defaultSrc, chosenTextId, resetButtonId) {
  document.getElementById(imageId).src = defaultSrc;
  document.getElementById(chosenTextId).textContent = "فایلی انتخاب نشده";
  document.getElementById(resetButtonId).style.display = "none";
}

const showAlert = (icon, title, text, confirmButtonText = "باشه") => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: confirmButtonText,
  });
};
const showAlertWithReload = (icon, title, text, timer = 1500) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
  }).then(() => {
    window.location.reload();
  });
};
