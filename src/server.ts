// @ts-ignore
import express from "express";
import axios from "axios";
import {getAllRovers} from "./nasa-api";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));

router.get('/rovers', (req, res) => {
    getAllRovers().then(rovers => res.send(rovers));
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});
