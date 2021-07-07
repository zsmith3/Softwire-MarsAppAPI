import axios from "axios";
import Rover from "./Rover";
import Photo from "./Photo";
import Camera from "./Camera";

const API_KEY = "E0cAPcFlJ7jhzZjQBbcam2XSwWhFugSOr6x1NlqD";

/*enum CameraType {
    FHAZ = "FHAZ",
    RHAZ = "RHAZ",
    MAST = "MAST",
    CHEMCAM = "CHEMCAM",
    MAHLI = "MAHLI",
    MARDI = "MARDI",
    NAVCAM = "NAVCAM",
    PANCAM = "PANCAM",
    MINITES = "MINITES",
}*/

export async function getAllRovers(): Promise<Rover[]> {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
    return response.data.rovers.map((rover: Rover) => new Rover(rover));
}

export async function getPhotosByEarthDate(roverName: string, cameraType: string, earthDate: string, page: number): Promise<Photo[]> {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?earth_date=${earthDate}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`);
    return response.data.photos.map((photo: Photo) => new Photo(photo));
}

export async function getPhotosBySol(roverName: string, cameraType: string, sol: number, page: number = 1): Promise<Photo[]> {
    page = page || 1;
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?sol=${sol}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`);
    return response.data.photos.map((photo: Photo) => new Photo(photo));
}
