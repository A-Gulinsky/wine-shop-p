import Account from "../../db/models/accounts.js";

export const removeFromCartService = async (req, res) => {
  
  try {
    const user = req.session.user;
    const id = req.body.idOfCart;
    
    const updatedUser = await Account.findOneAndUpdate(
      { _id: user._id },
      { $pull: { 'cart.waiting': { id: id } } },
      { new: true}
    );

    // обновляем данные в сессии
    req.session.user = updatedUser;
    req.session.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }

      res.json(updatedUser);
    });
  }
  catch {
    console.error(error);
    res.status(500).send('Server Error');}

}