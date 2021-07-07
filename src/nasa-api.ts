import axios from "axios";

export async function getAllRovers() {
    const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=E0cAPcFlJ7jhzZjQBbcam2XSwWhFugSOr6x1NlqD");
    return response.data;
}
