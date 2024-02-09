const User = require("../db/userScema");
const question = require("../db/questionScema")
const path = require('path')

const loginController = async (req, res) => {
  const { rollNo, Name } = req.body;

  try {
    const user = await User.findOne({ rollNo: rollNo ,Name : Name});
    
    if (user.rollNo == rollNo && user.Name == Name) {
      localStorage.setItem("roll",JSON.stringify(rollNo));
      res.redirect("/api/question");
    }
    else {
      res.status(404).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const registerController = async (req, res) => {
  const { rollNo, Name ,age} = req.body;
  console.log(rollNo)
  console.log(Name)
  try {
    const existUser = await User.findOne({ rollNo: rollNo });
    if (existUser) {
      res.status(500).send({ message: "User already Exists" });
    } else {
      await User.create({ rollNo: rollNo, Name: Name ,age:age})
        .then(() => {
          console.log("User created");
        })
        .catch((err) => {
          console.log(err);
        });
        res.redirect("/api/login")
    }
  } catch (err) {
    console.log(err);
  }
};

const getLoginController = async (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
 }

const getQuestionController = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/question.html"));
};
const getQuestion = async (req, res) => { 
    let q = await question.find({});
  //console.log(q)
  res.json(q)
}
module.exports = {
  loginController,
  registerController,
  getLoginController,
  getQuestionController,
  getQuestion,
};
