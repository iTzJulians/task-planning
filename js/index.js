const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const addTaskButton = document.getElementById("addTask");
const taskManager = new TaskManager(1);
const completeTaskButton = document.getElementById("completeButton");
const task = document.getElementById("task");
console.log(completeTaskButton);


addTaskButton.addEventListener("click", () => {
    modal.classList.remove("d-none")

})
closeModal.addEventListener("click", () => {
    modal.classList.add("d-none")

});
const taskform = document.getElementById("taskForm");
taskform.addEventListener("submit", (e) => validFormFieldInput(e));

function validFormFieldInput(event) {
    event.preventDefault()
    const taskName = document.getElementById("nameInput");
    const taskDescription = document.getElementById("description");
    const taskCategory = document.getElementById("categoryInput");
    const taskDate = document.getElementById("dateInput");
    const name = taskName.value.trim();
    const description = taskDescription.value.trim();
    const category = taskCategory.value.trim();
    const date = taskDate.value.trim();

    if (name === "") {
        Swal.fire("Error", "Ingresa un nombre", "error");
        return;
    }
    if (description === "") {
        Swal.fire("Error", "Ingresa una descripcion", "error");
        return;
    }
    if (taskCategory === "") {
        Swal.fire("Error", "Selecciona una categoria", "error");
        return;
    }
    if (date === "") {
        Swal.fire("Error", "Ingresa una fecha", "error");
        return;
    }
    taskManager.addTask(name,description, date, taskCategory,false);
    Swal.fire("Tarea añadida", "¡Tarea agregada con exito!", "succes");
    taskform.reset();
    console.log(`tarea: ${name} descripcion: ${description} categoria ${category} fecha ${date}`);


}

