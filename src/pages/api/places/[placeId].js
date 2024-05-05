import { createRoute } from "@/api/createRoute"
import { PlaceModel } from "@/database/models/Place"

const handler = createRoute(async (req, res) => {
  const { placeId } = req.query
  const place = await PlaceModel.findById(placeId)

  if (!place) {
    res.status(404).send({ error: "not found" })

    return
  }

  // GET /places/[placeId] -> read resource item
  if (req.method === "GET") {
    res.send(place)

    return
  }

  // PATCH /places/[placeId] -> update resource item
  if (req.method === "PATCH") {
    const {
      typeCategory,
      name,
      address,
      city,
      zipCode,
      country,
      avgPrice,
      categorySpecifics,
    } = req.body

    Object.assign(place, {
      typeCategory: typeCategory || place.typeCategory,
      name: name || place.name,
      address: address || place.address,
      city: city || place.city,
      zipCode: zipCode || place.zipCode,
      country: country || place.country,
      avgPrice: avgPrice || place.avgPrice,
      categorySpecifics: categorySpecifics || place.categorySpecifics,
    })

    await place.save()

    res.send(place)

    return
  }

  // DELETE /places/[placeId] -> delete resource item
  if (req.method === "DELETE") {
    await place.deleteOne()

    res.send(place)
  }
})

export default handler
