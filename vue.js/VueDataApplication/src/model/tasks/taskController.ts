import { Task, TaskCollection } from './task'
import { TaskService } from './taskService'

export class TaskController {

  tasks: TaskCollection = new TaskCollection();
  private taskService = new TaskService();

  init(): void {
    this.message = "Initial task message"
  }

  message: string;
  loadTasks(): void {
    let index = this.tasks.length;
    let tasks = this.taskService.loadTasks(index, 3);
    this.tasks.splice(this.tasks.length, 0, ...tasks);
    this.message = "Tasks are loaded";
  }
}