import * as Yup from "yup";

export const CertificateValidations = Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email id required"),
    password: Yup.string().trim().min(6, "Min 6 characters").required("Password is required"),
});