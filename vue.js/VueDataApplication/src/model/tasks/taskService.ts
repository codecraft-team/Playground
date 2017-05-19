import { Task } from './task'
export class TaskService {
  loadTasks(start: number, count: number = 3): Array<Task> {
    let tasks: Task[] = [];
    for (let index = start; index < start + count; index++) {
      tasks.push(new Task(index, `Task`))
    }
    return tasks;
  }
}
