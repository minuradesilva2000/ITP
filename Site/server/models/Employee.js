import mongoose from "mongoose";
import {Schema} from "mongoose";

const employeeSchema = new Schema({

    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String, required: true },
    type: { type: String, required: true },
    maritalStatus: { type: String },
    designation: { type: String },
    //department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    salary: { type: Number, required: true },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    profileImage:{type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee",employeeSchema);
export default Employee;