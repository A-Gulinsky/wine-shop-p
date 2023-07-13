

export const historyList = async (req, res) => {
  
  try {

    const user = req.session.user

    res.status(200).json(user.history_cart)

  } catch {
    res.status(500).send(`Server Error`)
  }

}