const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio']
    },
    proveedor: {
      type: String,
      required: [true, 'El proveedor es obligatorio']
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },
    stock: {
      type: Number,
      default: 0, 
      required: true
    },
    popular: {
      type: Boolean,
      default: true
    },
    precio: {
      type: Number
    }
  });

module.exports = model('Producto', ProductoSchema)