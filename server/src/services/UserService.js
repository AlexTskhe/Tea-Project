const { User } = require("../../db/models");

class AuthService {
  // Метод регистрации пользователя
  static async register({ email, name, password, role }) {
       // Ищем пользователя по email, если не найден — создаём
    const [user, created] = await User.findOrCreate({
      where: { email }, // Если пользователь с таким email уже есть, created будет false
      defaults: { name, password, role }, // Используется, если создаётся новый пользователь
    }); // Возвращаем пользователя и флаг created (true — создан, false — уже существовал)
    return { user, created };
  } // Метод для поиска пользователя по email (используется при логине)
  static async getUserByEmail({ email }) {
    const user = await User.findOne({ where: { email } }); // SELECT * FROM Users WHERE email = ?
    return user; // Вернёт пользователя или null
  }
  static async deleteUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("Юзер не найден");
    }
    return await User.destroy({ where: { id } });
  }
  static async findAllUsers() {
    return await User.findAll();
  }
  static async updateUser({ id, email, name, password, role }) {
    const user = await User.findByPk(id);
    if (name?.trim()) user.name = name;
    if (email?.trim()) user.email = email;
    if (password?.trim()) user.password = password;
    if (role?.trim()) user.role = role;
    return await user.save();
  }
}

module.exports = AuthService;
