import express from "express"
import User from "../model/user.model"
import bcrypt from "bcrypt"

// User registration controller
// User registration controller
export const register = async (req, res) => { 
    const { company, designation, name, email, password, mobile } = req.body;
    const ifUserexsist = User.find({ email })
    if (ifUserexsist) { 
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
export const login = async (req, res) => { 
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
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
            { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// logOut
export const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error logging out user:", error);
    }
}

// Update user
export const updateUser = async (req, res) => {
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
export const deleteUser = async (req, res) => {
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
export const verifyEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    const updatedUser = await user.save();
    res.json({ message: "Email verified successfully", user: updatedUser });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
