import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
export const Cabecera = (props) => {
  const { numeroUsuarios } = useContext(UserContext);
  return (
    <Row as="header">
      <Col>
        <h1>Número de usuarios: {numeroUsuarios}</h1>
      </Col>
    </Row>
  );
};
