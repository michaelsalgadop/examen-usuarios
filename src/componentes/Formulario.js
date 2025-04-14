import { useContext } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useFormulario } from "../hooks/useFormulario";

export const Formulario = (props) => {
  const {
    formularioAbierto,
    setFormularioAbierto,
    crearUsuario,
    editarUsuario,
    usuarioEditar,
    setUsuarioEditar,
  } = useContext(UserContext);
  const { setData, datosFormulario } = useFormulario(
    usuarioEditar
      ? usuarioEditar
      : {
          id: 0,
          name: "",
          username: "",
          email: "",
          phone: "",
          address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
              lat: "",
              lng: "",
            },
          },
          website: "",
          company: {
            name: "",
            catchPhrase: "",
            bs: "",
          },
        }
  );
  return (
    <Form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        if (usuarioEditar) {
          editarUsuario(datosFormulario);
        } else {
          crearUsuario(datosFormulario);
        }
      }}
    >
      <Col xs={12} className="form-group">
        <Form.Label className="label-usuario" htmlFor="name">
          Nombre:
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          id="name"
          onChange={setData}
          value={datosFormulario.name}
        />
      </Col>
      <Col xs={12} className="form-group">
        <Form.Label className="label-usuario" htmlFor="username">
          Nombre de usuario:
        </Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
          onChange={setData}
          value={datosFormulario.username}
        />
      </Col>
      <Col xs={12} className="form-group">
        <Form.Label className="label-usuario" htmlFor="email">
          Email:
        </Form.Label>
        <Form.Control
          type="email"
          name="email"
          id="email"
          onChange={setData}
          value={datosFormulario.email}
        />
      </Col>
      <Col xs={12} className="form-group">
        <Form.Label className="label-usuario" htmlFor="phone">
          Telefono:
        </Form.Label>
        <Form.Control
          type="number"
          name="phone"
          id="phone"
          onChange={setData}
          value={datosFormulario.phone}
        />
      </Col>
      <Col xs={12} className="form-group">
        <Button type="submit" variant="success">
          {usuarioEditar ? "Modificar" : "Crear"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="ml-1"
          onClick={() => {
            setFormularioAbierto(!formularioAbierto);
            if (usuarioEditar) {
              setUsuarioEditar(null);
            }
          }}
        >
          Cancelar
        </Button>
      </Col>
    </Form>
  );
};
