const router = require("express").Router();

const UserModel = require("./user.model");
const UserService = require("./user.service");
const UserController = require("./user.controller");

const service = new UserService(UserModel);
const controller = new UserController(service);

router.get("/users", controller.index);
router.post("/users", controller.create);
router.get("/users/:id", controller.read);
router.patch("/users/:id", controller.update);
router.delete("/users/:id", controller.delete);

module.exports = router;
