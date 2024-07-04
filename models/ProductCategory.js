import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Pet from './Pet';
import Brand from './Brand';
const productcategorySchema = new mongoose.Schema(
    
  {
    name: {
        type: String,
        required: true
    },
    image: {
        type:String
    },
    status: {
        type: Boolean,
        required: true
    },
    brandid:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }]
  },
  {
    timestamps: true,
  }
);

const ProductCategory =
  mongoose.models.ProductCategory || mongoose.model('ProductCategory', productcategorySchema);

export default ProductCategory;
