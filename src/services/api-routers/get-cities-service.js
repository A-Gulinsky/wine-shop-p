import 'dotenv/config'
import fetch from "node-fetch";

const API_KEY = process.env.API_KEY
const apiUrl = process.env.apiUrl

export const getCitiesService = async (req, res) => {
  
  try {

    const cityName = req.body.selectedCity;

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
    
    const city = data.data.find(city => city.Description === cityName);
    
    if (!city) {
      throw new Error(`City is not defind`);
    }

    res.status(200).json(city.Description)

  } catch (err) {
    console.log(err)
  }


}

