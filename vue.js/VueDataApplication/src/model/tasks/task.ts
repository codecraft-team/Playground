export class Task {
  constructor(public id: Number, public taskName: string) { }
}

export class TaskCollection extends Array<Task> {

}

