// @ts-ignore
import express from "express";
import {getAllRovers, getPhotosByEarthDate, getPhotosBySol} from "./nasa-api";
import {toInt} from "./util";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));

router.get('/rovers', (req, res) => {
    getAllRovers().then(rovers => res.send({rovers: rovers}));
});

router.get('/rovers/:rover/photos/:camera', (req, res) => {
    if (req.query.earth_date) getPhotosByEarthDate(req.params.rover, req.params.camera, req.query.earth_date.toString(), toInt(req.query.page)).then(photos => res.send({photos: photos}));
    else if (req.query.sol) getPhotosBySol(req.params.rover, req.params.camera, toInt(req.query.sol), toInt(req.query.page)).then(photos => res.send({photos: photos}));
    else getPhotosBySol(req.params.rover, req.params.camera, 1000, 1).then(photos => res.send({photos: photos}));
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
