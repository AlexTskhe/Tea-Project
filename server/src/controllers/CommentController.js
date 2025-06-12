const CommentService = require('../services/commentService');
const CommentValidator = require('../utils/CommentValidator');
const formatResponse = require('../utils/formatResponse');
const isInvalidId = require('../utils/isInvalidId');

class CommentController {
  // все коментарии
  static async getComments(req, res) {
    try {
      const comments = await CommentService.getAllComments();
      if (comments.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, 'Not comments found', []));
      }
      return res.status(200).json(formatResponse(200, 'Success', comments));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // создание комментария
  static async createComment(req, res) {
    console.log('🚀 ~ CommentController ~ createComment ~ commentText:');
    const { commentText, teaId } = req.body;
    // const { id: userId } = res.locals.user;
    const userId = 3;
    const { isValid, error } = CommentValidator.validate({
      commentText,
      teaId,
      userId,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation failed', null, error));
    }

    try {
      const newComment = await CommentService.addComment({
        commentText,
        teaId,
        userId,
      });
      if (!newComment) {
        return res.status(400).json(formatResponse(400, 'Create failed'));
      }
      return res.status(201).json(formatResponse(201, 'Success', newComment));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // получение одного комментария
  static async getCommentById(req, res) {
    const { id } = res.locals;

    try {
      const oneComment = await CommentService.getAllCommentsTea(id);
      if (!oneComment) {
        return res.status(400).json(formatResponse(400, 'Comment not found'));
      }
      return res.status(200).json(formatResponse(200, 'Success', oneComment));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // Обновление комментария
  static async updateComment(req, res) {
    // console.log('res.locals', res.locals);
    try {
      const { id } = res.locals; // id получен после мидлвары validateId
      const { id: userId } = res.locals.user;
      const { commentText, teaId } = req.body;

      const { isValid, error } = CommentValidator.validate({
        commentText,
        teaId,
        userId,
      });
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, 'Validation failed', null, error));
      }

      const updatedComment = await CommentService.editComment(
        { commentText, teaId },
        id,
        userId
      );
      if (!updatedComment) {
        return res.status(400).json(formatResponse(400, 'Comment not found'));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Success', updatedComment));
    } catch (err) {
      if (err.message.includes('Unauthorized')) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              'No rights to delete this Comment',
              null,
              err.message
            )
          );
      }
      console.log(err);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // удаление коментария
  static async deleteComment(req, res) {
    const { id } = req.params; // Получаем id из параметров маршрута
    const user = res.locals.user; // Получаем данные пользователя из мидлвары verifyTokens

    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid comment ID'));
    }

    try {
      const comment = await CommentService.delete(id, user.id);

      if (!comment) {
        return res.status(404).json(formatResponse(404, 'Comment not found'));
      }

      return res
        .status(200)
        .json(formatResponse(200, 'Comment deleted successfully'));
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              'No rights to delete this Comment',
              null,
              error.message
            )
          );
      }

      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, 'Internal server error', null, error.message)
        );
    }
  }
}

module.exports = CommentController;
