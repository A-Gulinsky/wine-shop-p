import { Router } from "express";

const mainPage = Router()

mainPage.get('/', (req, res) => {

  res.render('index', {
  });
});

export default mainPage