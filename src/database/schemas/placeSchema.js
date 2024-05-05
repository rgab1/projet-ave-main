import { listCategory } from "@/utils/constant"
import { Schema } from "mongoose"

export const placeSchema = new Schema({
  typeCategory: { type: String, enum: listCategory },
  name: { type: String },
  address: { type: String },
  city: { type: String },
  zipCode: { type: String },
  country: { type: String },
  avgPrice: { type: Number },
  categorySpecifics: { type: Object },
})
