const TeaService = require("../services/TeaService");
const formatResponse = require("../utils/formatResponse");
const isInvalidId = require("../utils/isInvalidId");
const TeaValidator = require("../utils/TeaValidator");

class TeaController {
  // Получить все посты
  static async getTeas(req, res) {
    try {
      const teas = await TeaService.getAllTeas();
      // Если постов нет — возвращаем пустой массив
      if (teas.length === 0) {
        return res.status(200).json(formatResponse(200, "Not teas found", []));
      }
      // Успешный ответ с данными
      return res.status(200).json(formatResponse(200, "Success", teas));
    } catch (err) {
      // Если произошла ошибка на сервере
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  // Создать новый пост
  static async createTea(req, res) {
    const { name, location, image, description } = req.body;
    const { id: userId } = res.locals.user;
    // Валидируем входные данные
    const { isValid, error } = TeaValidator.validate({ name, location, image, description });
    if (!isValid) {
      // Если не прошла валидация — отправляем ошибку
      return res
        .status(400)
        .json(formatResponse(400, "Validation failed", null, error));
    }

    try {
      // Пытаемся создать новый пост
      const newTea= await TeaService.addTea({ name, location, image, description, userId });
      if (!newTea) {
        return res.status(400).json(formatResponse(400, "Create failed"));
      }
      // Успешно создано
      return res.status(201).json(formatResponse(201, "Success", newTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  // Получить пост по ID
  static async getTeaById(req, res) {
    const { id } = res.locals; // id уже проверен мидлварой validateId

    try {
      const oneTea = await TeaService.getOneTea(id);
      if (!oneTea) {
        // Если пост не найден
        return res.status(400).json(formatResponse(400, "Tea not found"));
      }
      // Успешно найден
      return res.status(200).json(formatResponse(200, "Success", oneTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  // Обновить пост по ID
  static async updateTea(req, res) {
    console.log("res.locals", res.locals);
    try {
      const { id } = res.locals; // id получен после мидлвары validateId

      const { id: userId } = res.locals.user;

      const { name, location, image, description } = req.body;

      // Проверяем данные перед обновлением
      const { isValid, error } = TeaValidator.validate({ name, location, image, description });
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Validation failed", null, error));
      }

      // Пытаемся обновить пост
      const updatedTea = await TeaService.editTea(
        { name, location, image, description },
        id,
        userId
      );
      if (!updatedTea) {
        return res.status(400).json(formatResponse(400, "Tea not found"));
      }

      // Успешно обновлено
      return res.status(200).json(formatResponse(200, "Success", updatedTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }
  static async deleteTea(req, res) {
    const { id } = req.params; // Получаем id из параметров маршрута
    const user = res.locals.user; // Получаем данные пользователя из мидлвары checkAuth

    // Проверка на валидность id
    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid post ID"));
    }

    try {
      // Пытаемся удалить пост (с проверкой автора)
      const tea = await TeaService.delete(id, user.id);

      // Если пост не найден
      if (!tea) {
        return res.status(404).json(formatResponse(404, "Tea not found"));
      }

      // Успешно удалено
      return res
        .status(200)
        .json(formatResponse(200, "Tea deleted successfully"));
    } catch (error) {
      // Если пользователь не автор поста
      if (error.message.includes("Unauthorized")) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              "No rights to delete this tea",
              null,
              error.message
            )
          );
      }

      // Внутренняя ошибка сервера
      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }
}

// Экспортируем контроллер для использования в роутинге
module.exports = TeaController;