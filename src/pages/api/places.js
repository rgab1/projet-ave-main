import { createRoute } from "@/api/createRoute"
import { PlaceModel } from "@/database/models/Place"

const handler = createRoute(async (req, res) => {
  // GET /places -> read resource collection
  if (req.method === "GET") {
    const { category } = req.query
    const places = await PlaceModel.find(
      category ? { typeCategory: category } : {},
    )

    res.send(places)

    return
  }

  // POST /places -> create resource
  if (req.method === "POST") {
    const newPlace = new PlaceModel(req.body)

    await newPlace.save()

    res.send(newPlace)
  }
})

export default handler
