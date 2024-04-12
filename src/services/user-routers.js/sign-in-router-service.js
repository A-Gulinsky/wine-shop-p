import Account from "../../db/models/accounts.js";
import bcrypt from "bcrypt";

export const signInService = async (req, res) => {
  
  const { username, password } = req.body;

  try {
    const user = await Account.findOne({ username });
    
    // check if there is a such user in data base  
    if (!user) {
      return res.status(401).json({ error: "The username or password you entered is incorrect" });
    }

    // check user password

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "The username or password you entered is incorrect" });
    }

    // create new session
    req.session.user = user;
    res.send(req.session.user);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }

}