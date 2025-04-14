import { useContext } from "react";
import { Col } from "react-bootstrap";
import { FaTimes, FaEdit } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
export const Usuario = (props) => {
  const { usuario } = props;
  const { setFormularioAbierto, setUsuarioEditar, eliminarUsuario } =
    useContext(UserContext);
  return (
    <Col md={4} className="mb-2">
      <article className="usuario">
        <div className="acciones">
          <FaEdit
            className="pointer text-warning"
            onClick={() => {
              setFormularioAbierto(true);
              setUsuarioEditar(usuario);
            }}
          ></FaEdit>
          <FaTimes
            className="pointer text-danger"
            onClick={() => eliminarUsuario(usuario.id)}
          ></FaTimes>
        </div>
        <ul className="info">
          <li>
            <span className="bolder">Nombre:</span> {usuario.name}
          </li>
          <li>
            <span className="bolder">N. Usuario:</span> {usuario.username}
          </li>
          <li>
            <span className="bolder">Email:</span> {usuario.email}
          </li>
          <li>
            <span className="bolder">Teléfono:</span> {usuario.phone}
          </li>
        </ul>
      </article>
    </Col>
  );
};
