import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
import Product from "./Product";

const discountSchema = new Schema({
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
  type: {
    type: String,
    required: true,
    enum: ["percent", "fixed"],
  },
  amount: {
    type: Number,
    required: true
  },
});

const Discount = mongoose.models.Discount || mongoose.model("Discount", discountSchema);

export default Discount;
