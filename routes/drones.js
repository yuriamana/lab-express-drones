const express = require("express");
const router = express.Router();

// require the Drone model here
const dronesModel = require("./../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  // try {
  //   const drones = await dronesModel.find();
  //   res.render("drones/list.hbs", { drones });
  // } catch (err) {
  //   console.log(err);
  // }
  dronesModel
    .find()
    .then((drones) => res.render("drones/list.hbs", { drones }))
    .catch(next);
});

router.get("/drones/create", function (req, res, next) {
  res.render("drones/create-form.hbs");
  console.log(res.render);
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here

  console.log(req.body);
  try {
    await dronesModel.create({
      ...req.body,
    });
    res.redirect("/drones");
  } catch (err) {
    next(err);
    res.redirect("/drones/create");
  }
});

router.get("/drones/:id/edit", async function (req, res, next) {
  try {
    const drone = await dronesModel.findById(req.params.id);
    res.render("/drones/update-form.hbs", { drone });
  } catch (err) {
    next(err);
  }
});

router.post("/drones/:id/edit", async function (req, res, next) {
  try {
    await dronesModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
    }),
      res.redirect("/drones");
  } catch (err) {
    next(err);
    res.redirect("/drones/:id/edit");
  }
});

router.post(
  "/drones/:id/delete",
  async function (req, res, next) {
    dronesModel
      .findByIdAndRemove(req.params.id)
      .then(() => res.redirect("/drones"))
      .catch(next);
  });

module.exports = router;
