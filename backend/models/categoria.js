const mongoose = require('mongoose');


const CategoriaSchema = new mongoose.Schema({
    criador_categoria :  {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    imagem: { type: String, required: true },
    nome_categoria: { type: String, required: true , unique : true },
    url_convite : {type: String, required: false },
    figuras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Figura' }],
  },{timestamps: true});



  module.exports = mongoose.model('Categoria', CategoriaSchema);