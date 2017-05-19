export class Task {
  constructor(public id: number | null, public taskName: string | null) { }
}

export class TaskCollection extends Array<Task> {

}

