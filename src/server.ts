// @ts-ignore
import express from "express";
import axios from "axios";
import {getAllRovers, getPhotos} from "./nasa-api";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));

router.get('/rovers', (req, res) => {
    getAllRovers().then(rovers => res.send(rovers));
});

router.get('/rovers/:rover/photos/:camera', (req, res) => {
    getPhotos(req.params.rover, req.params.camera).then(photos => res.send(photos));
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
