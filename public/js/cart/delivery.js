
// API Nova Poshta(Ukraine)

export async function getCities() {

  try {

    const response = await fetch('/api/get-cities', {
      method: "POST",
      headers: {"Content-Type" : "application/json"}
    })

    console.log(`RESPONSE`, response)

    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    const data = await response.json()
    console.log(`delivery.js`, data);
    return data

  } catch (err) {
    console.log(err)
  }
  
}

export async function getWarehouses(cityRef) {
  
  try {

    const response = await fetch('/api/get-warehouse', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({cityRef})
    })

    const data = await response.json()
  
    return data  

  } catch (err) {
    console.log(err)
  }
}

