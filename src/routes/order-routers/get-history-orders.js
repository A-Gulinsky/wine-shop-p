import { Router } from "express";
import History from "../../db/models/history.js";

const getHistory = new Router()

getHistory.post(`/order-history`, async(req, res) => {
  
  try {

    const data = await History.find()
  
    res.json(data)

  } catch (err) {
    res.status(500).send(`Server Error`)
  }
})

export default getHistory