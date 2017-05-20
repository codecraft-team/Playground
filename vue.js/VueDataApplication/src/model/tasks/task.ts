export class Task {
  constructor(
    public id: number | null,
    public taskName: string | null,
    public description: string | null = null) { }
}
