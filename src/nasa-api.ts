import axios from "axios";

const API_KEY = "E0cAPcFlJ7jhzZjQBbcam2XSwWhFugSOr6x1NlqD";

export async function getAllRovers() {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
    return response.data;
}

export async function getPhotosByEarthDate(roverName: string, cameraType: string, earthDate: string, page: number) {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?earth_date=${earthDate}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`);
    return response.data;
}

export async function getPhotosBySol(roverName: string, cameraType: string, sol: number, page: number = 1) {
    page = page || 1;
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?sol=${sol}&camera=${cameraType.toLowerCase()}&page=${page}&api_key=${API_KEY}`);
    return response.data;
}
