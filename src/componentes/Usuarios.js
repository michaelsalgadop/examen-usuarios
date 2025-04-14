import { useContext } from "react";
import { Row } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Usuario } from "./Usuario";
export const Usuarios = (props) => {
  const { datosUsuarios } = useContext(UserContext);
  return (
    <Row as="section">
      {datosUsuarios.map((usuario) => (
        <Usuario key={usuario.id} usuario={usuario}></Usuario>
      ))}
    </Row>
  );
};
