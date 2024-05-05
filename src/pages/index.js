/* eslint-disable max-lines-per-function */
import Link from "next/link"
import axios from "axios"
import { useState } from "react"
import { Button } from "@/components/Button"
import { categoryFields } from "@/utils/constant"

export const getServerSideProps = async () => {
  const { data } = await axios("http://localhost:3000/api/places")

  return {
    props: { initialPlaces: data },
  }
}
const HomePage = ({ initialPlaces }) => {
  const [places, setPlaces] = useState(initialPlaces)
  const handleDelete = (placeId) => async () => {
    const deletedPlace = places.find(({ _id }) => _id === placeId)
    const newPlaces = places.filter(({ _id }) => _id !== placeId)
    setPlaces(newPlaces)

    try {
      await axios.delete(`http://localhost:3000/api/places/${placeId}`)
    } catch (err) {
      setPlaces([...newPlaces, deletedPlace])
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-4">
        {places.map(
          ({
            _id,
            typeCategory,
            name,
            address,
            city,
            zipCode,
            country,
            avgPrice,
            categorySpecifics,
          }) => (
            <li
              key={_id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
            >
              <div className="container">
                <Link
                  href={`/places/${_id}/edit`}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="text-lg font-bold">{name}</p>
                    <p>Address : {address}</p>
                    <p>City : {city}</p>
                    <p>Zip Code : {zipCode}</p>
                    <p>Country : {country}</p>
                    <p>Price : {avgPrice}</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-bold">{typeCategory}</p>
                    {Object.entries(categorySpecifics)
                      .filter(([key]) =>
                        categoryFields[typeCategory].some(
                          (field) => field.name === key,
                        ),
                      )
                      .map(([key, value]) => (
                        <p key={key}>{`${key}: ${value}`}</p>
                        // Display only filtered category specifics
                      ))}
                  </div>
                </Link>
              </div>
              <Button
                onClick={handleDelete(_id)}
                variant="danger"
                size="md"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                DELETE
              </Button>
            </li>
          ),
        )}
      </ul>
    </>
  )
}

export default HomePage
