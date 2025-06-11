const { Tea } = require("../../db/models/tea");

class TeaService {
  static async getAllTeas() {
    return await Tea.findAll();
  }

  static async addTea(data) {
    return await Tea.create(data);
  }

  static async getOneTea(id) {
    return await Tea.findByPk(id);
  }

  static async editTea(data, id, userId) {
    const oneTea = await TeaService.getOneTea(id);

    if (oneTea) {
      if (oneTea.dataValues.userId !== userId) {
        throw new Error("Unauthorized: Only the author can delete this Tea");
      }
      await oneTea.update(data);
    }

    return oneTea;
  }
  static async delete(id, userId) {
    const tea = await TeaService.getOneTea(id);

    if (tea) {
      if (tea.authorId !== userId) {
        throw new Error("Unauthorized: Only the author can delete this tea");
      }

      await tea.destroy();
    }

    return tea;
  }
}

module.exports = TeaService;
