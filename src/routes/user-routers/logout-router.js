import { Router } from "express";

const logoutRouter = new Router()

logoutRouter.post('/logout', (req, res) => {

  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    } else {
      res.sendStatus(200);
    }
  });
  
});

export default logoutRouter