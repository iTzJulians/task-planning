class TaskManager {
    constructor() {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            console.log(tasks);

            this.tasks = JSON.parse(tasks);
            this.currentId = this.tasks.length;
            return;
        }
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
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        console.log(JSON.stringify(this.tasks));

    }
    removeTask(taskId) {
        this.tasks.forEach(task => {

            taskId = Number(taskId);

            if (task.id === taskId) {
                this.tasks.pop(task);
                localStorage.setItem("tasks", JSON.stringify(this.tasks));

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
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

    }
}

export { TaskManager };