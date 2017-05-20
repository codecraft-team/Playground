import { Task, TaskCollection } from './task'
import { TaskService } from './taskService'

export class TaskController {

  tasks: TaskCollection = new TaskCollection();
  currentTask: Task | null = null;
  searchText: string | null = null;

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

  get filteredTasks(): Task[] {
    let filtered = this.tasks;
    if (this.searchText) {
      let regex = new RegExp(this.searchText);
      filtered = this.tasks.filter(task => task.taskName && regex.test(task.taskName));
    }
    return filtered;
  }

  loadTasks(): void {
    let index = this.tasks.length;
    let tasks = this.taskService.loadTasks(index, 3);
    this.tasks.splice(this.tasks.length, 0, ...tasks);
    if (this.currentTask === null) {
      this.currentTask = this.tasks.slice(0, 1)[0];
    }
    this.message = "Tasks are loaded";
  }

  save(task: Task) {
    let currentTask: Task = new Task(task.id, task.taskName, task.description);
    let index = this.tasks.findIndex((t => t.id == currentTask.id));
    if (index > -1) {
      this.tasks[index].taskName = currentTask.taskName;
      this.tasks[index].description = currentTask.description;
      currentTask = this.tasks[index];
    } else {
      currentTask.id = this.newId();
      this.tasks.push(currentTask);
    }
    this.currentTask = currentTask;
  }

  private newId(): number {
    let clone = this.tasks.slice(0);
    let sorted = clone.sort((a, b) => a.id! - b.id!);
    let maxId: number = sorted.reverse()[0].id!
    return 1 + maxId;
  }

}