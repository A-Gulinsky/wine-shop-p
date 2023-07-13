import Account from "../../db/models/accounts.js";

export const getOrdersDataService = async (req, res) => {
  
  try {

    const orders = await getOrdersData()
    res.json(orders);

  } catch (err) {
    res.status(500).send(`Server Error`)
  }

}


async function getOrdersData() {
  const accounts = await Account.find().exec();

  const orders = accounts.flatMap(account => account.cart.ordered.map(el => ({
    id: account._id,
    order_id: el.orderStatus._id,
    uniqueId: el.uniqueId,
    username: account.username,
    name: account.name,
    surname: account.surname,
    email: account.email,
    el,
  })));
  
  return orders
}