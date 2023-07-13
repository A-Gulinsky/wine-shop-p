import 'dotenv/config'
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY
const apiUrl = process.env.apiUrl

export const getWarehouseService = async (req, res) => {
  
  try {
    
    const cityRef = req.body.cityRef

    const payload = {
      apiKey: API_KEY,
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      Category: 'post',
      methodProperties: {
      CityRef: cityRef,
    },
  }

    const response = await fetch(apiUrl, {
      method: `POST`,
      headers: {
        'Content-Type' : `application/json`
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Server Error`)
    }  
    
    const data = await response.json()

    res.status(200).json(data.data)

  } catch (err) {
    console.log(err)
  }

}