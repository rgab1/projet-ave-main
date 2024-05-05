import { Button } from "@/components/Button"
import { Form } from "@/components/Form"
import { FormField } from "@/components/FormField"
import { listCategory, listCountries, categoryFields } from "@/utils/constant"
import axios from "axios"
import { Formik } from "formik"
import { useState } from "react"
import * as yup from "yup"

export const getServerSideProps = async () => {
  const { data: places } = await axios("http://localhost:3001/api/places")

  return {
    props: {
      places,
    },
  }
}
const initialValues = {
          typeCategory: listCategory[0],
          name: "",
          address: "",
          city: "",
          zipCode: "",
          country: "",
          avgPrice: "",
          categoryFields: {},
        }
const validationSchema = yup.object({
  typeCategory: yup.string().required("Select a category").oneOf(listCategory),
  name: yup.string().min(1).required("Name required"),
  address: yup.string().min(1).required("Address required"),
  city: yup.string().min(1).required("City required"),
  zipCode: yup.string().min(1).required("Zip Code required"),
  country: yup.string().min(1).required("Country required"),
  avgPrice: yup.number().min(1).required("Average Price required"),
  categorySpecifics: yup.object().required(),
})
// eslint-disable-next-line max-lines-per-function
const PlacesPage = (props) => {
  const { places: initialPlaces } = props
  const [places, setPlaces] = useState(initialPlaces)
  // eslint-disable-next-line no-shadow
  const [selectedCategory, setSelectedCategory] = useState("")
  const resetCategorySpecifics = () => {
    const resetValues = {}

    if (categoryFields[selectedCategory]) {
      categoryFields[selectedCategory].forEach(field => {
        resetValues[field.name] = ""
        // Assuming default empty string, adjust based on your needs
      })
    }
      
    return resetValues
    }
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }
  const submit = async (values, { resetForm }) => {
    values.typeCategory = selectedCategory
    const { data: newPlace } = await axios.post("/api/places", values)
    setPlaces([newPlace, ...places])
    resetForm({
      values: { ...initialValues, categorySpecifics: resetCategorySpecifics() }
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          typeCategory: listCategory[0],
          name: "",
          address: "",
          city: "",
          zipCode: "",
          country: "",
          avgPrice: "",
          categoryFields: {},
        }}
        onSubmit={submit}
        onCategoryChange={handleCategoryChange}
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
          <FormField name="avgPrice" placeholder="Average Price" type="number" />
           {selectedCategory && categoryFields[selectedCategory] && categoryFields[selectedCategory].map(field => (
            <FormField
              key={field.name}
              name={`categorySpecifics.${field.name}`}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
          <Button type="submit">ADD</Button>
        </Form>
      </Formik>
    </div>
  )
}


export default PlacesPage