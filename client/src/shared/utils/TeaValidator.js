export default  class TeaValidator {
  static validate(tea) {
    const { name, location, image, description } = tea;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return {
        isValid: false,
        error: "name must be string",
      };
    }
    if (!location || typeof location !== "string" || location.trim() === "") {
      return {
        isValid: false,
        error: "location must be string",
      };
    }
    if (!image || typeof image !== "string" || image.trim() === "") {
      return {
        isValid: false,
        error: "image must be string",
      };
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return {
        isValid: false,
        error: "description must be string",
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}


