import 'dotenv/config'
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY
const apiUrl = process.env.apiUrl

export const getCitiesService = async (req, res) => {
  
  try {
      
    const payload = {
      apiKey: API_KEY,
      modelName: 'Address',
      calledMethod: `getCities`,
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
    console.log(`get-cities-service.js`, data)
    res.status(200).json(data.data)

  } catch (err) {
    console.log(err)
  }


}

