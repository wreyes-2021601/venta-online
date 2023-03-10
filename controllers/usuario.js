//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Usuario = require('../models/usuario');


const getUsuarios = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const putUsuario = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de usuario',
        usuarioEditado
    });

}


const deleteUsuario = async (req = request, res = response) => {
    //eliminar fisicamente y guardar
    //const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    try {
        const usuarioActual = req.user; // Obtener el usuario actual autenticado
        const idUsuario = req.params.id; // Obtener el ID del usuario que se desea eliminar
    
        // Verificar si el usuario actual es un admin o es el mismo usuario que se desea eliminar
        if (usuarioActual.rol === 'admin' || usuarioActual._id.toString() === idUsuario) {
          const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario);
          if (usuarioEliminado) {
            res.status(200).send({ mensaje: 'Usuario eliminado exitosamente' });
          } else {
            res.status(404).send({ error: 'Usuario no encontrado' });
          }
        } else {
          res.status(403).send({ error: 'No tiene permisos para realizar esta acción' });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al eliminar usuario' });
      }

}



module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
}