import mongoose, { Schema, type InferSchemaType } from "mongoose";

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },

    userType: {
      type: String,
      required: true,
      enum: ["Student", "Customer", "Other"],
    },

    interest: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export type EnquiryType = InferSchemaType<typeof enquirySchema>;

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;