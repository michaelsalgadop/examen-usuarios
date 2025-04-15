import { createContext, useContext, useState } from "react";

// AlertaContext.js
const AlertaContext = createContext();
export const TIPO = {
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
  CRITICAL: "critical",
  CONFIRM: "confirm",
  NOTICE: "notice",
  INFO: "info",
};
/**
 * Contexto de alerta para poder mostrar al usuario que las acciones que realiza en la app si
 * han tenido exito o no.
 * Disponemos de los métodos mostrarAlerta y cerrarAlerta para realizar todas las acciones necesarias
 * que necesitemos.
 * @param {*} chidren código que irá dentro del contexto
 * @returns El contexto y todo el código(App.js) dentro para poder utilizar los valores del contexto
 * donde necesitemos.
 */
export const AlertaProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({
    estado: false,
    tipo: "",
    mensaje: "",
  });

  const mostrarAlerta = (mensajeAlerta, tipo = "info") => {
    const tipoValido = Object.values(TIPO).includes(tipo) ? tipo : TIPO.INFO;
    setAlerta({ estado: true, mensaje: mensajeAlerta, tipo: tipoValido });
  };

  const cerrarAlerta = (callback = null) => {
    if (callback) callback();
    setAlerta({ ...alerta, estado: false });
  };
  return (
    <AlertaContext.Provider value={{ alerta, mostrarAlerta, cerrarAlerta }}>
      {children}
    </AlertaContext.Provider>
  );
};

export const useAlerta = () => useContext(AlertaContext);
