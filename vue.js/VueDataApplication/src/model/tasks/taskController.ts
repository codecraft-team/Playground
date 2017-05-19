import { Task, TaskCollection } from './task'
import { TaskService } from './taskService'

export class TaskController {

  tasks: TaskCollection = new TaskCollection();
  currentTask: Task | null = null;

  private taskService = new TaskService();

  init(): void {
    this.message = "Initial task message"
    this.tasks.splice(0, this.tasks.length)
    this.currentTask = null;
  }

  selectTask(taskId: number) {
    let task = this.tasks.find(task => task.id == taskId);
    if (task) {
      this.currentTask = task;
    }
  }

  message: string;
  loadTasks(): void {
    let index = this.tasks.length;
    let tasks = this.taskService.loadTasks(index, 3);
    this.tasks.splice(this.tasks.length, 0, ...tasks);
    if (this.currentTask === null) {
      this.currentTask = this.tasks.slice(0, 1)[0];
    }
    this.message = "Tasks are loaded";
  }
}