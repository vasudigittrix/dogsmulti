import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
import Product from './Product';
import VarValue from './VarValue';
import VarType from './VarType';
const variationSchema = new mongoose.Schema(
    {
        varvalueid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VarValue',
            required: true,
        },
        vartypeid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VarType',
            required: true,
        },
        productid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        inStockQuantity: {
            type: Number,
            required: true
        }, 
        markedprice: {
            type: Number,
            required: true
        },
        offerprice: {
            type: Number,
        },
        sku: {
            type: String
        },
        code: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const Variation =
  mongoose.models.Variation || mongoose.model('Variation', variationSchema);

export default Variation;