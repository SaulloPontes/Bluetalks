const mongoose = require('mongoose');


const UsuarioResponsavelSchema = new mongoose.Schema({
    usuario_responsavel :  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    usuario_dependente :  { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
  },{timestamps: true});



  module.exports = mongoose.model('UsuarioResponsavel', UsuarioResponsavelSchema);