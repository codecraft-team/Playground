import { Task } from './task'
export class TaskService {
  loadTasks(start: number, count: number = 3): Array<Task> {
    let tasks: Task[] = [];

    if (start === 0) {
      tasks = this.loadFirstWellDefinedTasks();
    } else {
      for (let index = start; index < start + count; index++) {
        tasks.push(new Task(index, `Task`))
      }
    }
    return tasks;
  }

  loadFirstWellDefinedTasks(): Task[] {
    return [
      new Task(1, "Simple vue instance app", "Create a simple Vue Application"),
      new Task(2, "Task list v1", "Create a task list which will be initialized during load"),
      new Task(3, "Manage data", "Manage data in a vue independant manner which is testable"),
      new Task(4, "First details view", "Create a details vue directly bound to the vue instance data"),
      new Task(5, "Simple details view component", "Create a details view whiche uses a component, bound to the injected props"),
      new Task(6, "Statefull details view component", "Create a details view which manages it's own state"),
      new Task(7, "Filtered list", "Create a filtered list based on the available tasks.")
    ]
  }
}
