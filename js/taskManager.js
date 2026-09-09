class TaskManager {
    constructor() {

        this.tasks = [];
        this.currentId = 1;

    }

    addTask(taskName, taskDescription, dueDate, taskCategory, status) {
        this.tasks.push(
            {
                name: taskName,
                description: taskDescription,
                date: dueDate,
                category: taskCategory,
                status: status,
                id: this.currentId
            }
        );
        this.currentId++;
        this.save();
    }
    removeTask(taskId) {
        this.tasks.forEach(task => {

            taskId = Number(taskId);

            if (task.id === taskId) {
                this.tasks.pop(task);
                this.save();
                return;
            }
        });
    }
    getTaskById(taskId) {
        taskId = Number(taskId);
        return this.tasks.find(task => task.id === taskId)
    }
    markAsDone(task) {
        if (task) {
            task.status = !task.status;
        }
        this.save();
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("currentId", this.currentId);
    }
    load() {
        const tasks = localStorage.getItem("tasks");
        const currentId = localStorage.getItem("currentId");
        if (tasks) {
            this.tasks = JSON.parse(tasks);
        }
        if (currentId) {
            this.currentId = Number(currentId);
            ;
        }
    }
    renderTasks(taskContainer) {
        taskContainer.innerHTML = ""
        this.tasks.forEach(task => {
            const taskElement = document.createElement("div");

            taskElement.classList.add('task', 'd-flex', 'flex-column', 'bg-body', 'p-3', 'rounded-3', 'h-auto', 'gap-2')
            if (task.status)
                taskElement.classList.add('completed');


            taskElement.innerHTML =
                `
        <div class=" d-flex flex-row justify-content-between align-items-center">
        <div class="d-flex flex-row gap-2 align-items-center justify-content-center">
        <!-- <i class="fa-solid fa-square-check" style="color: #82db8f;"></i> -->
        <i class="${task.status ? "fa-solid" : "fa-regular"} fa-square-check" style="color: #82db8f;" id="completeButton"></i>
        
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
}
export { TaskManager };
