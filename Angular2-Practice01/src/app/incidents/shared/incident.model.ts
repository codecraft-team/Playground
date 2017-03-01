export class Incident {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public assignedTo: string,
        public status: string
    ){
    }
}