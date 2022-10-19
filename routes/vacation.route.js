const router = require("express").Router();
const VacationsSchema = require("../models/vacationSchema.model");

// Add new vacation
router.post("/Add", (req, res) => {
  let vacation = new VacationsSchema(req.body);
  vacation
    .save()
    .then(() => res.status(201).json({ message: "vacation added to the DataBase.", success: true }))
    .catch((err) => res.status(400).json({ message: err.toString(), success: false }));
});

// get all vacations
router.get("/", (req, res) => {
  VacationsSchema.find()
    .sort({ Start: 1 })
    .then((vac) => {
      res.status(200).json({ message: "Available vacations ", success: true, vacations: vac });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message, success: false });
    });
});

// update vacations
router.post("/Edit/:id", (req, res) => {
  try {
    let vacation = req.body;
    VacationsSchema.findByIdAndUpdate(req.params.id, { $set: vacation }, {}, (err, vac) => {
      if (err != null) {
        res.status(500).json({ message: err.message, success: false });
      } else {
        res.status(200).json({ message: "Vacations was edited", success: true });
      }
    });
  } catch (err) {
    res.json({ message: err, success: "false" });
  }
});

// remove vacation
router.delete("/:id", (req, res) => {
  try {
    VacationsSchema.findByIdAndRemove(req.params.id, {}, (err, vac) => {
      if (err != null) {
        res.status(500).json({ message: err.message, success: false });
      } else {
        res.status(200).json({ message: "Vacation was deleted", success: true });
      }
    });
  } catch (err) {
    res.json({ message: err, success: "false" });
  }
});

module.exports = router;
