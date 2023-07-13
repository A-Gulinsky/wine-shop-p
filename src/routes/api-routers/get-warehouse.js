import { Router } from "express";
import { getWarehouseService } from "../../services/api-routers/get-warehouse-service.js";

const getWarehouse = new Router()

getWarehouse.post('/api/get-warehouse', getWarehouseService)

export default getWarehouse