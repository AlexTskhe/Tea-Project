class CommentValidator {
  static validate(comment) {
    const { commentText, teaId, userId } = comment;
    if (
      !commentText ||
      typeof commentText !== 'string' ||
      commentText.trim() === ''
    ) {
      return {
        isValid: false,
        error: 'CommentText must be string',
      };
    }
    if (!teaId || typeof teaId !== 'number') {
      return {
        isValid: false,
        error: 'position must be string',
      };
    }
    if (!userId || typeof userId !== 'number') {
      return {
        isValid: false,
        error: 'position must be string',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = CommentValidator;
