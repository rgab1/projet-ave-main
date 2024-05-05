/* eslint-disable max-lines-per-function */
/* eslint-disable arrow-body-style */
import { useState, useEffect } from "react"
import axios from "axios"
import { listCategory, categoryFields } from "@/utils/constant"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/places")

  return {
    props: { initialPlaces: data },
  }
}
function ResultsPage({ initialPlaces }) {
  const [places] = useState(initialPlaces)
  const [filters, setFilters] = useState({
    category: "",
    avgPriceRange: { min: 0, max: 1000 },
    city: "",
  })
  useEffect(() => {
    // You might fetch the filtered data from an API on filters change
    // fetchPlaces();
  }, [filters])
  const handleCategoryChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }))
  }
  const handleCityChange = (event) => {
    setFilters((prevFilters) => ({ ...prevFilters, city: event.target.value }))
  }
  const handleMinPriceChange = (event) => {
    const minPrice = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      avgPriceRange: { ...prevFilters.avgPriceRange, min: minPrice },
    }))
  }
  const handleMaxPriceChange = (event) => {
    const maxPrice = event.target.value
    setFilters((prevFilters) => ({
      ...prevFilters,
      avgPriceRange: { ...prevFilters.avgPriceRange, max: maxPrice },
    }))
  }
  const filteredPlaces = places.filter((place) => {
    return (
      (!filters.category ||
        place.typeCategory
          .toLowerCase()
          .includes(filters.category.toLowerCase())) &&
      (!filters.city ||
        place.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      place.avgPrice >= filters.avgPriceRange.min &&
      place.avgPrice <= filters.avgPriceRange.max
    )
  })

  return (
    <div>
      <select onChange={handleCategoryChange} value={filters.category}>
        {listCategory.map((typeCategory) => (
          <option key={typeCategory} value={typeCategory}>
            {typeCategory}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={filters.city}
        onChange={handleCityChange}
        placeholder="Filter by city"
      />

      <input
        type="number"
        placeholder="Min Price"
        value={filters.avgPriceRange.min}
        onChange={handleMinPriceChange}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.avgPriceRange.max}
        onChange={handleMaxPriceChange}
      />

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
