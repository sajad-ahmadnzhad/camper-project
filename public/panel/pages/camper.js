function updateCamperClickHandler()  {
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
    cancelButtonText: "منصرف شدم"
  });
}
function createCamperClickHandler()  {
  Swal.fire({

    html: `
    <div class="card-body p-4">
      <h5 class="card-title fw-semibold mb-4">ثبت کمپر جدید</h5>
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
    cancelButtonText: "منصرف شدم"
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
