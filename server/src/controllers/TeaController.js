const TeaService = require("../services/TeaService");
const formatResponse = require("../utils/formatResponse");
const isInvalidId = require("../utils/isInvalidId");
const TeaValidator = require("../utils/TeaValidator");

class TeaController {
  
  static async getTeas(req, res) {
    
    try {
      const teas = await TeaService.getAllTeas();
      // console.log("Проверка1")
      if (teas.length === 0) {
        return res.status(200).json(formatResponse(200, "Not teas found", []));
      }
      
      return res.status(200).json(formatResponse(200, "Success", teas));
    } catch (err) {
      
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  
  static async createTea(req, res) {
    const { name, location, image, description } = req.body;
    const { id: userId } = res.locals.user;
    
    const { isValid, error } = TeaValidator.validate({ name, location, image, description });
    if (!isValid) {
      
      return res
        .status(400)
        .json(formatResponse(400, "Validation failed", null, error));
    }

    try {
      
      const newTea= await TeaService.addTea({ name, location, image, description, userId });
      if (!newTea) {
        return res.status(400).json(formatResponse(400, "Create failed"));
      }
      
      return res.status(201).json(formatResponse(201, "Success", newTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  
  static async getTeaById(req, res) {
    const { id } = res.locals; 


    try {
      const oneTea = await TeaService.getOneTea(id);
      if (!oneTea) {
        
        return res.status(400).json(formatResponse(400, "Tea not found"));
      }
      
      return res.status(200).json(formatResponse(200, "Success", oneTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }

  
  static async updateTea(req, res) {
    console.log("res.locals", res.locals);
    try {
      const { id } = res.locals; 


      // const { id: userId } = res.locals.user;

      const { name, location, image, description } = req.body;

      
      const { isValid, error } = TeaValidator.validate({ name, location, image, description });
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Validation failed", null, error));
      }

      
      const updatedTea = await TeaService.editTea(
        { name, location, image, description },
        id,
        // userId
      );
      if (!updatedTea) {
        return res.status(400).json(formatResponse(400, "Tea not found"));
      }

      
      return res.status(200).json(formatResponse(200, "Success", updatedTea));
    } catch (err) {
      console.log(err);
      return res.status(500).json(formatResponse(500, "Internal Server Error"));
    }
  }
  static async deleteTea(req, res) {
    const { id } = req.params; 

    const { id: userId } = res.locals.user; 


    
    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid tea ID"));
    }

    try {
      
      const tea = await TeaService.delete(id, userId);

      
      if (!tea) {
        return res.status(404).json(formatResponse(404, "Tea not found"));
      }

      
      return res
        .status(200)
        .json(formatResponse(200, "Tea deleted successfully"));
    } catch (error) {
      
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

      
      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }
}
//

module.exports = TeaController;