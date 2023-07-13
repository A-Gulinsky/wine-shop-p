import { Router } from "express";
import { getCitiesService } from "../../services/api-routers/get-cities-service.js";

const getCities = new Router()

getCities.post(`/api/get-cities`, getCitiesService)

export default getCities