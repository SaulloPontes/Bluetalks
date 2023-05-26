const mongoose = require('mongoose');


const ContatoUsuarioSchema = new mongoose.Schema({
    usuario :  {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    numero : {type: String, required: true},
    nome : { type: String, required: true },
    relacao : { type: String, required: true },

  },{timestamps: true});



  module.exports = mongoose.model('ContatoUsuario', ContatoUsuarioSchema);