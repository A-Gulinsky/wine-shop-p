// API Nova Poshta(Ukraine)

export async function getCities(selectedCity) {
  try {

    const response = await fetch('/api/get-cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedCity }),
    });

    if (!response.ok) {
      throw new Error(`Server Error`);
    }

    const data = await response.json();
   
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getWarehouses(cityRef) {
  try {
    const response = await fetch('/api/get-warehouse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cityRef }),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
