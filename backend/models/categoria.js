const mongoose = require('mongoose');


const CategoriaSchema = new mongoose.Schema({
    criador_categoria :  {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    imagem: { type: Buffer, required: true },
    nome_categoria: { type: String, required: true },
    url_convite : {type: String, required: false }
  },{timestamps: true});



  module.exports = mongoose.model('Categoria', CategoriaSchema);