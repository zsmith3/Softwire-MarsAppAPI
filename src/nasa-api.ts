import axios from "axios";
import Rover from "./Rover";
import Photo from "./Photo";

const API_KEY = "E0cAPcFlJ7jhzZjQBbcam2XSwWhFugSOr6x1NlqD";
export const PAGE_SIZE = 25;

export async function getAllRovers(): Promise<Rover[]> {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
    return response.data.rovers.map((rover: Rover) => new Rover(rover));
}

export async function getPhotos(roverName: string, cameraType: string, dateType: "earth_date" | "sol", date: string | number, paginationStart: number, paginationEnd: number): Promise<Photo[]> {
    const firstPage = Math.floor((paginationStart - 1) / PAGE_SIZE) + 1;
    const lastPage = Math.floor((paginationEnd - 1) / PAGE_SIZE) + 1;
    const startOffset = ((paginationStart - 1) % 25);
    const endOffset = 25 - (((paginationEnd - 1) % 25) + 1);
    const photoCount = (lastPage - firstPage + 1) * 25;

    let photos: Photo[] = [];
    for (let page = firstPage; page <= lastPage; page++) {
        const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?${dateType}=${date}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`);
        photos = photos.concat(response.data.photos.map((photo: Photo) => new Photo(photo)))
    }
    return photos.slice(startOffset, photoCount - endOffset);
}
