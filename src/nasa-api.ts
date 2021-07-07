import axios from "axios";
import Rover from "./Rover";
import Photo from "./Photo";
import * as dotenv from "dotenv";

dotenv.config();
const API_KEY = process.env.API_KEY;
export const PAGE_SIZE = 25;

export async function getAllRovers(): Promise<Rover[]> {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
    return response.data.rovers.map((rover: Rover) => new Rover(rover));
}

async function getPhotosPage(roverName: string, cameraType: string, dateType: "earth_date" | "sol", date: string | number, page: number): Promise<Photo[]> {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?${dateType}=${date}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`;
    console.log(url);
    try {
        const response = await axios.get(url);
        return response.data.photos.map((photo: Photo) => new Photo(photo));
    } catch (error) {
        let errorStr: string;
        if (error.response && error.response.data && error.response.data.errors) errorStr = error.response.data.errors;
        else errorStr = error.toString();
        throw {status: error.response.status, message: `NASA API error: ${errorStr}`};
    }
}

export async function getPhotos(roverName: string, cameraType: string, dateType: "earth_date" | "sol", date: string | number, paginationStart: number, paginationEnd: number): Promise<Photo[]> {
    const firstPage = Math.floor((paginationStart - 1) / PAGE_SIZE) + 1;
    const lastPage = Math.floor((paginationEnd - 1) / PAGE_SIZE) + 1;
    const startOffset = ((paginationStart - 1) % 25);
    const endOffset = 25 - (((paginationEnd - 1) % 25) + 1);
    const photoCount = (lastPage - firstPage + 1) * 25;

    let photos: Photo[] = [];
    for (let page = firstPage; page <= lastPage; page++) {
        photos = photos.concat(await getPhotosPage(roverName, cameraType, dateType, date, page));
    }
    return photos.slice(startOffset, photoCount - endOffset);
}
