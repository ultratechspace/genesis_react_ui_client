import { SchemaOf, object, string } from "yup";

interface IForm {
  email: string;
  username: string;
}
export const validationSchema: SchemaOf<any> = object({
  email: string().required("Email is required"),
  password: string()
    .max(256, "Password should not exceed more than 256 characters")
    .required("Password is required"),
});
