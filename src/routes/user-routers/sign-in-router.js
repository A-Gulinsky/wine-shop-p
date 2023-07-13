import { Router } from "express";
import { signInService } from "../../services/user-routers.js/sign-in-router-service.js";

const signIn = new Router()

// sign in 
signIn.post("/login", signInService);

export default signIn