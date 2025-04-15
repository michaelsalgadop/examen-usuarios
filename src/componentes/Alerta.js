import ReactJsAlert from "reactjs-alert";
import { useAlerta } from "../context/AlertaContext";

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
