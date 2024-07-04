import mongoose from 'mongoose';
// const Category = require("./categories")
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
import Category from "./Category";
import Brand from './Brand';
import Variation from './Variation';
import Discount from './Discount';
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brandid: {
        type: ObjectId,
      ref: "Brand",
    },
    tagid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      default: null
      }],
    unitid: {
        type: ObjectId,
        ref: 'Unit',
      default: null
    },
    shortDescription: {
        type: String,
      },
    description: {
      type: String,
      required: true,
    },
    markedprice: {
      type: Number,
    },
    sku: {
        type: String,
    },
    code: {
        type: String
    },
    image: {
      type: String,
    },
    inStockQuantity: {
      type: Number,
    },

    categoriesid: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    hasVariation: {
      type: Boolean,
      required: true
    },
    featured: {
        type: Boolean,
        default: false 
      },
    status: {
        type: Boolean,
        required:true
    },
    discountid: {
      type: ObjectId,
      ref: 'Discount',
      default: null
    }
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
