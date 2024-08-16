import * as yup from "yup";

const LoginScheme = yup.object({
    email: yup.string().email('Formato invalido').required('El correo electrónico es obligatorio'),
    //  password: yup.string().required()
}).required();

export default LoginScheme;