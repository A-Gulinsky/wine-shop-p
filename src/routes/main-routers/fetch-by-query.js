import { Router } from "express";
import { fetchByQueryService } from "../../services/main-routers/fetch-by-query-service.js";

const fetchByQuery = new Router()

fetchByQuery.post('/search', fetchByQueryService);

export default fetchByQuery