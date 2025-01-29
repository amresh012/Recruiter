const User = require("../model/user.model")
const bcrypt = require( "bcrypt")
const {generateToken}  = require("../config/jwtToken");
const expressAsyncHandler = require("express-async-handler");
// User registration controller
const register = async (req, res) => { 
    const { company, designation, name, email, password, mobile } = req.body;
    const ifUserexsist = User.find({ email })
    if (!ifUserexsist) { 
        return res.status(400).json({ message: "User already exist" })
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            company, designation, name, email, password: hashedPassword,
            mobile
        });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        console.error("Error registering user:", error);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: "Validation Error", details: error.errors });
        } else if (error.code === 11000) {
            res.status(400).json({ message: "Duplicate key error", details: error.keyValue });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

// login
 const login = async (req, res) => { 
    const { email, password } = req.body;
    try { 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
      const token = generateToken()
      
        res.json({success: true, message:"login successfull",  user, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// logOut
const logout = expressAsyncHandler(async (req, res) => {
  if (!req.cookies?.refreshToken)
    throw new Error("No Refresh Token in Cookies");
  const refreshToken = req.cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update user
 const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json({ success: true ,message:"successfull updated Profile",updatedUser});
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({
          message: "Validation Error",
          details: error.errors,
          success: false,
        });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};


// delete user
 const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// verify email


// verify mobile


module.exports = {register, login , logout , deleteUser , updateUser}