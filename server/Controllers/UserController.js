const express = require("express");
const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user POST request
const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User Registered Successfull", newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login POST Request
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Credintials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ message: "Login Success", user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get user By ID
const UserBYId = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "user Found By Id", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in Getting User By Id", error });
  }
};

// Update user points PATCH
const updateUserPoints = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const pointsToAdd = req.body.points || 1;
    user.points += pointsToAdd;
    await user.save();
    res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "Error in Updating points", error });
  }
};

const userBestScore = async (req, res) => {
  try {
    const users = await UserModel.find().sort({ points: -1 }).limit(10);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found with non-zero points" });
    }
    return res.status(200).json({ message: "User Best Score", users });
  } catch (error) {
    console.error("Error in Getting Best Score:", error);
    return res.status(500).json({ message: "Error in Getting Best Score", error: error.message });
  }
};

const startGame = async (req, res) => {
  try {
    const deck = [
      { type: "Cat", id: 1 },
      { type: "Defuse", id: 2 },
      { type: "Shuffle", id: 3 },
      { type: "Exploding Kitten", id: 4 },
      { type: "Cat", id: 5 },
    ];

    shuffle(deck);
    const userId = req.currentUser;
    const user = await UserModel.findById(userId);
    user.gameState = { deck };
    await user.save();

    return res.status(200).json({ message: "Game started successfully", deck });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

module.exports = {
  register,
  loginUser,
  getAllUsers,
  UserBYId,
  updateUserPoints,
  userBestScore,
  startGame,
};
