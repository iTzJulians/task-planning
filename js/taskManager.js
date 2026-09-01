class TaskManager {
    constructor(currentId) {
        this.tasks = [];
        this.currentId = currentId;
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
        console.log(this.tasks);
    }
}

export {TaskManager};