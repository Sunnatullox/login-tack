const router = require("express").Router();
const uuid = require("uuid").v4();
const bcrypt = require("bcryptjs");

let Users = [];

// User Sign Up

router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;
  const day = new Date();

  if (!name || !email || !password) {
    return res.status(400).json("Sorry, please enter your details to register");
  }

  const checkUserEmail = Users.map((item) => item.email === email);
  checkUserEmail;

  if (checkUserEmail.find((item) => item === true)) {
    return res
      .status(409)
      .json({ msg: "Sorry, this email is already registered" });
  }

  const passHash = await bcrypt.hash(password, 10);
  const users = { id: uuid, name, email, password: passHash, createAd: day };

  try {
    const saveUser = Users.push({ ...users });
    if (!saveUser) {
      return res
        .status(409)
        .json({ msg: "Sorry, there was an error on the server" });
    }
    return res.status(200).json(Users);
  } catch (error) {
    console.log(error);
  }
});

// User Sign In
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  const user = Users.filter((item) => item.email === email);
  const userEmmail = user.map((item) => item.password);
  const checkPass = await bcrypt.compare(password, userEmmail[0]);
  if (!checkPass) {
    return res.status(409).json({ msg: "Sorry, your password is incorrect" });
  }
  return res.status(200).json(user);
});

module.exports = router;
