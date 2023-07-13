import Account from "../../db/models/accounts.js";

export const signUpService = async (req, res) => {
  
  const { username, password, email, name, surname } = req.body;
  
  // Check if this account is not registered
    const existingAccount = await Account.findOne({ $or: [{ username }, { email }] });
    
  if (existingAccount) {
    return res.status(400).json({ error : "Account with the same name already exists"});
  }

  // create new account
  const account = new Account({
    username,
    password,
    email,
    name,
    surname
  });

  //save session
  req.session.user = account

  try {
    await account.save();
    res.json("Account successfully registered");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }

}