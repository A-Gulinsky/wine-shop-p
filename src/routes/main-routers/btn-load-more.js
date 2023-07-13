import { Router } from "express";
import { btnLoadMoreService } from "../../services/main-routers/btn-load-more-service.js";

const btnLoadMore = new Router()

btnLoadMore.post('/load-more', btnLoadMoreService);

export default btnLoadMore