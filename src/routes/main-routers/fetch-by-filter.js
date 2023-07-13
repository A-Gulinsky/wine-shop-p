import { Router } from "express";
import { fetchByFilterService } from "../../services/main-routers/fetch-by-filter-service.js";


const fetchByFilter = Router()

// fetch by filter
fetchByFilter.post('/wines', fetchByFilterService);

export default fetchByFilter