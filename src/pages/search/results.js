import { useState } from "react"
import axios from "axios"
import { categoryFields } from "@/utils/constant"
export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/places")

  return {
    props: { initialPlaces: data },
  }
}
// Je me suis rendu compte une fois cette page créée qu'il me fallait faire la recherche par filtre avant, ce qui est pourquoi cette page n'a pas de style.
function ResultsPage({ initialPlaces, filter }) {
  const [places] = useState(initialPlaces)
  const filteredPlaces = places.filter((place) => {
    // Convert search term to lower case for case-insensitive comparison
    const searchTerm = filter.toLowerCase()
    // Check if any of the attributes includes the search term
    // This assumes all values are strings; adjust accordingly if there are other types

    return (
      place.typeCategory.toLowerCase().includes(searchTerm) ||
      place.name.toLowerCase().includes(searchTerm) ||
      place.city.toLowerCase().includes(searchTerm) ||
      place.avgPrice.toString().includes(searchTerm) ||
      place.zipCode.toLowerCase().includes(searchTerm) ||
      (place.country && place.country.toLowerCase().includes(searchTerm))
    )
  })

  return (
    <div>
      <ul>
        {filteredPlaces.map((place) => (
          <li key={place._id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-bold">{place.name}</p>
                <p>Address : {place.address}</p>
                <p>City : {place.city}</p>
                <p>Zip Code : {place.zipCode}</p>
                <p>Country : {place.country}</p>
                <p>Price : {place.avgPrice}</p>
              </div>
              <div className="flex-1 ml-4">
                <p className="text-lg font-bold">{place.typeCategory}</p>
                {Object.entries(place.categorySpecifics)
                  .filter(([key]) =>
                    categoryFields[place.typeCategory].some(
                      (field) => field.name === key,
                    ),
                  )
                  .map(([key, value]) => (
                    <p key={key}>{`${key}: ${value}`}</p>
                    // Display only filtered category specifics
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ResultsPage
