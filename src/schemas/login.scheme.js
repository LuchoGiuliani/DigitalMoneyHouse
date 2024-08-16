import * as yup from "yup";

const LoginScheme = yup.object({
    email: yup.string().email('El correo electrónico debe tener un formato válido').required('El correo electrónico es obligatorio'),
    //  password: yup.string().required()
}).required();

export default LoginScheme;