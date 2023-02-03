const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
// create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json({ newProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getEachProduct = asyncHandler(async (req, res) => {
  let { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json({ findProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { createProduct, getEachProduct, getAllProducts };
