// const express = require("express");
// const {
//   register,
//   getAllUsers,
//   updateUserPoints,
//   loginUser,
//   UserBYId,
//   userBestScore,
//   startGame,
// } = require("../Controllers/UserController");
// const { verifyToken } = require("../Middlewares/authMiddleware");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", loginUser);
// router.patch("/best-score", userBestScore);

// router.use(verifyToken);

// router.get("/:id", UserBYId);
// router.get("/", getAllUsers);
// // router.patch("/update-score", updateUserPoints);
// router.patch('/update-score/:id', updateUserPoints);
// router.get("/game/start", startGame);

// module.exports = router;

const express = require("express");
const {
  register,
  getAllUsers,
  updateUserPoints,
  loginUser,
  UserBYId,
  userBestScore,
  startGame,
} = require("../Controllers/UserController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const router = express.Router();

// Public routes (no authentication required)
router.post("/register", register);
router.post("/login", loginUser);
router.get("/best-score", userBestScore);

// Protected routes (require authentication)
router.use(verifyToken);

router.get("/:id", UserBYId);
router.get("/", getAllUsers);
router.patch("/update-score/:userId", updateUserPoints);
router.get("/game/start", startGame);

module.exports = router;
