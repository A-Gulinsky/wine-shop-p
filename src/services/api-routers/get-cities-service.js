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

    console.log(`get cities service`, API_KEY)
    console.log(`get cities service`, apiUrl);
    console.log('get-cities-service', payload)
    
    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    const data = await response.json()
    res.status(200).json(data.data)

  } catch (err) {
    console.log(err)
  }


}

