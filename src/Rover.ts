import Camera from "./Camera";

export default class Rover {
    id: number;
    name: string;
    max_sol: number;
    landing_date: string;
    max_date: string;
    cameras: Camera[];

    constructor (rover: Rover) {
        this.id = rover.id;
        this.name = rover.name;
        this.max_sol = rover.max_sol;
        this.landing_date = rover.landing_date;
        this.max_date = rover.max_date;
        this.cameras = rover.cameras ? rover.cameras.map(camera => new Camera(camera)) : [];
    }
}
