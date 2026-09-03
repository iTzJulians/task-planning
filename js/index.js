import { TaskManager } from './taskManager.js';
import './modal.js';

const taskManager = new TaskManager();
const taskContainer = document.querySelector(".task-container");
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
    RenderTasks();
    taskform.reset();

}



function RenderTasks() {
    taskContainer.innerHTML = ""
    taskManager.tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add('task', 'd-flex', 'flex-column', 'bg-body', 'p-3', 'rounded-3', 'h-auto', 'gap-2')
        taskElement.innerHTML =
            `
            <div class=" d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex flex-row gap-2 align-items-center justify-content-center">
                    <!-- <i class="fa-solid fa-square-check" style="color: #82db8f;"></i> -->
                    <i class="fa-regular fa-square-check" style="color: #82db8f;" id="completeButton"></i>

                    <h3 class="fw-bolder m-0">
                        ${task.name}
                    </h3>
                    <i class="fa-solid fa-pen" style="color: #223146;"></i>
                </div>
                <p class="text-secondary m-0">
                    ${task.date}
                </p>
                <div class="bg-danger rounded-3 p-3 d-flex justify-content-center align-items-center delete">
                    <i class="fa-regular fa-trash-can" style="color: rgb(255, 255, 255);"></i>
                </div>
            </div>
            <p class="text-secondary fs-5 d-flex align-items-center m-0">
            ${task.category}
            </p>
            <P class="fs-5 fw-normal d-flex align-items-center m-0">
                ${task.description}
            </P>`;
        taskElement.dataset.id = task.id;


        taskContainer.appendChild(taskElement);
    })
    
}
RenderTasks();

taskContainer.addEventListener("click", (event) => {

        if (event.target.getAttribute("id") === "completeButton") {
            event.target.classList.toggle("fa-regular");
            event.target.classList.toggle("fa-solid");
            event.target.parentNode.parentNode.parentNode.classList.toggle("completed");
        }
        if (event.target.classList.contains("delete")) {
            taskManager.removeTask(event.target.closest(".task").dataset.id);
            
            RenderTasks();
        }
    });

