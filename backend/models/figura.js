const mongoose = require('mongoose');


const FiguraSchema = new mongoose.Schema({
    usuario :  {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    imagem: { type: Buffer, required: true },
    nome_figura: { type: String, required: true },
    audio :  { type: Buffer, required: true },
    figura_favorita : { type: Boolean, required: false}
  },{timestamps: true});



  module.exports = mongoose.model('Figura', FiguraSchema);