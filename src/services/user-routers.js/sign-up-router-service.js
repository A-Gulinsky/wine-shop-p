import bcrypt from "bcrypt";
import Account from "../../db/models/accounts.js";

export const signUpService = async (req, res) => {
  
  const { username, password, email, name, surname } = req.body;
  
  // Check if this account is not registered
    const existingAccount = await Account.findOne({ $or: [{ username }, { email }] });
    
  if (existingAccount) {
    return res.status(400).json({ error : "Account with the same name or email already exists"});
  }

  if (password.length <= 5) {
    return res.status(400).json({ error: "Password is too weak" });
  }

  // bcrypt hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  

  // create new account
  const account = new Account({
    username,
    password: hashedPassword,
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