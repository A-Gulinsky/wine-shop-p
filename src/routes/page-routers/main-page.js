import { Router } from "express";

const mainPage = Router()

mainPage.get('/', (req, res) => {
  
  res.render('index', {
    user: req.session.user  
  });
});

export default mainPage