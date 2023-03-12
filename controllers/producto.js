//Importacion
const { response, request } = require('express');
//Modelos
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');


const obtenerProductos = async (req = request, res = response) => {


    const query = { stock: true };
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate({ path: 'Categoria', select: 'nombre' })
        
    ]);

    res.json({
        msg: 'GET API de Producto',
        listaProductos
    });


}

const obtenerProductosAgotados = async (req = request, res = response) => {

    //Condición, me busca solo los categorias que tengan estado en true
    const query = { stock: false };
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate({ path: 'Categoria', select: 'nombre' })
        
    ]);

    res.json({
        msg: 'GET API de Producto',
        listaProductos
    });


}
const obtenerProductosMasVendidos = async (req = request, res = response) => {

    //Condición, me busca solo los categorias que tengan estado en true
    const query = { popular: true };
    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate({ path: 'Categoria', select: 'nombre' })
        
    ]);

    res.json({
        msg: 'GET API de Producto',
        listaProductos
    });


}

const obtenerProductoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)

    res.json({
        msg: 'Producto por id',
        producto: producto
    });

}


const crearProducto = async (req = request, res = response) => {

    const { nombre, proveedor, categoria, stock,cantidad } = req.body;
    const productoDB = new Producto({ nombre, proveedor, categoria, stock,cantidad });


    await productoDB.save();

    res.status(201).json({
        msg: 'Post de Producto',
        productoDB
    });

}



const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    
    const { _id, stock, ...resto } = req.body;


    //editar y guardar
    const productoEditado = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Prodcuto',
      productoEditado
    });

}


const eliminarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate(id, { stock: false });

    res.json({
        msg: 'delete Producto',
        productoEliminado
    });

}



module.exports = {
    obtenerProductosAgotados,
    obtenerProductosMasVendidos,
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}