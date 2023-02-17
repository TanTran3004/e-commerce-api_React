const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongodbId = require("../utils/validateMongodb");
const User = require("../models/userModel");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");
// create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        preserve: /[\u0300-\u036f]/g,
      });
    }
    const newProduct = await Product.create(req.body);
    res.json({ newProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  // const id = req.params;
  // try {
  //   if (req.body.title) {
  //     req.body.slug = slugify(req.body.title);
  //   }
  //   const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
  //     new: true,
  //   });
  //   res.json({ updateProduct });
  // } catch (error) {
  //   throw new Error(error);
  // }
  const id = req.params;
  try {
    let slug = req.body.title;
    if (req.body.title) {
      slug = slugify(req.body.title);
    }
    let newSlug = slug;
    let counter = 1;
    const findProductWithSlug = await Product.findOne({ slug: newSlug });
    while (findProductWithSlug) {
      if (findProductWithSlug) {
        throw new Error("Slug already exists");
        // res.status(400).json({ message: "Slug already exists" });
      } else {
        newSlug = `${slug}`;
        counter++;
        findProductWithSlug = await Product.findOne({ slug: newSlug });
      }
    }
    req.body.slug = newSlug;
    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });
    res.json({ updateProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete({ id: id });
    res.json({ deleteProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ length: products.length, products });
  } catch (error) {
    throw new Error(error);
  }
});
const filterProducts = asyncHandler(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numProducts = await Product.countDocuments();
      if (skip >= numProducts) throw new Error("This page does not exist");
    }

    const productsFilter = await query;
    res.json({ productsFilter });
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

const addWishlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(id);
    const alreadyInWishlist = await user.wishlist.find(
      (id) => id.toString() === prodId
    );
    if (alreadyInWishlist) {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);

    let alreadyRatings = product.ratings.find((userId) => {
      userId.postedBy?.toString() === id.toString();
    });

    if (alreadyRatings) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRatings },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );
      res.json(updateRating);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: { ratings: { star: star, comment: comment, postedBy: id } },
        },
        { new: true }
      );
      res.json(rateProduct);
    }
    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const uploader = async (path) => await cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getEachProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  filterProducts,
  addWishlist,
  ratingProduct,
  uploadImages,
};
