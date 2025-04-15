import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Alerta } from "./Alerta";
export const Cabecera = (props) => {
  const { numeroUsuarios } = useContext(UserContext);
  return (
    <Row as="header">
      <Col>
        <Row>
          <Col xs={12}>
            <Alerta></Alerta>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h1>Número de usuarios: {numeroUsuarios}</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
