import { Router } from "express";
import { signUpService } from "../../services/user-routers.js/sign-up-router-service.js";

const signUp = new Router()

signUp.post("/sign-up", signUpService);

export default signUp