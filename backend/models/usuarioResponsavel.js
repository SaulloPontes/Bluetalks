const mongoose = require('mongoose');


const UsuarioResponsavelSchema = new mongoose.Schema({
    usuarioResponsavel : {author: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }},
    usuarioDependente : {author: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }}
  },{timestamps: true});



  module.exports = mongoose.model('UsuarioResponsavel', UsuarioResponsavelSchema);