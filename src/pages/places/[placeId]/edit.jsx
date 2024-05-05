import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import axios from "axios"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"
import { useState } from "react"
import { listCategory, listCountries, categoryFields } from "@/utils/constant"

export const getServerSideProps = async ({ params: { placeId } }) => {
  const { data: place } = await axios(
    `http://localhost:3000/api/places/${placeId}`,
  )

  return {
    props: { place },
  }
}
const validationSchema = yup.object({
  typeCategory: yup.string().required().oneOf(listCategory),
  name: yup.string().min(1).required(),
  address: yup.string().min(1).required(),
  city: yup.string().min(1).required(),
  zipCode: yup.string().min(1).required(),
  country: yup.string().min(1).required(),
  categorySpecifics: yup.object().required()
})
const PlaceEditPage = ({ place }) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const router = useRouter()
  const initialValues = place
  const handleSubmit = async ({ _id, typeCategory, name, address, city, zipCode, country, avgPrice, categorySpecifics }) => {
    // eslint-disable-next-line no-param-reassign
    typeCategory = selectedCategory
    await axios.patch(`/api/places/${_id}`, { typeCategory, name, address, city, zipCode, country, avgPrice, categorySpecifics })

    router.push(`../../`)
  }
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onChange={handleCategoryChange}
    >
      <Form>
        <select onChange={handleCategoryChange} value={selectedCategory}>{listCategory.map(typeCategory => (
              <option key={typeCategory} value={typeCategory}>{typeCategory}</option>
            ))}</select>
        <FormField name="name" placeholder="Name" />
        <FormField name="address" placeholder="Address" />
        <FormField name="city" placeholder="City" />
        <FormField name="zipCode" placeholder="Zip Code" />
        <FormField component="select" name="country" placeholder="Country">
            {listCountries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
        </FormField>
        <FormField name="avgPrice" placeholder="Price" />
           {selectedCategory && categoryFields[selectedCategory] && categoryFields[selectedCategory].map(field => (
            <FormField
              key={field.name}
              name={`categorySpecifics.${field.name}`}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
        <Button type="submit">SAVE</Button>
      </Form>
    </Formik>
  )
}

export default PlaceEditPage