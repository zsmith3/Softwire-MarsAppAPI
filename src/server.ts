// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
import {getAllRovers, getAPODs, getPhotos, PAGE_SIZE} from "./nasa-api";
import {toInt} from "./util";

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req: express.Request, res: express.Response) => res.send('Hello world !'));

router.get('/rovers', (req: express.Request, res: express.Response) => {
    getAllRovers().then(rovers => res.send({rovers: rovers}));
});

router.get('/rovers/:rover/photos/:camera', (req: express.Request, res: express.Response) => {
    let dateType: "earth_date" | "sol", date: string | number;
    if (req.query.earth_date) {
        dateType = "earth_date";
        date = req.query.earth_date.toString();
    } else if (req.query.sol) {
        dateType = "sol";
        date = toInt(req.query.sol);
        if (date < 0) {
            res.status(400);
            res.send({status: 400, message: "Invalid sol"});
            return;
        }
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
        .then(photos => res.send({photos: photos}))
        .catch(error => {
            res.status(error.status || 500);
            res.send({status: error.status || 500, message: error.message || error.toString()});
        });
});

router.get("/apod", (req: express.Request, res: express.Response) => {
    if (!(req.query.start_date && req.query.end_date)) {
        res.status(400);
        res.send({status: 400, message: "Supply both start_date and end_date parameters"});
        return;
    }
    getAPODs(req.query.start_date, req.query.end_date)
        .then(data => res.send(data))
        .catch(error => {
            res.status(error.status || 500);
            res.send({status: error.status || 500, message: error.message || error.toString()});
        });
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
