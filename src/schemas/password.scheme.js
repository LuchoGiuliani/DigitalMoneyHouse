import * as yup from "yup";

const LoginScheme = yup.object({ 
    password: yup.string().required()
}).required();

export default LoginScheme;