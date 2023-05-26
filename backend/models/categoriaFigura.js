const mongoose = require('mongoose');


const CategoriaFiguraSchema = new mongoose.Schema({
    categoria_id :  {type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true},
    figura_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Figura', required: true}
  },{timestamps: true});



  module.exports = mongoose.model('CategoriaFigura', CategoriaFiguraSchema);