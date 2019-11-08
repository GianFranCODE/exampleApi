const Product = require("../models/Product");

//Lista de todos los productos
function index(req, res) {
  Product.find({})
    .then(products => {
      if (products.length) return res.status(200).send({ products });
      return res.status(204).send({ message: "No content" });
    })
    .catch(error => res.status(500).send({ error }));
}

//Mostrar un producto por filtro
function show(req, res) {
  // if (req.body.error) return res.status(500).send({ error });
  // if (!req.body.products) return res.status(404).send({ message: "Not found" });

  // let products = req.body.products;
  // return res.status(200).send({ products });
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let products = req.body.products;
  return res.status(200).send({ products });
}

//Crear un producto
function create(req, res) {
  new Product(req.body)
    .save()
    .then(product => res.status(201).send({ product }))
    .catch(error => res.status(500).send({ error }));
}
//Actualización de producto
function update(req, res) {
  if (req.body.error) return res.status(500).send(error);
  if (!req.body.products) return res.status(404).send({ message: "Not Found" });

  let product = req.body.products[0];
  product = Object.assign(product, req.body);
  product
    .save()
    .then(product => res.status(200).send({ message: "Update", product }))
    .catch(error => res.status(500));
}

//Buscar por filtro
function find(req, res, next) {
  let query = {};
  query[req.params.key] = req.params.value;
  Product.find(query)
    .then(products => {
      if (!products.length) return next();
      req.body.products = products;
      return next();
    })
    .catch(error => {
      req.body.error = error;
      next();
    });
}
function remove(req, res) {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "Not Found" });
  req.body.products[0]
    .remove()
    .then(product => res.status(200).send({ message: "Removed", product }))
    .catch(error => res.status(500).send({ error }));
}

module.exports = {
  index,
  show,
  create,
  update,
  find,
  remove
};
