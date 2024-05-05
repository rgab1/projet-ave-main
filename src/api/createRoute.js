import mongoose from "mongoose"

export const createRoute = (handle) => async (req, res) => {
  await mongoose.connect(process.env.DB_URL)

  await handle(req, res)
}
