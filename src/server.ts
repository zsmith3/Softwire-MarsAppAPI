// @ts-ignore
import express from "express";
import {getAllRovers, getPhotos, PAGE_SIZE} from "./nasa-api";
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
    let dateType: "earth_date" | "sol", date: string | number;
    if (req.query.earth_date) {
        dateType = "earth_date";
        date = req.query.earth_date.toString();
    } else if (req.query.sol) {
        dateType = "sol";
        date = toInt(req.query.sol);
    } else {
        dateType = "sol";
        date = 1000;
    }

    const page = toInt(req.query.page);
    let paginationStart = toInt(req.query.paginationStart);
    let paginationEnd = toInt(req.query.paginationEnd);

    if (page) {
        if (paginationStart && paginationEnd) {
            res.status(400);
            res.send({status: 400, message: "Cannot use paginationStart/End and page parameters together"});
            return;
        }

        paginationStart = (page - 1) * PAGE_SIZE + 1;
        paginationEnd = page * PAGE_SIZE;
    } else {
        paginationStart = paginationStart || 1;
        paginationEnd = paginationEnd || 25;
    }


    getPhotos(req.params.rover, req.params.camera, dateType, date, paginationStart, paginationEnd)
        .then(photos => res.send({photos: photos}));
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
