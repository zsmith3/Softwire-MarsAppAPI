import axios from "axios";

const API_KEY = "E0cAPcFlJ7jhzZjQBbcam2XSwWhFugSOr6x1NlqD";

export async function getAllRovers() {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${API_KEY}`);
    return response.data;
}

export async function getPhotos(roverName: string, cameraType: string, sol: number = 1000) {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName.toLowerCase()}/photos?sol=${sol}&camera=${cameraType.toLowerCase()}&api_key=${API_KEY}`);
    return response.data;
}
