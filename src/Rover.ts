import Camera from "./Camera";

export default class Rover {
    id: number;
    name: string;
    cameras: Camera[];

    constructor (rover: Rover) {
        this.id = rover.id;
        this.name = rover.name;
        this.cameras = rover.cameras ? rover.cameras.map(camera => new Camera(camera)) : [];
    }
}
