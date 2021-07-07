import Rover from "./Rover";
import Camera from "./Camera";

export default class Photo {
    id: number;
    img_src: string;
    camera: Camera;
    rover: Rover;

    constructor (photo: Photo) {
        this.id = photo.id;
        this.img_src = photo.img_src;
        this.camera = new Camera(photo.camera);
        this.rover = new Rover(photo.rover);
    }
}
