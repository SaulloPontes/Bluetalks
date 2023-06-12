const mongoose = require('mongoose');


const FiguraSchema = new mongoose.Schema({
    imagem: { type: String, required: true },
    nome: { type: String, required: true },
    audio :  { type: String, required: true },
    figura_favorita : { type: Boolean, required: false }
  },{timestamps: true});



  module.exports = mongoose.model('Figura', FiguraSchema);