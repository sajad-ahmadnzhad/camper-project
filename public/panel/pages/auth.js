document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${apiKey}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = await response.json();

    if (response.status == 201) {
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: result.message,
        confirmButtonText: "باشه",
      }).then(() => {
        window.location.href = "/panel";
      });
    } else if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "موفق",
        text: result.message,
        confirmButtonText: "باشه",
      }).then(() => {
        window.location.href = "/panel";
      });
    } else if (response.status == 400) {
      let errorMessage = "";

      Object.keys(result).forEach((key) => {
        errorMessage += `${result[key]} \n`;
      });

      Swal.fire({
        icon: "error",
        title: "خطا",
        text: errorMessage,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: result.message || "نام کاربری یا رمز عبور اشتباه است.",
        confirmButtonText: "باشه",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "خطای سرور",
      text: "مشکلی در ارتباط با سرور پیش آمد، لطفاً دوباره تلاش کنید.",
      confirmButtonText: "باشه",
    });
  }
});
