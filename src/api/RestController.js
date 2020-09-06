const Model = require("../models");
import MainController from "./MainController";
class RestController {
  static getAll(req, res) {
    const { modelName, modelQuery } = req;
    return Model[modelName]
      .findAll({ ...modelQuery })
      .then((data) => res.json({ data }))
      .catch((err) => MainController.handleControllerError(res, err));
  }

  static getById(req, res) {
    const {
      modelName,
      modelQuery,
      params: { id },
    } = req;
    return Model[modelName]
      .findByPk(id, {
        ...modelQuery,
      })
      .then((data) => {
        if (!data) return res.status(404).json({ error: "Record not found" });

        return res.json({ data });
      })
      .catch((err) => MainController.handleControllerError(res, err));
  }

  static create(req, res) {
    const { modelName, body } = req;
    return Model[modelName]
      .create(body)
      .then((data) => res.status(201).json({ data }))
      .catch((err) => MainController.handleControllerError(res, err));
  }
  static findOrCreate(req, res) {
    const { modelName, modelQuery } = req;
    return Model[modelName]
      .findOrCreate({
        ...modelQuery,
      })
      .then(async (response) => {
        const [data, created] = response;
        if (created) {
          return res.json({ data });
        }
        await data.update({ body: req.body.body, rating: req.body.rating });
        return res.json({ data });
      })
      .catch((err) => MainController.handleControllerError(res, err));
  }
  static getOne(req, res) {
    const { modelName, modelQuery } = req;
    return Model[modelName]
      .findOne({
        ...modelQuery,
      })
      .then((data) => {
        if (!data) return res.status(404).json({ error: "Record not found" });

        return res.json({ data });
      })
      .catch((err) => MainController.handleControllerError(res, err));
  }
  static getCurrentUser(req, res) {
    try {
      const { user } = req;
      res.json({ data: user });
    } catch (error) {
      return MainController.handleControllerError(res, error);
    }
  }
}
export default RestController;
