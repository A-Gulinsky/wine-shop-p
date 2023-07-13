import { Router } from "express";
import { fetchByIdService } from "../../services/main-routers/fetch-by-id-service.js";

const fetchById = new Router()

fetchById.get('/wines/:id', fetchByIdService);

export default fetchById