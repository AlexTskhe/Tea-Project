const cookieConfig = require('../configs/cookieConfig')
const UserService = require('../services/UserService')
const generateTokens = require('../utils/generateTokens')
const formatResponse = require('../utils/formatResponse')
const bcrypt = require('bcrypt')

class UserController {
    // Регистрация пользователя
    static async singup(req, res) {
        const{email, name, password, role} = req.body

    // Проверка на обязательные поля
    if (!email || !name || !password || !role) {
      return res.status(400).json(formatResponse(400, 'Missing required fields'));
    }

    // Хешируем пароль перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Регистрируем пользователя через сервис
      const { user, created } = await UserService.register({
        email,
        name,
        password: hashedPassword,
        role,
      });

      // Если пользователь уже существует
      if (!created) {
        return res.status(400).json(formatResponse(400, 'User already exists'));
      }

      // Получаем обычный объект пользователя без Sequelize метаданных
      const plainUser = user.get();
      delete plainUser.password; // Удаляем пароль из ответа

      // Генерируем access и refresh токены
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      // Сохраняем refreshToken в куку и отправляем успешный ответ
      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(formatResponse(201, 'Success', { accessToken, user: plainUser }));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, 'Internal Server Error'));
    }
  }

  // Авторизация пользователя
  static async login(req, res) {
    const { email, password } = req.body;

    // Проверка на обязательные поля
    if (!email || !password) {
      return res.status(400).json(formatResponse(400, 'Missing required fields'));
    }

    try {
      // Получаем пользователя по email
      const user = await UserService.getUserByEmail({ email });

      if (!user) {
        return res.status(400).json(formatResponse(400, 'User not found'));
      }

      // Сравниваем пароль
      const isValidPassword = await bcrypt.compare(password, user.password);
      console.log('isValidPassword', isValidPassword);

      if (!isValidPassword) {
        return res.status(400).json(formatResponse(400, 'Invalid email or password'));
      }

      // Приводим пользователя к обычному объекту и удаляем пароль
      const plainUser = user.get();
      delete plainUser.password;

      // Генерируем токены
      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      // Устанавливаем refreshToken в куку и отправляем ответ
      return res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(formatResponse(200, 'Success', { accessToken, user: plainUser }));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  // Выход из системы
  static async logout(req, res) {
    // Очищаем refreshToken из cookie
    res.clearCookie('refreshToken').json(formatResponse(200, 'Success'));
  }

  // Обновление access и refresh токенов
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals; // пользователь извлечён из refresh токена в middleware

      // Генерируем новые токены
      const { accessToken, refreshToken } = generateTokens({ user });

      // Обновляем refreshToken в cookie и отправляем новый accessToken
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json(formatResponse(200, 'Success', { user, accessToken }));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = UserController;