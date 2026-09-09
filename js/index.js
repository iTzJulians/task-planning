"use strict2"
import { TaskManager } from './taskManager.js';
import './modal.js';
const taskContainer = document.querySelector(".task-container");
const taskManager = new TaskManager(taskContainer);
taskManager.load();
taskManager.renderTasks();
const taskform = document.getElementById("taskForm");

taskform.addEventListener("submit", (e) => validFormFieldInput(e));
taskContainer.addEventListener("click", (event) => {

    const doneButton = event.target;
    const deleteButton = event.target.closest(".delete");
    if (doneButton.getAttribute("id") === "completeButton") {
        const taskElement = doneButton.closest(".task");
        const taskId = doneButton.closest(".task").dataset.id;
        const task = taskManager.getTaskById(taskId);
        taskManager.markAsDone(task);
        taskElement.classList.toggle('completed', task.status);
        doneButton.classList.toggle("fa-solid", task.status);
        doneButton.classList.toggle("fa-regular", !task.status);
    }
    if (deleteButton) {

        taskManager.removeTask(event.target.closest(".task").dataset.id);
        taskManager.renderTasks();
    }
});

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
    if (category === "") {
        Swal.fire("Error", "Selecciona una categoria", "error");
        return;
    }
    if (date === "") {
        Swal.fire("Error", "Ingresa una fecha", "error");
        return;
    }
    taskManager.addTask(name, description, date, category, false);

    Swal.fire("Tarea añadida", "¡Tarea agregada con exito!", "success");
    taskform.reset();
    taskManager.renderTasks();

}







