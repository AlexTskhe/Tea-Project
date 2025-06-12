const { Comment, User } = require('../../db/models');

class CommentService {
  static async getAllComments() {
    return await Comment.findAll();
  }

  static async addComment(data) {
    const newComment = await Comment.create(data);
    return await Comment.findOne({
      where: { id: newComment.id },
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    });
  }

  static async getAllCommentsTea(teaId) {
    return await Comment.findAll({
      where: { teaId },
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    });
  }

  static async editComment(data, id, authorId) {
    const oneComment = await CommentService.getOneComment(id);

    if (oneComment) {
      if (oneComment.dataValues.authorId !== authorId) {
        throw new Error(
          'Unauthorized: Only the author can delete this Comment'
        );
      }
      await oneComment.update(data);
    }

    return oneComment;
  }

  static async delete(id, authorId) {
    const comment = await CommentService.getOneComment(id);

    if (comment) {
      if (comment.authorId !== authorId) {
        throw new Error(
          'Unauthorized: Only the author can delete this comment'
        );
      }
      await comment.destroy();
    }

    return comment;
  }
}

module.exports = CommentService;
