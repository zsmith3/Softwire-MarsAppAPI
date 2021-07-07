export default class Rover {
    id: number;
    name: string;

    constructor (rover: Rover) {
        this.id = rover.id;
        this.name = rover.name;
    }
}
