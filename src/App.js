import { Button, Container, Row, Col } from "react-bootstrap";
import { Cabecera } from "./componentes/Cabecera";
import { Formulario } from "./componentes/Formulario";
import { Usuarios } from "./componentes/Usuarios";
import { UserContext } from "./context/UserContext";
import { useCallback, useEffect, useState } from "react";
import { useAlerta } from "./context/AlertaContext";

function App() {
  const urlAPI = process.env.REACT_APP_APP_USUARIOS;
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const { mostrarAlerta } = useAlerta();
  const numeroUsuarios = datosUsuarios.length;
  const getDatosUsuarios = useCallback(async () => {
    try {
      const response = await fetch(urlAPI);
      if (!response.ok)
        throw new Error(
          "La respuesta no ha ido bien, no se han devuelto los datos esperados."
        );
      const datosAPI = await response.json();
      setDatosUsuarios(datosAPI);
    } catch (error) {
      console.error(error.message);
    }
  }, [urlAPI]);
  const crearUsuario = async (usuarioNuevo) => {
    usuarioNuevo.id = datosUsuarios.length + 1;
    try {
      const response = await fetch(urlAPI, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(usuarioNuevo),
      });
      if (!response.ok)
        throw new Error(
          "La respuesta no ha ido bien, no se han devuelto los datos esperados."
        );
      const datosUsuarioNuevo = await response.json();
      setDatosUsuarios([...datosUsuarios, datosUsuarioNuevo]);
      setFormularioAbierto(!formularioAbierto);
      mostrarAlerta("Usuario creado correctamente!", "success");
    } catch (error) {
      console.error(error.message);
      mostrarAlerta("No se ha podido crear el usuario!", "error");
    }
  };
  const editarUsuario = async (usuarioModificar) => {
    try {
      const response = await fetch(urlAPI + usuarioModificar.id, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(usuarioModificar),
      });
      if (!response.ok)
        throw new Error(
          "La respuesta no ha ido bien, no se han devuelto los datos esperados."
        );
      setDatosUsuarios(
        datosUsuarios.map((usuario) =>
          usuario.id === usuarioModificar.id
            ? { ...usuario, ...usuarioModificar }
            : usuario
        )
      );
      setFormularioAbierto(!formularioAbierto);
      setUsuarioEditar(null);
      mostrarAlerta("Usuario editado correctamente!", "success");
    } catch (error) {
      console.error(error.message);
      mostrarAlerta("No se ha podido editar el usuario!", "error");
    }
  };
  const eliminarUsuario = async (idUsuario) => {
    try {
      const response = await fetch(urlAPI + idUsuario, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(
          "La respuesta no ha ido bien, no se han devuelto los datos esperados."
        );
      setDatosUsuarios(
        datosUsuarios.filter((usuario) => usuario.id !== idUsuario)
      );
      mostrarAlerta("Usuario eliminado correctamente!", "success");
    } catch (error) {
      console.error(error.message);
      mostrarAlerta("No se ha podido eliminar el usuario!", "error");
    }
  };
  useEffect(() => getDatosUsuarios(), [getDatosUsuarios]);
  return (
    <UserContext.Provider
      value={{
        datosUsuarios,
        numeroUsuarios,
        formularioAbierto,
        setFormularioAbierto,
        crearUsuario,
        editarUsuario,
        eliminarUsuario,
        usuarioEditar,
        setUsuarioEditar,
      }}
    >
      <Container>
        <Cabecera></Cabecera>
        <Row as="main">
          <Col xs={12}>
            <Row as="section">
              {formularioAbierto ? (
                <Col xs={12} className="mb-2">
                  <Formulario></Formulario>
                </Col>
              ) : (
                <Col xs={12} className="mb-2">
                  <Button
                    variant="primary"
                    onClick={() => setFormularioAbierto(!formularioAbierto)}
                  >
                    Crear usuario
                  </Button>
                </Col>
              )}
            </Row>
            <Usuarios></Usuarios>
          </Col>
        </Row>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
