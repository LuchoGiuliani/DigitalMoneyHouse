import { useState, useEffect } from "react";

const useFormState = (userData, accountData) => {
  const [formState, setFormState] = useState({
    email: "",
    firstname: "",
    lastname: "",
    cuit: "",
    phone: "",
    password: "******",
  });

  const [editState, setEditState] = useState({
    email: false,
    firstname: false,
    lastname: false,
    cuit: false,
    phone: false,
    password: false,
  });

  useEffect(() => {
    if (userData) {
      setFormState({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        cuit: userData.cuit,
        phone: userData.phone,
        password: "******",
      });
    }
  }, [userData, accountData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEdit = (field) => {
    setEditState((prevState) => ({ ...prevState, [field]: true }));
  };

  return { formState, editState, setEditState, handleInputChange, handleEdit };
};

export default useFormState;