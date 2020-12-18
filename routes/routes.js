const { Router } = require("express");
const router = Router();
const fs = require("fs");

const usuarioFile = fs.readFileSync("./usuario.json", "utf8");
let usuario = JSON.parse(usuarioFile);

router.get("/", (req, res) => {
  res.json("Bienvenido a la API con información de usuarios");
});

router.get("/usuario", (req, res) => {
  res.status(200).json(usuario);
});

router.post("/usuario", (req, res) => {
  const {
    id_tipo_usuario,
    correo,
    nombre_usuario,
    pais_origen,
    telefono,
    contrasena,
    sexo,
    fecha_nacimiento,
    nombre,
    apellidos
  } = req.body;

  if (
    !id_tipo_usuario ||
    !correo ||
    !nombre_usuario ||
    !telefono ||
    !pais_origen ||
    !contrasena ||
    !sexo ||
    !fecha_nacimiento ||
    !nombre ||
    !apellidos
  ) {
    res.status(401).json({ error: "Por favor, diligencie todos los datos" });
  } else {
    const id = usuario.length + 1;

    let nuevoUsuario = {
      id,
      id_tipo_usuario,
      correo,
      nombre_usuario,
      pais_origen,
      telefono,
      contrasena,
      sexo,
      fecha_nacimiento,
      nombre,
      apellidos
    };

    usuario.push(nuevoUsuario);
    const json_usuario = JSON.stringify(usuario);

    fs.writeFileSync("./usuario.json", json_usuario, "utf-8");

    res.status(200).json(usuario);
  }
});

router.put("/usuario/:id", (req, res) => {
  const {
    id_tipo_usuario,
    correo,
    nombre_usuario,
    pais_origen,
    telefono,
    contrasena,
    sexo,
    fecha_nacimiento,
    nombre,
    apellidos
  } = req.body;
  const id = req.params.id;

  if (
    !id_tipo_usuario ||
    !correo ||
    !nombre_usuario ||
    !telefono ||
    !pais_origen ||
    !contrasena ||
    !sexo ||
    !fecha_nacimiento ||
    !nombre ||
    !apellidos ||
    !id
  ) {
    res
      .status(401)
      .json({ error: "Debe completar los datos y especificar el id." });
  } else {
    usuario.filter((usuario) => {
      if (usuario.id == id) {
        usuario.id_tipo_usuario = id_tipo_usuario;
        usuario.correo = correo;
        usuario.nombre_usuario = nombre_usuario;
        usuario.telefono = telefono;
        usuario.pais_origen = pais_origen;
        usuario.contrasena = contrasena;
        usuario.sexo = sexo;
        usuario.fecha_nacimiento = fecha_nacimiento;
        usuario.nombre = nombre;
        usuario.apellidos = apellidos;
      }
    });

    const json_usuario = JSON.stringify(usuario);
    fs.writeFileSync("./usuario.json", json_usuario, "utf-8");

    res.status(200).json(usuario);
  }
});

router.delete("/usuario/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(401).json({ error: "Especifique un id" });
  } else {
    const indexUsuario = usuario.findIndex((movie) => usuario.id === id);
    usuario.splice(indexUsuario, 1);

    const json_usuario = JSON.stringify(usuario);
    fs.writeFileSync("./usuario.json", json_usuario, "utf-8");

    res.status(200).json(usuario);
  }
});

module.exports = router;
