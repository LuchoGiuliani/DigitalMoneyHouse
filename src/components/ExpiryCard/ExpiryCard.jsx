import { useState } from "react";

function ExpiryInput() {
  const [state, setState] = useState({ expiry: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Regex para validar el formato MM/YYYY
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validar el formato de la fecha
    if (value === "" || regex.test(value)) {
      // Limpia el error si el input está vacío o cumple con el formato
      setError("");
    } else {
      // Muestra el mensaje de error si el formato no es correcto
      setError(
        "Fecha inválida, deberá escribirse el mes seguido del año, ej: 05/2025"
      );
    }
  };

  const handleInputFocus = (e) => {
    // Lógica adicional si se requiere al enfocar el input
  };

  return (
    <div>
      <input
        type="text"
        name="expiry"
        placeholder="Fecha de vencimiento"
        value={state.expiry}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className={`p-2 rounded-md drop-shadow-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ExpiryInput;
