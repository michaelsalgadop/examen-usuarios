import ReactJsAlert from "reactjs-alert";
import { useAlerta } from "../context/AlertaContext";
/**
 * Componente Alerta, recogerá del contexto alerta el objeto alerta y el método de cerrarAlerta.
 * @returns Alerta de reactjs en el que le pasaremos el estado(se muestra o no),
 * el tipo(success, info, error,...)para saber que si ha ido bien o no, y el mensaje de información
 * para el usuario.
 */
export const Alerta = () => {
  const { alerta, cerrarAlerta } = useAlerta();
  return (
    <ReactJsAlert
      status={alerta.estado}
      type={alerta.tipo}
      title={alerta.mensaje}
      Close={() => cerrarAlerta()}
    />
  );
};
