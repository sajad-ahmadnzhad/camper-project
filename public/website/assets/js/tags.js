const showUpdateTagModal = (id, title) => {
  console.log(id);

  const updateTagModal = document.querySelector("#update-tag-modal");
  updateTagModal.classList.remove("invisible");

  const closeUpdateTagModal = document.querySelector(".close-update-tag-modal");
  closeUpdateTagModal.addEventListener("click", () => {
    updateTagModal.classList.add("invisible");
  });

  const tagIdHiddenInput = document.querySelector("#tag-id");
  tagIdHiddenInput.value = id;

  const tagTitleInput = document.querySelector(".tag-title");
  tagTitleInput.value = title;
};
