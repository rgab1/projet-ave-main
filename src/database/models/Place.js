import { placeSchema } from "@/database/schemas/placeSchema"
import mongoose from "mongoose"

export const PlaceModel =
  mongoose.models.Place || mongoose.model("Place", placeSchema)
