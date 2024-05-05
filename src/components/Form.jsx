import { Form as FormikForm } from "formik"

export const Form = (props) => (
  <FormikForm noValidate className="flex flex-col gap-4" {...props} />
)
