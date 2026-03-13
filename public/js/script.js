const input = document.getElementById("editInput");
const deleteBtn = document.getElementById("deleteBtn");

input.addEventListener("input", () => {
    deleteBtn.disabled = true;
});