const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const addTaskButton = document.getElementById("addTask");

addTaskButton.addEventListener("click", () => {
    modal.classList.remove("d-none")

})
closeModal.addEventListener("click", () => {
    modal.classList.add("d-none")

});
