import Account from "../../db/models/accounts.js";

export const signInService = async (req, res) => {
  
  const { username, password } = req.body;

  try {
    const user = await Account.findOne({ username });
    
    // check if there is a such user in data base  
    if (!user) {
      return res.status(401).json({ error: "The username or password you entered is incorrect" });
    }

    // check user password
    if (user.password !== password) {
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