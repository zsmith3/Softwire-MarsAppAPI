export default class Camera {
    id: number;
    name: string;
    full_name: string;

    constructor (camera: Camera) {
        this.id = camera.id;
        this.name = camera.name;
        this.full_name = camera.full_name;
    }
}
