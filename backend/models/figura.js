const mongoose = require('mongoose');


const FiguraSchema = new mongoose.Schema({
    usuario :  {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    imagem: { type: String, required: true },
    nome_figura: { type: String, required: true },
    audio :  { type: String, required: true },
    figura_favorita : { type: Boolean, required: false }
  },{timestamps: true});



  module.exports = mongoose.model('Figura', FiguraSchema);