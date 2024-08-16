export const validarPassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20}$)/;
    return regex.test(password);
  };
  
  export const validateRequiredFields = (formData) => {
    const requiredFields = [
      "firstname",
      "lastname",
      "dni",
      "email",
      "password",
      "phone",
    ];
  
    let newErrors = {};
  
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `Completa con tu ${field}`;
      }
    });
  
    return newErrors;
  };
  