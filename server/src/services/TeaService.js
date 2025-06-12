const { Tea } = require('../../db/models');

class TeaService {
  static async getAllTeas() {
    // console.log("Проверка2")
    return await Tea.findAll();
  }

  static async addTea(data, role) {
    if (role !== 'admin') {
      throw new Error('Unauthorized: Only the author can delete this Tea');
    }
    return await Tea.create(data);
  }

  static async getOneTea(id) {
    return await Tea.findByPk(id);
  }

  static async editTea(data, id, role) {
    const oneTea = await TeaService.getOneTea(id);
    console.log('chek role', role);
    if (oneTea) {
      if (role !== 'admin') {
        throw new Error('Unauthorized: Only the author can delete this Tea');
      }
      await oneTea.update(data);
    }

    return oneTea;
  }

  static async delete(id, user) {
    const tea = await TeaService.getOneTea(id);

    if (tea) {
      if (user.role !== 'admin') {
        throw new Error('Unauthorized: Only the author can delete this tea');
      }

      await tea.destroy();
    }

    return tea;
  }
}

module.exports = TeaService;
