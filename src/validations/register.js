import * as Yup from "yup";

// const FILE_SIZE = 160 * 1024;
// const SUPPORTED_FORMATS = [
//     "image/jpg",
//     "image/jpeg",
//     "image/gif",
//     "image/png"
// ];

export const RegisterValidations = Yup.object().shape({
    email: Yup.string().email("Email is not valid").required("Email id required"),
    password: Yup.string().trim().min(6, "Min 6 characters").required("Password is required"),
    name: Yup.string().trim().min(1,"The name must have at least 1 character").required('Name is required'),
    // profile: Yup.mixed().required("File is required")
    // .test(
    //     "fileSize",
    //     "File too large",
    //     value => value && value.size <= FILE_SIZE
    // )
    // .test(
    //     "fileFormat",
    //     "Unsupported Format",
    //     value => value && SUPPORTED_FORMATS.includes(value.type)
    // )
});