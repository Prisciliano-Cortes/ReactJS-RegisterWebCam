import * as Yup from "yup";

export const RegisterValidations = Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email id required"),
    password: Yup.string().trim().min(6, "Min 6 characters").required("Password is required"),
    name: Yup.string().trim().min(1,"The name must have at least 1 character").required('Name is required'),
});