const express = require('express');

const validateId = require('../middlewares/validateId');
const {
  verifyRefreshToken,
  verifyAccessToken,
} = require("../middlewares/verifyTokens");
const CommentController = require('../controllers/CommentController');

// экземляр маршрута
const commentRouter = express.Router();

commentRouter.get("/", CommentController.getComments );
// commentRouter.post("/", verifyAccessToken, CommentController.createComment);
commentRouter.post("/", CommentController.createComment); // заменить на верхний после реализации авторизациии
commentRouter.get("/:id", validateId, CommentController.getCommentById);
commentRouter.put("/:id", verifyAccessToken, validateId, CommentController.updateComment);
commentRouter.delete("/:id", verifyAccessToken, validateId, CommentController.deleteComment);



module.exports = commentRouter;
