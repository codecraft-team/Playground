import { Task } from "./task";
import { TaskCollection } from "./taskCollection";
import { TaskService } from "./taskService";

export class TaskController {

  public tasks: TaskCollection = new TaskCollection();
  public currentTask: Task | null = null;
  public searchText: string | null = null;
  public message: string;

  private taskService = new TaskService();

  public init(): void {
    this.message = "Initial task message";
    this.tasks.splice(0, this.tasks.length);
    this.currentTask = null;
  }
  public selectTask(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.currentTask = task;
    }
  }

  get filteredTasks(): Task[] {
    let filtered = this.tasks;
    if (this.searchText) {
      const regex = new RegExp(this.searchText);
      filtered = this.tasks.filter((task) => task.taskName && regex.test(task.taskName));
    }
    return filtered;
  }

  public loadTasks(): void {
    const index = this.tasks.length;
    const tasks = this.taskService.loadTasks(index, 3);
    this.tasks.splice(this.tasks.length, 0, ...tasks);
    if (this.currentTask === null) {
      this.currentTask = this.tasks.slice(0, 1)[0];
    }
    this.message = "Tasks are loaded";
  }

  public save(task: Task) {
    let currentTask: Task = new Task(task.id, task.taskName, task.description);
    const index = this.tasks.findIndex(((t) => t.id === currentTask.id));
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
    const clone = this.tasks.slice(0);
    const sorted = clone.sort((a, b) => a.id! - b.id!);
    const maxId: number = sorted.reverse()[0].id!;
    return 1 + maxId;
  }

}
