const Category = require("../../../models").Category;

export const getAllCategories = (req, res) =>
  Category.findAll()
    .then((categories) => res.json({ data: categories }))
    .catch((err) => res.status(400).json({ error: err.message }));
