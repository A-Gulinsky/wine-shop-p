
// sign up
async function sendFormDataSignUp(formData) {
  
  try {

    const response = await fetch('/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  const result = await response.json();

    if (result.error) {
      throw new Error(`${result.error}`)
    }
    
    // if ok reload page
    window.location.href = '/'
     
  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }

}

// sign in
async function sendFormDataSignIn(formData) {

  try {

    const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error)
      
    } 

    window.location.href = `/`

  } catch (err) {
      Notiflix.Notify.failure(`${err}`)
  }
}

export {sendFormDataSignUp,sendFormDataSignIn}