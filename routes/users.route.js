const router = require("express").Router();
const usersSchema = require("../models/userSchema.model");
const controller = require("../controllers/users.controllers");
const VacationsSchema = require("../models/vacationSchema.model");

// create new user
router.post("/signup", controller.post_signup);

// login
router.post("/login", controller.post_login);

// update user info
router.post("/follow/:id", async (req, res) => {
  let user = await usersSchema.findById(req.body.id);
  let vacation = await VacationsSchema.findById(req.params.id);
  try {
    if (user != null && vacation != null) {
      if (user.vacations.includes(vacation._id)) {
        user.vacations.remove(vacation._id);
        vacation.followers -= 1;
        await vacation.save();
        await user.save();
      } else {
        user.vacations.push(vacation._id);
        vacation.followers += 1;
        await vacation.save();
        await user.save();
      }
      res.status(200).json({ message: "user was update following list", success: true, followed: user.vacations });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

module.exports = router;
