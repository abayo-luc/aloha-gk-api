const Product = require("../../../models").Product;

export const getAllProducts = (req, res) =>
  Product.findAll()
    .then((products) => res.json({ data: products }))
    .catch((err) => res.status(400).json({ error: err.message }));

export const getOne = (req, res) => {
  const { id } = req.params;
  return Product.findByPk(id)
    .then((product) => {
      if (!product) return res.status(404).json({ error: "Record not found" });

      return res.json({ data: product });
    })
    .catch((err) => res.status(400).json({ error: err.message }));
};
