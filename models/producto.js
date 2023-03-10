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
      required: true,
      default: '6407aaeca76e4ac982ce8d05'
    },
    stock: {
      type: Boolean,
      default: true
    },
    popular: {
      type: Boolean,
      default: true
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio']
    },
    cantidad: {
      type: Number,
      required: [true, 'La cantidad es obligatoria']
    }
  });

module.exports = model('Producto', ProductoSchema)