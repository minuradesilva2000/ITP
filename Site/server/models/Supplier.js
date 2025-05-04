import mongoose from "mongoose";
import {Schema} from "mongoose";

const supplierSchema = new Schema({

    supplierId:{type:String,required:true,unique:true},
    name:{type:String},
    email:{type:String},
    business:{type:String},
    phone:{type:String,required:true},
    profileImage: {type:"String"},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});

const Supplier = mongoose.model("Supplier",supplierSchema);
export default Supplier;