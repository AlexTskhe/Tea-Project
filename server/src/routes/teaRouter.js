const express = require("express");
const TeaController = require("../controllers/TeaController");
const validateId = require("../middlewares/validateId");
const { verifyAccessToken } = require("../middlewares/verifyTokens");


// экземляр маршрута
const teaRouter = express.Router();

teaRouter.get("/", TeaController.getTeas);
teaRouter.post("/", verifyAccessToken, TeaController.createTea);
teaRouter.get("/:id", validateId, TeaController.getTeaById);
teaRouter.put("/:id", verifyAccessToken, validateId, TeaController.updateTea);
teaRouter.delete("/:id", verifyAccessToken, validateId, TeaController.deleteTea);


module.exports = teaRouter;
