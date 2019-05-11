const router = require("express").Router();
const Student = require("../db/models/students");
const Test = require("../db/models/tests");

router.get("/:studentId", function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      if (!student) return res.sendStatus(404);
      res.json(student);
    })
    .catch(next);
});

router.get("/", function(req, res, next) {
  Student.findAll({ include: { all: true } }).then(students =>
    res.json(students)
  );
});

router.put("/:id", function(req, res, next) {
  Student.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
    .then(test => res.status(201).json(test[1][0]))
    .catch(next);
});

router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    });
    res.send(newStudent);
  } catch (error) {
    next(error);
  }
});

// router.post("/", async function (req, res, next) {
//   try {
//     const fn = firstName
//     const ln = lastName
//     const em = email
//     const student = await Student.create({firstName: fn, lastName: ln, email: em})
//     res.send(student) || res.status(201).JSON(student)
//   } catch (error) {
//     next(error);
//   }
// });

router.delete("/:id", function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
